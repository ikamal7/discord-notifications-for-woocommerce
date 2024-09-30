<?php
namespace Kamal\DiscordWooNotif\Core;

class OrderHandler {
    private $processed_orders = array();

    public function __construct() {
        add_action('woocommerce_new_order', array($this, 'handle_new_order'), 10, 1);
        add_action('woocommerce_order_status_changed', array($this, 'handle_status_change'), 10, 3);
    }

    public function handle_new_order($order_id) {
        $this->send_notification($order_id, 'new');
    }

    public function handle_status_change($order_id, $old_status, $new_status) {
        $this->send_notification($order_id, 'status_change', $old_status, $new_status);
    }

    private function send_notification($order_id, $event_type, $old_status = '', $new_status = '') {
        // Check if we've already processed this order in this request
        if (in_array($order_id, $this->processed_orders)) {
            return;
        }

        if (!get_option('discord_woo_notif_enabled', 0)) {
            return;
        }

        $order = wc_get_order($order_id);
        $current_status = $order->get_status();

        // Determine which webhook URL to use
        $webhook_url = $this->get_webhook_url_for_status($current_status);
        if (empty($webhook_url)) {
            return;
        }

        $site_url = get_site_url();
        $favicon_url = $this->get_site_icon_url();

        $embed = array(
            'title' => $event_type === 'new' 
                ? sprintf(__('New Order #%s', 'discord-woo-notif'), $order->get_order_number())
                : sprintf(__('Order #%s Status Updated', 'discord-woo-notif'), $order->get_order_number()),
            'url' => $order->get_edit_order_url(),
            'color' => $this->get_color_for_status($current_status),
            'fields' => array(
                array(
                    'name' => __('Status', 'discord-woo-notif'),
                    'value' => wc_get_order_status_name($current_status),
                    'inline' => true
                ),
                array(
                    'name' => __('Customer', 'discord-woo-notif'),
                    'value' => $order->get_formatted_billing_full_name(),
                    'inline' => true
                )
            ),
            'footer' => array(
                'text' => get_bloginfo('name'),
                'icon_url' => $favicon_url
            ),
            'timestamp' => date('c')
        );

        // Add old status information for status change events
        if ($event_type === 'status_change') {
            $embed['fields'][] = array(
                'name' => __('Old Status', 'discord-woo-notif'),
                'value' => wc_get_order_status_name($old_status),
                'inline' => true
            );
        }

        $data = array(
            'embeds' => array($embed)
        );

        $args = array(
            'body' => wp_json_encode($data),
            'headers' => array('Content-Type' => 'application/json'),
            'method' => 'POST',
            'data_format' => 'body'
        );

        $response = wp_remote_post($webhook_url, $args);

        // Log the order as processed
        $this->processed_orders[] = $order_id;

        // Optionally, you can add error logging here
        if (is_wp_error($response)) {
            error_log('Discord notification failed for order ' . $order_id . ': ' . $response->get_error_message());
        }
    }

    private function get_webhook_url_for_status($status) {
        $status_webhook_url = get_option("discord_woo_notif_{$status}_webhook_url", '');
        $status_enabled = get_option("discord_woo_notif_{$status}_enabled", 0);

        if ($status_enabled && !empty($status_webhook_url)) {
            return $status_webhook_url;
        }

        // Fall back to the default webhook URL if status-specific one is not set or enabled
        return get_option('discord_woo_notif_webhook_url', '');
    }

    private function get_color_for_status($status) {
        $color = get_option("discord_woo_notif_{$status}_color", '#00ff00');
        // Convert hex color to integer (Discord uses integer representation of colors)
        return hexdec(str_replace('#', '', $color));
    }

    private function get_site_icon_url() {
        $site_icon_id = get_option('site_icon');
        if ($site_icon_id) {
            $site_icon_url = wp_get_attachment_image_url($site_icon_id, 'full');
            if ($site_icon_url) {
                return $site_icon_url;
            }
        }
        
        // Fallback to default favicon location if no site icon is set
        $favicon_url = get_site_url() . '/favicon.ico';
        
        // Check if favicon exists
        $response = wp_remote_head($favicon_url);
        if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
            return $favicon_url;
        }
        
        // If no favicon is found, return an empty string
        return '';
    }
}
<?php
namespace Kamal\DiscordWooNotif\Core;

if ( ! defined( 'ABSPATH' ) ) exit;

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

        $webhook_url = get_option('discord_woo_notif_webhook_url', '');
        if (empty($webhook_url)) {
            return;
        }

        $order = wc_get_order($order_id);
        $site_url = get_site_url();
        $favicon_url = get_site_icon_url();

        $embed = array(
            'title' => $event_type === 'new' 
                ? sprintf(__('New Order #%s', 'discord-notifications-for-woocommerce'), $order->get_order_number())
                : sprintf(__('Order #%s Status Updated', 'discord-notifications-for-woocommerce'), $order->get_order_number()),
            'url' => $order->get_edit_order_url(),
            'color' => 0x00ff00,
            'fields' => array(
                array(
                    'name' => __('Status', 'discord-notifications-for-woocommerce'),
                    'value' => $order->get_status(),
                    'inline' => true
                ),
                array(
                    'name' => __('Customer', 'discord-notifications-for-woocommerce'),
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
                'name' => __('Old Status', 'discord-notifications-for-woocommerce'),
                'value' => $old_status,
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
    }
}
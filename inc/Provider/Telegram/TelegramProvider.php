<?php
namespace Kamal\DiscordWooNotif\Provider\Telegram;

if ( ! defined( 'ABSPATH' ) ) exit;

use Kamal\DiscordWooNotif\Provider\ProviderInterface;

class TelegramProvider implements ProviderInterface {
    private $processed_orders = array();

    public function __construct() {
        // Constructor is empty as initialization is done in init()
    }

    public function init() {
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

        if (!get_option('discord_woo_notif_telegram_enabled', 0)) {
            return;
        }

        $bot_token = get_option('discord_woo_notif_telegram_bot_token', '');
        $chat_id = get_option('discord_woo_notif_telegram_chat_id', '');
        
        if (empty($bot_token) || empty($chat_id)) {
            return;
        }

        $order = wc_get_order($order_id);
        
        // Create message text
        $message = $event_type === 'new' 
            ? sprintf(__('🆕 New Order #%s', 'discord-notifications-for-woocommerce'), $order->get_order_number())
            : sprintf(__('🔄 Order #%s Status Updated', 'discord-notifications-for-woocommerce'), $order->get_order_number());
            
        $message .= "\n\n";
        $message .= sprintf(__('Status: %s', 'discord-notifications-for-woocommerce'), $order->get_status()) . "\n";
        $message .= sprintf(__('Customer: %s', 'discord-notifications-for-woocommerce'), $order->get_formatted_billing_full_name()) . "\n";
        
        // Add old status information for status change events
        if ($event_type === 'status_change') {
            $message .= sprintf(__('Old Status: %s', 'discord-notifications-for-woocommerce'), $old_status) . "\n";
        }
        
        $message .= "\n";
        $message .= sprintf(__('View Order: %s', 'discord-notifications-for-woocommerce'), $order->get_edit_order_url());

        // Prepare API URL
        $api_url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
        
        $args = array(
            'body' => wp_json_encode(array(
                'chat_id' => $chat_id,
                'text' => $message,
                'parse_mode' => 'HTML'
            )),
            'headers' => array('Content-Type' => 'application/json'),
            'method' => 'POST',
            'data_format' => 'body'
        );

        $response = wp_remote_post($api_url, $args);

        // Log the order as processed
        $this->processed_orders[] = $order_id;
    }
}
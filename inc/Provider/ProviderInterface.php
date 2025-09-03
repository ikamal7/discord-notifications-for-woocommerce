<?php
namespace Kamal\DiscordWooNotif\Provider;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Interface for notification providers
 * 
 * @package Kamal\DiscordWooNotif\Provider
 * @since 1.0.0
 */
interface ProviderInterface {
    /**
     * Initialize the provider
     * 
     * @return void
     */
    public function init();
    
    /**
     * Handle new order notification
     * 
     * @param int $order_id Order ID
     * @return void
     */
    public function handle_new_order($order_id);
    
    /**
     * Handle order status change notification
     * 
     * @param int $order_id Order ID
     * @param string $old_status Old status
     * @param string $new_status New status
     * @return void
     */
    public function handle_status_change($order_id, $old_status, $new_status);
}
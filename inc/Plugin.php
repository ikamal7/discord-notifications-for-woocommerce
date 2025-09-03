<?php

namespace Kamal\DiscordWooNotif;

use Kamal\DiscordWooNotif\Admin\Settings;
use Kamal\DiscordWooNotif\Admin\ReviewNotice;
use Kamal\DiscordWooNotif\Provider\Discord\DiscordProvider;
use Kamal\DiscordWooNotif\Provider\Telegram\TelegramProvider;


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Main plugin class
 * 
 * @package Kamal\DiscordWooNotif
 * @since 1.0.0
 */
class Plugin {
    /**
     * Plugin instance
     *
     * @var Plugin
     */
    private static $instance = null;

    /**
     * Get plugin instance
     *
     * @return Plugin
     */
    public static function get_instance() {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        // Constructor is empty - initialization happens in init()
    }

    /**
     * Initialize plugin components
     *
     * @return void
     */
    private function init_components() {
        // Admin components
        $settings = new Settings();
        $settings->init();
        
        // Initialize review notice
        $review_notice = new ReviewNotice();
        $review_notice->init();
        
        // Initialize providers
        $discord_provider = new DiscordProvider();
        $discord_provider->init();
        
        $telegram_provider = new TelegramProvider();
        $telegram_provider->init();
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init() {
        // Check if WooCommerce is active
        if ( ! class_exists( 'WooCommerce' ) ) {
            add_action( 'admin_notices', function() {
                echo '<div class="error"><p>' . esc_html__( 'Discord notifications for WooCommerce requires WooCommerce to be installed and active.', 'discord-notifications-for-woocommerce' ) . '</p></div>';
            });
            return;
        }

        // Initialize plugin components
        $this->init_components();
    }
}
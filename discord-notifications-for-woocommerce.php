<?php
/**
 * Plugin Name: Discord notifications for WooCommerce
 * Plugin URI: https://github.com/ikamal7/discord-notifications-for-woocommerce
 * Description: Sends notifications to a Discord channel via webhook when a WooCommerce order is created or its status changes.
 * Version: 1.0.0
 * Author: Kamal Hosen
 * Author URI: https://kamalhosen.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: discord-notifications-for-woocommerce
 * Domain Path: /languages
 * Requires Plugins: woocommerce
 *
 * @package Kamal\DiscordWooNotif
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Define plugin constants
define( 'DISCORD_WOO_NOTIF_VERSION', '1.0.0' );
define( 'DISCORD_WOO_NOTIF_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'DISCORD_WOO_NOTIF_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Require the autoloader
require_once DISCORD_WOO_NOTIF_PLUGIN_DIR . 'autoload.php';

// Initialize the plugin
function discord_woo_notif_init() {
    // Check if WooCommerce is active
    if ( ! class_exists( 'WooCommerce' ) ) {
        add_action( 'admin_notices', function() {
            echo '<div class="error"><p>' . esc_html__( 'Discord notifications for WooCommerce requires WooCommerce to be installed and active.', 'discord-notifications-for-woocommerce' ) . '</p></div>';
        });
        return;
    }

    // Initialize plugin classes
    new \Kamal\DiscordWooNotif\Admin\Settings();
    new \Kamal\DiscordWooNotif\Core\OrderHandler();
}
add_action( 'plugins_loaded', 'discord_woo_notif_init' );

// Activation hook
register_activation_hook( __FILE__, function() {
    // Activation tasks if needed
});

// Deactivation hook
register_deactivation_hook( __FILE__, function() {
    // Deactivation tasks if needed
});
<?php
/**
 * Plugin Name: Order notifications for WooCommerce
 * Plugin URI: https://github.com/ikamal7/discord-notifications-for-woocommerce
 * Description: Sends notifications to a Discord channel via webhook when a WooCommerce order is created or its status changes.
 * Version: 2.0.0
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
define( 'DISCORD_WOO_NOTIF_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'DISCORD_WOO_NOTIF_PRO_LINK', 'https://example.com/upgrade-to-pro' );
define( 'DISCORD_WOO_NOTIF_DOCS_LINK', 'https://example.com/docs' );

// Require the autoloader
require_once DISCORD_WOO_NOTIF_PLUGIN_DIR . 'autoload.php';

// Initialize the plugin
function discord_woo_notif_init() {
    // Initialize the main plugin class
    \Kamal\DiscordWooNotif\Plugin::get_instance()->init();
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
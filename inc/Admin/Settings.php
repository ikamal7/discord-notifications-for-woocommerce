<?php
namespace Kamal\DiscordWooNotif\Admin;

if ( ! defined( 'ABSPATH' ) ) exit;


class Settings {
    public function init() {
        add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
        // add_action( 'admin_init', array( $this, 'register_settings' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
        //add setings links to plugin row
        add_filter('plugin_action_links_' . DISCORD_WOO_NOTIF_PLUGIN_BASENAME, array( $this, 'add_settings_link' ) );
    }

    public function add_settings_page() {
        add_options_page(
            __( 'WooCommerce Order Notifications Settings', 'discord-notifications-for-woocommerce' ),
            __( 'WooCommerce Notifications', 'discord-notifications-for-woocommerce' ),
            'manage_options',
            'discord-woo-notif-settings',
            array( $this, 'render_settings_page' )
        );
    }

    public function add_settings_link( $links ) {
        $settings_link = '<a href="options-general.php?page=discord-woo-notif-settings">' . __( 'Settings', 'discord-notifications-for-woocommerce' ) . '</a>';
        array_unshift( $links, $settings_link );
        return $links;
    }


    public function render_settings_page() {
        echo '<div id="discord-woo-notif-app"></div>';
    }
    
    /**
     * Enqueue admin scripts and styles
     *
     * @param string $hook Current admin page hook
     */
    public function enqueue_admin_scripts( $hook ) {

        if ( 'settings_page_discord-woo-notif-settings' !== $hook ) {
            return;
        }

        $asset_file = include DISCORD_WOO_NOTIF_PLUGIN_DIR . 'assets/admin/admin.asset.php';

        // Enqueue the built admin.css file
        wp_enqueue_style(
            'discord-woo-notif-admin',
            DISCORD_WOO_NOTIF_PLUGIN_URL. 'assets/admin/admin.css',
            array(),
            DISCORD_WOO_NOTIF_VERSION,
        );

        
        // Enqueue the built admin.js file
        wp_enqueue_script(
            'discord-woo-notif-admin',
            DISCORD_WOO_NOTIF_PLUGIN_URL . 'assets/admin/admin.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );
        
        // Localize script with nonce for REST API
        wp_localize_script(
            'discord-woo-notif-admin',
            'discordWooNotifSettings',
            array(
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root'  => esc_url_raw( rest_url() ),
                'isPro' => DISCORD_WOO_NOTIF_PRO,
            )
        );
    }
    
    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        $controller = new \Kamal\DiscordWooNotif\API\SettingsController();
        $controller->register_routes();
    }

    public function render_enabled_field() {
        $enabled = get_option( 'discord_woo_notif_enabled', 0 );
        ?>
        <input type="checkbox" name="discord_woo_notif_enabled" value="1" <?php checked( 1, $enabled ); ?> />
        <?php
    }

    public function render_webhook_url_field() {
        $webhook_url = get_option( 'discord_woo_notif_webhook_url', '' );
        ?>
        <input type="url" name="discord_woo_notif_webhook_url" value="<?php echo esc_url( $webhook_url ); ?>" class="regular-text" />
        <?php
    }

    // Sanitization callback for checkbox
    public function sanitize_checkbox( $input ) {
        return ( isset( $input ) && $input == 1 ) ? 1 : 0;
    }
}
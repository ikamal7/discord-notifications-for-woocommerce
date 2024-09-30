<?php
namespace Kamal\DiscordWooNotif\Admin;

class Settings {
    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
        add_action( 'admin_init', array( $this, 'register_settings' ) );
    }

    public function add_settings_page() {
        add_options_page(
            __( 'Discord WooCommerce Notifications', 'discord-notifications-for-woocommerce' ),
            __( 'Discord WooCommerce Notifications', 'discord-notifications-for-woocommerce' ),
            'manage_options',
            'discord-woo-notif-settings',
            array( $this, 'render_settings_page' )
        );
    }

    public function register_settings() {
        register_setting( 'discord_woo_notif_settings', 'discord_woo_notif_enabled' );
        register_setting( 'discord_woo_notif_settings', 'discord_woo_notif_webhook_url' );

        add_settings_section(
            'discord_woo_notif_main_section',
            __( 'Main Settings', 'discord-notifications-for-woocommerce' ),
            null,
            'discord-woo-notif-settings'
        );

        add_settings_field(
            'discord_woo_notif_enabled',
            __( 'Enable Notifications', 'discord-notifications-for-woocommerce' ),
            array( $this, 'render_enabled_field' ),
            'discord-woo-notif-settings',
            'discord_woo_notif_main_section'
        );

        add_settings_field(
            'discord_woo_notif_webhook_url',
            __( 'Discord Webhook URL', 'discord-notifications-for-woocommerce' ),
            array( $this, 'render_webhook_url_field' ),
            'discord-woo-notif-settings',
            'discord_woo_notif_main_section'
        );
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields( 'discord_woo_notif_settings' );
                do_settings_sections( 'discord-woo-notif-settings' );
                submit_button();
                ?>
            </form>
        </div>
        <?php
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
}
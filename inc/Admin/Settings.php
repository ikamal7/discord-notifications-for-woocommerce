<?php
namespace Kamal\DiscordWooNotif\Admin;

class Settings {
    private $order_statuses;

    public function __construct() {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
        $this->order_statuses = wc_get_order_statuses();
    }

    public function add_settings_page() {
        add_options_page(
            __('Discord WooCommerce Notifications', 'discord-woo-notif'),
            __('Discord WooCommerce Notifications', 'discord-woo-notif'),
            'manage_options',
            'discord-woo-notif-settings',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('discord_woo_notif_settings', 'discord_woo_notif_enabled');
        register_setting('discord_woo_notif_settings', 'discord_woo_notif_webhook_url');

        add_settings_section(
            'discord_woo_notif_main_section',
            __('Main Settings', 'discord-woo-notif'),
            null,
            'discord-woo-notif-settings'
        );

        add_settings_field(
            'discord_woo_notif_enabled',
            __('Enable Notifications', 'discord-woo-notif'),
            array($this, 'render_enabled_field'),
            'discord-woo-notif-settings',
            'discord_woo_notif_main_section'
        );

        add_settings_field(
            'discord_woo_notif_webhook_url',
            __('Default Discord Webhook URL', 'discord-woo-notif'),
            array($this, 'render_webhook_url_field'),
            'discord-woo-notif-settings',
            'discord_woo_notif_main_section'
        );

        // Add settings for each order status
        foreach ($this->order_statuses as $status => $label) {
            $status_key = str_replace('wc-', '', $status);
            
            register_setting('discord_woo_notif_settings', "discord_woo_notif_{$status_key}_enabled");
            register_setting('discord_woo_notif_settings', "discord_woo_notif_{$status_key}_webhook_url");
            register_setting('discord_woo_notif_settings', "discord_woo_notif_{$status_key}_color");

            add_settings_section(
                "discord_woo_notif_{$status_key}_section",
                sprintf(__('%s Notification Settings', 'discord-woo-notif'), $label),
                null,
                'discord-woo-notif-settings'
            );

            add_settings_field(
                "discord_woo_notif_{$status_key}_enabled",
                __('Enable Notifications', 'discord-woo-notif'),
                array($this, 'render_status_enabled_field'),
                'discord-woo-notif-settings',
                "discord_woo_notif_{$status_key}_section",
                array('status' => $status_key)
            );

            add_settings_field(
                "discord_woo_notif_{$status_key}_webhook_url",
                __('Discord Webhook URL', 'discord-woo-notif'),
                array($this, 'render_status_webhook_url_field'),
                'discord-woo-notif-settings',
                "discord_woo_notif_{$status_key}_section",
                array('status' => $status_key)
            );

            add_settings_field(
                "discord_woo_notif_{$status_key}_color",
                __('Message Color', 'discord-woo-notif'),
                array($this, 'render_status_color_field'),
                'discord-woo-notif-settings',
                "discord_woo_notif_{$status_key}_section",
                array('status' => $status_key)
            );
        }
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('discord_woo_notif_settings');
                do_settings_sections('discord-woo-notif-settings');
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    public function render_enabled_field() {
        $enabled = get_option('discord_woo_notif_enabled', 0);
        ?>
        <input type="checkbox" name="discord_woo_notif_enabled" value="1" <?php checked(1, $enabled); ?> />
        <?php
    }

    public function render_webhook_url_field() {
        $webhook_url = get_option('discord_woo_notif_webhook_url', '');
        ?>
        <input type="url" name="discord_woo_notif_webhook_url" value="<?php echo esc_url($webhook_url); ?>" class="regular-text" />
        <?php
    }

    public function render_status_enabled_field($args) {
        $status = $args['status'];
        $enabled = get_option("discord_woo_notif_{$status}_enabled", 0);
        ?>
        <input type="checkbox" name="discord_woo_notif_<?php echo esc_attr($status); ?>_enabled" value="1" <?php checked(1, $enabled); ?> />
        <?php
    }

    public function render_status_webhook_url_field($args) {
        $status = $args['status'];
        $webhook_url = get_option("discord_woo_notif_{$status}_webhook_url", '');
        ?>
        <input type="url" name="discord_woo_notif_<?php echo esc_attr($status); ?>_webhook_url" value="<?php echo esc_url($webhook_url); ?>" class="regular-text" />
        <?php
    }

    public function render_status_color_field($args) {
        $status = $args['status'];
        $color = get_option("discord_woo_notif_{$status}_color", '#00ff00');
        ?>
        <input type="color" name="discord_woo_notif_<?php echo esc_attr($status); ?>_color" value="<?php echo esc_attr($color); ?>" />
        <?php
    }
}
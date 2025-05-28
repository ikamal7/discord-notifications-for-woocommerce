<?php
namespace Kamal\DiscordWooNotif\API;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * REST API Controller for plugin settings
 */
class SettingsController {
    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route(
            'discord-woo-notif/v1',
            '/settings',
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_settings' ],
                    'permission_callback' => [ $this, 'permissions_check' ],
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_settings' ],
                    'permission_callback' => [ $this, 'permissions_check' ],
                ],
            ]
        );

        register_rest_route(
            'discord-woo-notif/v1',
            '/templates',
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_templates' ],
                    'permission_callback' => [ $this, 'permissions_check' ],
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_templates' ],
                    'permission_callback' => [ $this, 'permissions_check' ],
                ],
            ]
        );
    }

    /**
     * Check if user has permission to access the endpoint
     *
     * @return bool
     */
    public function permissions_check() {
        return current_user_can( 'manage_options' );
    }

    /**
     * Get plugin settings
     *
     * @return \WP_REST_Response
     */
    public function get_settings() {
        $settings = [
            'discord' => [
                'webhook_url' => get_option( 'discord_woo_notif_webhook_url', '' ),
                'enabled'     => (bool) get_option( 'discord_woo_notif_enabled', false ),
            ],
            'telegram' => [
                'bot_token' => get_option( 'discord_woo_notif_telegram_bot_token', '' ),
                'chat_id'   => get_option( 'discord_woo_notif_telegram_chat_id', '' ),
                'enabled'   => (bool) get_option( 'discord_woo_notif_telegram_enabled', false ),
            ],
            'slack' => [
                'webhook_url' => get_option( 'discord_woo_notif_slack_webhook_url', '' ),
                'enabled'     => (bool) get_option( 'discord_woo_notif_slack_enabled', false ),
            ],
            'email' => [
                'enabled'             => (bool) get_option( 'discord_woo_notif_email_enabled', false ),
                'provider'            => get_option( 'discord_woo_notif_email_provider', 'smtp' ),
                // SMTP settings
                'smtp_host'           => get_option( 'discord_woo_notif_email_smtp_host', '' ),
                'smtp_port'           => get_option( 'discord_woo_notif_email_smtp_port', '587' ),
                'smtp_username'       => get_option( 'discord_woo_notif_email_smtp_username', '' ),
                'smtp_password'       => get_option( 'discord_woo_notif_email_smtp_password', '' ),
                'smtp_encryption'     => get_option( 'discord_woo_notif_email_smtp_encryption', 'tls' ),
                // SendGrid settings
                'sendgrid_api_key'    => get_option( 'discord_woo_notif_email_sendgrid_api_key', '' ),
                // Mailgun settings
                'mailgun_api_key'     => get_option( 'discord_woo_notif_email_mailgun_api_key', '' ),
                'mailgun_domain'      => get_option( 'discord_woo_notif_email_mailgun_domain', '' ),
                'mailgun_region'      => get_option( 'discord_woo_notif_email_mailgun_region', 'us' ),
                // Sendinblue settings
                'sendinblue_api_key'  => get_option( 'discord_woo_notif_email_sendinblue_api_key', '' ),
                // Mailjet settings
                'mailjet_api_key'     => get_option( 'discord_woo_notif_email_mailjet_api_key', '' ),
                'mailjet_secret_key'  => get_option( 'discord_woo_notif_email_mailjet_secret_key', '' ),
                // Common email settings
                'from_name'           => get_option( 'discord_woo_notif_email_from_name', '' ),
                'from_email'          => get_option( 'discord_woo_notif_email_from_email', '' ),
                'recipients'          => get_option( 'discord_woo_notif_email_recipients', '' ),
                'subject_template'    => get_option( 'discord_woo_notif_email_subject_template', 'New Order #{order_id} - {status}' ),
            ],
            'sms' => [
                'enabled'      => (bool) get_option( 'discord_woo_notif_sms_enabled', false ),
                'provider'     => get_option( 'discord_woo_notif_sms_provider', 'twilio' ),
                'api_key'      => get_option( 'discord_woo_notif_sms_api_key', '' ),
                'api_secret'   => get_option( 'discord_woo_notif_sms_api_secret', '' ),
                'from_number'  => get_option( 'discord_woo_notif_sms_from_number', '' ),
                'to_numbers'   => get_option( 'discord_woo_notif_sms_to_numbers', '' ),
            ],
        ];

        return rest_ensure_response( $settings );
    }

    /**
     * Update plugin settings
     *
     * @param \WP_REST_Request $request Request object
     * 
     * @return \WP_REST_Response
     */
    public function update_settings( $request ) {
        $params = $request->get_params();
        
        // Discord settings
        if ( isset( $params['discord'] ) ) {
            if ( isset( $params['discord']['webhook_url'] ) ) {
                update_option( 'discord_woo_notif_webhook_url', esc_url_raw( $params['discord']['webhook_url'] ) );
            }
            
            if ( isset( $params['discord']['enabled'] ) ) {
                update_option( 'discord_woo_notif_enabled', (bool) $params['discord']['enabled'] ? 1 : 0 );
            }
        }
        
        // Telegram settings
        if ( isset( $params['telegram'] ) ) {
            if ( isset( $params['telegram']['enabled'] ) ) {
                update_option( 'discord_woo_notif_telegram_enabled', (bool) $params['telegram']['enabled'] ? 1 : 0 );
            }
            if ( isset( $params['telegram']['bot_token'] ) ) {
                update_option( 'discord_woo_notif_telegram_bot_token', sanitize_text_field( $params['telegram']['bot_token'] ) );
            }
            
            if ( isset( $params['telegram']['chat_id'] ) ) {
                update_option( 'discord_woo_notif_telegram_chat_id', sanitize_text_field( $params['telegram']['chat_id'] ) );
            }
        }

        // Slack settings
        if ( isset( $params['slack'] ) ) {
            if ( isset( $params['slack']['enabled'] ) ) {
                update_option( 'discord_woo_notif_slack_enabled', (bool) $params['slack']['enabled'] ? 1 : 0 );
            }
            if ( isset( $params['slack']['webhook_url'] ) ) {
                update_option( 'discord_woo_notif_slack_webhook_url', esc_url_raw( $params['slack']['webhook_url'] ) );
            }
        }

        // Email settings
        if ( isset( $params['email'] ) ) {
            if ( isset( $params['email']['enabled'] ) ) {
                update_option( 'discord_woo_notif_email_enabled', (bool) $params['email']['enabled'] ? 1 : 0 );
            }
            if ( isset( $params['email']['provider'] ) ) {
                update_option( 'discord_woo_notif_email_provider', sanitize_text_field( $params['email']['provider'] ) );
            }
            
            // SMTP settings
            if ( isset( $params['email']['smtp_host'] ) ) {
                update_option( 'discord_woo_notif_email_smtp_host', sanitize_text_field( $params['email']['smtp_host'] ) );
            }
            if ( isset( $params['email']['smtp_port'] ) ) {
                update_option( 'discord_woo_notif_email_smtp_port', sanitize_text_field( $params['email']['smtp_port'] ) );
            }
            if ( isset( $params['email']['smtp_username'] ) ) {
                update_option( 'discord_woo_notif_email_smtp_username', sanitize_text_field( $params['email']['smtp_username'] ) );
            }
            if ( isset( $params['email']['smtp_password'] ) ) {
                update_option( 'discord_woo_notif_email_smtp_password', sanitize_text_field( $params['email']['smtp_password'] ) );
            }
            if ( isset( $params['email']['smtp_encryption'] ) ) {
                update_option( 'discord_woo_notif_email_smtp_encryption', sanitize_text_field( $params['email']['smtp_encryption'] ) );
            }
            
            // SendGrid settings
            if ( isset( $params['email']['sendgrid_api_key'] ) ) {
                update_option( 'discord_woo_notif_email_sendgrid_api_key', sanitize_text_field( $params['email']['sendgrid_api_key'] ) );
            }
            
            // Mailgun settings
            if ( isset( $params['email']['mailgun_api_key'] ) ) {
                update_option( 'discord_woo_notif_email_mailgun_api_key', sanitize_text_field( $params['email']['mailgun_api_key'] ) );
            }
            if ( isset( $params['email']['mailgun_domain'] ) ) {
                update_option( 'discord_woo_notif_email_mailgun_domain', sanitize_text_field( $params['email']['mailgun_domain'] ) );
            }
            if ( isset( $params['email']['mailgun_region'] ) ) {
                update_option( 'discord_woo_notif_email_mailgun_region', sanitize_text_field( $params['email']['mailgun_region'] ) );
            }
            
            // Sendinblue settings
            if ( isset( $params['email']['sendinblue_api_key'] ) ) {
                update_option( 'discord_woo_notif_email_sendinblue_api_key', sanitize_text_field( $params['email']['sendinblue_api_key'] ) );
            }
            
            // Mailjet settings
            if ( isset( $params['email']['mailjet_api_key'] ) ) {
                update_option( 'discord_woo_notif_email_mailjet_api_key', sanitize_text_field( $params['email']['mailjet_api_key'] ) );
            }
            if ( isset( $params['email']['mailjet_secret_key'] ) ) {
                update_option( 'discord_woo_notif_email_mailjet_secret_key', sanitize_text_field( $params['email']['mailjet_secret_key'] ) );
            }
            
            // Common email settings
            if ( isset( $params['email']['from_name'] ) ) {
                update_option( 'discord_woo_notif_email_from_name', sanitize_text_field( $params['email']['from_name'] ) );
            }
            if ( isset( $params['email']['from_email'] ) ) {
                update_option( 'discord_woo_notif_email_from_email', sanitize_email( $params['email']['from_email'] ) );
            }
            if ( isset( $params['email']['recipients'] ) ) {
                update_option( 'discord_woo_notif_email_recipients', sanitize_text_field( $params['email']['recipients'] ) );
            }
            if ( isset( $params['email']['subject_template'] ) ) {
                update_option( 'discord_woo_notif_email_subject_template', sanitize_text_field( $params['email']['subject_template'] ) );
            }
        }

        // SMS settings
        if ( isset( $params['sms'] ) ) {
            if ( isset( $params['sms']['enabled'] ) ) {
                update_option( 'discord_woo_notif_sms_enabled', (bool) $params['sms']['enabled'] ? 1 : 0 );
            }
            if ( isset( $params['sms']['provider'] ) ) {
                update_option( 'discord_woo_notif_sms_provider', sanitize_text_field( $params['sms']['provider'] ) );
            }
            if ( isset( $params['sms']['api_key'] ) ) {
                update_option( 'discord_woo_notif_sms_api_key', sanitize_text_field( $params['sms']['api_key'] ) );
            }
            if ( isset( $params['sms']['api_secret'] ) ) {
                update_option( 'discord_woo_notif_sms_api_secret', sanitize_text_field( $params['sms']['api_secret'] ) );
            }
            if ( isset( $params['sms']['from_number'] ) ) {
                update_option( 'discord_woo_notif_sms_from_number', sanitize_text_field( $params['sms']['from_number'] ) );
            }
            if ( isset( $params['sms']['to_numbers'] ) ) {
                update_option( 'discord_woo_notif_sms_to_numbers', sanitize_text_field( $params['sms']['to_numbers'] ) );
            }
        }

        return $this->get_settings();
    }

    /**
     * Get notification templates
     *
     * @return \WP_REST_Response
     */
    public function get_templates() {
        $template = get_option( 'discord_woo_notif_custom_template', '' );
        $sms_template = get_option( 'discord_woo_notif_custom_sms_template', '' );
        
        return rest_ensure_response( [
            'template' => $template,
            'sms_template' => $sms_template,
        ] );
    }

    /**
     * Update notification templates
     *
     * @param \WP_REST_Request $request Request object
     * 
     * @return \WP_REST_Response
     */
    public function update_templates( $request ) {
        $params = $request->get_params();
        
        if ( isset( $params['template'] ) ) {
            update_option( 'discord_woo_notif_custom_template', wp_kses_post( $params['template'] ) );
        }

        if ( isset( $params['sms_template'] ) ) {
            update_option( 'discord_woo_notif_custom_sms_template', sanitize_textarea_field( $params['sms_template'] ) );
        }

        return $this->get_templates();
    }
}
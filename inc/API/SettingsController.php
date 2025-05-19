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
                update_option( 'discord_woo_notif_telegram_enabled', (bool) $params['telegram']['enabled']? 1 : 0 );
            }
            if ( isset( $params['telegram']['bot_token'] ) ) {
                update_option( 'discord_woo_notif_telegram_bot_token', sanitize_text_field( $params['telegram']['bot_token'] ) );
            }
            
            if ( isset( $params['telegram']['chat_id'] ) ) {
                update_option( 'discord_woo_notif_telegram_chat_id', sanitize_text_field( $params['telegram']['chat_id'] ) );
            }
        }

        return $this->get_settings();
    }
}
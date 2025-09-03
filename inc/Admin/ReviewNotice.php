<?php
namespace Kamal\DiscordWooNotif\Admin;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Review Notice class
 * 
 * Handles displaying review request notice after 7 days of plugin usage
 */
class ReviewNotice {
    
    /**
     * Number of days to wait before showing the notice
     */
    const NOTICE_DAYS = 7;
    
    /**
     * Option name for storing first activation time
     */
    const FIRST_ACTIVATION_OPTION = 'discord_woo_notif_first_activation';
    
    /**
     * Option name for storing notice dismissal
     */
    const NOTICE_DISMISSED_OPTION = 'discord_woo_notif_review_notice_dismissed';
    
    /**
     * Initialize the review notice
     */
    public function init() {
        // Set first activation time if not already set
        add_action( 'admin_init', array( $this, 'set_first_activation_time' ) );
        
        // Hide all notices on plugin admin page
        add_action( 'admin_head', array( $this, 'hide_notices_on_plugin_page' ) );
        
        // Show notice if conditions are met - check admin page in display_notice instead
        if ( $this->should_show_notice() ) {
            add_action( 'admin_notices', array( $this, 'display_notice' ) );
            add_action( 'wp_ajax_discord_woo_notif_dismiss_review_notice', array( $this, 'dismiss_notice' ) );
            add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        }
        
        // Add reset functionality for testing (only for admins and when WP_DEBUG is true)
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG && current_user_can( 'manage_options' ) ) {
            add_action( 'wp_ajax_discord_woo_notif_reset_review_notice', array( $this, 'reset_notice_for_testing' ) );
        }
    }
    
    /**
     * Set first activation time if not already set
     */
    public function set_first_activation_time() {
        if ( ! get_option( self::FIRST_ACTIVATION_OPTION ) ) {
            update_option( self::FIRST_ACTIVATION_OPTION, time() );
        }
    }
    
    /**
     * Hide all admin notices on plugin admin page
     */
    public function hide_notices_on_plugin_page() {
        // Only hide notices on our plugin page
        if ( ! $this->is_plugin_admin_page() ) {
            return;
        }
        
        // Remove all admin notices
        remove_all_actions( 'admin_notices' );
        remove_all_actions( 'all_admin_notices' );
        
        // Also hide notices with CSS as a fallback
        echo '<style>
            .notice, .error, .updated, .update-nag, 
            .admin-notice, .plugin-update-tr,
            div[class*="notice"], div[class*="error"], 
            div[class*="updated"], div[class*="warning"] {
                display: none !important;
            }
            
            /* Keep only our plugin content visible */
            #discord-woo-notif-app {
                display: block !important;
            }
            
            /* Hide WordPress admin notices container */
            .wrap > .notice,
            .wrap > .error,
            .wrap > .updated,
            .wrap > div[class*="notice"],
            .wrap > div[class*="error"],
            .wrap > div[class*="updated"] {
                display: none !important;
            }
        </style>';
    }
    
    /**
     * Check if notice should be shown
     * 
     * @return bool
     */
    private function should_show_notice() {
        // Don't show if user can't manage options
        if ( ! current_user_can( 'manage_options' ) ) {
            return false;
        }
        
        // Don't show if already dismissed
        if ( get_option( self::NOTICE_DISMISSED_OPTION ) ) {
            return false;
        }
        
        // Don't show if not enough time has passed
        $first_activation = get_option( self::FIRST_ACTIVATION_OPTION );
        if ( ! $first_activation ) {
            return false;
        }
        
        $days_since_activation = ( time() - $first_activation ) / DAY_IN_SECONDS;
        
        return $days_since_activation >= self::NOTICE_DAYS;
    }
    
    /**
     * Check if current page is the plugin's admin page
     * 
     * @return bool
     */
    private function is_plugin_admin_page() {
        // Check by page parameter first (most reliable)
        if ( isset( $_GET['page'] ) && $_GET['page'] === 'discord-woo-notif-settings' ) {
            return true;
        }
        
        // Check by screen ID if get_current_screen is available
        if ( function_exists( 'get_current_screen' ) ) {
            $current_screen = get_current_screen();
            if ( $current_screen && $current_screen->id === 'settings_page_discord-woo-notif-settings' ) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Display the review notice
     */
    public function display_notice() {
        // Only show on admin pages, not on frontend
        if ( ! is_admin() ) {
            return;
        }
        
        // Don't show on plugin's own admin page
        // if ( $this->is_plugin_admin_page() ) {
        //     return;
        // }
        
        $review_url = 'https://wordpress.org/support/plugin/discord-notifications-for-woocommerce/reviews/#new-post';
        $plugin_name = __( 'Order notifications for WooCommerce', 'discord-notifications-for-woocommerce' );
        
        ?>
        <div id="discord-woo-notif-review-notice" class="notice notice-info is-dismissible">
            <div style="display: flex; align-items: center; padding: 10px 0;">
                <div style="margin-right: 15px; font-size: 24px;">⭐</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 5px 0; font-size: 16px;">
                        <?php echo esc_html( sprintf( __( 'Enjoying %s?', 'discord-notifications-for-woocommerce' ), $plugin_name ) ); ?>
                    </h3>
                    <p style="margin: 0; font-size: 14px;">
                        <?php 
                        echo wp_kses_post( sprintf( 
                            __( 'We hope you\'re enjoying using %1$s! If you find it helpful, would you mind taking a moment to %2$swrite a review%3$s? Your feedback helps us improve and helps other users discover our plugin. Thank you! 🙏', 'discord-notifications-for-woocommerce' ),
                            '<strong>' . $plugin_name . '</strong>',
                            '<a href="' . esc_url( $review_url ) . '" target="_blank" style="text-decoration: none; color: #0073aa; font-weight: 600;">',
                            '</a>'
                        ) );
                        ?>
                    </p>
                    <div style="margin-top: 10px;">
                        <a href="<?php echo esc_url( $review_url ); ?>" target="_blank" class="button button-primary" style="margin-right: 10px;">
                            <?php esc_html_e( '⭐ Write a Review', 'discord-notifications-for-woocommerce' ); ?>
                        </a>
                        <button type="button" class="button button-secondary discord-woo-notif-dismiss-notice">
                            <?php esc_html_e( 'Maybe Later', 'discord-notifications-for-woocommerce' ); ?>
                        </button>
                        <?php if ( defined( 'WP_DEBUG' ) && WP_DEBUG ): ?>
                        <button type="button" class="button discord-woo-notif-reset-notice" style="margin-left: 10px;">
                            <?php esc_html_e( 'Reset Notice (Debug)', 'discord-notifications-for-woocommerce' ); ?>
                        </button>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Enqueue scripts for the notice
     */
    public function enqueue_scripts() {
        wp_enqueue_script( 'jquery' );
        
        // Add inline script for handling notice dismissal
        wp_add_inline_script( 'jquery', '
            jQuery(document).ready(function($) {
                // Handle dismiss button click
                $(document).on("click", ".discord-woo-notif-dismiss-notice", function(e) {
                    e.preventDefault();
                    
                    $.ajax({
                        url: ajaxurl,
                        type: "POST",
                        data: {
                            action: "discord_woo_notif_dismiss_review_notice",
                            nonce: "' . wp_create_nonce( 'discord_woo_notif_dismiss_review_notice' ) . '"
                        },
                        success: function() {
                            $("#discord-woo-notif-review-notice").fadeOut();
                        }
                    });
                });
                
                // Handle default WordPress dismiss button
                $(document).on("click", "#discord-woo-notif-review-notice .notice-dismiss", function() {
                    $.ajax({
                        url: ajaxurl,
                        type: "POST",
                        data: {
                            action: "discord_woo_notif_dismiss_review_notice",
                            nonce: "' . wp_create_nonce( 'discord_woo_notif_dismiss_review_notice' ) . '"
                        }
                    });
                });
                
                // Handle reset button (debug only)
                $(document).on("click", ".discord-woo-notif-reset-notice", function(e) {
                    e.preventDefault();
                    
                    $.ajax({
                        url: ajaxurl,
                        type: "POST",
                        data: {
                            action: "discord_woo_notif_reset_review_notice",
                            nonce: "' . wp_create_nonce( 'discord_woo_notif_reset_review_notice' ) . '"
                        },
                        success: function() {
                            alert("Notice reset! Refresh the page to see it again.");
                            location.reload();
                        }
                    });
                });
            });
        ' );
    }
    
    /**
     * Handle AJAX request to dismiss notice
     */
    public function dismiss_notice() {
        // Verify nonce
        if ( ! wp_verify_nonce( $_POST['nonce'], 'discord_woo_notif_dismiss_review_notice' ) ) {
            wp_die( 'Security check failed' );
        }
        
        // Check user capability
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( 'Insufficient permissions' );
        }
        
        // Mark notice as dismissed
        update_option( self::NOTICE_DISMISSED_OPTION, true );
        
        wp_die( 'success' );
    }
    
    /**
     * Reset notice for testing purposes (only available in debug mode)
     */
    public function reset_notice_for_testing() {
        // Only allow in debug mode
        if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
            wp_die( 'Not available' );
        }
        
        // Verify nonce
        if ( ! wp_verify_nonce( $_POST['nonce'], 'discord_woo_notif_reset_review_notice' ) ) {
            wp_die( 'Security check failed' );
        }
        
        // Check user capability
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( 'Insufficient permissions' );
        }
        
        // Reset the notice
        delete_option( self::NOTICE_DISMISSED_OPTION );
        update_option( self::FIRST_ACTIVATION_OPTION, time() - ( self::NOTICE_DAYS * DAY_IN_SECONDS ) - 1 );
        
        wp_die( 'success' );
    }
} 
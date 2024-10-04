<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

spl_autoload_register( function ( $class ) {
    // Project-specific namespace 
    $namespace = 'Kamal\\DiscordWooNotif\\';

    // Base directory for the namespace 
    $base_dir = DISCORD_WOO_NOTIF_PLUGIN_DIR . 'inc/';

    // Check if the class uses the namespace 
    $len = strlen( $namespace );
    if ( strncmp( $namespace, $class, $len ) !== 0 ) {
        return;
    }

    // Get the relative class name
    $relative_class = substr( $class, $len );

    // Replace the namespace  with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

    // If the file exists, require it
    if ( file_exists( $file ) ) {
        require $file;
    }
} );
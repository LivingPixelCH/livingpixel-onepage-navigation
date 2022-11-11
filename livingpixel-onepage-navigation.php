<?php
/**
 * Plugin Name:       LivingPixel - Onepage Navigation
 * Description:       Display a navidation for group blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            livingpixel.ch
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       livingpixel-onepage-navigation
 *
 * @package           livingpixel-onepage-navigation
 */

function livingpixel_onepage_navigation_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'livingpixel_onepage_navigation_block_init' );

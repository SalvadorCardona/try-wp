<?php
add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');

    add_theme_support('title-tag');

    register_nav_menus([
        'navigation' => __('Navigation', 'wordplate'),
    ]);
});

//add_action('wp_enqueue_scripts', function () {
//    wp_enqueue_script('angular_runtime', 'http://localhost:4200/runtime.js');
//    wp_enqueue_script('angular_polyfill', 'http://localhost:4200/polyfills.js');
//    wp_enqueue_script('angular_style', 'http://localhost:4200/styles.js');
//    wp_enqueue_script('angular_vendor', 'http://localhost:4200/vendor.js');
//    wp_enqueue_script('angular_main', 'http://localhost:4200/main.js');
//}, 101);

add_filter('jpeg_quality', function () {
    return 100;
}, 10, 2);

function get_my_menu() {
    // Replace your menu name, slug or ID carefully
    $menu = wp_get_nav_menu_items('Menu 1');
    return $menu;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', 'menu', array(
        'methods' => 'GET',
        'callback' => 'get_my_menu',
    ) );
} );
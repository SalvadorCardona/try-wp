<?php

add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');

    add_theme_support('title-tag');

    register_nav_menus([
        'navigation' => __('Navigation', 'wordplate'),
    ]);


});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('angular_runtime', 'http://localhost:4200/runtime.js');
    wp_enqueue_script('angular_polyfill', 'http://localhost:4200/polyfills.js');
    wp_enqueue_script('angular_style', 'http://localhost:4200/styles.js');
    wp_enqueue_script('angular_vendor', 'http://localhost:4200/vendor.js');
    wp_enqueue_script('angular_main', 'http://localhost:4200/main.js');
}, 101);

add_filter('jpeg_quality', function () {
    return 100;
}, 10, 2);



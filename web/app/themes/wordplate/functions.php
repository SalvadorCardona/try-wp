<?php

add_action('after_setup_theme', function () {
    add_theme_support('post-thumbnails');

    add_theme_support('title-tag');

    register_nav_menus([
        'navigation' => __('Navigation', 'wordplate'),
    ]);
});

add_filter('jpeg_quality', function () {
    return 100;
}, 10, 2);


add_action('rest_api_init', function () {
    global $l10n;
    register_rest_route('wp/v2', 'menu', array(
        'methods' => 'GET',
        'callback' => fn() => wp_get_nav_menu_items('Menu 1'),
        'body' => array(),
        'blocking' => true
    ));

    register_rest_route('wp/v2', 'translation', array(
        'methods' => 'GET',
        'callback' => fn() => json_encode($l10n['entries']),
        'body' => array(),
        'blocking' => true
    ));

    register_rest_route('wp/v2', 'post/(?P<name>[^/]+)/slug', array(
        'methods' => 'GET',
        'callback' => function ($param) {
            global $wpdb;
            $post = $wpdb->get_var($wpdb->prepare("
                SELECT ID FROM $wpdb->posts WHERE post_name = %s", $param->get_param('name')));
            if ($post) {
                return get_post($post, OBJECT);
            }

            return null;
        },
        'body' => array(),
        'blocking' => true
    ));

    register_rest_route('wp/v2', 'post/(?P<id>\d+)/all', array(
        'methods' => 'GET',
        'callback' => function ($param) {
            global $wpdb;
            $post = $wpdb->get_var($wpdb->prepare("
                SELECT ID FROM $wpdb->posts WHERE id = %d", $param->get_param('id')));
            if ($post) {
                return get_post($post, OBJECT);
            }

            return null;
        },
        'body' => array(),
        'blocking' => true
    ));
});

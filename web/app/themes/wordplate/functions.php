<?php

use App\Kernel;
use App\Service\ApiLoaderService;

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

    $app = Kernel::getAPP();
    $apiLoaderService = $app->getContainer()->get(ApiLoaderService::class);
    $apiLoaderService->registerApis();

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

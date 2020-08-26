<?php

declare(strict_types=1);

namespace App\Action;

class WordpressFeatureAction implements ActionInterface
{

    public function __invoke(): void
    {
            add_theme_support('post-thumbnails');

            add_theme_support('title-tag');

            register_nav_menus([
                'navigation' => __('Navigation', 'wordplate'),
            ]);

        add_filter('jpeg_quality', function () {
            return 100;
        }, 10, 2);
    }
}

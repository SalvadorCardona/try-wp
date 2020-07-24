<?php

declare(strict_types=1);

use App\Action\ApiLoaderAction;
use App\Action\WordpressFeatureAction;

return [
    'rest_api_init' => ApiLoaderAction::class,
    'after_setup_theme' => WordpressFeatureAction::class
];

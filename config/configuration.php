<?php

declare(strict_types=1);

use App\Action\ApiLoaderAction;
use App\Action\WordpressFeatureAction;
use App\Api\MenuApi;
use App\Api\PostByIdApi;
use App\Api\PostSlugApi;
use App\Api\RoutingApi;
use App\Api\TranslationApi;
use App\Model\Config;
use App\Routing\Contexts\PostContext;
use App\Routing\Contexts\ProductContext;
use App\Routing\Contexts\SearchContext;
use App\Routing\Contexts\TaxomanyContext;

return [
    Config::API => [
        PostSlugApi::class,
        MenuApi::class,
        PostByIdApi::class,
        PostSlugApi::class,
        TranslationApi::class,
        RoutingApi::class
    ],
    Config::ACTION => [
        'rest_api_init' => ApiLoaderAction::class,
        'after_setup_theme' => WordpressFeatureAction::class
    ],
    Config::ROUTING_CONTEXT => [
        PostContext::class,
        ProductContext::class,
        SearchContext::class,
        TaxomanyContext::class
    ]
];

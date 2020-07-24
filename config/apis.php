<?php

declare(strict_types=1);

use App\Api\MenuApi;
use App\Api\PostByIdApi;
use App\Api\PostSlugApi;
use App\Api\TranslationApi;

return [
    PostSlugApi::class,
    MenuApi::class,
    PostByIdApi::class,
    PostSlugApi::class,
    TranslationApi::class
];

<?php
declare(strict_types=1);

namespace App\Service;

use App\Api\AbstractApi;
use App\Api\ApiInterface;
use App\Api\MenuApi;
use App\Api\PostByIdApi;
use App\Api\PostSlugApi;
use App\Api\TranslationApi;
use DI\Container;
use Exception;

class ApiLoaderService
{

    private array $apis;
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;

        /**
         * TODO: Replace the content of this array by a configuration
         */
        $this->apis = [
            PostSlugApi::class,
            MenuApi::class,
            PostByIdApi::class,
            PostSlugApi::class,
            TranslationApi::class
        ];
    }

    public function registerApis(): void
    {
        foreach ($this->apis as $apiClass) {
            try {
                /** @var ApiInterface $api */
                $api = $this->container->get($apiClass);
                register_rest_route($api->getNamespace(), $api->getEndPoint(), array(
                    'methods' => $api->getMethod(),
                    'callback' => [$api, 'init'],
                    'body' => $api->getBody(),
                    'blocking' => $api->isBlocking()
                ));
            } catch (Exception $e) {
                 continue;
            }
        }
    }
}

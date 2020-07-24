<?php

declare(strict_types=1);

namespace App\Action;

use App\Api\ApiInterface;
use App\Model\Config;
use DI\Container;
use Exception;

class ApiLoaderAction implements ActionInterface
{

    private array $apis;
    private Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->apis = $container->get(Config::API);
    }

    public function action(): void
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

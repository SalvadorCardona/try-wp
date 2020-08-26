<?php

declare(strict_types=1);

namespace App\Action;

use App\Api\ApiInterface;
use Exception;
use Psr\Container\ContainerInterface;

class ApiLoaderAction implements ActionInterface
{

    private array $apis;
    private ContainerInterface $container;

    public function __construct(ContainerInterface $container, array $apis)
    {
        $this->container = $container;
        $this->apis = $apis;
    }

    public function __invoke(): void
    {
        foreach ($this->apis as $apiClass) {
            try {
                /** @var ApiInterface $api */
                $api = $this->container->get($apiClass);
                $this->addRouting($api);
            } catch (Exception $e) {
                continue;
            }
        }
    }

    private function addRouting(ApiInterface $api)
    {
        register_rest_route($api->getNamespace(), $api->getEndPoint(), [
            'methods' => $api->getMethod(),
            'callback' => [$api, 'init'],
            'body' => $api->getBody(),
            'blocking' => $api->isBlocking()
        ]);
    }
}

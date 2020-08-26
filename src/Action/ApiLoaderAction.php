<?php

declare(strict_types=1);

namespace App\Action;

use App\Api\ApiInterface;
use Exception;

class ApiLoaderAction implements ActionInterface
{
    /**
     * @var ApiInterface[]
     */
    private array $apis;

    public function addApi(ApiInterface $api): void
    {
        $this->apis []= $api;
    }

    public function __invoke(): void
    {
        foreach ($this->apis as $api) {
            try {
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

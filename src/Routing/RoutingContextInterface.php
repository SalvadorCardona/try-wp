<?php
declare(strict_types=1);

namespace App\Routing;

interface RoutingContextInterface
{
    /**
     * @param string $route
     * @return Routing
     */
    public function getRoutingByRoute(string $route): Routing;

    public function getType(): string;
}
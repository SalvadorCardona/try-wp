<?php

declare(strict_types=1);

namespace App\Routing;

class CompositeRoutingContext
{
    private array $routingContexts;

    public function addRoutingContext(RoutingContextInterface $routingContext): void
    {
        $this->routingContexts[] = $routingContext;
    }

    public function getRouting(string $route): Routing
    {
        foreach ($this->routingContexts as $routingContext) {
            try {
                return $routingContext->getRoutingByRoute($route);
            } catch (RoutingContextNotFoundException $e) {
                continue;
            }
        }

        throw new RoutingContextNotFoundException;
    }
}

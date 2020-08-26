<?php

declare(strict_types=1);

namespace App\Routing;

use App\Routing\Contexts\PostContext;
use App\Routing\Contexts\ProductContext;
use App\Routing\Contexts\SearchContext;
use App\Routing\Contexts\TaxomanyContext;

class CompositeRoutingContext
{
    private array $routingContexts;

    public function __construct(
        PostContext $postContext,
        ProductContext $productContext,
        SearchContext $searchContext,
        TaxomanyContext $taxomanyContext
    ) {
        $contexts = [
            $postContext,
            $productContext,
            $searchContext,
            $taxomanyContext,
        ];

        foreach ($contexts as $context) {
            $this->addRoutingContext($context);
        }
    }

    private function addRoutingContext(RoutingContextInterface $routingContext): void
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

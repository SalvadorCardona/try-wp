<?php
declare(strict_types=1);

namespace App\Routing\Contexts;

use App\Routing\Routing;
use App\Routing\RoutingContextInterface;
use App\Routing\RoutingContextNotFoundException;

class SearchContext implements RoutingContextInterface
{
    public function getRoutingByRoute(string $route): Routing
    {
        throw new RoutingContextNotFoundException();
    }

    public function getType(): string
    {
        return 'search';
    }
}

<?php

declare(strict_types=1);

namespace App\Api;

use App\Routing\CompositeRoutingContext;

class RoutingApi extends AbstractApi
{
    protected string $endPoint = 'routing/(?P<route>[^/]+)';
    /**
     * @var CompositeRoutingContext
     */
    private CompositeRoutingContext $compositeRoutingContext;

    public function __construct(CompositeRoutingContext $compositeRoutingContext)
    {
        $this->compositeRoutingContext = $compositeRoutingContext;
    }

    public function __invoke(): array
    {
        return $this->compositeRoutingContext->getRouting($this->request->get_param('route'))->toArray();
    }
}

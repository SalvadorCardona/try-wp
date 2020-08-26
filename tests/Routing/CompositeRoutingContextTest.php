<?php

namespace Routing;

use App\Routing\CompositeRoutingContext;
use App\Routing\Contexts\PostContext;
use App\Routing\Routing;
use App\Routing\RoutingContextNotFoundException;
use PHPUnit\Framework\TestCase;

class CompositeRoutingContextTest extends TestCase
{
    /**
     * @param PostContext $postContext
     * @return CompositeRoutingContext
     */
    public function compositeRoutingContextFactory(PostContext $postContext): CompositeRoutingContext
    {
        return new CompositeRoutingContext(
            $postContext
        );
    }

    public function testCompositeRoutingContextOnError(): void
    {
        $postContext = $this->createMock(PostContext::class);
        $postContext->method('getRoutingByRoute')->willReturnCallback(function () {
                throw new RoutingContextNotFoundException();
        });

        $compositeRoutingContext = $this->compositeRoutingContextFactory(
            $postContext
        );

        $error = false;

        try {
            $compositeRoutingContext->getRouting('route');
        } catch (RoutingContextNotFoundException $e) {
            $error = true;
        }

        $this->assertTrue($error);
    }

    public function testCompositeRoutingContextOnSuccess(): void
    {
        $routing = new Routing();
        $postContext = $this->createMock(PostContext::class);
        $postContext->method('getRoutingByRoute')->willReturn($routing);

        $compositeRoutingContext = $this->compositeRoutingContextFactory(
            $postContext
        );

        $this->assertInstanceOf(Routing::class, $compositeRoutingContext->getRouting('route'));
    }
}

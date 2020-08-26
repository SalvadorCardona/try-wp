<?php
declare(strict_types=1);

namespace App\Routing\Contexts;

use App\Routing\Routing;
use App\Routing\RoutingContextInterface;
use App\Routing\RoutingContextNotFoundException;

class PostContext implements RoutingContextInterface
{
    public function getRoutingByRoute(string $route): Routing
    {
        $postId = $route === 'home' ? (int) get_option('page_on_front') : url_to_postid($route);

        if ($postId) {
            $post = get_post($postId, ARRAY_A);

            return (new Routing())
                ->setType($this->getType())
                ->setContent($post);
        }

        throw new RoutingContextNotFoundException();
    }

    public function getType(): string
    {
        return 'post';
    }
}

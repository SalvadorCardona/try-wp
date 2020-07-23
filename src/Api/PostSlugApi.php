<?php

declare(strict_types=1);

namespace App\Api;

use App\Service\WordpressService;
use WP_REST_Request;

class PostSlugApi extends AbstractApi
{
    protected string $endPoint = 'post/(?P<name>[^/]+)/slug';
    /**
     * @var WordpressService
     */
    private WordpressService $wordpressService;

    public function __construct(WordpressService $wordpressService)
    {
        $this->wordpressService = $wordpressService;
    }

    public function action(): ?array
    {
        $wpdb = $this->wordpressService->getWpdb();

        $post = $wpdb->get_var($wpdb->prepare("
                SELECT ID FROM $wpdb->posts WHERE post_name = %s", $this->getRequest()->get_param('name')));
        if ($post) {
            return get_post($post, ARRAY_A);
        }

        return null;
    }
}

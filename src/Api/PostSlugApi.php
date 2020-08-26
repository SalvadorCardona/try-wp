<?php

declare(strict_types=1);

namespace App\Api;

use App\Helper\WordpressHelper;

class PostSlugApi extends AbstractApi
{
    protected string $endPoint = 'post/(?P<name>[^/]+)/slug';

    public function __invoke(): ?array
    {
        $wpdb = WordpressHelper::getWpdb();

        $post = $wpdb->get_var($wpdb->prepare("
                SELECT ID FROM $wpdb->posts WHERE post_name = %s", $this->request->get_param('name')));
        if ($post) {
            return get_post($post, ARRAY_A);
        }

        return null;
    }
}

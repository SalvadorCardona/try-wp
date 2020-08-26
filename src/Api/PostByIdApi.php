<?php

declare(strict_types=1);

namespace App\Api;

use App\Helper\WordpressHelper;

class PostByIdApi extends AbstractApi
{
    protected string $endPoint = 'post/(?P<id>\d+)/all';

    public function __invoke(): ?array
    {
        $wpdb = WordpressHelper::getWpdb();

        $post = $wpdb->get_var($wpdb->prepare("
                SELECT ID FROM $wpdb->posts WHERE id = %d", $this->request->get_param('id')));
        if ($post) {
            return get_post($post, ARRAY_A);
        }

        return null;
    }
}

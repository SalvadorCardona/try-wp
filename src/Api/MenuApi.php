<?php
declare(strict_types=1);


namespace App\Api;


class MenuApi extends AbstractApi
{
    protected string $endPoint = 'menu';

    public function action(): array
    {
        return wp_get_nav_menu_items('Menu 1');
    }
}

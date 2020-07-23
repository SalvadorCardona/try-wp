<?php
declare(strict_types=1);

namespace App\Service;

use wpdb;

class WordpressService
{
    public function getWpdb(): wpdb
    {
        global $wpdb;
        return $wpdb;
    }

    public function getI18n(): array
    {
        global $i18n;
        return $i18n;
    }
}

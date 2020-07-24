<?php
declare(strict_types=1);

namespace App\Helper;

use wpdb;

class WordpressHelper
{
    public static function getWpdb(): wpdb
    {
        /** @var wpdb */
        global $wpdb;
        return $wpdb;
    }

    public static function getI18n(): array
    {
        global $i18n;
        return $i18n;
    }
}
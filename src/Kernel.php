<?php

declare(strict_types=1);

namespace App;

use Slim\App;

class Kernel
{
    /**
     * @var App;
     */
    private static $APP;

    /**
     * @return App
     */
    public static function getAPP(): App
    {
        return self::$APP;
    }

    /**
     * @param App $APP
     */
    public static function setAPP(App $APP): void
    {
        self::$APP = $APP;
    }
}

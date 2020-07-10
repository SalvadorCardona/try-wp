<?php

declare(strict_types=1);

namespace App\Helpers\render;

/**
 * @param $data mixed
 */
function dump_to_html($data)
{
    echo htmlspecialchars(json_encode($data));
}

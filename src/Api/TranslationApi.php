<?php
declare(strict_types=1);

namespace App\Api;

use App\Helper\WordpressHelper;

class TranslationApi extends AbstractApi
{
    protected string $endPoint = 'translation';

    public function __invoke(): array
    {
        return WordpressHelper::getI18n();
    }
}

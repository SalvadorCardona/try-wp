<?php
declare(strict_types=1);


namespace App\Api;

use App\Service\WordpressService;

class TranslationApi extends AbstractApi
{
    protected string $endPoint = 'translation';
    /**
     * @var WordpressService
     */
    private WordpressService $wordpressService;

    public function __construct(WordpressService $wordpressService)
    {
        $this->wordpressService = $wordpressService;
    }

    public function action(): array
    {
        return $this->wordpressService->getI18n();
    }
}

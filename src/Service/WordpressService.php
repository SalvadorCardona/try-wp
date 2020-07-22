<?php
declare(strict_types=1);

namespace App\Service;

class WordpressService
{
    /**
     * @var EventService
     */
    private EventService $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }
}

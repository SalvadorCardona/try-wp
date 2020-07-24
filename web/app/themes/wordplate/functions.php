<?php

use App\Kernel;
use App\Service\ActionService;

/** @var ActionService $eventService */
$eventService = Kernel::getAPP()
    ->getContainer()
    ->get(ActionService::class);

$eventService->registerActions();

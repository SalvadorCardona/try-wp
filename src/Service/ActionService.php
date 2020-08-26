<?php
declare(strict_types=1);

namespace App\Service;

use App\Action\ActionInterface;

class ActionService
{
    private array $actions;

    public function registerActions(): void
    {
        foreach ($this->actions as $action) {
            [$event, $action] = $action;
            add_action($event, $action);
        }
    }

    public function addAction(string $event, ActionInterface $action): void
    {
        $this->actions []= [$event, $action];
    }
}

<?php
declare(strict_types=1);

namespace App\Service;

use App\Action\ActionInterface;
use App\Model\Config;
use DI\Container;

class ActionService
{
    /** @var ActionInterface[] */
    private array $actions;

    private Container $container;

    public function __construct(Container $container)
    {
        $this->actions = $container->get(Config::ACTION);
        $this->container = $container;
    }

    public function registerActions(): void
    {
        foreach ($this->actions as $event => $action) {
            add_action($event, [$this->container->get($action), 'action']);
        }
    }
}

<?php
declare(strict_types=1);

namespace App\Service;

use App\Action\ActionInterface;
use Psr\Container\ContainerInterface;

class ActionService
{
    /** @var ActionInterface[] */
    private array $actions;

    private ContainerInterface $container;

    public function __construct(ContainerInterface $container, array $actions)
    {
        $this->actions = $actions;
        $this->container = $container;
    }

    public function registerActions(): void
    {
        foreach ($this->actions as $event => $action) {
            $this->addAction($event, $this->container->get($action));
        }
    }

    public function addAction(string $event, ActionInterface $action): void
    {
        add_action($event, $action);
    }
}

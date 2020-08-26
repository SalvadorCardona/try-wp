<?php
declare(strict_types=1);

use App\Action\ApiLoaderAction;
use App\Model\Config;
use App\Service\ActionService;
use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        ActionService::class => function (ContainerInterface $container) {
            return new ActionService($container, $container->get(Config::ACTION));
        },
        ApiLoaderAction::class => function (ContainerInterface $container) {
            return new ApiLoaderAction($container, $container->get(Config::API));
        }
    ]);
};

<?php
declare(strict_types=1);

namespace App\Api;

use WP_REST_Request;

abstract class AbstractApi implements ApiInterface
{
    protected array $body = [];
    protected string $method = 'GET';
    protected bool $blocking = true;
    protected string $endPoint = '';
    protected string $namespace = 'wp/app';
    protected ?WP_REST_Request $request;

    public function init(WP_REST_Request $request = null)
    {
        $this->request = $request;
        return $this->__invoke();
    }

    public function action()
    {
    }

    public function getBody(): array
    {
        return $this->body;
    }

    public function setBody(array $body): void
    {
        $this->body = $body;
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function isBlocking(): bool
    {
        return $this->blocking;
    }

    public function getEndPoint(): string
    {
        return $this->endPoint;
    }

    public function getNamespace(): string
    {
        return $this->namespace;
    }
}

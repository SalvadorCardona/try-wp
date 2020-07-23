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
    protected string $namespace = 'wp/v2';
    protected ?WP_REST_Request $request;

    public function init(WP_REST_Request $request = null)
    {
        $this->setRequest($request);
        return $this->action();
    }

    public function action()
    {
        /**
         * Implement me
         */
    }

    public function getBody(): array
    {
        return $this->body;
    }

    public function setBody(array $body): void
    {
        $this->body = $body;
    }

    /**
     * @return string
     */
    public function getMethod(): string
    {
        return $this->method;
    }

    /**
     * @return bool
     */
    public function isBlocking(): bool
    {
        return $this->blocking;
    }

    /**
     * @return string
     */
    public function getEndPoint(): string
    {
        return $this->endPoint;
    }

    /**
     * @return string
     */
    public function getNamespace(): string
    {
        return $this->namespace;
    }

    /**
     * @return WP_REST_Request|null
     */
    public function getRequest(): ?WP_REST_Request
    {
        return $this->request;
    }

    /**
     * @param WP_REST_Request|null $request
     */
    public function setRequest(?WP_REST_Request $request): void
    {
        $this->request = $request;
    }
}

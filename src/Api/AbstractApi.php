<?php
declare(strict_types=1);

namespace App\Api;

abstract class AbstractApi
{
    private array $body = [];
    private string $method = 'GET';
    private bool $blocking = true;
    private string $endPoint = '';

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
}

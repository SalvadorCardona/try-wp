<?php
declare(strict_types=1);


namespace App\Routing;

class Routing
{
    private string $type;
    private array $content;

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): Routing
    {
        $this->type = $type;

        return $this;
    }

    public function getContent(): array
    {
        return $this->content;
    }

    public function setContent(array $content): Routing
    {
        $this->content = $content;

        return $this;
    }

    public function toArray(): array
    {
        return [
            'type' => $this->getType(),
            'content' => $this->getContent()
        ];
    }
}

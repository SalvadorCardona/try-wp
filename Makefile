ENV ?= "dev"

dev-server:
	php -S localhost:8000 -t web

build-dev-api-ts:
	 npx swagger-typescript-api -p swagger.yaml -o ./



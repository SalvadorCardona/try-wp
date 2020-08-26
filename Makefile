ENV ?= "dev"

install: install-php database-import install-js

install-php:
	composer install
	curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
	cp .env.dev .env

install-js:
	cd angular && yarn install

server-dev:
	/bin/sh -c 'php -S localhost:8000 -t web &'
	/bin/sh -c 'cd angular && yarn start'

build-dev-api-ts:
	 npx swagger-typescript-api -p swagger.yaml -o ./

database-export:
	php wp-cli.phar db export base.sql

database-import:
	php wp-cli.phar db import base.sql

trans:
	ngx-translate-extract --input ./web/app/languages --output ./angular/src/assets/i18n/{en,da,de,fi,nb,nl,sv}.json --clean --format json

test:
	php vendor/bin/phpunit
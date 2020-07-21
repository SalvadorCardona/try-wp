ENV ?= "dev"

dev-server:
	/bin/sh -c 'php -S localhost:8000 -t web &'
	/bin/sh -c 'cd angular && yarn start'

build-dev-api-ts:
	 npx swagger-typescript-api -p swagger.yaml -o ./

database-export:
	wp db export base.sql

database-import:
	wp db import base.sql

trans:
	ngx-translate-extract --input ./web/app/languages --output ./angular/src/assets/i18n/{en,da,de,fi,nb,nl,sv}.json --clean --format json
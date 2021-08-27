.DEFAULT_GOAL:up-dev-env

.PHONY: up-dev-env down-dev-env connect-db connect-db-keycloak compile format test import rebuild-image

CURRENT_GID := $(shell id -u)
CURRENT_UID := $(shell id -g)
CURRENT_NAME := $(shell id -un)

export CURRENT_UID
export CURRENT_GID
export CURRENT_NAME

up-dev-env:
	mkdir -p data/psql			
	mkdir -p data/keycloak			
	docker-compose up -d

down-dev-env:
	docker-compose down

connect-db:
	docker run -e PGPASSWORD='psql' --net 'cphscorer_dbnet' -it --rm  postgres:13.0-alpine psql -h 192.168.5.5 -d psql -U psql

connect-db-keycloak:
	docker run -e PGPASSWORD='psql' --net 'cphscorer_dbnet' -it --rm  postgres:13.0-alpine psql -h 192.168.5.10 -d psql -U psql

compile:
	lerna run compile

format:
	lerna run format

test:
	lerna run test

import: 
	npx ts-node --project packages/database-provider/tsconfig.json -p -e "import connection from './packages/database-provider/__test__/connection';connection.create().then(()=> {connection.close().then(() => console.log('ok'))})"

rebuild-image:
	docker-compose build

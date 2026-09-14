SHELL := /bin/bash
CMD ?= sh
PROD_COMPOSE ?= docker-files/docker-compose.prod.yml
DEV_COMPOSE ?= docker-files/docker-compose.yml
CONTAINER_NAME ?= web-app

PROD_ENABLED := $(shell git diff --quiet)
PROD_ARGS := --env-file .env.prod -p royalty-web-prod -f docker-files/docker-compose.prod.yml
TAG := $(shell git rev-parse --short HEAD)

DC_TYPE := $(shell which docker-compose > /dev/null; echo $$?)
ifeq ($(DC_TYPE),1)
	DOCK_COMP=docker compose
else
	DOCK_COMP=docker-compose
endif

rebuild build:
	$(DOCK_COMP) build

up:
	$(DOCK_COMP) up -d

restart:
	$(DOCK_COMP) stop && $(DOCK_COMP) up -d

down:
	$(DOCK_COMP) down --remove-orphans

log logs:
	$(DOCK_COMP) logs -f $(CONTAINER_NAME)

shell: up
	$(DOCK_COMP) exec $(CONTAINER_NAME) $(CMD)

root: up
	$(DOCK_COMP) exec -u 0 $(CONTAINER_NAME) $(CMD)

clean: down
	rm -rf node_modules/* dist/*

### Prod Recipes
ifeq ($(PROD_ENABLED),1)
prod-build:
	# git diff --quiet || echo "GIT work tree is dirty!"
	# Generate Tag
	# for now use git commit
	docker build -t royalty-web:$(TAG) -f .docker-files/prod.Dockerfile .

prod:
	TAG=$(TAG) $(DOCK_COMP) $(PROD_ARGS) up -d

prod-down:
	$(DOCK_COMP) $(PROD_ARGS) down

prod-restart:
	$(DOCK_COMP) $(PROD_ARGS) stop && $(DOCK_COMP) $(PROD_ARGS) up -d

prod-shell:
	$(DOCK_COMP) $(PROD_ARGS) exec $(CONTAINER_NAME) $(CMD)

prod-logs:
	$(DOCK_COMP) $(PROD_ARGS) logs -f $(CONTAINER_NAME)
else
prod-%:
	@echo "Working tree dirty, Prod actions disabled!"
endif
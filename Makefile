ROOT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: build docker init shell typescript

build:
ifeq "" "${DAY}"
	$(error DAY must be provided via env)
endif
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:2023 bash -c 'cd code/${DAY} && node_modules/typescript/bin/tsc'

docker:
	docker build -t aoc.leeh:2023 

init:
ifeq "" "${DAY}"
	$(error DAY must be provided via env)
endif
	cp -r code/template code/${DAY}

run: build
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:2023 bash -c 'cd code/${DAY} && node index.js'

shell:
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:2023

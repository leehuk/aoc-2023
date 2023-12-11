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
	mkdir data/${DAY}
	touch data/${DAY}/data-1.txt
	cd code/${DAY} && ln -s ../../data/${DAY}/data-1.txt . && cd -

run: build
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:2023 bash -c 'cd code/${DAY} && node --stack-size=4096 index.js'

shell:
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:2023

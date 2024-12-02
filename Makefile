YEAR := $(if $(YEAR),$(YEAR),$(shell date +%Y))

ROOT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: build docker init lib shell typescript

build:
ifeq "" "${DAY}"
	$(error DAY must be provided via env)
endif
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:dev bash -c 'cd code/${YEAR}/${DAY} && node_modules/typescript/bin/tsc'

docker:
	docker build -t aoc.leeh:dev .

init:
ifeq "" "${DAY}"
	$(error DAY must be provided via env)
endif
	cp -r code/template code/${YEAR}/${DAY}
	mkdir -p data/${YEAR}/${DAY}
	touch data/${YEAR}/${DAY}/data-1.txt
	cd code/${YEAR}/${DAY} && ln -s ../../../data/${YEAR}/${DAY}/data-1.txt . && cd -

lib:
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:dev bash -c 'cd lib && node_modules/typescript/bin/tsc'

run: build
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:dev bash -c 'cd code/${YEAR}/${DAY} && node --stack-size=4096 index.js'

shell:
	docker run -it --rm -v ${ROOT_DIR}:/mnt aoc.leeh:dev

SHELL := /bin/bash
PATH  := node_modules/.bin:${PATH}

default: test cov

tests   = ./test/*-test.js
version = $(shell node -p "require('./package.json').version")

.PHONY: test
test:
	@jslint --color lib/*.js ${tests}
	@mocha

cov:
	@browserify -t coverify ${tests} | mocaccino -b | phantomic | coverify

html:
	@browserify ${tests} | mocaccino -b | consolify -r -t "min-iterator unit tests" > test/all.html

release: test cov
ifeq (v${version},$(shell git tag -l v${version}))
	@echo "Version ${version} already released!"
	@exit 1
endif
	@echo "Creating tag v${version}"
	@git tag -a -m "Release ${version}" v${version}
	@git push --tags
	@echo "Publishing to npm"
	@npm publish

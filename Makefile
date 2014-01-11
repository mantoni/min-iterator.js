SHELL := /bin/bash
PATH  := node_modules/.bin:${PATH}

default: test phantom browser

tests   = ./test/*-test.js
version = $(shell node -p "require('./package.json').version")

.PHONY: test
test:
	@jslint --color lib/*.js ${tests}
	@mocha

phantom:
	@browserify ${tests} | mocaccino --browser | phantomic

browser:
	@consolify --mocha -o test/all.html ${tests}

cov:
	@browserify -t coverify ${tests} --bare | mocaccino | node | coverify

release: test phantom
ifeq (v${version},$(shell git tag -l v${version}))
	@echo "Version ${version} already released!"
	@exit 1
endif
	@echo "Creating tag v${version}"
	@git tag -a -m "Release ${version}" v${version}
	@git push --tags
	@echo "Publishing to npm"
	@npm publish

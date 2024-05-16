.PHONY: init
init:
	cp apps/api/.env.example apps/api/.env.local
	cp apps/web-tool/.env.example apps/web-tool/.env.local

.PHONY: cleanup
cleanup:
	find . -name '.turbo' -type d -prune -exec rm -rf '{}' +
	find . -name '.next' -type d -prune -exec rm -rf '{}' +
	find . -name 'dist' -type d -prune -exec rm -rf '{}' +
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
	find . -name 'pnpm-lock.yaml' -type f -prune -exec rm -rf '{}' +
	find . -name 'tsconfig.tsbuildinfo' -type f -prune -exec rm -rf '{}' +

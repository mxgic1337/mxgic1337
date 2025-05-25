clean:
	rm -rf dist/
	rm -rf target/

build:
	mkdir -p dist/
	pnpm run less:build
	mkdir -p dist/dist/
	mv dist/app.css dist/dist/
	cargo build
	cp target/debug/mxgic1337 dist/
	cp -r public/ dist/
	cp -r templates/ dist/	
	mkdir -p dist/scripts/
	cp -r scripts/*.json dist/scripts/

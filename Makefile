
.PHONY: all build up firefox down clean test lint format help

# Default target
all: help

# Build the site
build:
	@echo "Building Hugo site..."
	hugo --minify --cleanDestinationDir

# Start production server
up:
	@echo "Starting production server..."
	killall "hugo" 2>/dev/null || true
	rm -rf /tmp/hugo_cache 2>/dev/null || true
	sleep 2
	hugo server --bind 0.0.0.0 &

# Open in Firefox
firefox:
	@echo "Opening site in Firefox..."
	browse http://localhost:1313/ &

# Stop Hugo server
down:
	@echo "Stopping Hugo server..."
	killall hugo 2>/dev/null || true

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf public/
	rm -rf resources/_gen/
	rm -rf .hugo_build.lock
	find . -type f -name '*~' -exec rm {} \; -print 2>/dev/null || true
	find . -type f -name '.DS_Store' -exec rm {} \; -print 2>/dev/null || true

# Run tests (placeholder for future test implementation)
test:
	@echo "Running tests..."
	@echo "No tests configured yet."

# Lint CSS and JavaScript
lint:
	@echo "Linting CSS and JavaScript..."
	@if [ -f package.json ] && npm list stylelint >/dev/null 2>&1; then \
		npx stylelint "static/css/*.css"; \
	else \
		echo "stylelint not found, skipping CSS linting"; \
	fi
	@if [ -f package.json ] && npm list eslint >/dev/null 2>&1; then \
		npx eslint "static/js/*.js"; \
	else \
		echo "eslint not found, skipping JS linting"; \
	fi

# Format code
format:
	@echo "Formatting code..."
	@if [ -f package.json ] && npm list prettier >/dev/null 2>&1; then \
		npx prettier --write "static/css/*.css" "static/js/*.js"; \
	else \
		echo "prettier not found, skipping formatting"; \
	fi

# Install development dependencies
install:
	@echo "Installing development dependencies..."
	@if [ -f package.json ]; then \
		npm install; \
	else \
		echo "No package.json found, skipping npm install"; \
	fi

# Build for production with optimization
production: clean build
	@echo "Production build complete!"

# Deploy to GitHub Pages (example)
deploy: build
	@echo "Deploying to GitHub Pages..."
	@if [ -d ".git" ]; then \
		git add public/ && \
		git commit -m "Deploy to GitHub Pages" && \
		git subtree push --prefix public origin gh-pages; \
	else \
		echo "Not a git repository, skipping deployment"; \
	fi

# Show help
help:
	@echo "Available commands:"
	@echo "  build      - Build the Hugo site for production"
	@echo "  up         - Start production server"
	@echo "  firefox    - Open site in Firefox"
	@echo "  down       - Stop Hugo server"
	@echo "  clean      - Clean build artifacts"
	@echo "  test       - Run tests"
	@echo "  lint       - Lint CSS and JavaScript"
	@echo "  format     - Format code with prettier"
	@echo "  install    - Install development dependencies"
	@echo "  production - Clean build for production"
	@echo "  deploy     - Deploy to GitHub Pages"
	@echo "  help       - Show this help message"


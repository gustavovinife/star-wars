#!/bin/bash

set -e

echo "Installing Composer dependencies..."
composer install --prefer-dist --no-interaction --optimize-autoloader

echo "Starting Laravel development server..."
exec php artisan serve --host=0.0.0.0 --port=8000

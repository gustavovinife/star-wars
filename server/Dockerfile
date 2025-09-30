FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git zip unzip curl libpng-dev libonig-dev libxml2-dev

# Install PHP extensions including Redis
RUN docker-php-ext-install pdo mbstring exif pcntl bcmath gd

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install

# Environment variables are set in docker-compose.yml

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000" ]


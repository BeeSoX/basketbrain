FROM php:8.2-fpm

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Installation des dépendances Symfony
COPY composer.* ./
RUN composer update \
    composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

COPY . .

CMD php -S 0.0.0.0:8000 -t public/
#!/bin/sh
for i in $(env | grep VITE_); do
    key=$(echo "$i" | cut -d '=' -f 1)
    value=$(echo "$i" | cut -d '=' -f 2-)
    echo "Setting $key=$value"
    # Substituir placeholders apenas em arquivos JS e CSS
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) \
        -exec sed -i "s|__PLACEHOLDER__${key}|${value}|g" '{}' +
done

#/bin/zsh
docker build -t miniapps-ticket20-api-dev .
docker run --rm -it -p 127.0.0.1:3000:3000 -v ./.env:/app/.env miniapps-ticket20-api-dev

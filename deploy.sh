#!/bin/bash

set -e

PROJECT_DIR="/srv/sig-api-adapter"
BRANCH="Production"

echo "[$(date)] Iniciando deploy..." >> "$PROJECT_DIR/deploy.log"

cd "$PROJECT_DIR"

git reset --hard
git clean -df
git checkout "$BRANCH"
git pull origin "$BRANCH"

docker compose down --remove-orphans
docker compose up -d --build

echo "[$(date)] Deploy executado com sucesso" >> "$PROJECT_DIR/deploy.log"
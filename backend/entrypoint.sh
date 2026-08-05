#!/bin/sh

echo "Waiting for database..."

sleep 5

echo "Running database migrations..."

alembic upgrade head

echo "Starting SalonFlow API..."

exec uvicorn app.main:app \
    --host 0.0.0.0 \
    --port ${PORT:-8000}

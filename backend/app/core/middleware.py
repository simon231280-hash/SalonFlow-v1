import logging
import time

from fastapi import Request


from app.core.logger import setup_logging

logger = setup_logging()


async def log_requests(request: Request, call_next):

    start = time.time()

    response = await call_next(request)

    duration = round(
        time.time() - start,
        4,
    )

    logger.info(
        "%s %s -> %s (%.4fs)",
        request.method,
        request.url.path,
        response.status_code,
        duration,
    )

    return response

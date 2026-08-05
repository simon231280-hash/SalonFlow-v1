import logging
import sys


def setup_logging():

    logger = logging.getLogger("salonflow")

    logger.setLevel(logging.INFO)

    logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    handler.setFormatter(formatter)

    logger.addHandler(handler)

    logger.propagate = False

    return logger

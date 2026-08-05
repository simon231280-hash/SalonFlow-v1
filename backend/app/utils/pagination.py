from sqlalchemy import Select


def paginate(
    query: Select,
    page: int,
    page_size: int,
):
    return query.offset(
        (page - 1) * page_size
    ).limit(page_size)

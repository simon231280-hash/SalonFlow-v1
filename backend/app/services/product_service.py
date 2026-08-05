from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
)


class ProductService:

    @staticmethod
    async def create(
        db: AsyncSession,
        product_data: ProductCreate,
    ) -> Product:

        existing = await db.execute(
            select(Product)
            .where(
                Product.sku == product_data.sku
            )
        )

        if existing.scalar_one_or_none():
            raise ValueError(
                "Product SKU already exists."
            )

        product = Product(
            **product_data.model_dump()
        )

        db.add(product)

        await db.commit()
        await db.refresh(product)

        return product


    @staticmethod
    async def get_all(
        db: AsyncSession,
    ) -> list[Product]:

        result = await db.execute(
            select(Product)
            .order_by(
                Product.created_at.desc()
            )
        )

        return result.scalars().all()


    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        product_id: int,
    ) -> Product | None:

        result = await db.execute(
            select(Product)
            .where(
                Product.id == product_id
            )
        )

        return result.scalar_one_or_none()


    @staticmethod
    async def update(
        db: AsyncSession,
        db_product: Product,
        product_data: ProductUpdate,
    ) -> Product:

        data = product_data.model_dump(
            exclude_unset=True
        )

        for key, value in data.items():
            setattr(
                db_product,
                key,
                value,
            )

        await db.commit()
        await db.refresh(db_product)

        return db_product


    @staticmethod
    async def delete(
        db: AsyncSession,
        db_product: Product,
    ) -> None:

        await db.delete(
            db_product
        )

        await db.commit()


    @staticmethod
    async def get_low_stock(
        db: AsyncSession,
    ) -> list[Product]:

        result = await db.execute(
            select(Product)
            .where(
                Product.stock_quantity
                <= Product.minimum_stock
            )
            .order_by(
                Product.stock_quantity
            )
        )

        return result.scalars().all()

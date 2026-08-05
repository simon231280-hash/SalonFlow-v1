from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


class EmployeeService:

    @staticmethod
    async def create(
        db: AsyncSession,
        employee: EmployeeCreate,
    ) -> Employee:

        db_employee = Employee(**employee.model_dump())

        db.add(db_employee)
        await db.commit()
        await db.refresh(db_employee)

        return db_employee

    @staticmethod
    async def get_all(
        db: AsyncSession,
    ) -> list[Employee]:

        result = await db.execute(
            select(Employee)
        )

        return result.scalars().all()

    @staticmethod
    async def get_by_id(
        db: AsyncSession,
        employee_id: int,
    ) -> Employee | None:

        result = await db.execute(
            select(Employee).where(
                Employee.id == employee_id
            )
        )

        return result.scalar_one_or_none()

    @staticmethod
    async def update(
        db: AsyncSession,
        db_employee: Employee,
        employee: EmployeeUpdate,
    ) -> Employee:

        update_data = employee.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_employee, key, value)

        await db.commit()
        await db.refresh(db_employee)

        return db_employee

    @staticmethod
    async def delete(
        db: AsyncSession,
        db_employee: Employee,
    ) -> None:

        await db.delete(db_employee)
        await db.commit()

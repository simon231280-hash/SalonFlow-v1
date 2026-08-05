from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.auth import UserRegister


class AuthService:

    @staticmethod
    async def get_user_by_username(
        db: AsyncSession,
        username: str,
    ) -> User | None:
        result = await db.execute(
            select(User).where(User.username == username)
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def create_user(
        db: AsyncSession,
        user: UserRegister,
    ) -> User:

        new_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hash_password(user.password),
            full_name=user.full_name,
            phone=user.phone,
            role="staff",
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return new_user

    @staticmethod
    async def authenticate(
        db: AsyncSession,
        username: str,
        password: str,
    ) -> User | None:

        user = await AuthService.get_user_by_username(
            db,
            username,
        )

        if user is None:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        if not user.is_active:
            return user

        print(f"Username: '{username}'")
        print(f"Password entered: '{password}'")
        print(f"Password repr: {repr(password)}")
        print(f"Password length: {len(password)}")
        print(f"Stored hash: {user.hashed_password}")

        try:
            verified = verify_password(
                password,
                user.hashed_password,
            )

            print(f"Password verified: {verified}")

        except Exception as e:
            print("Password verification exception:", e)
            print("=" * 80)
            return None

        print("=" * 80)

        if not verified:
            return None

        return user

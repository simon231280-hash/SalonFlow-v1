import asyncio
import asyncpg

async def main():
    conn = await asyncpg.connect(
        user="macbookpro",
        database="salonflow",
        host="localhost",
    )
    print("✅ Connected successfully!")
    await conn.close()

asyncio.run(main())

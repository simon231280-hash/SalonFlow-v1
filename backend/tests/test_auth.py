import pytest


@pytest.mark.asyncio
async def test_root(client):
    response = await client.get("/")

    assert response.status_code == 200


@pytest.mark.asyncio
async def test_register_validation(client):
    response = await client.post(
        "/auth/register",
        json={},
    )

    assert response.status_code == 422


@pytest.mark.asyncio
async def test_login_validation(client):
    response = await client.post(
        "/auth/login",
        data={},
    )

    assert response.status_code == 422

import api from "../api/client";

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const form = new URLSearchParams();

  form.append("username", username);
  form.append("password", password);

  const response = await api.post<LoginResponse>(
    "/auth/login",
    form,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

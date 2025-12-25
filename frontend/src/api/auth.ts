
const BASE_URL = "http://localhost:4000";

export async function signup(data: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data: {
  usernameOrEmail: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
    body: JSON.stringify(data),
  });
  return res.json();
}

import { Link} from 'react-router-dom'

export  async function registerUser(userData) {
  const response = await fetch(`/api/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response;
}

export async function loginUser(loginData){
    const response = await fetch(`/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    });
    return response;
}

export function authHeaders(){
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export async function authFetch(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...authHeaders(),
        }
    });
    if(response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return response;
}
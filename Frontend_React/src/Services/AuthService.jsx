import { Link} from 'react-router-dom'

export  async function RegisterUser(userData) {
  const response = await fetch(`/api/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response;
}

export async function LoginUser(loginData){
    const response = await fetch(`/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    });
    return response;
}

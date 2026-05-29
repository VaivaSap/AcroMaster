const API = import.meta.env.VITE_API_URL

export default async function addSkill(skill)
{
   const response = await fetch(`${API}/api/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
    })
    console.log(response)
    return response;
};

export async function getSkillsByDiscipline(disciplineName) {
    const response = await fetch(`${API}/api/skills?discipline=${disciplineName}`)
    return response.json()
}

export async function updateSkill(id, skill) {
  const response = await fetch(`${API}/api/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
  });
  return response;
}
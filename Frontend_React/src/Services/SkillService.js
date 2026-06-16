export default async function addSkill(skill)
{
   const response = await fetch(`/api/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
    })
    console.log(response)
    return response;
};

export async function getSkillsByDiscipline(disciplineName) {
    const response = await fetch(`/api/skills?discipline=${disciplineName}`)
    return response.json()
}

export async function getSkillById(id) {
    const response = await fetch(`/api/skills/${id}`)
    return response.json()
}

export async function getSkillAttempts(skillId){
    const response = await fetch(`/api/skillAttempts/${skillId}`)
    return response.json()
}

export async function updateSkill(id, skill) {
  const response = await fetch(`/api/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
  });
  return response;
}        
import { AuthHeaders } from "./AuthService";

export default async function addSkill(skill)
{
    try {
        const response = await fetch(`/api/skills`, {
            method: 'POST',
            headers: AuthHeaders(),
            body: JSON.stringify(skill)
        });
        console.log(response)
        return response;
    }
    catch (error) {
        console.error("Error adding skill:", error);
        throw error;
    }
};

export async function getSkillsByDiscipline(disciplineName) {
    try {
        const response = await fetch(`/api/skills?discipline=${disciplineName}`, {headers: AuthHeaders()});
        return response.json()}
        catch (error) {
            console.error("Error fetching skills by discipline:", error);
            throw error;
}}

export async function getSkillById(id) {
    const response = await fetch(`/api/skills/${id}`, {headers: AuthHeaders()});
    if (!response.ok) {
        throw new Error(`Error fetching skill by ID ${id}: ${response.statusText}`);
    }
    return response.json()
}

export async function getSkillAttempts(skillId){
    const response = await fetch(`/api/skillAttempts/${skillId}`, {headers: AuthHeaders()});
    if (!response.ok) {
        throw new Error(`Error fetching skill attempts for ID ${skillId}: ${response.statusText}`);
    }
    return response.json()
}

export async function updateSkill(id, skill) {
  const response = await fetch(`/api/skills/${id}`, {
    method: 'PUT',
    headers: AuthHeaders(),
    body: JSON.stringify(skill)
  });
  if (!response.ok) {
    throw new Error(`Error updating skill with ID ${id}: ${response.statusText}`);
  }
  return response;
}        
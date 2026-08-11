import { authFetch } from "./AuthService";

export default async function addSkill(skill)
{
    try {
        const response = await authFetch(`/api/skills`, {
            method: 'POST',
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
        const response = await authFetch(`/api/skills?discipline=${disciplineName}`);
        if (!response.ok) {
            throw new Error(`Error fetching discipline ${disciplineName}: ${response.statusText}`);
        }
        return response.json();
    }     
    catch (error) {
        console.error("Error fetching skills by discipline:", error);
        throw error;
}}

export async function getSkillById(id) {
    const response = await authFetch(`/api/skills/${id}`);
    if (!response.ok) {
        throw new Error(`Error fetching skill by ID ${id}: ${response.statusText}`);
    }
    return response.json()
}

export async function getSkillAttempts(skillId){
    const response = await authFetch(`/api/skillAttempts/${skillId}`);
    if (!response.ok) {
        throw new Error(`Error fetching skill attempts for ID ${skillId}: ${response.statusText}`);
    }
    return response.json()
}

export async function updateSkill(id, skill) {
  const response = await authFetch(`/api/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(skill)
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Error updating skill with ID ${id}: ${response.statusText}`);
  }
  return response;
}        


export default async function addSkill(skill)
{
   const response = await fetch('http://localhost:5233/api/skills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
    })
    console.log(response)
    return response;
};
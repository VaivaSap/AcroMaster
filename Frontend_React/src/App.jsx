import { useState, useEffect } from 'react'

function App() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetch('http://localhost:5233/api/Skills')
      .then(res => res.json())
      .then(data => setSkills(data))
  }, [])

  return (
    <div>
      <h1>AcroMaster</h1>
      {skills.map(skill => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  )
}

export default App
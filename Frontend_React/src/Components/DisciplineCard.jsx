import { Link } from 'react-router-dom'

function DisciplineCard({ discipline }) {
  return (
    <Link to={`/skills/${discipline.slug}`}>
      <div className="rounded-xl overflow-hidden flex flex-col bg-gray-800">
        <img src={discipline.image} alt={discipline.name} className="w-36 mx-auto aspect-square object-contain rounded-xl" />
        <span className="mt-1 text-sm font-medium text-center text-white">{discipline.name}</span>
      </div>
    </Link>
  )
}

export default DisciplineCard
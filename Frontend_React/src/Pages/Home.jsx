import { Link } from 'react-router-dom';

const disciplines = [
  { id: 0, name: 'Acro Yoga', slug:'AcroYoga', image: '/disciplines/AcroYoga.png' },
  { id: 1, name: 'Pole', slug: 'Pole', image: '/disciplines/Pole.png' },
  { id: 2, name: 'Lyra', slug: 'Lyra', image: '/disciplines/Hoop.jpg' },
  { id: 3, name: 'Silks', slug: 'Silks', image: '/disciplines/Aerial.jpg' },
  { id: 4, name: 'Yoga', slug: 'Yoga', image: '/disciplines/Yoga.png' },
  { id: 5, name: 'Calisthenics', slug: 'Calisthenics', image: '/disciplines/Calisthenics.png' },
  { id: 6, name: 'Flow Arts', slug: 'FlowArts', image: '/disciplines/FlowArts2.jpg' },
  { id: 7, name: 'Flexibility', slug: 'FlexibilityAndMobility', image: '/disciplines/Flexibility_Mobility.jpg' },
]


function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 bg-gray-900">
      <div className="w-full max-w-sm">
        <h1 className="text-lg font-bold mb-4 text-center text-pink-400">Which skill will you focus today?</h1>
        <div className="grid grid-cols-2 gap-1 w-full">
          {disciplines.map(discipline => (
            <Link to={`/skills/${discipline.slug}`} key={discipline.id}>
              <div className="rounded-xl overflow-hidden flex flex-col bg-gray-800">
                <img src={discipline.image} alt={discipline.name} className="w-36 mx-auto aspect-square object-contain rounded-xl" />
                <span className="mt-1 text-sm font-medium text-center text-white">{discipline.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

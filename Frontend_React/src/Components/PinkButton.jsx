function PinkButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-pink-400 text-white rounded font-bold w-10 h-10 flex items-center justify-center"
    >
      {children}
    </button>
  )
}

export default PinkButton;
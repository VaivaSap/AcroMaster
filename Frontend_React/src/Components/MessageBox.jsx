function MessageBox({ open, text, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
      <div className="bg-gray-700 text-white border border-pink-400 rounded p-4">
        <p className="mb-3">{text}</p>
        <button
          className="bg-pink-400 text-white rounded px-3 py-1"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default MessageBox;

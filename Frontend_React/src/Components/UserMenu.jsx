import { useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const image = "/icon-exit.png"; 

  return (
    <button onClick={handleLogout}>
      <img src={image} alt={"Exit"} className="mx-auto aspect-square object-contain rounded-xl size-7 mb-4 ml-5" />
    </button>
  );
}

export default UserMenu;
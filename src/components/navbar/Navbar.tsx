import { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import { KEY_USER_EMAIL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef                       = useRef<HTMLInputElement>(null);
  const navigate                        = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        if (isDialogOpen) {
          setIsDialogOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDialogOpen]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(KEY_USER_EMAIL);
    navigate("/login")
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>ECommerce</span>
      </div>
      <div className="icons">
        <div className="user">
          <span>Admin</span>
          <div className="user-image-container">
            <img
              src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              onClick={handleDialogOpen}
            />
            {isDialogOpen && (
              <div className="dialog" ref={dialogRef}>
                <div className="buttonGroup">
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

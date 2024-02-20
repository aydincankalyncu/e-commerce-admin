import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>ECommerce</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <div className="user">
        <span>Admin</span>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

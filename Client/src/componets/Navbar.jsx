import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const islogin = false;
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLint to="/"></NavLint>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              {islogin && (
                <>
                  {" "}
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>{" "}
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

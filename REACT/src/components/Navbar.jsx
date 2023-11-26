import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-default navbar-sticky bootsnav" style={{backgroundColor: "#49f763"}}>
        <div className="container" >
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="navbar-brand" to="/" style={{padding: 4}}>
              <img src="img/vendor-6.jpg" className="logo" alt=""  />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-menu" >
            <ul
              className="nav navbar-nav navbar-right"
              data-in="fadeInDown"
              data-out="fadeOutUp"
            >
              <li >
                <Link to="/">Home</Link>
              </li>
              {!sessionStorage.getItem("token") && <li>
                <Link to="/register">Register</Link>
              </li>}
              {!sessionStorage.getItem("token") && <li>
                <Link to="/login">Login</Link>
              </li>}
              <li>
                {sessionStorage.getItem("token") && <Link to="/regchat">Conversation</Link>}
              </li>
              {sessionStorage.getItem("token") && <li className="dropdown">
                <a href="#" className="dropdown-toggle"data-toggle="dropdown">
                  Perfil
                </a>
                <ul
                  className="dropdown-menu animated fadeOutUp"
                  style={{display: 'none', opacity: '1'}}
                >
                  <li className="active">
                    <Link to="/listchat">Listado</Link>
                  </li>
                  {/* <li>
                    <a href="company-detail.html">Job Detail</a>
                  </li> */}
                  <li>
                    
                    <Link to="/logout">Salir</Link>
                  </li>
                </ul>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

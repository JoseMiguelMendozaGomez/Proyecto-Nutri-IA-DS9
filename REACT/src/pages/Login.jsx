import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

const Login = ({ onLogin }) => {

  const valores_iniciales = {
    user: "",
    password: "",
  }
  const [user, setUser] = useState(valores_iniciales)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (redirect) {
      onLogin();
    }
  }, [redirect, onLogin]);


  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onsubmit = async (event) => {
    event.preventDefault()

    try {
      const url = "http://localhost:8081/user/login"
      const data = user
      const config = { headers: { 'Content-Type': 'application/json' } };
      const response = await axios.post(url, data, config);
      if (response.status == 200) {
        setUser(response.data)
        Swal.fire({
          title: "<strong>Excelente!!</strong>",
          html: "<i>Te has logueado</i>",
          icon: 'success'
        })
        setRedirect(true)
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("idUser", response.data.id)
      }
      else
        Swal.fire({
          title: "<strong>Vaya...</strong>",
          html: "<i>Usuario o contraseña invalido</i>",
          icon: 'error'
        })

    } catch (error) {
      Swal.fire({
        title: "<strong>Vaya...</strong>",
        html: "<i>Usuario o contraseña inválido</i>",
        icon: 'error'
      })
    }
  }
  if (redirect) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <>
      <section className="login-wrapper">
        <div className="container">
          <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
            <form onSubmit={onsubmit}>
              <img className="img-responsive" alt="logo" src="img/vendor-6.jpg" />
              <input type="text" className="form-control input-lg" name="user" value={user.user} onChange={onchange} placeholder="Usuario" />
              <input type="password" className="form-control input-lg" name="password" value={user.password} onChange={onchange} placeholder="Contraseña" />
              <button type="submit" style={{backgroundColor: "#49f763"}}  className="btn">Inicia sesión</button>
              <p>No tienes cuenta? <Link to="/register"><span style={{color: "#49f763"}}>crea una cuenta </span> </Link></p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Login
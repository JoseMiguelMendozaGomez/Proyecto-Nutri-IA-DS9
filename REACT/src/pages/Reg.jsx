import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'

const Reg = () => {
  // if (!sessionStorage.getItem("token"))
    // return <Navigate to="/noaccess"></Navigate>
    
  const valores_iniciales = {
    user: "",
    password: "",
    name: ""
  }
  const [user, setUser] = useState(valores_iniciales)
  const [redirect, setRedirect] = useState(false)

  //Cuando cambian
  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onsubmit = async (event) => {
    event.preventDefault()

    try {
      const url = "http://localhost:8081/user/"
      const data = user
      const config = { headers: { 'Content-Type': 'application/json' } };

      const response = await axios.post(url, data, config);
      if (response.status == 200) {
        //setUser (response.data)
        Swal.fire({
          title: "<strong>Excelente</strong>",
          html: "<i>Usuario Registrado Satisfactoramente!</i>",
          icon: 'success'
        })
        setUser(valores_iniciales)
        setRedirect(true)
      }
      else
        Swal.fire({
          title: "<strong>Vaya...</strong>",
          html: "<i>No se pudo registrar el usuario</i>",
          icon: 'error'
        })

    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "<strong>Vaya...</strong>",
        html: "<i>No se pudo registrar el usuario</i>",
        icon: 'error'
      })
    }
  }
  if (redirect)
  return <Navigate to="/"></Navigate>

  return (
    <>
      <section className="login-wrapper">
        <div className="container">
          <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
            <form onSubmit={onsubmit}>
              <img className="img-responsive" alt="logo" src="img/vendor-6.jpg" />
              <input type="text" className="form-control input-lg" name="user" value={user.user} onChange={onchange} placeholder="User Name" />
              <input type="text" className="form-control input-lg" name="name" value={user.name} onChange={onchange} placeholder="Name" />
              <input type="password" className="form-control input-lg" name="password" value={user.password} onChange={onchange} placeholder="Password" />
              <button type="submit" style={{color: "#49f763"}}className="btn ">Sign up</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Reg
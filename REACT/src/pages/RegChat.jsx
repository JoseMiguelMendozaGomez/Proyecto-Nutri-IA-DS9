import { useState } from 'react'
import Footer from '../components/Footer'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import gifs from '../assets/loading.gif'

function RegChat() {

  if (!sessionStorage.getItem("token"))
    return <Navigate to="/noaccess"></Navigate>
  //Valores iniciales
  const valores_iniciales = {
    comida: "",
    ingrediente1: "",
    ingrediente2: "",
  }
  const [chatgpt, setChatGPT] = useState(valores_iniciales)
  const [respuesta, setRespuesta] = useState('')

  //Cuando cambian
  const onchange = (event) => {
    setChatGPT({ ...chatgpt, [event.target.name]: event.target.value })
  }

  const onsubmit = async (event) => {
    event.preventDefault()
    setShowGif(true);
    try {
      const url = "http://localhost:8081/chatgpt"
      const data = {message: `Eres un nutricionista que me recomiende como hacer un  ${chatgpt.comida}, sabiendo que como ingrediente principal, tengo ${chatgpt.ingrediente1} y tambien tengo ${chatgpt.ingrediente2}. `}
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
      };
      const response = await axios.post(url, data, config);
      if (response.status == 200) {
        setRespuesta(response.data.response)
        setShowGif(false);
      }
      else
        Swal.fire({
          title: "<strong>Vaya...</strong>",
          html: "<i>No se pudo registrar el usuario</i>",
          icon: 'error'
        })

    } catch (error) {
      console.log(error)
      setShowGif(false);
      Swal.fire({
        title: "<strong>Vaya...</strong>",
        html: "<i>No se pudo registrarla consulta</i>",
        icon: 'error'
      })
    }


  }
  const [showGif, setShowGif] = useState(false);



  return (
    <>

      <section className="login-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6 " style={{marginBottom: "150px"}}>
            <form onSubmit={onsubmit}>
              <img className="img-responsive" alt="logo" src="img/vendor-6.jpg" />
              <h5>Ingresa la receta que deseas realizar</h5>
              {/* <textarea rows="10" className="form-control input-lg" name="message" placeholder="Mensaje" onChange={onchange} value={chatgpt.message} ></textarea> */}
              <label htmlFor="">Para que comida:</label>
              <input onChange={onchange} value={chatgpt.comida} name='comida' required className="inputs" type="text" />
              <label htmlFor="">Ingrediente principal:</label>
              <input onChange={onchange} value={chatgpt.ingrediente1} name='ingrediente1' required className="inputs" type="text" />
              <label htmlFor="">Otro ingrediente:</label>
              <input onChange={onchange} value={chatgpt.ingrediente2} name='ingrediente2' required className="inputs" type="text" />
              <br />
              <button style={{color: "#49f763", marginTop:30}} type="submit" className="btn">Preguntar</button><br />
              
            </form>
            </div>
            <div className="col mt-5" style={{marginTop:'5px'}}>
            <div className="mt-5">
                <div className="company-content">
                {showGif && <img src={gifs} alt="GIF" />}
                  <p dangerouslySetInnerHTML={{__html:`<span className="company-location">${respuesta}</span>`}}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default RegChat

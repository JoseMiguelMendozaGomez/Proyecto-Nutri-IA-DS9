import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import swt from 'sweetalert2'
const ListChat = () => {
  if (!sessionStorage.getItem("token"))
    return <Navigate to="/noaccess"></Navigate>

  const [data, setData] = useState([]);
  useEffect(() => {

    const getdata = async () => {
      try {
        const url = "http://localhost:8081/chatgpt/user/" + sessionStorage.getItem("idUser")
        const config = { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } };
        const response = await axios.get(url, config);
        if (response.status == 200) {
          setData(response.data);
        }
        else
          Swal.fire({
            title: <strong>Vaya...</strong>,
            html: "<i>No se pudo Extraer la data</i>",
            icon: 'error'
          })

      } catch (error) {
        console.log(error)
      }
    }
    getdata()

  }, [])

  const onclic = (data) => {
    swt.fire({
      html: data,
      width: 600,
      icon: 'success'
    })
  }



  return (
    <>
      <section className="inner-banner" style={{backgroundColor: "#49f763"}} >
        <div className="container">
          <div className="caption" >
            <h2>Consultas por usuario</h2>
          </div>
        </div>
      </section>
      <section className="jobs">
        <div className="container">
          <div className="companies">
            {data.map((item) => (
              <div className="company-list" key={item._id}>
                <div className="row" >
                  <div className="col-md-9 col-sm-9">
                    <p><span className="company-name"><i className="fa fa-briefcase"></i> Prompt: {item.prompt} </span> </p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <button type="button" style={{backgroundColor: "#49f763"}} className="btn btn-info   view-job" onClick={() => { onclic(item.response) }}>Ver respuesta: </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ListChat
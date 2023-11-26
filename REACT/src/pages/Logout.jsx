import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import sw from 'sweetalert2'
const Logout = ({onLogout}) => {
    const [exit, setExit]=useState(false)
    const close=()=>{
        sessionStorage.clear()
        onLogout() 
        setExit(true)
    }
    if (exit)  return <Navigate to="/"></Navigate>
 return (
    <>
    <section className="login-wrapper">
                <div className="container">
                    <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
                        <h4>Quieres salir?</h4>
                         <button type="button" style={{color: "#49f763"}} className="btn btn-warning" onClick={close}>Salir</button>  
                    </div>
                </div>
            </section>
    </>
  )
}

export default Logout
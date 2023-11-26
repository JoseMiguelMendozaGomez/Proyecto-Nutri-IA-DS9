import React from 'react'

const NoAccess = () => {
    document.title = "sin acceso"
    const estilo = { "backend": "#242c36 url(https://via.placeholder.com/1920x600)no-repeat" }
    return (
        <section className="inner-banner" style={estilo}>
            <div className="container">
                <div className="caption">
                    <h2>No tiene Acceso</h2>
                    <p>Para entrar a esta pagina debe loguearse!</p>
                </div>
            </div>
        </section>
    )
}

export default NoAccess
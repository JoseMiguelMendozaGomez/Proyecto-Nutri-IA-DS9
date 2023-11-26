import React, { useEffect, useState } from 'react'
import axios from 'axios'
const counter = () => {
	
	return (<>
		<section className="counter" style={{backgroundColor: "#49f763"}}>
			<div className="container" >
				<div className="col-md-4 col-sm-4">
					<div className="counter-text">
						<span aria-hidden="true" className="icon-profile-male"></span>
						<h3>56.086</h3>
						<p>Clientes</p>
					</div>
				</div>

				<div className="col-md-4 col-sm-4">
					<div className="counter-text">
						<span className="box1"><span aria-hidden="true" className="icon-expand"></span></span>
						<h3>345.987</h3>
						<p>Recetas</p>
					</div>
				</div>

				<div className="col-md-4 col-sm-4">
					<div className="counter-text">
						<span className="box1"><span aria-hidden="true" className="icon-briefcase"></span></span>
						<h3>356.777</h3>
						<p>Contador</p>
					</div>
				</div>


			</div>
		</section>
	</>)
}
export default counter 
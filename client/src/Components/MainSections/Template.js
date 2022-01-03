import React from "react"
import {useState} from 'react'

const TempCard = (props) => {

	if (props.data.active) return (
		<div className="templateCardActive" onClick={() => props.handler(props.data.id)}>
			<img src={props.data.src} alt={props.data.title}/>
			<p>{props.data.title}</p>
		</div>
	);
	else return (
		<div className="templateCard" onClick={() => props.handler(props.data.id)}>
			<img src={props.data.src} alt={props.data.title}/>
			<p>{props.data.title}</p>
		</div>
	);

}

function Template(props){
	let templateRender = props.templates.map(t=>{
		return (
			<TempCard handler={props.handler} data={t} key={t.id} />
		);
	});

	return (
		<div className="template">
			{templateRender}
		</div>
	)
}

export default Template;
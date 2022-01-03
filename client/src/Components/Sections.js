import React from "react";
import { useState } from "react";

function MyButton(props){

	if (props.isActive) 
		return (
			<div className="myBtnActive" onClick={() => props.clickHandler(props.name)}>
				{props.name}
			</div>
		)
	else 
		return (
			<div className="myBtn" onClick={() => props.clickHandler(props.name)}>
				{props.name}
			</div>
		)

}

const Sections = (props) => {

	const btns = props.sections.map(btn => {
		return (
			<MyButton key={btn.name} name={btn.name} clickHandler={props.btnHandler} isActive={btn.active}/>
		)
	})

	return (
		<div id='sections'>
			{btns}
			<hr/>
			<div onClick={props.build} className='myBtn'>Save Data Locally</div>
			<div onClick={props.buildPdf} className='myBtn'>Build PDF</div>
		</div>
	)

}

export default Sections;
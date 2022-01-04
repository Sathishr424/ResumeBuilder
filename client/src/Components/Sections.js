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
	});

	// const loadData = () => {
	// 	console.log("Reading..");
	// 	var file = document.getElementById("importData").files[0];
	// 	if (file) {
	// 	    var reader = new FileReader();
	// 	    reader.readAsText(file, "UTF-8");
	// 	    reader.onload = function (evt) {
	// 	    	console.log(evt.target.result);
	// 	    	props.loadData(evt.target.result);
	// 	        // document.getElementById("fileContents").innerHTML = evt.target.result;
	// 	    }
	// 	    reader.onerror = function (evt) {
	// 	        // document.getElementById("fileContents").innerHTML = "error reading file";
	// 	    }
	// 	}
	// }

	let visible;

	if (props.mobile){
		visible = {"display":"none"};
	}else{
		visible = {"display":"block"};
	}


	return (
		<div className='sections' style={visible}>
			{btns}
			<hr/>
			<div onClick={props.buildPdf} className='myBtn'>Build</div>
			<hr/>
			<div onClick={props.build} className='myBtn'>Save Data Locally</div>
			<label style={{'display':'block'}}  htmlFor="importData" className='myBtn'>Load JSON</label>
			<input type="file" onChange={props.loadData} style={{'display':'none'}} id="importData"/>
			<div onClick={props.downloadData} className='myBtn'>Download JSON</div>
		</div>
	)

}

export default Sections;
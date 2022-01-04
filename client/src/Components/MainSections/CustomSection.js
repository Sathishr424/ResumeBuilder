import React from "react";
import {useState, useEffect} from 'react';
import DummyResume from "../DummyResume";

const LabelInput = (props) => {

	let input;

	let add;

	let del;

	const addSection = () => {
		props.onChangeHandler(props.changeKey,[...props.value, '']);
	}

	const deleteSection = () => {
		props.onChangeHandler(props.changeKey,props.value.slice(0,-1));
	}

	if (Array.isArray(props.value)){
		if (props.value.length > 1) del = (
			<div onClick={deleteSection} className='myBtnDel'>Delete</div>
		)
		add = (
			<div className='row'>
				<div onClick={addSection} className='myBtn'>Add</div>
				{del}
			</div>
		)
		input = props.value.map((item,i) => {
			return <input key={i} placeholder={props.placeHolder} className="form-control" value={item} name={props.name} onChange={(e) => props.onChangeHandler(props.changeKey,e.target.value,i)}/>
		});
	}else{
		input = <input placeholder={props.placeHolder} className="form-control" value={props.value} name={props.name} onChange={(e) => props.onChangeHandler(props.changeKey,e.target.value)}/>;
	}

	// console.log(input, add, del, props.value);

	return (
		<div className="labelInput">
			<label>{props.name}</label>
			{input}
			{add}
		</div>
	)
}

const Section = (props) => {

	let rener = props.inputs.map((item,i)=>{
		return (
			<LabelInput key={i} placeHolder={item.placeHolder} changeKey={item.onChange} name={item.name} value={item.value} onChangeHandler={props.handler} />
		);
	});

	return (
		<div className='subSection'>
			{rener}
			<hr/>
		</div>
	);
}

const CustomSection = (props) => {

	let helper = [];

	let [update, setUpdate] = useState(props.previewScreen);

	// console.log(props.content);

	for (var i=0; i<props.content.sections.length; i++){
		var section = props.content.sections[i];
		var keys = Object.keys(section);
		// console.log('Keys', keys);
		// console.log('Section', section);
		let h = [];

		for (var j=0; j<keys.length; j++){
			// console.log('Check', section[keys[j]]);
			h.push(
				{
					name: keys[j], 
					placeHolder: section[keys[j]].placeHolder, 
					value: section[keys[j]].value, 
					type: section[keys[j]].type,
					onChange: {index: i, key: keys[j]}
				}
			);
		}
		helper.push(h);
	}

	const handler = (key,value, subIndex=-1) => {
		// console.log("Before", key, e.target.value,props.content.sections[key.index][key.key].value);
		if (subIndex == -1)
			props.content.sections[key.index][key.key].value = value;
		else 
			props.content.sections[key.index][key.key].value[subIndex] = value;
		props.handler(props.content);
		// console.log("After", key, e.target.value,props.content.sections[key.index][key.key].value);
	}

	const headHandler = (e) => {
		props.content.heading = e.target.value;
		props.handler(props.content);
	}

	const addSection = () => {
		var temp = JSON.parse(JSON.stringify(DummyResume[props.name].sections[0]));
		console.log(temp);
		props.content.sections.push(temp);
		props.handler(props.content);
	}

	const deleteSection = () => {
		props.content.sections.pop();
		props.handler(props.content);
	}

	let render = helper.map((item,i)=>{ return (<Section key={i} inputs={item} handler={handler}/>) })

	// console.log(render, helper, props.content.sections);

	let add;

	let del;

	if (props.content.sections.length > 1) del = (
		<div onClick={deleteSection} className='myBtnDel'>Delete</div>
	)

	if (props.content.extra){
		add = (
			<div className='rowSub'>
				<div onClick={addSection} className='myBtn'>Add</div>
				{del}
			</div>
		)
	}

	let visible;

	useEffect(()=>{
		if (props.mobile && props.previewScreen){
			visible = {"display":"none"};
		}else{
			visible = {"display":"block"};
		}
		// console.log(visible);
		setUpdate(props.previewScreen);
	},[props.previewScreen])

	return (
		<div id='CustomSection' className='customSeciton' style={visible}>
			<h3>{"Your " + props.name}</h3>
			<div className='labelInput'>
				<label>Section Heading</label>
				<input className="form-control" value={props.content.heading} onChange={headHandler} type='text' name='heading'/>
			</div>
			<hr/>
			{render}
			{add}
		</div>
	);


}


export default CustomSection;
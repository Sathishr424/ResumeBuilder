import React from "react";
import { useState } from "react";
import Template1 from "../Templates/template1";
import Template2 from "../Templates/template2";


const Preview = (props) => {
	let render;

	if (props.template == 1) render = (<Template1 mobile={props.mobile} previewScreen={props.previewScreen} loading={props.loading} pdf={props.pdf} resume={props.resume} />);
	else if (props.template == 2) render = (<Template2 mobile={props.mobile} previewScreen={props.previewScreen} loading={props.loading} pdf={props.pdf} resume={props.resume} />);

	let visible;

	if (props.mobile && props.previewScreen){
		visible = {"display":"block"};
	}else if(props.mobile){
		visible = {"display":"none"};
	}else{
		visible = {"display":"block"};
	}

	return (
		<div className="preview" style={visible}>
			{render}
		</div>
	)
}

export default Preview;
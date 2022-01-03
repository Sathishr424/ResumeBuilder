import React from "react";
import { useState } from "react";
import Template1 from "../Templates/template1";
import Template2 from "../Templates/template2";


const Preview = (props) => {
	let render;

	if (props.template == 1) render = (<Template1 pdf={props.pdf} resume={props.resume} />);
	else if (props.template == 2) render = (<Template2 pdf={props.pdf} resume={props.resume} />);

	return (
		<div className="preview">
			{render}
		</div>
	)
}

export default Preview;
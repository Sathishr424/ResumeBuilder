import React from "react";
import {useState, useEffect} from "react";
import "./template2.css";
import axios from 'axios';
import download from 'downloadjs';
import {renderToString, renderToStaticMarkup, renderToNodeStream} from 'react-dom/server';
// import { PDFViewer } from '@react-pdf/renderer';


const Style = "html { -webkit-print-color-adjust: exact; }.profile i{margin: 0px 5px;font-size: 18px;}.pageBreak{page-break-inside:avoid; page-break-after:auto}.template1{padding:0px 20px; background-color:#fff;color:#000;font-family:times;width:1000px;}.template2{background-color:#fff;color:#000;display:flex;flex-direction:column;font-family:times;width:100%}.profile i{margin:0 5px;font-size:18px}.profile{margin:10px;width:100%;display:flex;flex-direction:row;justify-content:space-between;color:#fff}.row_close{display:flex;flex-direction:row;flex-wrap:wrap}.profile_col_head{display:flex;flex-direction:column;padding:20px;background-color:#213456;flex-basis:0;flex-grow:1}.profile_col_head *{margin:10px;color:#fff;text-transform:uppercase}.profile .user_name{font-size:30px;font-weight:bolder;text-transform:uppercase}.profile_col_info{color:#000;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;padding:20px;flex-basis:0;flex-grow:1}.profile_end_design{background-color:#213456;flex-basis:0;flex-grow:.1}.education{margin:10px;width:100%;display:flex;flex-direction:column;color:#000;flex-basis:0;flex-grow:1.5}.container_template2{width:100%;display:flex;flex-direction:row;justify-content:space-between;flex-basis:0;flex-grow:1;flex-wrap:wrap}.education .Heading{font-size:20px;font-weight:bolder;text-transform:uppercase;flex-basis:0;flex-grow:1}.education span{margin:0 3px}.row_full{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.row_far2{width:calc(100% - 20px);display:flex;flex-direction:row;justify-content:space-between}.education hr,.skills hr,.work hr,.awards hr{width:100%;border:none;border-bottom:dotted 2px #000;vertical-align:baseline}.work hr{width:100%;border:none;border-bottom:dotted 2px #000;vertical-align:baseline;flex-basis:0;flex-grow:3.7}.projects hr{width:100%;border:none;border-bottom:dotted 2px #000;vertical-align:baseline}.education .collegeName{font-size:16px;font-weight:bolder;text-transform:uppercase}.template2_column{margin:8px}.skills{margin:10px;width:100%;display:flex;flex-direction:column;color:#000;flex-basis:0;flex-grow:1;flex-wrap:nowrap}.skills .Heading{font-size:20px;font-weight:bolder;text-transform:uppercase;flex-basis:0;flex-grow:1}.skills .skillName{font-size:16px;font-weight:bolder;text-transform:uppercase}.skill_row{display:flex;flex-direction:column;justify-content:flex-start;flex-wrap:wrap}.edcation_column{display:flex;flex-direction:column;justify-content:space-between}.work{margin:10px;width:100%;display:flex;flex-direction:column;justify-content:space-between;color:#000;flex-basis:0;flex-grow:1}.work .Heading{font-size:20px;font-weight:bolder;text-transform:uppercase;flex-basis:0;flex-grow:1}.work_row{display:flex;flex-direction:row;flex-wrap:wrap;margin:2px 0}.work_row .companyName{font-size:16px;font-weight:bolder;text-transform:uppercase}.work_row .jobLocation{font-size:16px;font-weight:bolder;text-transform:capitalize}.template2_job{margin:0 40px}.template2_job li{margin:5px 0}.work_row *{margin:0 3px}.template2 li{list-style-position:inside}.projects{margin:10px;width:100%;display:flex;flex-direction:column;justify-content:space-between;color:#000;flex-basis:0;flex-grow:1}.projects .Heading{font-size:20px;font-weight:bolder;text-transform:uppercase;flex-basis:0;flex-grow:1}.projects .projectName{font-size:16px;font-weight:bolder;text-transform:uppercase}.projectLink,.projectDescription{margin:0 3px}.awards{margin:10px;width:100%;display:flex;flex-direction:column;justify-content:space-between;color:#000;flex-basis:0;flex-grow:1}.awards .Heading{font-size:20px;font-weight:bolder;text-transform:uppercase;flex-basis:0;flex-grow:1}.template2_column span{margin:0 3px}.template2_column .awardName{font-size:16px;font-weight:bolder;text-transform:uppercase}.awardDate{margin:3px 0;font-size:16px}.awarder{font-size:16px;font-weight:700}";

const Render = (resume) => {
	let render = [];

	render.push((
		<div className='profile'>
			<div className='profile_col_head'>
				<div style={{"backgroundColor": "#213456"}} className="user_name">{resume.Profile.sections[0].Name.value}</div>
				<div className="Portfolio">{resume.Profile.sections[0].Portfolio.value}</div>
			</div>
			<div className='profile_col_info'>
				<div className="Address">{resume.Profile.sections[0].Address.value}</div>
				<div className="Email">{resume.Profile.sections[0].Email.value}</div>
				<div className="Mobile">{resume.Profile.sections[0].Mobile.value}</div>
				<div className="LinkedIn">{resume.Profile.sections[0].LinkedIn.value}</div>
			</div>
			<div style={{"backgroundColor": "#213456"}} className='profile_end_design'>
			</div>
		</div>
	));

	render.push((
		<div className='container_template2'>
		<div className='education'>
			<div className='row_full'><div className="Heading">{resume.Education.heading}</div><hr/></div>
			<div className='edcation_column'>
			{
				resume.Education.sections.map(section => {
					return (
						<div className='template2_column pageBreak'>
							<div className='row_close'>
								<div className="collegeName">{section['College Name'].value}</div><span>-</span>
								<div className="collegeLocation">{section['College Location'].value}</div>
							</div>
							<div className='row_close'>
								<div className="Degree">{section['Degree'].value}</div><span></span>
								<div className="Major">{section['Major'].value}</div><span>.</span>
								<div className='row_close'>
									<div className="startDate">{section['Start Date'].value}</div><span>-</span>
									<div className="endDate">{section['End Date'].value}</div>
								</div>
							</div>
							<div className='row_close'>
								<div className="GPA">GPA: {section['GPA'].value}</div>
							</div>
						</div>
					)
				})
			}
			</div>
			
		</div>
		<div className='skills'>
			<div className='row_full'><div className="Heading">{resume.Skills.heading}</div><hr/></div>
			<div className='skill_row'>
			{
				resume.Skills.sections.map(section=>{
					return (
						<div className='template2_column'>
							<div className='skillName'>{section['Skill Name'].value}:</div>
							<div className='row_close'>
							{
								section['Skill Details'].value.map((s,i)=>{
									if (i == section['Skill Details'].value.length-1) return (<div className='skillDetail'>{s}.</div>)
									else return (<div className='skillDetail'>{s}<span>, </span></div>)
								})
							}
							</div>
						</div>
					)
				})
			}
			</div>
		</div>
		</div>
	))

	render.push((
		<div className='work'>
			<div className='row_full'><div className="Heading">{resume.Work.heading}</div><hr/></div>
			{
				resume.Work.sections.map(section => {
					return (
						<div className='template2_column pageBreak'>
							<div className='work_row'>
								<div className="companyName">{section['Company Name'].value}</div><span>-</span>
								<div className="jobLocation">{section['Job Location'].value}</div>
							</div>
							<div className='work_row'>
								<div className="jobTitle">{section['Job Title'].value},</div>

								<div className="startDate">{section['Start Date'].value}</div><span>-</span>
								<div className="endDate">{section['End Date'].value}</div>
							</div>
							<ul className='template2_job'>
							{
								section['Job Responsibilities'].value.map(j=>{
									return (
										<li className='jr'>{j}</li>
									)
								})
							}
							</ul>
						</div>
					)
				})
			}
			
		</div>
	));

	// render.push((
	// 	<div id='skills' className='pageBreak'>
	// 		<div className="Heading">{resume.Skills.heading}</div>
	// 		{
	// 			resume.Skills.sections.map(section=>{
	// 				return (
	// 					<div className='row_far'>
	// 						<div className='skillName'>{section['Skill Name'].value}:</div>
	// 						<div className='row_close'>
	// 						{
	// 							section['Skill Details'].value.map((s,i)=>{
	// 								if (i == section['Skill Details'].value.length-1) return (<div className='skillDetail'>{s}</div>)
	// 								else return (<div className='skillDetail'>{s},</div>)
	// 							})
	// 						}
	// 						</div>
	// 					</div>
	// 				)
	// 			})
	// 		}
	// 	</div>
	// ));

	render.push((
		<div className='projects'>
			<div className='row_full'><div className="Heading">{resume.Projects.heading}</div><hr/></div>
			{
				resume.Projects.sections.map(section=>{
					return (
						<div className='template2_column pageBreak'>
							<div className='work_row'>
								<div className='projectName'>{section['Project Name'].value}</div><span>.</span>
								<div className='work_row'>
								{
									section['Tools Used'].value.map((t,i)=>{
										if (i == section['Tools Used'].value.length-1)
											return (<div className='toolsUsed'>{t}</div>)
										else
											return (<div className='toolsUsed'>{t},</div>)
									})
								}
								</div>
							</div>
							<div className='projectLink'>Link: {section['Link to Project'].value}</div>
							<div className='projectDescription'>{section['Project Description'].value}</div>
						</div>
					)
				})
			}
		</div>
	));

	render.push((
		<div className='awards'>
		<div className='row_full'><div className="Heading">{resume.Awards.heading}</div><hr/></div>
			<div className=''>
			{
				resume.Awards.sections.map(section=>{
					return (
						<div className='template2_column pageBreak'>
							<div className='row_far2'>
								<div className='awardName'>{section['Award Name'].value}</div>
								<div className='awarder'>{section['Awarder'].value}</div>
							</div>
							<div className='summary'>{section['Summary'].value}</div>
							<div className='awardDate'>{section['Award Date'].value}</div>
						</div>
					)
				})
			}
			</div>
		</div>
	));

	return [renderToString(render), render];
}

export {Style};

export {Render};

const Template = (props) => {
	let resume = props.resume;
	// console.log(resume);

	const [html, prev] = Render(resume);
	console.log(html);
	let [pdf, setPdf] = useState(props.pdf);

	useEffect(()=>{
		setPdf(props.pdf);
	}, [props.pdf])


	async function downloadPdf(data) {
	  try {
	    const response = await axios.post('/resume', {resume: "<div class='template2'>"+data+"</div>", style: Style},{responseType: 'blob'});
	    console.log(response);
	    // const content = response.headers['content-type'];
       	// download(response.data, "resume.pdf", content);
       	// window.open(URL.createObjectURL(response.data));
  //      	var url = window.URL.createObjectURL(response.data);
		// var a = document.createElement('a');
		// a.href = url;
		// a.download = "resume.pdf";
		// a.click();
		// a.remove();
		// setTimeout(() => window.URL.revokeObjectURL(url), 100);

		//
		var objectURL = URL.createObjectURL(response.data);
		setPdf(objectURL);
		//
	  } catch (error) {
	    console.error(error);
	  }
	}

	console.log("PDF:",pdf);

	return (
		<div className='template1'>
		{/*{prev}*/}
		<iframe style={{"backgroundColor":"rgb(35.859, 27.891, 27.891)"}} src={pdf} className='pdf' frameBorder='0'></iframe>
		</div>
	);

}


export default Template;

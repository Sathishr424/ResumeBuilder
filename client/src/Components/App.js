import Header from "./Header"
import Sections from "./Sections"
import Preview from "./Preview"
import Template from "./MainSections/Template"
import CustomSection from "./MainSections/CustomSection"
import {useState, useEffect} from "react"
import axios from 'axios';
import T1 from "../Images/template1.png"
import T2 from "../Images/template2.png"
import T3 from "../Images/template3.png"
import T4 from "../Images/template4.png"
import T5 from "../Images/template5.png"
import {Style as style1, Render as render1} from "../Templates/template1.js";
import {Style as style2, Render as render2} from "../Templates/template2.js";
  
function App() {

  let [style, setStyle] = useState(1);

  let [activeSection, setActiveSection] = useState(0);

  let [resume, setResume] = useState( 
    {
      Profile: {name:'Profile', heading: '', extra: false, sections: [
        {
          Name: {required: true, value:'', placeHolder:'Name', type: 'text'},
          Email: {required: true, value:'', placeHolder:'Email', type: 'email'},
          Mobile: {required: true, value:'', placeHolder:'Mobile', type: 'text'},
          Portfolio: {value:'', placeHolder:'Link', type: 'text'},
          LinkedIn: {value:'', placeHolder:'Link', type: 'text'},
          Address: {value:'', placeHolder:'Address', type: 'text'}
        }
      ]},
      Education: {name: 'Education', heading: '', extra: true, sections: [
        {
          'College Name': {required: true, value:'', placeHolder:'Name', type: 'text'},
          'College Location': {required: true, value:'', placeHolder:'Stanford, CA', type: 'text'},
          'Degree': {required: true, value:'', placeHolder:'BS', type: 'text'},
          'Major': {required: true, value:'', placeHolder:'Computer Science', type: 'text'},
          'GPA': {required: true, value:'', placeHolder:'5.5', type: 'text'},
          'Start Date': {required: true, value:'', placeHolder:'June 2017', type: 'text'},
          'End Date': {required: true, value:'', placeHolder:'May 2021', type: 'text'}
        }
      ]},
      Work: {name: 'Work', heading: '', extra: true, sections: [
        {
          'Company Name': {required: true, value:'', placeHolder:'Google', type: 'text'},
          'Job Title': {required: true, value:'', placeHolder:'Software Engineer', type: 'text'},
          'Job Location': {required: true, value:'', placeHolder:'Mountain View, CA', type: 'text'},
          'Start Date': {required: true, value:'', placeHolder:'June 2017', type: 'text'},
          'End Date': {required: true, value:'', placeHolder:'May 2021 / Present / Etc.', type: 'text'},
          'Job Responsibilities': {required: true, value:[''], placeHolder:'I did this stuff in company', type: 'addable'}
        }
      ]},
      Skills: {name: 'Skills', heading: '', extra: true, sections: [
        {
          'Skill Name': {required: true, value:'', placeHolder:'Programming Languages', type: 'text'},
          'Skill Details': {required: true, value:[''], placeHolder:'Java', type: 'addable'}
        }
      ]},
      Projects: {name: 'Projects', heading: '', extra: true, sections: [
        {
          'Project Name': {required: true, value:'', placeHolder:'Chat App', type: 'text'},
          'Project Description': {required: true, value:'', placeHolder:'Online chat app', type: 'text'},
          'Link to Project': {required: true, value:'', placeHolder:'https://project.com', type: 'text'},
          'Tools Used': {required: true, value:[''], placeHolder:'Java', type: 'addable'}
        }
      ]},
      Awards: {name: 'Awards', heading: '', extra: true, sections: [
        {
          'Award Name': {required: true, value:'', placeHolder:'FrontEnd Developer', type: 'text'},
          'Award Date': {required: true, value:'', placeHolder:'Sep 2020', type: 'text'},
          'Awarder': {required: true, value:'', placeHolder:'FreeCodeCamp', type: 'text'},
          'Summary': {required: true, value:'', placeHolder:'Rewarded for 300 hours course work and projects', type: 'text'}
        }
      ]}
    }
  );

  useEffect( ()=>{
      var data = localStorage.getItem('Resume');
      console.log(JSON.parse(data));
      if (data) setResume(JSON.parse(data));
    }, []
  )

  let [templates, setTemplates] = useState([
      {
        id: 1,
        src: T1,
        title: "Template 1",
        active: true
      },
      {
        id: 2,
        src: T2,
        title: "Template 2",
        active: false
      },
      {
        id: 3,
        src: T3,
        title: "Template 3",
        active: false
      },
      {
        id: 4,
        src: T4,
        title: "Template 4",
        active: false
      },
      {
        id: 5,
        src: T5,
        title: "Template 5",
        active: false
      }
    ]);

  let [sections, setSections] = useState([
    {name: "Templates", active: true},
    {name: "Profile", active: false},
    {name: "Education", active: false},
    {name: "Work", active: false},
    {name: "Skills", active: false},
    {name: "Projects", active: false},
    {name: "Awards", active: false}
  ]);

  const templateHandler = (id) => {
    // console.log(id);
    setTemplates(templates.map(t=>{
      if (t.id == id) t.active = true;
      else if(t.active == true) t.active = false;
      return t;
    }));
    setStyle(id);
    sectionHandler("Templates");
    // console.log(templates);
  }

  const build = () => {
    console.log("Building..");
    localStorage.setItem('Resume', JSON.stringify(resume));
    
  }

  const contentHandler = (content) => {
    resume[content.name] = content;
    setResume(resume);
    sectionHandler(content.name);
  }

  const sectionHandler = (name) => {
    setSections(sections.map((sec,i)=>{
      if (sec.name == name) {
        sec.active = true;
        setActiveSection(i);
      }
      else if(sec.active) sec.active = false;
      return sec;
    }));

    if (name == 'Templates') setSection((<Template templates={templates} handler={templateHandler} />));
    else{
      setSection((<CustomSection name={name} content={resume[name]} handler={contentHandler}/>))
    }
  }

  const nextSection = () => {
    if (activeSection < sections.length-1){
      setActiveSection(activeSection+1);
      sectionHandler(sections[activeSection+1].name);
      console.log("NEXT:", sections[activeSection+1].name);
    }
  }

  const prevSection = () => {
    if (activeSection > 0){
      setActiveSection(activeSection-1);
      sectionHandler(sections[activeSection-1].name);
      console.log("PREV:", sections[activeSection-1].name);
    }
  }

  let [pdf, setPdf] = useState("");

  let render, cssStyle;

  async function downloadPdf(open=false) {
    try {
      const response = await axios.post('/resume', {resume: "<div class='template1'>"+render+"</div>", style: cssStyle},{responseType: 'blob'});
      console.log(response);
      // const content = response.headers['content-type'];
        // download(response.data, "resume.pdf", content);
      // if (open) window.open(URL.createObjectURL(response.data));
  //        var url = window.URL.createObjectURL(response.data);
    // var a = document.createElement('a');
    // a.href = url;
    // a.download = "resume.pdf";
    // a.click();
    // a.remove();
    // setTimeout(() => window.URL.revokeObjectURL(url), 100);

    //
    var objectURL = URL.createObjectURL(response.data);
    setPdf(objectURL);
    console.log(objectURL);
    //
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(style);

  switch (style){
    case 1:
      render = render1(resume)[0];
      cssStyle = style1;
      break;
    case 2:
      render = render2(resume)[0];
      cssStyle = style2;
      break;
  }
  // console.log(render, cssStyle);

  let [section, setSection] = useState((<Template templates={templates} handler={templateHandler} />));

  let prev, next, make;

  if (activeSection > 0) prev = (<div className='myBtn' onClick={prevSection}>Prev</div>);
  else prev = (<div className='myBtn' style={{"pointerEvents":"none", "opacity":"0.5"}}>Prev</div>);
  if (activeSection >= 0 && activeSection < sections.length-1) next = (<div className='myBtn' onClick={nextSection}>Next</div>);
  else next = (<div className='myBtn' style={{"pointerEvents":"none", "opacity":"0.5"}}>Next</div>);
  if (activeSection == sections.length-1) make = (<div onClick={downloadPdf} className='myBtn'>Build PDF</div>);
  else make = (<div className='myBtn' style={{"pointerEvents":"none", "opacity":"0.5"}}>Build PDF</div>);

  useEffect(()=>{
    setPdf("");
  }, [style])

  return (
    <div className="main">
      <Header />
      <div className='container'>
        <Sections build={build} buildPdf={downloadPdf} sections={sections} btnHandler={sectionHandler} />
        {section}
        <Preview pdf={pdf} resume={resume} template={style}/>
      </div>
      <div className='footer'>
        {prev}
        {make}
        {next}
      </div>
    </div>
  );
}

export default App;

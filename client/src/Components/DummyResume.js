export default {
  Profile: {name:'Profile', heading: '', extra: false, sections: [
    {
      Name: {required: true, value:'', placeHolder:'Name', type: 'text'},
      Email: {required: true, value:'', placeHolder:'Email', type: 'email'},
      Mobile: {required: true, value:'', placeHolder:'Mobile', type: 'text'},
      Protofolio: {value:'', placeHolder:'Link', type: 'text'},
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
};
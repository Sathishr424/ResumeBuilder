import T1 from "./template1.png"
import T2 from "./template2.png"

class TemplateImages{
	constructor(){
		this.templates = [
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
			}
		]
	
	}

	changeTemplate(id){
		this.templates = this.templates.map(t=>{
			if (t.id == id) t.active = false;
			else if(t.active == true) t.active = false;
			return t;
		});
		return this.templates;
	}

}

export default TemplateImages;
let Request = require ('request');

describe("server",() => {
	let recipeid;

	describe("POST /API/addactivity",() =>{
		let data = {};
		beforeAll((done) => {
			Request({methode:'POST',uri:'http://localhost:3000/API/addactivity',body:{m:{icon:"", name:"Hiking"}},json:true},(error, response) => {  
                data.status = response.statusCode;
				data.body = JSON.parse(response.body);
				done();
			}).auth(null,null,true,process.env.VALID_TOKEN)
		});
		it("status",() => {
			expect(data.status).toBe(200);
		});
		it("body",()=>{
			expect(data.body.m.name).toBe("Hiking");
			expect(data.body.length).toBe(0);
			expect(data.body.m._id).toBeDefined();
			recipeid = data.body.m._id;
		});
	})
	describe("DELETE /API/deleteactivity",() =>{
		beforeAll((done) => {
			Request.delete(`http://localhost:3000/API/deleteactivity${recipeid}`,(error, response) => {
				data.status = response.statusCode;
				data.body = JSON.parse(response.body);
				done();
			}).auth(null,null,true,process.env.VALID_TOKEN)
		});
		it("status",() => {
			expect(data.status).toBe(200);
		});
	})
	describe("GET /API/moods",() =>{
		let data = {};
		beforeAll((done) => {
			Request.get("http://localhost:3000/API/moods",(error, response) => {
				data.status = response.statusCode;
				data.body = JSON.parse(response.body);
				done();
			}).auth(null,null,true,process.env.VALID_TOKEN)
		});
		it("status",() => {
			expect(data.status).toBe(200);
		});
		it("body",()=>{
			expect(data.body.length).toBe(1);
		});
	})
	
});
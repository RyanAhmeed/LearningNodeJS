const express = require('express');
const Joi = require('joi');

const app = express();


app.use(express.json());

const courses = [
	{id: 1, name: 'course1'},
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'}
];

/*
app instance have some method():

app.get(); // it's take two argument 1.url , 2. call back function (req, res) req = request and res = respose
app.post();
app.put();
app.delete();


call back function also called route handler :)
*/

app.get('/', (req, res) => {
	res.send("Hello, World!");
});

app.get('/api/courses', (req, res) => {

	res.send(courses);
});

/*
app.get('/api/courses/:id', (req, res) => {
	//res.send(req.params.id)
	res.send(req.query)
})
*/
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course){
		res.status(404).send('The course with the given Id was not found');
	}
	else{
		res.send(course)
	}
});

app.post('/api/courses', (req, res) => {
	const schema = {
		name:Joi.string().min(3).required()
	}
	const result = Joi.validate(req.body, schema);
	//console.log(result)
/*
	if(!req.body.name || req.body.name.length < 3){
		res.status(400).send('Name is required and should be minimum 3 characters.');
		return;  
	}
*/
	if(result.error){
		res.status(404).send(result.error.details[0].message)
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
})


app.put('/api/courses/:id', (req, res) => {
	// Look up the course
	// If note existing, return 404

	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course){
		res.status(404).send('The course with the given Id was not found');
		return;
	}

	//Validate
	// If invalid, return 400 - Bad request

	const schema = {
		name:Joi.string().min(3).required()
	}
	//const result = Joi.validate(req.body, schema);

	 const {error} = validatedCourse(req.body) // object destructuring

	if(error){
		res.status(404).send(error.details[0].message)
		return;
	}

	// Update course

	course.name = req.body.name;

	//Return the update

	res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
	// Look up the course
	// Not existing , return 404
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course){
		return res.status(404).send('The course with the given Id was not found');
	}

	// Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	// Return the same couruse

	res.send(course);
})


function validatedCourse(course){
	const schema = {
		name:Joi.string().min(3).required()
	}
	return Joi.validate(course, schema);
}


// Environment Variables 

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})





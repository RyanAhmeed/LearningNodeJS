const express = require('express')
const router = express.Router();


const courses = [
	{id: 1, name: 'course1'},
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'}
];


/*
router.get('/:id', (req, res) => {
	//res.send(req.params.id)
	res.send(req.query)
})
*/
router.get('/', (req, res) => {
	res.send(courses);
});


router.get('/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course){
		res.status(404).send('The course with the given Id was not found');
	}
	else{
		res.send(course)
	}
});

router.post('/', (req, res) => {
	const schema = {
		name:Joi.string().min(3).required()
	}
	const result = Joi.validate(req.body, schema);

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


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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


module.exports = router;
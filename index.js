const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses')
const home = require('./routes/home')


const logger = require('./logger')


const app = express();

app.set('view engine', 'pug');
// app.set('views' './custome_views') # it's means if you want to store your template in custom folder.



//process.env.NODE_ENV // if set NODE_ENV not define then it show undefine


/*built in middlwere in express*/
app.use(express.json()); // it's a built in middleware. Which is  parses the boby of the middleware and if there is a json object it will populate on req.body
  
app.use(express.urlencoded({extended: true})); // this  middleware function parse incoming request with url example:https://1234.com/key=value&n=24

app.use(express.static('public'));

/* end express middlewere*/

app.use('/api/courses', courses);

app.use('/', home);


console.log('Appliction Name: ' + config.get('name'));
console.log('Mail  Server: ' + config.get('mail.host'));
console.log('Mail  Password: ' + config.get('mail.password'));



if(app.get('env') === 'development'){ // it's means morgan only work in development machine .default app.get('env') return development.
	app.use(morgan('tiny')) // it's show log message in tiny format when do api request.
	//console.log("Morgan is enable")

	debug("Morgan is enable");
}

app.use(logger); //customer middleware function


/*
app instance have some method():

app.get(); // it's take two argument 1.url , 2. call back function (req, res) req = request and res = respose
app.post();
app.put();
app.delete();


call back function also called route handler :)
*/

// Environment Variables 
// Change something (check branch work :).

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})





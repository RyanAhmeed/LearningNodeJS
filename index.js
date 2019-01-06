const mongoose = require('mongoose');
//>>> md c:\\data (tutorial: 3)
const config = {
   // autoIndex: false,
    useNewUrlParser: true
  };

mongoose.connect("mongodb://localhost:27017/playground", config)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(() => console.log('Could not connect to MongDB..', err))


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

// Classes, objects
// Course, nodeCourse

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Sajal',
        tags: ['react', 'front-end'],
        isPublished: true
    });

    const result = await course.save();

    console.log(result);
}

//createCourse();

async function getCourses() { 

    // comparison operator
    // eq (equal)
    // ne (not equal)
    // gt (greater thant)
    // gte (greater than or equal to )
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    //Logical Operator
    // or
    //and
    // /api/couses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({isPublished: true})
        .select({name: 1})
        .sort({name: 1})
        //.find({author: 'Mosh', isPublished: true})
        //.find({price: {$gt: 10, $lte: 20}})
        //.find({ price: {$in: [10, 15, 20]}})
        //.find()
        //.or([{ author: 'Mosh'}, { isPublished: true}])
        //.find({ author: /^Mosh/ })
        //.limit(10)
        //.sort({name: -1 }) //1 assending order -1 decending order
        //.select({ name: 1, tags: 1})
        //.count() // Deprecated
        //.countDocuments()

    console.log(courses);
}


getCourses();


async function updateCourse(id){
    // Approach: Query first 
    // findById()
    // Modify its properties
    // Save();
    //const course = await Course.findById(id);


    
   // if(!course) return;
    // approach 01
    /*
    course.isPublished = false;
    course.author = 'Another Author';
    */
    //approahc 02
    /*
    course.set({
        isPublished: true,
        author: 'Another Author'
    }); */
   //const result = await course.save();

   //console.log(result);

    // Approach Update first
    // Update directly 
    // Optionally: get the updated document

    const result = await Course.updateOne({_id: id}, {
        $set: {
            name:"Ami toke Chini na.",
            author: 'Abul',
            isPublished: false,
        }
    });
    console.log(result);
}   
//updateCourse('5c31f8c15eb32120e055ec56');



async function removeCourse(id){

    const result = await Course.deleteOne({ _id: id})
    console.log(result);
}   
removeCourse('5c31f8c15eb32120e055ec56')
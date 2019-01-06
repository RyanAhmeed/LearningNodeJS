//const p = Promise.resolve({id: 1}) // inside of resolve we can pass a single value of a object.
//const p = Promise.reject (new Error("Reason for rejection...")); // new Error called error stack() :)
//p.catch(error => console.log(error))

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operations 1...');
       resolve(1);
       //reject(new Error("Because somethign failed."));


    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operations 2...');
        resolve(2);
        

    }, 2000);
})
/*

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message)) */

Promise.race([p1, p2]) // it will return first promise that are completed.
    .then(result => console.log(result))
    .catch(err => console.log(err.message))
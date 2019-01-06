console.log("Before");
/*
//Callback 1
getUser(1, (user) =>{
    getRepositories(user.gitHubUsername, (repos) => {
        console.log("repos", repos);
        getCommits(repo, (commit) => {

        });
    });
});
*/


/*
//Callback 2
getUser(1, abcfunction);
function abcfunction(user){
    getRepositories(user.gitHubUsername, xyzfunction);
}
function xyzfunction(abc){
    console.log(abc);
}
*/
/*
const p = getUser(1);
p.then(user => console.log(user)) 
*/


//!Promise
/*
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos))
    .then(commits => console.log("commits ", commits))
*/


//Async and Await approach
async function displayCommit(){
    try{
        const user = await getUser(1)
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
    }
    catch(err){
        console.log('Error: ', err.message);
    }

   //console.log(commits);
}
displayCommit();
console.log("After")

// End 

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database..');
            resolve({id: id, gitHubUsername: 'Mosh'}) 
        }, 2000);
    });
/*
    setTimeout(() => {
        console.log('Reading a user from a database..');
        callback({id: id, gitHubUsername: 'Mosh'}) 
    }, 2000);

*/
}
// deal with asynchronous we need
// Callbacks
// Promises
//Async/await

function getRepositories(username) {
    return new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(['repo1', 'repo2', 'repo3']);
            console.log(username);
        }, 2000);
    })

/*
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
        console.log(username);
    }, 2000);
*/
}
function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            //resolve(['Commit']);
            reject(new Error('This is a try catch check'));
        }, 2000);
    })
}
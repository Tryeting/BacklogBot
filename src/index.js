const github = require('@actions/github');

const key = process.env.API_KEY;
console.log(key);
const id = process.env.ISSUE_TYPE_ID;
console.log(id);
const id2 = process.env.PROJECT_KEY;
console.log(id2);
const payload = JSON.stringify(github.context.payload, undefined, 2)
console.log(`The event payload: ${payload}`);

console.log("start");
const github = require('@actions/github');

const key = process.env.BACKLOG_API_KEY;
console.log(key);
const payload = JSON.stringify(github.context.payload, undefined, 2)
console.log(`The event payload: ${payload}`);

console.log("start");
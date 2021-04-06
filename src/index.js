const github = require('@actions/github');
const client = require('request');

const payload = JSON.stringify(github.context.payload, undefined, 2)
console.log(`The event payload: ${payload}`);

console.log("start");

//環境変数の取得
const API_KEY = process.env.API_KEY;
const ISSUE_TYPE_ID = process.env.ISSUE_TYPE_ID;
const PROJECT_ID = process.env.PROJECT_ID;
const API_HOST = process.env.API_HOST;

//とりあえずBACKLOGAPIを叩いてみる
const uel = `https://${API_HOST}/api/v2/projects/${PROJECT_ID}/issueTypes`;
const a = get(url,API_KEY);

console.log(a);

const get = async (url,key) => {
    return await client.get({
        url:url,
        qs:{
            apiKey:key
        }
    })
}
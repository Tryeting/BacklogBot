const github = require('@actions/github');
const client = require('request');

const get = async (url, key) => {
    return await client.get({
        url: url,
        qs: {
            apiKey: key
        }
    })
}

const main = async () => {
    console.log("start");

    //環境変数の取得
    const API_KEY = process.env.API_KEY;
    const ISSUE_TYPE_ID = process.env.ISSUE_TYPE_ID;
    const PROJECT_ID = process.env.PROJECT_ID;
    const API_HOST = process.env.API_HOST;

    //とりあえずBACKLOGAPIを叩いてみる
    const url = `https://${API_HOST}/api/v2/projects/${PROJECT_ID}/issueTypes`;
    const a = await get(url, API_KEY);

    console.log(a);

}

main();


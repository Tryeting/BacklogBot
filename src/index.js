const github = require('@actions/github');
const axios = require('axios');

const get = async (url, key) => {
    return await axios.get(url, {
        params: {
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
    const res = await get(url, API_KEY);

    console.log(res.data);

}

main();


const github = require('@actions/github');
const axios = require('axios');

const getCategories = async (host, key, projectId) => {
    const url = `https://${host}/api/v2/projects/${projectId}/categories?apiKey=${key}`;
    const res = await axios.get(url);
    return res.data;
}

const main = async () => {
    //環境変数の取得
    const API_KEY = process.env.API_KEY;
    const ISSUE_TYPE_ID = process.env.ISSUE_TYPE_ID;
    const PROJECT_ID = process.env.PROJECT_ID;
    const API_HOST = process.env.API_HOST;
    const issue = github.context.payload.issue;

    //issue作成の場合課題を作る
    if (issue.state == "open") {
        const PRIORITY_ID = "3";

        //課題作成する
        const CreateIssueUrl = `https://${API_HOST}/api/v2/issues?apiKey=${API_KEY}`;
        try {

            //Backlogのカテゴリ一覧取得する
            const categories = await getCategories();
            console.log(categories);
            const category = categories.find(t=>t.name==="bug");
            console.log(category);

            // const params = new URLSearchParams();
            // params.append("projectId", PROJECT_ID);
            // params.append("summary", `#${issue.number} ${issue.title}`);
            // params.append("issueTypeId", ISSUE_TYPE_ID);
            // params.append("priorityId", PRIORITY_ID);
            // params.append("description", `${issue.body}\n\ngithubURL：${issue.html_url}`);
            // const res = await axios.post(CreateIssueUrl, params);
            // console.log(res.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    //issue作成の場合課題を作る
    if (issue.state == "closed") {
        console.log("issuecloseされたよ");
    }
}

main();


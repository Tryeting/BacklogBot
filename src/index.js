const github = require('@actions/github');
const axios = require('axios');

const main = async () => {
    console.log("start");

    //環境変数の取得
    const API_KEY = process.env.API_KEY;
    const ISSUE_TYPE_ID = process.env.ISSUE_TYPE_ID;
    const PROJECT_ID = process.env.PROJECT_ID;
    const API_HOST = process.env.API_HOST;
    const issue = github.context.payload.issue;

    //issue作成の場合課題を作る
    if (issue.state == "open") {
        console.log("issue作成されたよ");
        console.log(issue.body);
        console.log(issue.title);
        console.log(issue.html_url);
        const PRIORITY_ID = "3";

        //課題作成する
        const CreateIssueUrl = `https://${API_HOST}/api/v2/issues/${PROJECT_ID}/issueTypes?apiKey=${API_KEY}`;
        try {
            const params = new URLSearchParams();
            params.append("projectId",PROJECT_ID);
            params.append("summary",issue.title);
            params.append("issueTypeId",ISSUE_TYPE_ID);
            params.append("priorityId",PRIORITY_ID);
            // params.append("description",`${issue.body}\ngithubURL:${issue.html_url}`);
            params.append("description","test");
            console.log(params);
            const res = await axios.post(CreateIssueUrl,params);
            console.log(res);
            console.log(res.data);
        }
        catch (e) {
            console.log(e);
        }

    }

    //issue作成の場合課題を作る
    if (issue.state == "close") {
        console.log("issuecloseされたよ");
    }
}

main();


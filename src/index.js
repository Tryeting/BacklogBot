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
        const res = await axios.post(CreateIssueUrl, {
            projectId: PROJECT_ID,
            summary: issue.title,
            issueTypeId: ISSUE_TYPE_ID,
            priorityId: PRIORITY_ID,
            description: `${issue.body}\ngithubURL:${issue.html_url}`
        });
        console.log(res);
        console.log(res.data);

    }

    //issue作成の場合課題を作る
    if (issue.state == "close") {
        console.log("issuecloseされたよ");
    }
}

main();


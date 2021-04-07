const github = require('@actions/github');
const axios = require('axios');

const getCategories = async (host, key, projectId) => {
    const url = `https://${host}/api/v2/projects/${projectId}/categories?apiKey=${key}`;
    const res = await axios.get(url);
    return res.data;
}

const createIssueSummary = (num, title) => {
    return `#${num} ${title}`;
}

const closeIssue = async (host, key, issueId) => {
    const url = `https://${host}/api/v2/issues/${issueId}?apiKey=${key}`;
    const CLOSE_STATUS_ID = 4;
    const res = await axios.patch(url, {
        statusId: CLOSE_STATUS_ID
    });
    return res;
}

const searchIssues = async (host, key, keyword) => {
    const url = `https://${host}/api/v2/issues?apiKey=${key}&keyword=${keyword}`;
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
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);

        //課題作成する
        const CreateIssueUrl = `https://${API_HOST}/api/v2/issues?apiKey=${API_KEY}`;
        try {

            //Backlogのカテゴリ一覧取得する
            const categories = await getCategories(API_HOST, API_KEY, PROJECT_ID);
            console.log(categories);
            const category = categories.find(t => t.name === "bug");
            console.log(category);
            console.log(category.id);

            // const params = new URLSearchParams();
            // params.append("projectId", PROJECT_ID);
            // params.append("summary", createIssueSummary(issue.number,issue.title));
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
        //対応する課題を取得
        const keyword = createIssueSummary(issue.number, issue.title);
        const issues = searchIssues(API_HOST, API_KEY, keyword);
        console.log(issues);
        console.log("issuecloseされたよ");
    }
}

main();


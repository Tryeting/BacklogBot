const github = require('@actions/github');
const backlog = require('./backlog');

const main = async () => {
    //環境変数の取得
    const API_KEY = process.env.API_KEY;
    const ISSUE_TYPE_ID = process.env.ISSUE_TYPE_ID;
    const PROJECT_ID = process.env.PROJECT_ID;
    const API_HOST = process.env.API_HOST;
    const CATEGORY_ID = process.env.CATEGORY_ID;
    const issue = github.context.payload.issue;

    //issue作成の場合課題を作る
    if (issue.state == "open") {
        const PRIORITY_ID = "3";

        //課題作成する
        try {
            const params = new URLSearchParams();
            params.append("projectId", PROJECT_ID);
            params.append("summary", `#${issue.number} ${issue.title}`);
            params.append("issueTypeId", ISSUE_TYPE_ID);
            params.append("priorityId", PRIORITY_ID);
            params.append("description", `${issue.body}\n\ngithubURL：${issue.html_url}`);
            params.append("categoryId[]", CATEGORY_ID);
            const res = await backlog.addIssueAsync(API_HOST, API_KEY, params)
            console.log(res.data);
            console.log(res.erros);
        }
        catch (e) {
            console.log(e);
        }
    }

    //issue作成の場合課題を作る
    if (issue.state == "closed") {
        //対応する課題を取得
        const keyword = `${issue.number} ${issue.title}`;
        const issues = await backlog.searchIssuesAsync(API_HOST, API_KEY, keyword);
        console.log(keyword);
        console.log(issues);
        console.log(issues[0].id);
        await backlog.closeIssueAsync(API_HOST, API_KEY, issues[0].id);
        
    }
}

main();


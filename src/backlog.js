const axios = require('axios');

exports.getCategoriesAsync = async (host, key, projectId) => {
    const url = `https://${host}/api/v2/projects/${projectId}/categories?apiKey=${key}`;
    const res = await axios.get(url);
    return res.data;
}

exports.closeIssueAsync = async (host, key, issueId) => {
    const url = `https://${host}/api/v2/issues/${issueId}?apiKey=${key}`;
    const CLOSE_STATUS_ID = 4;
    const res = await axios.patch(url, {
        statusId: CLOSE_STATUS_ID
    });
    return res;
}

exports.searchIssuesAsync = async (host, key, keyword) => {
    const url = `https://${host}/api/v2/issues?apiKey=${key}&keyword=${keyword}`;
    const encodeUri = encodeURI(url);
    console.log(url);
    console.log(encodeUri);
    const res = await axios.get(encodeUri);
    return res.data;
}

exports.addIssueAsync = async (host, key, params) => {
    const url = `https://${host}/api/v2/issues?apiKey=${key}`;
    const res = await axios.post(url, params);
    return res;
}
const axios = require('axios');

export const getCategoriesAsync = async (host, key, projectId) => {
    const url = `https://${host}/api/v2/projects/${projectId}/categories?apiKey=${key}`;
    const res = await axios.get(url);
    return res.data;
}

export const closeIssueAsync = async (host, key, issueId) => {
    const url = `https://${host}/api/v2/issues/${issueId}?apiKey=${key}`;
    const CLOSE_STATUS_ID = 4;
    const res = await axios.patch(url, {
        statusId: CLOSE_STATUS_ID
    });
    return res;
}

export const searchIssuesAsync = async (host, key, keyword) => {
    const url = `https://${host}/api/v2/issues?apiKey=${key}&keyword=${keyword}`;
    const res = await axios.get(url);
    return res.data;
}
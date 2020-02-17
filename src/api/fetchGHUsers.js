import axios from "axios";

export const fetchUserRepos = (searchTerm, lang, sort) => {
    //create query string
    const language = lang.length === 0 || lang === 'all' ? '' : `+language:${lang}`;
    const sortTerm = sort.length > 0 ? `+sort:${sort}` : '';
    const query = `?q=user:${searchTerm}${language}${sortTerm}&per_page=1000`;

    const fetchReposUrl = `https://api.github.com/search/repositories${query}`;

    return axios
        .get(fetchReposUrl)
        .then(response => {
            console.log("Successfully fetched repos for user!", response);
            return response.data.items;
        })
        .catch(error => {
            console.log("Failed to fetched repos for user", error);
        });
};

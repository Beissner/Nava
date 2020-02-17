import axios from "axios";

export const fetchGHUsers = (searchTerm, lang, sort) => {
    //sortTerms --> 'updated' 'stars' 'forks'
    //filter language --> list of languages
    console.log("value of lang and sort: ", lang, sort);
    const language = lang.length === 0 || lang === 'all' ? '' : `+language:${lang}`;
    const sortTerm = sort.length > 0 ? `+sort:${sort}` : '';
    const query = `?q=user:${searchTerm}${language}${sortTerm}&per_page=1000`
    const fetchUsersUrl = `https://api.github.com/search/repositories${query}`;    //GitHub+Octocat+in:readme+


    return axios
        .get(fetchUsersUrl)
        .then(response => {
            console.log("Successfully fetched repos for user!", response);
            return response.data.items;
        })
        .catch(error => {
            console.log("Failed to fetched repos for user", error);
        });
};

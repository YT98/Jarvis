import fetch from 'node-fetch';
import config from './config';
import NewsAPI from 'newsapi';

const newsapi = new NewsAPI(config.newsApiKey);

function getHeadlines() {
    newsapi.v2.topHeadlines({
        language: 'en',
        category: 'technology'
    }).then(response => {
        console.log(response);
    }).catch(e => console.log(e));
}

export { getHeadlines };
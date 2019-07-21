import React, {Component} from "react";
import NewsFilters from "./NewsFilters.js";
import axios from "axios";
import apis from "../constants/apis.js";

// 1. When NewsFeed component mounts, fetch 100 News API articles X
// 2. Update state to store all 100 articles X
// 3. Upon state update, make an API call to Aylien to fetch sentiment data for newest article
// 4. Render article on page
// 5. Wait 10 seconds using setTimeout
// 6. Remove first article from article state array (that's the newest one)
// 7. Upon another state update, rinse and repeat

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            articlesWithSent: [],
            avgSentiment: 50,
            query: "",
            country: ""
            // timeoutId: null
        }
    }
    
    componentDidMount() {
        this.fetchNews();
    }

    async fetchNews() {
        try {
            // 1. Fetch 100 News API articles using axios
            const newsApiResults = await axios.get(`${apis.newsApi.endpoint}`, {
                params: {
                    apiKey: apis.newsApi.key,
                    language: "en",
                    pageSize: 5,
                    q: this.state.query,
                    country: this.state.country
                }
            });
            
            // console.log("News articles successfully fetched:", newsApiResults);

            // 2. Store an array of the articles using the data return from the API call in state (with setState)
            this.setState({
                articles: newsApiResults.data.articles,
                articlesWithSent: []
            });
            
            // console.log("News articles saved to state");

        } catch(error) {
            console.log(error);
        }
    }


    componentDidUpdate(prevProps, prevState) {
        // console.log("Component was just updated! Running code...");
        // console.log("Articles now:", this.state);
        // console.log("Articles before:", prevState);
        if (this.state.query !== prevState.query || this.state.country !== prevState.country) {
            this.fetchNews();
            // clearTimeout(this.state.timeoutId);
        } else if (this.state.articles.length && this.state.articles.length !== prevState.articles.length) {
            this.fetchArticleSentiment();
        }
    }

    async fetchArticleSentiment() {
        try {
            const targetArticle = this.state.articles[0];

            // 1. Fetch sentiment data from Aylien using API call via axios
            // Text passed into API for analysis is the first headline title in the this.state.articles array
            const articleSentiment = await axios.get(`${apis.proxy + apis.aylien.endpoint}`, {
                headers: {
                    "X-AYLIEN-TextAPI-Application-Key": apis.aylien.key,
                    "X-AYLIEN-TextAPI-Application-ID": apis.aylien.id
                },
                params: {
                    mode: "tweet",
                    text: targetArticle.title,
                    language: "en"
                }
            });

            // console.log("Sentiment data successfully fetched", articleSentiment);

            this.setStateArticles(targetArticle, articleSentiment);
            
        } catch(error) {
            console.log(error);
        }
    }

    setStateArticles(targetArticle, articleSentiment) {
        const articleWithSent = {
            title: targetArticle.title,
            description: targetArticle.description,
            source: targetArticle.source.name,
            url: targetArticle.url,
            image: targetArticle.urlToImage,
            polarity: articleSentiment.data.polarity,
            polarityConfidence: articleSentiment.data.polarity_confidence,
            subjectivity: articleSentiment.data.subjectivity,
            subjectivityConfidence: articleSentiment.data.subjectivity_confidence
        }
        
        // 2. Create copy of current articles but with 1 less article
        const copyArticles = [...this.state.articles];
        copyArticles.shift();
        
        // 3. Create copy of rendered articles but with 1 more article
        const copyArticlesWithSent = [...this.state.articlesWithSent];
        copyArticlesWithSent.unshift(articleWithSent);

        const avgSentiment = this.getAvgSentiment(copyArticlesWithSent);

        if (!this.state.articlesWithSent.length) {
            this.setState({
                articlesWithSent: copyArticlesWithSent,
                articles: copyArticles,
                avgSentiment: avgSentiment
            });
        } else {
            const timeoutId = setTimeout(() => {    
                this.setState({
                    articlesWithSent: copyArticlesWithSent,
                    articles: copyArticles,
                    avgSentiment: avgSentiment
                });
            }, 3000);
            // this.setState({
            //     timeoutId: timeoutId
            // });
        }
    }

    renderArticles() {
        const renderedArticles = this.state.articlesWithSent.map((article, index) => {
            return (
                <div className="articleContainer" key={this.state.articlesWithSent.length - index}>
                    <a href={article.url} target="_blank"></a>
                    <div className="articleImage">
                        <img src={article.image} alt={article.description} />
                    </div>
                    <div className="articleInfo">
                        <h3>{article.title}</h3>
                        <h4>{article.source}</h4>
                    </div>
                    <div className="articleSentiment">
                        <h3>
                            Polarity: <br />
                            <span className={article.polarity}>{article.polarity}</span>
                        </h3>
                        <h4>
                            AI Confidence: <strong>{Math.floor(article.polarityConfidence * 100)}%</strong></h4>
                    </div>
                </div>
            );
        });
        // 1. Group together News API data and Aylien data into 1 renderable JSX object

    
        return (
            <div className="newsFeed">
                {renderedArticles}
            </div>
        );
    }

    getAvgSentiment(articles) {
        const avgSentiment = articles.map(article => {
            switch(article.polarity) {
                case "positive":
                    return 1 * article.polarityConfidence;
                    break;
                case "negative":
                    return -1 * article.polarityConfidence;
                    break;
                default:
                    return 0;
            }
        }).reduce((acc, cur) => {
            return acc + cur;
        }, 0) / articles.length * 50 + 50;

        // console.log(avgSentiment);

        return avgSentiment;
    }

    renderEmptyState() {
        return (
            <p>Loading articles...</p>
        )
    }

    onFilterSubmit = (query, country) => {
        this.setState({
          query: query,
          country: country
        });
      }

    render() {
        return (
            <main className="newsFeedComponent wrapper">
                <div className="sentimentBar">
                    <div className="avgSentiment" style={{left: `${this.state.avgSentiment}%`}}></div>
                    <div className="negSection"></div>
                    <div className="neutSection"></div>
                    <div className="posSection"></div>
                    <p>Avg. Polarity</p>
                </div>
                <NewsFilters onFilterSubmit={this.onFilterSubmit} />
                { this.state.articlesWithSent.length ? this.renderArticles() : this.renderEmptyState() }
            </main>
        );
    }
}

export default NewsFeed;
import React, {Component} from "react";
import NewsFilters from "./NewsFilters.js"; // This is a child component!
import axios from "axios";
import apis from "../constants/apis.js"; // Import object containing all API information
import CircularProgress from "@material-ui/core/CircularProgress"; // Import circular progress icon

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.timeoutId = null;
        this.state = {
            articles: [],
            articlesWithSent: [],
            avgSentiment: 50,
            query: "",
            country: ""
        }
    }
    
    // Upon initial page load, immediately fetch news articles from News API
    componentDidMount() {
        this.fetchNews();
    }

    // Performs 1 API call to News API and stores an array of the results in state
    async fetchNews() {
        try {
            // 1. Fetch 20 News API articles using axios
            const newsApiResults = await axios.get(`${apis.newsApi.endpoint}`, {
                params: {
                    apiKey: apis.newsApi.key,
                    language: "en",
                    pageSize: 20,
                    q: this.state.query, // defaults to all topics
                    country: this.state.country // defaults to all countries
                }
            });

            
            // 2. Store an array of the articles using the data return from the API call in state (with setState)
            this.setState({
                articles: newsApiResults.data.articles,
                articlesWithSent: [] // Hoping this would clear articles when setting a new filter... No luck
            });
            
        } catch(error) {
            console.log(error);
        }
    }

    // When new information comes in, do one of the following:
    // 1. If query or country has changed, fetch news articles again and start feed fresh
    // NOTE: This doesn't seem to work right now... Still needs work
    // 2. If there is still a backlog of articles to display on page AND 1 article was just removed from the backlog...
    // then do it all over again with the next article in the backlog!
    componentDidUpdate(prevProps, prevState) {
        if (this.state.query !== prevState.query || this.state.country !== prevState.country) {
            clearTimeout(this.timeoutId);
            this.fetchNews();
        } else if (this.state.articles.length && this.state.articles.length !== prevState.articles.length) {
            this.articleSentimentSequence();
        }
    }

    async articleSentimentSequence() {
        try {
            // For the newest article not rendered on page from News API...
            // (News API sorts their array newest to oldest)
            const targetArticle = this.state.articles[0];

            // 1. Fetch sentiment data from Aylien using API call via axios
            // Text passed into API for analysis is the headline title
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

            // 2. Chain call the next method in the sequence
            this.setStateArticles(targetArticle, articleSentiment);
            
        } catch(error) {
            console.log(error);
        }
    }

    // This chained method combines News API data with Aylien data
    // Then "moves" the target article from one array in state to another array in state
    setStateArticles(targetArticle, articleSentiment) {
        // 1. Create combined object with all important data
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
        
        // 2. Create copy of current articles but WITHOUT the target article
        const copyArticles = [...this.state.articles]; // spreads
        copyArticles.shift();
        
        // 3. Create copy of renderable articles array but with new combined article at the front of the line!
        const copyArticlesWithSent = [...this.state.articlesWithSent]; // spreads
        copyArticlesWithSent.unshift(articleWithSent);

        // 4. Get average sentiment/polarity of ALL articles currently in renderable articles array
        const avgSentiment = this.getAvgSentiment(copyArticlesWithSent);

        // 5. If this is the first article ever, immediately update state
        // This will trigger a re-render instantly, allowing the article to show up on page right away
        if (!this.state.articlesWithSent.length) {
            this.setState({
                articlesWithSent: copyArticlesWithSent,
                articles: copyArticles,
                avgSentiment: avgSentiment
            });
        // 6. Otherwise, wait 3 seconds before updating state and triggering a re-render
        // This creates more of a slow drip user experience, giving users time to read the headlines
        } else {
            this.timeoutId = setTimeout(() => {
                this.setState({
                    articlesWithSent: copyArticlesWithSent,
                    articles: copyArticles,
                    avgSentiment: avgSentiment,
                });
            }, 3000);
        }
    }

    // This method maps through every renderable article (in this.state.articlesWithSent)
    // And it returns JSX that can be rendered on page!
    renderArticles() {
        const renderedArticles = this.state.articlesWithSent.map((article, index) => {
            return (
                <a className="articleUrl" href={article.url} target="_blank" rel="noopener noreferrer" key={this.state.articlesWithSent.length - index}>
                <div className="articleContainer">
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
                </a>
            );
        });
    
        return (
            <div className="newsFeed">
                {renderedArticles}
            </div>
        );
    }

    // This method calculates the average sentiment of currently displayed articles
    // However, the average is shifted for a range from 0 to 100
    // 0 is negative, 50 is neutral, 100 is positive
    // I chose 0-100 because I'm using that number for the needle position in the avg. polarity bar on page
    getAvgSentiment(articles) {
        // 1. Map through articles and convert to array of weighted values
        // A positive article is worth 1, negative is -1, and neutral is 0
        // These are weighted by confidence though, so you multiply by polarity confidence for true weight
        const avgSentiment = articles.map(article => {
            switch(article.polarity) {
                case "positive":
                    return 1 * article.polarityConfidence;
                case "negative":
                    return -1 * article.polarityConfidence;
                default:
                    return 0;
            }
        // 2. Add up all weighted values and divide by number of articles for average
        // The range however is -1 to 1 right now, so...
        // Multiply by 50 to create a range of -50 to 50
        // Finally, shift range up 50 by adding 50, making range 0 to 100
        // Perfect for my sentiment bar!
        }).reduce((acc, cur) => {
            return acc + cur;
        }, 0) / articles.length * 50 + 50;

        // 3. Return value
        return avgSentiment;
    }

    renderEmptyState() {
        return (
            <div className="circularProgress">
                <CircularProgress color="primary" />
            </div>
        )
    }

    // This method gets passed to NewsFilters component,
    // so NewsFilter can update NewsFeed's state whenever filter is submitted!
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
                    <p>Avg. Polarity</p>
                </div>
                <NewsFilters onFilterSubmit={this.onFilterSubmit} />
                { this.state.articlesWithSent.length ? this.renderArticles() : this.renderEmptyState() }
            </main>
        );
    }
}

export default NewsFeed;
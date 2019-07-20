import React, {Component} from "react";
import axios from "axios";
import apis from "../constants/apis.js";
import { arrayExpression } from "@babel/types";

// 1. On click of button, update state of feedStarted to true
// 2. Make button disappear
// 3. Upon update of feedStarted state, using componentDidUpdate, fetch 100 News API articles

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedStarted: false
        }
    }

    async componentDidUpdate() {
        try {
            const newsApiResults = await axios.get(`${apis.newsApi.endpoint}`, {
                params: {
                    apiKey: apis.newsApi.key,
                    language: "en"
                }
            });

            console.log(newsApiResults);

            const aylienResults = await axios.get(`${apis.proxy + apis.aylien.endpoint}`, {
                params: {
                    mode: "tweet",
                    text: newsApiResults.data.articles[0].title,
                    language: "en"
                },
                headers: {
                    "X-AYLIEN-TextAPI-Application-Key": apis.aylien.key,
                    "X-AYLIEN-TextAPI-Application-ID": apis.aylien.id
                }
            });

            console.log(aylienResults);


            // 2. Update state using the data returned from API call
            // this.setState({ stockData: results });
    
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <main className="newsFeedComponent wrapper">
                <input className="viewButton" type="button" value="View" />
            </main>
        );
    }
}

export default NewsFeed;
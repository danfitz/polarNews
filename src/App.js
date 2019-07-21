import React, {Component} from 'react';
import Header from "./components/Header.js";
import NewsFeed from "./components/NewsFeed.js";
import Footer from "./components/Footer.js";
import "./styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header title="Polar News" />
        <NewsFeed />
        <Footer attributions={[{name: "News API", href: "https://newsapi.org/docs"}, {name: "Aylien", href: "https://docs.aylien.com/textapi"}]} />
      </div>
    );
  }
}

export default App;

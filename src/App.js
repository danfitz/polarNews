import React from 'react';
import Header from "./components/Header.js";
import NewsFeed from "./components/NewsFeed.js";
import Footer from "./components/Footer.js";
import "./styles/styles.scss"; // imports and applies all stylesheets
import "normalize.css"; // helps with ironing out issues rendering elements between browsers

function App() {

  return (
    <div className="appComponent">
      <Header title="Polar News" />
      <NewsFeed />
      <Footer attributions={[{name: "News API", href: "https://newsapi.org/docs"}, {name: "Aylien", href: "https://docs.aylien.com/textapi"}]} author="Dan Fitz" githubUrl="https://github.com/danielfitz/polarNews" />
    </div>
  );

}

export default App;
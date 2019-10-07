# Polar News

[https://polar.danfitz.com](https://polar.danfitz.com)

Discover how **positive**, **negative**, or **neutral** top news headlines are around the world using AI.

## Features

### How It Works

Curious how positive or negative the world stage is right now? Get a text analysis API to tell you!

You can view the positivity/negativity of individual top news articles. You also get a running average of positivity/negativity as more articles appear, giving you a (slight) peek into the current zeitgeist of the moment.

There's more too: **you can target specific topics and countries**. Curious about the current attitude of Canadian articles on "Trump"? What about the U.K. on "The Avengers"? You can do that too.

### Current Bounadries

* Only includes English articles
* Only includes top news articles
* Only analyzes headlines, not actual article contents
* Only provides 20 articles per query

### Pseudocode Explanation

This app is an intermediary between [News API](https://newsapi.org/) and the [Aylien Text Analysis API](https://docs.aylien.com/textapi).

Based on your filters, a GET request is made to News API, returning top headlines from news articles around the world. These headlines are passed through the Aylien Text Analysis API, which returns a polarity measurement of the text, and all this data is presented on the page in a slow drip.

What's a polarity measurement? Basically, it's a measurement of how positive, negative, or neutral the headline sounds.

## Feature Roadmap

Given everything available in both APIs, here's a few features worth logging here for possible future development:
* Analyze article contents, not just headlines (may require a web scraper)
* Add support for multiple languages (specifically ones that both News API and Aylien support)
* Increase number of articles per query (maybe 100?)
* Open up analysis to news articles from smaller news outlets

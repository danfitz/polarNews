(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,a){e.exports=a.p+"static/media/fullEarth.f825cd40.png"},41:function(e,t,a){e.exports=a(73)},71:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(35),c=a.n(i),l=a(10),s=a(7),o=a(12),u=a(11),m=a(13),p=a(36),h=a.n(p);var d=function(e){return r.a.createElement("header",{className:"headerComponent wrapper"},r.a.createElement("div",{className:"earthContainer"},r.a.createElement("img",{className:"earth",src:h.a,alt:"earth"})),r.a.createElement("h1",null,e.title),r.a.createElement("h2",null,"Discover how ",r.a.createElement("span",{className:"positive"},"positive"),", ",r.a.createElement("span",{className:"negative"},"negative"),", or ",r.a.createElement("span",{className:"neutral"},"neutral")," ",r.a.createElement("br",null)," top news headlines are around the world using AI"))},v=a(16),f=a(17),y=a.n(f),E=a(20),g=a(37),b=a(38),S=a.n(b),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){console.log(e.target);var t=e.target.name;a.setState(Object(g.a)({},t,e.target.value))},a.state={query:"",country:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"newsFiltersComponent wrapper"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.props.onFilterSubmit(e.state.query,e.state.country)}},r.a.createElement("input",{name:"query",type:"text",placeholder:"Filter Topic...",value:this.state.query,onChange:this.handleChange}),r.a.createElement("select",{name:"country",value:this.state.country,onChange:this.handleChange},r.a.createElement("option",{value:""},"All Countries"),r.a.createElement("option",{value:"us"},"U.S."),r.a.createElement("option",{value:"gb"},"U.K."),r.a.createElement("option",{value:"in"},"India"),r.a.createElement("option",{value:"ca"},"Canada"),r.a.createElement("option",{value:"au"},"Australia"),r.a.createElement("option",{value:"nz"},"New Zealand")),r.a.createElement("input",{type:"submit",value:"Set Filter"}),r.a.createElement(S.a,null)))}}]),t}(n.Component),k=a(22),N=a.n(k),A={proxy:"https://cors-anywhere.herokuapp.com/",tasteDive:{endpoint:"https://tastedive.com/api/similar",key:"340706-JSAdvanc-LLV2T1V7"},tmdb:{endpoint:"",key:"e34f013ef15026439088cf9cdb94f352"},omdb:{endpoint:"",key:"f6517cf7"},newsApi:{endpoint:"https://newsapi.org/v2/top-headlines",key:"1dc0a571d9fa434c9fc2e4660a5bfc7a"},aylien:{endpoint:"https://api.aylien.com/api/v1/sentiment",key:"b519c52791149e1b2e0d5fe93c647572",id:"2854d689"},iex:{endpoint:"",publishedKey:"Tpk_cc9c2f74e1444a69bd339d66448dad67",secretKey:"Tsk_8422d9bf69844f37b6051afca8e83998"},vantage:{endpoint:"",key:"9TH8WYTBQHB1T0DS"}},j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).onFilterSubmit=function(e,t){a.setState({query:e,country:t})},a.state={articles:[],articlesWithSent:[],avgSentiment:50,query:"",country:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.fetchNews()}},{key:"fetchNews",value:function(){var e=Object(E.a)(y.a.mark(function e(){var t;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.a.get("".concat(A.newsApi.endpoint),{params:{apiKey:A.newsApi.key,language:"en",pageSize:5,q:this.state.query,country:this.state.country}});case 3:t=e.sent,this.setState({articles:t.data.articles,articlesWithSent:[]}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(e,t){this.state.query!==t.query||this.state.country!==t.country?this.fetchNews():this.state.articles.length&&this.state.articles.length!==t.articles.length&&this.fetchArticleSentiment()}},{key:"fetchArticleSentiment",value:function(){var e=Object(E.a)(y.a.mark(function e(){var t,a;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=this.state.articles[0],e.next=4,N.a.get("".concat(A.proxy+A.aylien.endpoint),{headers:{"X-AYLIEN-TextAPI-Application-Key":A.aylien.key,"X-AYLIEN-TextAPI-Application-ID":A.aylien.id},params:{mode:"tweet",text:t.title,language:"en"}});case 4:a=e.sent,this.setStateArticles(t,a),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,this,[[0,8]])}));return function(){return e.apply(this,arguments)}}()},{key:"setStateArticles",value:function(e,t){var a=this,n={title:e.title,description:e.description,source:e.source.name,url:e.url,image:e.urlToImage,polarity:t.data.polarity,polarityConfidence:t.data.polarity_confidence,subjectivity:t.data.subjectivity,subjectivityConfidence:t.data.subjectivity_confidence},r=Object(v.a)(this.state.articles);r.shift();var i=Object(v.a)(this.state.articlesWithSent);i.unshift(n);var c=this.getAvgSentiment(i);if(this.state.articlesWithSent.length)setTimeout(function(){a.setState({articlesWithSent:i,articles:r,avgSentiment:c})},3e3);else this.setState({articlesWithSent:i,articles:r,avgSentiment:c})}},{key:"renderArticles",value:function(){var e=this,t=this.state.articlesWithSent.map(function(t,a){return r.a.createElement("div",{className:"articleContainer",key:e.state.articlesWithSent.length-a},r.a.createElement("a",{href:t.url,target:"_blank"}),r.a.createElement("div",{className:"articleImage"},r.a.createElement("img",{src:t.image,alt:t.description})),r.a.createElement("div",{className:"articleInfo"},r.a.createElement("h3",null,t.title),r.a.createElement("h4",null,t.source)),r.a.createElement("div",{className:"articleSentiment"},r.a.createElement("h3",null,"Polarity: ",r.a.createElement("br",null),r.a.createElement("span",{className:t.polarity},t.polarity)),r.a.createElement("h4",null,"AI Confidence: ",r.a.createElement("strong",null,Math.floor(100*t.polarityConfidence),"%"))))});return r.a.createElement("div",{className:"newsFeed"},t)}},{key:"getAvgSentiment",value:function(e){return e.map(function(e){switch(e.polarity){case"positive":return 1*e.polarityConfidence;case"negative":return-1*e.polarityConfidence;default:return 0}}).reduce(function(e,t){return e+t},0)/e.length*50+50}},{key:"renderEmptyState",value:function(){return r.a.createElement("p",null,"Loading articles...")}},{key:"render",value:function(){return r.a.createElement("main",{className:"newsFeedComponent wrapper"},r.a.createElement("div",{className:"sentimentBar"},r.a.createElement("div",{className:"avgSentiment",style:{left:"".concat(this.state.avgSentiment,"%")}}),r.a.createElement("div",{className:"negSection"}),r.a.createElement("div",{className:"neutSection"}),r.a.createElement("div",{className:"posSection"}),r.a.createElement("p",null,"Avg. Polarity")),r.a.createElement(w,{onFilterSubmit:this.onFilterSubmit}),this.state.articlesWithSent.length?this.renderArticles():this.renderEmptyState())}}]),t}(n.Component);var C=function(e){return r.a.createElement("footer",{className:"footerComponent"},r.a.createElement("h3",null,"Data provided by:"),r.a.createElement("ul",{className:"attributions"},e.attributions.map(function(e){return r.a.createElement("li",null,r.a.createElement("a",{href:e.href},e.name))})))},O=(a(71),function(e){function t(e){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement(d,{title:"Polar News"}),r.a.createElement(j,null),r.a.createElement(C,{attributions:[{name:"News API",href:"https://newsapi.org/docs"},{name:"Aylien",href:"https://docs.aylien.com/textapi"}]}))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[41,1,2]]]);
//# sourceMappingURL=main.3e6c009a.chunk.js.map
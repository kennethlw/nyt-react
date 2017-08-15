// Node Dependencies
var axios = require('axios');

// NY Times API Request Function
var helpers = {

    runQuery: function(title, beginYear, endYear){

    console.log(title + beginYear + endYear);

    var apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" +
                  title + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";

    // NY Times API get request
    return axios.get(queryURL).then(function(response) {

      var newResults = [];
      var fullResults = response.data.response.docs;
      var count = 0;

      // If you get a result, return only the first 5 articles
      if (fullResults[0]) {

        for(var i = 0; i < fullResults.length; i++){
          // Break out of the loop if there are more than 5 entries
          if(count > 4) {
            return newResults;
          } 

          if(fullResults[count].headline.main && fullResults[count].pub_date && fullResults[count].web_url) {
            newResults.push(fullResults[count]);
            count++;
          }
        }

        return newResults;
      } 

      else {
        // If we don't get any results, return an empty string
        return("");
      }   
    })
},

// This function posts saved articles to our database.
  postArticle: function(title, date, url){
   
    axios.post('/api/saved', {title: title, date: date, url: url})
    .then(function(result){

      return(result);
    })
  }
}
 

// Export all helper functions
module.exports = helpers;
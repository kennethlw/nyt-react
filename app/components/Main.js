var axios =require("axios");

// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper Function
var helpers = require("./utils/helpers.js");

// This is the main component.
var Main = React.createClass({

  getInitialState: function() {
    return { 
    		title: "", 
    		startYear: "", 
    		endYear: "", 
    		results: [],
    		savedArticles: [] 
    	   };
  },

  searchTerm: function(title, startYear, endYear) {
  		this.setState({
  			title: title,
  			startYear: startYear,
  			endYear: endYear
  		});
  },

  saveArticle: function(title, date, url) {
  		helpers.postArticle(title, date, url);
  		this.getArticle();
  },

  deleteArticle: function(article) {
  		console.log(article);
  		axios.delete('/api/saved/' + article._id)
  			.then(function(response) {
  				this.setState({
  					savedArticles: response.data
  				});
  				return response;
  				}.bind(this));

  		this.getArticle();

  },

  getArticle: function() {
  		axios.get('/api/saved')
  		.then(function(response) {
  			this.setState({
  				savedArticles: response.data
  			});
  		}.bind(this));
  },

  // when component updates this will run 
  componentDidUpdate: function(prevProps, prevState){

		if(prevState.title != this.state.title){
			console.log("UPDATED");

			helpers.runQuery(this.state.title, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
	},

   componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response) {
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

   // Here we describe this component's render method
   render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron" style={{'backgroundImage': 'url(./assets/img/background.jpg)', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'backgroundSize': '100% 100%', 'backgroundAttachment': 'fixed'}}>
            <h2 className="text-center"style={{'color': 'white', 'font-weight': 'bold', 'font-size': '48px'}}>New York Times Article Search</h2>
            <p className="text-center" style={{'color': 'white'}}>
              <em>Search for an article topic and save it!</em>
            </p>
          </div>

         <div className="row">
		     <div className="col-md-12">
	          	<Form searchTerm={this.searchTerm} />
	         </div>
	      </div>

	     <div className="row">
          	<div className="col-md-12">
          		<Results results={this.state.results} saveArticle={this.saveArticle} />
          	</div>
         </div>

         <div className="row">
          	<div className="col-md-12">
          		<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
          	</div>
         </div>

        </div>

      </div>
    );
   }
});

module.exports = Main;
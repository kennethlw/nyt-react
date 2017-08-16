var axios = require("axios");

// Include React
var React = require("react");

// Including the Link component from React Router to navigate within our application without full page reloads
var router = require("react-router-dom")
var Link = router.Link;
var Route = router.Route;


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
  		axios.delete('/api/saved/' + article._id).then(function(response) {
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

		if(prevState.title != this.state.title ||
		   prevState.startYear != this.state.startYear ||
		   prevState.endYear !=this.state.endYear) {
			
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
	          <div className="jumbotron text-center" style={{'backgroundImage': 'url(./assets/img/background.jpg)', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'backgroundSize': '100% 100%', 'backgroundAttachment': 'fixed'}}>
	            <h2 className="text-center"style={{'color': 'white', 'fontWeight': 'bold', 'fontSize': '48px'}}>New York Times Article Search</h2>
	            <p className="text-center" style={{'color': 'white'}}>
	              <em>Search for an article topic and save it!</em>
	            </p>
	            <hr />
	            <p>
	            <Link to="/"><button className="btn btn-primary btn-lg">Search Articles</button></Link>
            	<Link to="/Saved"><button className="btn btn-danger btn-lg">Saved Articles</button></Link>
            	</p>
	          </div>
	          </div>

		         <div className="row">
				     
				     	<Route exact path="/" render={(props) => (
				     	  <Form {...props}
				     	   searchTerm={this.searchTerm}
				     	   results={this.state.results}
				     	   saveArticle={this.saveArticle}
				     	   getArticle={this.getArticle}
				     	   />
			          	)}/>

			          	<Route exact path="/saved" render={(props) => (
				            <Saved {...props}
				              savedArticles={this.state.savedArticles}
				              getArticle={this.getArticle}
				              deleteArticle={this.deleteArticle}
				            />
				          )} />
			     </div>

	      </div>
    );
   }
});

module.exports = Main;
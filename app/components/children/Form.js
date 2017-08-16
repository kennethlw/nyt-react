// Include React 
var React = require('react');

var Results = require('./Results');
// Component creation
var Form = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			title: "",
			startYear: "",
			endYear: "",
			displayResults: false
		};
	},

	// This function will respond to the user input 
	handleChange: function(event){

    	// this will capture any change to the query terms (pre-search).
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	// When a user submits... 
	handleClick: function(event){
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    	// clicking the button
		event.preventDefault();
		// Set the parent to have the search term
		this.props.searchTerm(this.state.title, this.state.startYear, this.state.endYear);
		this.setState({title: "", startYear: "", endYear:""});
		this.setState({displayResults: true});
	},

	// Here we render the function
	render: function(){
		return(
			<div>
				<div className="col-md-12">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h2 className="panel-title text-center"><strong>Search</strong></h2>
						</div>
						<div className="panel-body text-center">
							<form>
								<div className="form-group">
									<h4 className=""><strong>Search Term</strong></h4>
									<input type="text" className="form-control text-center" id="title" placeholder="What topic would you like to search?" onChange= {this.handleChange} required/>
									<br />

									<h4 className=""><strong>Start Year</strong></h4>
									<input type="text" className="form-control text-center" id="startYear" placeholder="2007" onChange= {this.handleChange} required/>
									<br />

									<h4 className=""><strong>End Year</strong></h4>
									<input type="text" className="form-control text-center" id="endYear" placeholder="2017"onChange= {this.handleChange} required/>
									<br />
									
									<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
								</div>
							</form>
						</div>
					</div>	
					{this.state.displayResults ? <Results results={this.props.results} saveArticle={this.props.saveArticle} /> : null }
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Form;
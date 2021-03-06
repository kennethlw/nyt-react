// Include React 
var React = require('react');

// This is the saved component. It will be used to show a log of saved articles.
var Saved = React.createClass({

	getInitialState: function(){
		return {
			savedArticles: []
		}
	},

	clickToDelete: function(result){
		this.props.deleteArticle(result);
	},

	//we use this function because it will load on mount, not on prop change
	//if we used component will receive props, it must be invoked twice to render correctly
	componentDidMount(){ 		
   		this.props.getArticle(); 		
	},
	
	
	componentWillReceiveProps: function(nextProps){
		var that = this;
		console.log(nextProps);
		var myResults = nextProps.savedArticles.map(function(search, i){
			var boundClick = that.clickToDelete.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a>
			<br />{search.date}<br /><button type="button" className="btn btn-danger" style={{'float': 'right', 'marginTop': '-39px'}} 
			onClick={boundClick}>Delete</button></div>
		});

		this.setState({savedArticles: myResults});
	},
	

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
				</div>
				<div className="panel-body">
					{this.state.savedArticles}
				</div>
			</div>
		)
	}
});



// Export the component back for use in other files
module.exports = Saved;
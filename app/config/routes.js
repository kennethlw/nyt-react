// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router-dom");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var BrowserRouter = router.BrowserRouter;

// Reference the high-level components
var Main = require("../components/Main");

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <BrowserRouter>

    <Route component={Main} />

  </BrowserRouter>
);

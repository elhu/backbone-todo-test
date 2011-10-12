$(document).ready(function() {
  window.App = new BackboneTodo();

  Backbone.history.start({pushstate: true});
});
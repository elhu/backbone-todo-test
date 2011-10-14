window.Todo = Backbone.Model.extend({
  localStorage: new Store("todos"),

  defaults: {
    'done': false
  },

  isDone: function() {
    return (this.get('done'));
  },

  toggleDone: function() {
    this.set({'done': this.isDone() ? false : true});
  },

  updateTask: function() {
    this.set({'task': text});
    this.save();
  }
});

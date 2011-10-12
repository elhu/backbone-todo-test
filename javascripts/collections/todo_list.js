window.TodoList = Backbone.Collection.extend({
  model: Todo,
  localStorage: new Store("todos"),
  
  done: function() {
    return _.select(this.models, function(model) { return model.get('done') == true }).length;
  },

  remaining: function() {
    return this.length - this.done();
  },

  clearDone: function() {
    this.each(function(model) {
      if (model.get('done') == true) {
        model.destroy();
      }
    });
    if (this.done() != 0) {
      this.clearDone();
    }
  }
});

window.todoList = new TodoList();
$(document).ready(function() {
  window.TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo',
    template: _.template($("#todo-template").html()),

    events: {
      'click .check': "toggleDone",
      'click .destroy': "removeFromTodoList",
      'dblclick .text': "switchState",
      'keypress .text-edit': 'updateTask'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('remove', this.remove);
    },

    switchState: function() {
      this.$(".todo.show").toggle();
      this.$(".todo.edit").toggle();
    },

    removeFromTodoList: function() {
      this.model.collection.remove(this.model);
    },

    toggleDone: function() {
      this.model.toggleDone();
    },

    updateTask: function(event) {
      text = event.srcElement.value;
      if (event.which == 13) {
        this.model.updateTask(text);
      }
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      if (this.model.isDone()) {
        this.$('.todo.text').toggleClass("done");
        this.$('.todo.check').attr('checked', 'checked');
      }
      else {
        this.$('todo.check').removeAttr('checked');
      }
      return this;
    }
  });  
});

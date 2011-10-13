$(document).ready(function() {
  window.TodoView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo',
    template: _.template($("#todo-template").html()),

    events: {
      'click .check': "toggleDone",
      'click .destroy': "removeFromTodoList",
      'dblclick .text': "switchState",
      'blur .text-edit': "switchState",
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
      this.$(".todo.text-edit").focus();
    },

    removeFromTodoList: function() {
      this.options.collection.remove(this.model);
      this.model.destroy();
    },

    toggleDone: function() {
      this.model.toggleDone();
      this.model.save();
    },

    updateTask: function(event) {
      text = this.$(".todo.text-edit").val();
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

$(document).ready(function() {
  window.PageView = Backbone.View.extend({
    tagname: 'div',
    className: 'container',
    template: _.template($("#page-template").html()),
    statsTemplate: _.template($('#stats-template').html()),
    
    events: {
      'keypress .todo.new': 'select',
      'click .todo.clear': 'clearDoneFromCollection'
    },
    
    initialize: function() {
      _.bindAll(this, 'render', 'renderTask', 'renderStats');
      this.collection.bind('add', this.renderTask);
      this.collection.bind('all', this.renderStats);
    },

    clearDoneFromCollection: function() {
      this.collection.clearDone();
      return false;
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },

    renderStats: function() {
      this.$('.todo.stats').html(this.statsTemplate({
        total:      this.collection.length,
        done:       this.collection.done(),
        remaining:  this.collection.remaining()
      }));
    },

    renderTask: function(task) {
      var view = new TodoView({
        model: task
      });
      this.$("ul").append(view.render().el);
    },

    select: function(event) {
      var text = event.srcElement.value;
      if (event.which == 13 && text != "") {
        this.queueTask(text);
        $(".todo.new").val("");
      }
    },

    queueTask: function(task_content) {
      task = new Todo({task: task_content, collection: this.collection});
      task.save();
      this.collection.add(task);
      // this.collection.create({task: task_content, collection: this.collection});
    },
  });
});

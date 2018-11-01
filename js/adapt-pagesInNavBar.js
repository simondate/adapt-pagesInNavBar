define([
  'core/js/adapt'
], function(Adapt) {

  var pagesInNavBar = Backbone.View.extend({

    tagName: 'div',
    className: 'pagesInNavBar',

    events: {
      'click .page-item': 'changePage'
    },

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      var template = Handlebars.templates.pagesInNavBar;
      var pages = _.map(Adapt.contentObjects.models, function(page, num) {
        return {
          title: page.get('title'),
          _id: page.get('_id')
        };
      });
      var model = {
        _pages: pages
      };
      $('.navigation-inner').append(this.$el.html(template(model)));
    },

    changePage: function(event) {
      if (event && event.preventDefault)
        event.preventDefault();
      var newPage = '.' + $(event.currentTarget).attr('data-page-id');
      Adapt.navigateToElement(newPage, {
        duration: 0
      });
    },
  });

  Adapt.on("pageView:ready", function() {
    var model = Adapt.course.get('_pagesInNavBar');
    if (!model || !model._isEnabled) return;
    new pagesInNavBar();
  });

  return pagesInNavBar;
});

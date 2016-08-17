import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('category');
  },
  actions: {

    save() {
      var searchCategory = this.get('controller').get('category');
      var finalCategory = null;
      var rt = this;
      this.model().then(function(val) {

        val.forEach(function(cat) {
          console.log(cat.name);
          debugger;
          if(cat.id===searchCategory) {
            finalCategory = cat;
          }
        });
        var params = {
          title: rt.get('controller').get('title'),
          author: rt.get('controller').get('author'),
          content: rt.get('controller').get('content'),
          date: rt.get('controller').get('date'),
          category: finalCategory,
          tags: rt.get('controller').get('tags'),
        };
        var newPost = rt.store.createRecord('post', params);
        finalCategory.get('posts').addObject(newPost);
        debugger;
        newPost.save().then(function() {
          return finalCategory.save();
        });
        rt.transitionTo('index');

      });
    }
  }
});

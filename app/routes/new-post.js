import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      categories: this.store.findAll('category'),
      allTags: this.store.findAll('tag')
    });
  },
  actions: {

    save() {
      var searchCategory = this.get('controller').get('category');
      var finalCategory = null;
      var searchTags = [this.get('controller').get('tags')];
      var finalTags = [];
      var rt = this;
      this.model().then(function(val) {

        val.categories.forEach(function(cat) {
          if(cat.id===searchCategory) {
            finalCategory = cat;
          }
        });
        debugger;
        val.allTags.forEach(function(tag) {
          for(var i=0; i<searchTags.length; i++) {
            if(tag.id===searchTags[i]) {
              finalTags.push(tag);
            }
          }
        });
        var params = {
          title: rt.get('controller').get('title'),
          author: rt.get('controller').get('author'),
          content: rt.get('controller').get('content'),
          date: rt.get('controller').get('date'),
          category: finalCategory,
          tags: []
        };
        var newPost = rt.store.createRecord('post', params);
        finalTags.forEach(function(currentTag) {
          var tagParams = {
            post: newPost,
            tag: currentTag
          }
          var newTagPost = rt.store.createRecord('tag-post', tagParams);
          newPost.get('tags').addObject(newTagPost);
          currentTag.get('posts').addObject(newTagPost);
          newTagPost.save();
        });

        finalCategory.get('posts').addObject(newPost);
        newPost.save().then(function() {
          return finalCategory.save();
        });
        rt.transitionTo('index');

      });
    }
  }
});

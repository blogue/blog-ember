import Ember from 'ember';

export default Ember.Route.extend({
  selectedTags: [],
  model() {
    return Ember.RSVP.hash({
      categories: this.store.findAll('category'),
      allTags: this.store.findAll('tag'),
      modelSelectedTags: this.selectedTags
    });
  },
  actions: {

    save() {
      var checkValues = [this.get('controller').get('checked-UNCATEGORIZED'),
                         this.get('controller').get('checked-AnimalBehavior'),
                         this.get('controller').get('checked-Pets'),
                         this.get('controller').get('checked-Pictures'),
                        ];
      console.log(checkValues);
      var searchCategory = this.get('controller').get('selectedCategory');
      var finalCategory = null;
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
          for(var i=0; i<val.modelSelectedTags.length; i++) {
            if(tag.id===val.modelSelectedTags[i].id) {
              finalTags.push(tag);
            }
          }
        });
        var params = {
          title: rt.get('controller').get('title'),
          author: rt.get('controller').get('author'),
          content: rt.get('controller').get('postContent'),
          date: rt.get('controller').get('date'),
          category: finalCategory,
          tags: []
        };
        var newPost = rt.store.createRecord('post', params);
        finalTags.forEach(function(currentTag) {
          var tagParams = {
            post: newPost,
            tag: currentTag
          };
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

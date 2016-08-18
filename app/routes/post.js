import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.store.findRecord('post', params.post_id).then(function(val) {
      val.get("tags").forEach(function(tp) {
        console.log(tp);
      });
      debugger;
    });
    return this.store.findRecord('post', params.post_id);
  },
  actions: {
    update(post, params) {
      Object.keys(params).forEach(function(key){
        if(params[key]!==undefined) {
          post.set(key, params[key]);
        }
      });
      post.save();
      this.transitionTo('post');
    },
    delete(item) {
      if(item.toString().substring(12,16)==="post") {
        var comment_deletions = item.get('comments').map(function(comment) {
          return comment.destroyRecord();
        });
        Ember.RSVP.all(comment_deletions).then(function() {
          return item.destroyRecord();
        });
        this.transitionTo('index');
      } else {
        item.destroyRecord();
      }
    },
    saveComment(params) {
      var newComment = this.store.createRecord('comment', params);
      var post = params.post;
      post.get('comments').addObject(newComment);
      newComment.save().then(function() {
        return post.save();
      });
      this.transitionTo('post');
    }
  }
});

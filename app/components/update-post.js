import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    update(post) {
      var params = {
        title: this.get('title'),
        author: this.get('author'),
        content: this.get('content'),
        date: this.get('date'),
        category: this.get('category'),
        tags: this.get('tags'),
      };
      this.sendAction('update', post, params);
    }
  }
});

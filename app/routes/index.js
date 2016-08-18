import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      posts: this.store.findAll('post'),
      categories: this.store.findAll('category'),
      comments: this.store.query('comment', {
        orderBy: 'time',
        limitToLast: 5
      })
    });
  },
});

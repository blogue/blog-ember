import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    update(comment, params) {
      this.sendAction('update', comment, params);
    },
    delete(comment) {
      this.sendAction('deleteComment', comment);
    }
  }
});

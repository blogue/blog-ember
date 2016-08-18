import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      var params = {
        user: this.get('username'),
        text: this.get('text'),
        time: new Date(Date.now()).toString(),
        post: this.get('post')
      };

      this.sendAction('saveComment', params);
    }
  }
});

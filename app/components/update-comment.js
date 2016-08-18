import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    update(comment){
      var params = {
        text: this.get('text')
      };
      this.sendAction('update', comment, params);
    },
    delete(comment) {
      this.sendAction('delete', comment);
    }
  }
});

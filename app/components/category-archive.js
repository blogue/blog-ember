import Ember from 'ember';

export default Ember.Component.extend({
  currentCategory: "UNCATEGORIZED",
  actions: {
    change() {
      debugger;
      this.set('currentCategory', "Uncategorized");
      this.transitionTo('index');
    }
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  mode(params) {
    return this.store.findRecord('category', params.category_id);
  }
});
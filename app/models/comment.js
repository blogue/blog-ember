import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.attr(),
  text: DS.attr(),
  time: DS.attr(),
  post: DS.belongsTo('post', {async: true})
});

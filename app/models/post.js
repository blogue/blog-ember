import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  author: DS.attr(),
  content: DS.attr(),
  date: DS.attr(),
  category: DS.belongsTo('category', {async: true}),
  tags: DS.hasMany('tag-post', {async: true}),
  comments: DS.hasMany('comment', {async: true})
});

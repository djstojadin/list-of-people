import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import uuid from 'uuid';

export const Persons = new Mongo.Collection('persons');

if (Meteor.isServer) {
  Meteor.publish('persons', function() {
    return Persons.find({userId: this.userId});
  });
}


// resource.action (naming meteor methods)
Meteor.methods({
  'person.insert'(person) {

    const {
      name,
      upin,
      place,
      invoice,
      fruitWeight,
      fruitName
    } = person;

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Persons.insert({
      _id: uuid(),
      userId: this.userId,
      ...person
    });
  },
  'person.remove'(_id) {
    Persons.remove(_id);
  },
  'person.removeAll'() {
    Persons.remove({userId: this.userId});
  },
  'person.edit'(_id, dataType, value) {
    Persons.update(
      { _id },
      { $set: { 
        [dataType]: value
      }}
    )
  }
});
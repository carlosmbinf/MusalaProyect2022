import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from "meteor/meteor";



SimpleSchema.extendOptions(['autoform']);

export const GatewaysCollection = new Mongo.Collection('Gateways');
export const PeripheralsCollection = new Mongo.Collection('Peripherals');

export const PeripheralIds = new SimpleSchema({
  id:{
    type: String,
    optional: false
  },
});

export const SchemaPeripheralsCollection = new SimpleSchema({
  uid:{
    type: Number,
    defaultValue: 0,
    optional: false
  },
  vendor: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  status: {
    type: String,
    defaultValue: "offline",
    optional: true
  },
});

PeripheralsCollection.attachSchema(SchemaPeripheralsCollection);

export const SchemaGatewaysCollection = new SimpleSchema({
  name: {
    type: String,
    optional: false
  },
  ip4: {
    type: String,
    regEx: SimpleSchema.RegEx.IPv4,
    optional: false
  },
  peripherals: {
    type: Array,
    defaultValue: []
  },
  'peripherals.$': {
    type: PeripheralIds,
  }
});

GatewaysCollection.attachSchema(SchemaGatewaysCollection);



PeripheralsCollection.allow({
    insert(doc) {
        // The user must be logged in and the document must be owned by the user.
        return true;
      },
    
      update() {
        // Can only change your own documents.
        return true;
      },
    
      remove(userId, doc) {
        // Can only remove your own documents.
        return true;
      },
})
GatewaysCollection.allow({
  insert(doc) {
      // The user must be logged in and the document must be owned by the user.
      return true;
    },
  
    update() {
      // Can only change your own documents.
      return true;
    },
  
    remove(userId, doc) {
      // Can only remove your own documents.
      return true;
    },
})
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
  // serialNumber: {
  //   type: String,
  //   unique: true,
  //   optional: false,
  //   custom() {
  //     if (Meteor.isClient && this.isSet) {
  //       Meteor.call("accountsIsUsernameAvailable", this.value, (error, result) => {
  //         if (!result) {
  //           this.validationContext.addValidationErrors([{
  //             name: "username",
  //             type: "notUnique"
  //           }]);
  //         }
  //       });
  //     }
  //   }
  // },
  // vendor: {
  //   type: String,
  // },
  name: {
    type: String,
    optional: false
  },
  ip4: {
    type: String,
    regEx: SimpleSchema.RegEx.IPv4,
    optional: false
    // regEx({ label, regExp }) {
    //   switch (regExp) {
    //     case (SimpleSchema.RegEx.IPv4.toString()):
    //       return "IPv4 address is invalid";
    //     default:
    //       return "There are errors in the IPv4 address";
    //   }
    // },
  },
  peripherals: {
    type: Array,
    defaultValue: [],
    maxCount: 10,
    max: 10,
    exclusiveMax: true,
  
  },
  'peripherals.$': { 
    type: PeripheralIds,
    minCount: 0,
    maxCount: 10,
  // max:10,
  exclusiveMax:true
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
Meteor.users.allow({
  insert(doc) {
      // The user must be logged in and the document must be owned by the user.
      return true;
    },
  
    update(userId, doc, fields, modifier) {
      // Can only change your own documents.
      return true;
    },
  
    remove(userId, doc) {
      // Can only remove your own documents.
      return Meteor.users.findOne({ _id: userId }).profile.role == "admin";
    },
})
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from "meteor/meteor";


SimpleSchema.extendOptions(['autoform']);

export const PelisCollection = new Mongo.Collection('pelisRegister');


export const SchemaPelisCollection = new SimpleSchema({
  nombrePeli:{
    type: String,
  },
  urlPeli: {
    type: String,
  },
  urlBackground: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  urlTrailer: {
    type: String,
    defaultValue: "",
    optional: true
  },
  tamano:{
    type: String,
  },
  mostrar:{
    type: String,
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
  subtitulo: {
    type: String,
    defaultValue: "",
    optional: true,
  },
  vistas: {
    type: Number,
    defaultValue: 0,
  },
  year: {
    type: Number,
    defaultValue: 1900,
    // min: 1900,
  },
  textSubtitle: {
    type: String,
    defaultValue: "",
    optional: true,
  },
  clasificacion: {
    type: Array,
    defaultValue: [],
  },
  'clasificacion.$': { type: String },
  idimdb:{
      type: String,
      defaultValue: "",
      optional: true,
  }
});

PelisCollection.attachSchema(SchemaPelisCollection);

PelisCollection.allow({
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
        return Meteor.users.findOne({ _id: userId }).profile.role == "admin";
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
import { Meteor } from "meteor/meteor";
import {
    OnlineCollection,
    PelisCollection,
    MensajesCollection,
    ServersCollection,
    PreciosCollection,
    VentasCollection,
    FilesCollection,
    VersionsCollection,
    LogsCollection,
    DescargasCollection,
    TVCollection,
    RegisterDataUsersCollection
  } from "../imports/ui/pages/collections/collections";

if (Meteor.isServer) {
    console.log("Cargando Publicaciones...");

      Meteor.publish("pelis", function (selector,option) {
        return PelisCollection.find(selector?selector:{},option?option:{});
      });
      Meteor.publish("peli", function (id) {
        return PelisCollection.find({ _id: id });
      });
     
      Meteor.publish("user", function (selector,option) {
        return Meteor.users.find(selector?selector:{},option?option:{});
      });
      Meteor.publish("userID", function (id) {
        return Meteor.users.find({ _id: id });
      });
      Meteor.publish("userRole", function (role) {
        return Meteor.users.find({ "profile.role": role });
      });
     
}
import { Meteor } from "meteor/meteor";
import {
  GatewaysCollection,
  PeripheralsCollection
} from "../imports/ui/pages/collections/collections";

if (Meteor.isServer) {
  console.log("Cargando Publicaciones...");

  Meteor.publish("gateway", function (selector, option) {
    return GatewaysCollection.find(selector ? selector : {}, option ? option : {});
  });
  Meteor.publish("peripherals", function (selector, option) {
    return PeripheralsCollection.find(selector ? selector : {}, option ? option : {});
  });
}
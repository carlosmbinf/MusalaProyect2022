import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  Meteor.startup(() => {
    console.log("Iniciando Server Meteor...");

    console.log("ROOT_URL: " + process.env.ROOT_URL);
    console.log("MONGO_URL: " + process.env.MONGO_URL);

  });
}
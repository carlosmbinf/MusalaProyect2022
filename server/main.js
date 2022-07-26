import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import {
  OnlineCollection,
  PelisCollection,
  MensajesCollection,
  ServersCollection,
  PreciosCollection,
  VentasCollection,
  FilesCollection,
  VersionsCollection
} from "../imports/ui/pages/collections/collections";
import { TVCollection } from "../imports/ui/pages/collections/collections";
import { DescargasCollection } from "../imports/ui/pages/collections/collections";
import { RegisterDataUsersCollection, LogsCollection } from "../imports/ui/pages/collections/collections";

import fs from "fs";
// import { Meteor } from "meteor/meteor";
// import { Mongo } from "meteor/mongo";

import "./startup";
import "./metodos";
import "./publicaciones";
// import "./serverproxy3002";
// import "./tareas";
import "./rutas";


if (Meteor.isClient) {
  
}


if (Meteor.isServer) {

}





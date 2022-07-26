import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'

import bodyParser from "body-parser";
import { WebApp } from "meteor/webapp";
import router from "router";
const endpoint = router();

// import {
//   } from "../imports/ui/pages/collections/collections";

if (Meteor.isServer) {


        
  WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: true }));
  WebApp.connectHandlers.use(endpoint);
}
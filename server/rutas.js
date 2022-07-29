import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'

import bodyParser from "body-parser";
import { WebApp } from "meteor/webapp";
import router from "router";
import { GatewaysCollection } from "../imports/ui/pages/collections/collections";
const endpoint = router();

// import {
//   } from "../imports/ui/pages/collections/collections";

if (Meteor.isServer) {

  endpoint.get("/addgateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let gateway = {
        _id:req.query.serialnumber,
        name: req.query.name,
        ip4: req.query.ip4
      }
      await Meteor.call("addGateway", gateway, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ result: mensaje }))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });

  endpoint.post("/addperipheral", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let gateway = {
        _id:req.query.serialnumber,
        name: req.query.name,
        ip4: req.query.ip4
      }
      await Meteor.call("addGateway", gateway, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ result: mensaje }))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });

  WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: true }));
  WebApp.connectHandlers.use(endpoint);
}
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
  endpoint.get("/removegateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)

      await Meteor.call("removeGateway", req.query.serialnumber, function (error, mensaje) {
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
  endpoint.post("/removegateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)

      await Meteor.call("removeGateway", req.query.serialnumber, function (error, mensaje) {
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
  endpoint.get("/addgateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let gateway = {
        _id: req.query.serialnumber,
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
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });
  endpoint.post("/addgateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let gateway = {
        _id: req.query.serialnumber,
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
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });
  endpoint.get("/updategateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let id = req.query.serialnumber?req.query.serialnumber:{}
      let gateway = {
        name: req.query.name,
        ip4: req.query.ip4
      }
      await Meteor.call("updateGateway",id, gateway, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });
  endpoint.post("/updategateway", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let id = req.query.serialnumber
      let gateway = {
        name: req.query.name,
        ip4: req.query.ip4
      }
      await Meteor.call("updateGateway",id, gateway, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });
  endpoint.get("/removeperipheral", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      await Meteor.call("removePeripheral", req.query.id, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });
  endpoint.post("/removeperipheral", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      await Meteor.call("removePeripheral", req.query.id, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });

  endpoint.get("/addperipheral", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let serialnumber = req.query.serialnumber
      let peripheral = {
        uid: req.query.uid,
        vendor: req.query.vendor
      }
      await Meteor.call("addPeripheral", peripheral, serialnumber, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
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
      let serialnumber = req.query.serialnumber
      let peripheral = {
        uid: req.query.uid,
        vendor: req.query.vendor
      }
      await Meteor.call("addPeripheral", peripheral, serialnumber, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
        }
      })
      // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

      //   res.end(req.query.idPeli);



    } catch (error) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error.message }))
    }

  });
  endpoint.get("/updateperipheral", async (req, res) => {
    // console.log(req)
    try {
      console.log(req.query)
      let id = req.query.id
      let peripheral = {
        uid: req.query.uid,
        vendor: req.query.vendor,
        status: req.query.status == "online" ? "online" : "offline"
      }
      await Meteor.call("updatePeripheral", id, peripheral, function (error, mensaje) {
        if (error) {
          console.log(error);
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error.message }))
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(mensaje))
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
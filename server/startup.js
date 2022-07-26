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
        Meteor.startup(() => {
            console.log("Iniciando Server Meteor...");

            /////// mover todas las imagenes para user.picture
         
        
            process.env.ROOT_URL = Meteor.settings.public.ROOT_URL;
            // process.env.MONGO_URL = Meteor.settings.public.MONGO_URL;
        
            console.log("ROOT_URL: " + process.env.ROOT_URL);
            console.log("MONGO_URL: " + process.env.MONGO_URL);
        
           // OnlineCollection.remove({address: `127.0.0.1`});
        
           const settings = Meteor.settings;
        
            // const youtubedl = require('youtube-dl')
            // const url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
            // youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
            //   if (err) throw err
            //   // console.log(output.join('\n'))
            // })
          });
    }
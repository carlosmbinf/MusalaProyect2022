import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { GatewaysCollection, PeripheralsCollection } from "../imports/ui/pages/collections/collections";
if (Meteor.isServer) {

  console.log("Cargando Métodos...");
  Meteor.methods({
    addGateway: async (gateway) => {
      let idGateways
      try {
        idGateways = await GatewaysCollection.insert(gateway)

      } catch (error) {
        console.log(error.message);
        return error.message
      }
      return idGateways ? `Gateway added successfully`:`Failed to insert gateway, check with developers`
    },
    addPeripheral: async (peripheral,idGateway) => {
      let idPeripherals
      let idGateways
      try {
       let countPeriph = await GatewaysCollection.findOne(idGateway).peripherals.length
       if(countPeriph<10){

        idPeripherals = await PeripheralsCollection.insert(peripheral)
        idGateways = await GatewaysCollection.update({_id:idGateway}, { $push: { peripherals: idPeripherals } })
        

       }else{
        return `The gateway is at the limit of peripherals`
       }
       
      } catch (error) {
        console.log(error.message);
        return error.message
      }
      return (idPeripherals && idGateways) ? `Peripheral added successfully` : `Failed to insert Peripheral, check with developers`
    },

  });
}
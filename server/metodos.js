import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import {
  GatewaysCollection,
  PeripheralsCollection,
} from "../imports/ui/pages/collections/collections";
if (Meteor.isServer) {
  console.log("Cargando Métodos...");
  Meteor.methods({
    "test.addGateway": async (gateway) => {
      let idGateways;
      try {
        idGateways = await GatewaysCollection.insert(gateway);
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
      return idGateways
        ? `Gateway added successfully`
        : `Failed to insert gateway, check with developers`;
    },
    addGateway: async (gateway) => {
      let idGateways;
      try {
        idGateways = await GatewaysCollection.insert(gateway);
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
      return idGateways
        ? `Gateway added successfully`
        : `Failed to insert gateway, check with developers`;
    },
    addPeripheral: async (peripheral, idGateway) => {
      let idPeripherals;
      let idGateways;
      try {
        let gatew = await GatewaysCollection.findOne(idGateway);
        let countPeriph;
        if (gatew) {
          countPeriph = await gatew.peripherals.length;
        } else {
          return "The gateway ID is not valid";
        }
        if (countPeriph < 10) {
          idPeripherals = await PeripheralsCollection.insert(peripheral);
          idGateways = await GatewaysCollection.update(
            { _id: idGateway },
            { $push: { peripherals: { id: idPeripherals } } }
          );
        } else {
          return `The gateway is at the limit of peripherals`;
        }
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
      return idPeripherals && idGateways
        ? `Peripheral added successfully`
        : `Failed to insert Peripheral, check with developers`;
    },
    removeGateway: async (idGateways) => {
      try {
        await GatewaysCollection.findOne(idGateways).peripherals.map(
          (idPeripheral) => {
            PeripheralsCollection.remove(idPeripheral.id);
          }
        );
        await GatewaysCollection.remove(idGateways);

        return idGateways
          ? `Gateway removed successfully`
          : `Failed to insert gateway, check with developers`;
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
    },
    removePeripheral: async (idPeripheral) => {
      try {
        await GatewaysCollection.update(
          {
            "peripherals.id": idPeripheral,
          },
          { $pull: { peripherals: { id: idPeripheral } } }
        );

        await PeripheralsCollection.remove(idPeripheral);

        return idPeripheral
          ? `Peripheral removed successfully`
          : `Failed to remove Peripheral, check with developers`;
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
    },
  });
}

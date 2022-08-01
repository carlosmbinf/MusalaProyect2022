import { Meteor } from "meteor/meteor";
import {
  GatewaysCollection,
  PeripheralsCollection,
} from "../imports/ui/pages/collections/collections";
if (Meteor.isServer) {
  console.log("Cargando Métodos...");
  Meteor.methods({
    addGateway: async (gateway) => {
      let idGateways;
      try {
        idGateways = await GatewaysCollection.insert(gateway);
      } catch (error) {
        console.log(error.message);
        return { error: error.message };
      }

      return idGateways
        ? { result: `Gateway added successfully` }
        : { error: `No insert was done, check the data` }

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
          return { error: "The gateway ID is not valid" };
        }
        if (countPeriph < 10) {
          idPeripherals = await PeripheralsCollection.insert(peripheral);
          idGateways = await GatewaysCollection.update(
            { _id: idGateway },
            { $push: { peripherals: { id: idPeripherals } } }
          );
        } else {
          return { error: `The gateway is at the limit of peripherals` };
        }
      } catch (error) {
        console.log(error.message);
        return { error: error.message };
      }
      return (idPeripherals && idGateways)
        ? { result: `Peripheral added successfully` }
        : { error: `No insert was done, check the data` }
    },
    removeGateway: async (idGateways) => {
      let exist = await GatewaysCollection.find(idGateways).count()
      if (exist == 0) return { error: "Insert a valid Gateway ID" }
      try {
        await GatewaysCollection.findOne(idGateways).peripherals.map(
          (idPeripheral) => {
            PeripheralsCollection.remove(idPeripheral.id);
          }
        );
        let resultremove = await GatewaysCollection.remove(idGateways);

        return resultremove ? {
          result: `Gateway removed successfully`
        } : {
          error: `No remove was done, check the serial number of the Gateway`
        };
      } catch (error) {
        console.log(error.message);
        return { error: error.message };
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

        let exist = await PeripheralsCollection.find(idPeripheral).count()
        if (exist == 0) return { error: "Insert a valid Peripheral ID" }

        let resultPeripheral = await PeripheralsCollection.remove(idPeripheral);

        return (resultPeripheral) ? {
          result: `Peripheral removed successfully`
        }
          : {
            error: `No remove was done, check the Peripheral ID`
          };
      } catch (error) {
        console.log(error.message);
        return { error: error.message };
      }
    },
    updateGateway: async (idGateway, gateway) => {
      let result
      let exist = await GatewaysCollection.find(idGateway).count()
      if (exist == 0) return { error: "Insert a valid Gateway ID" }

      try {
        result = await GatewaysCollection.update(idGateway, { $set: gateway });
      } catch (error) {
        console.log(error.message);
        return { error: error.message };
      }
      return result ? {
        result: `Gateway updated successfully`
      }
        : {
          error: `No update was done, check the serial number of the Gateway`
        };
    },
    updatePeripheral: async (idPeripheral, peripheral) => {
      let result
      let exist = await PeripheralsCollection.find(idPeripheral).count()
      if (exist == 0) return { error: "Insert a valid Peripheral ID" }

      try {
        result = await PeripheralsCollection.update(idPeripheral, { $set: peripheral });
      } catch (error) {
        console.log(error.message);
        return { error: error.message };
      }
      return result ? {
        result: `Peripheral updated successfully`
      }
        : {
          error: `No update was done, check the Peripherical ID`
        };
    },
  });
}
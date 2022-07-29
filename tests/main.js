import assert from "assert";
import { Meteor } from "meteor/meteor";
import { GatewaysCollection, PeripheralsCollection } from "../imports/ui/pages/collections/collections";

describe("proyectReact", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "proyectReact");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
   

  }

  if (Meteor.isTest) {

  }



  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });


    it("REMOVE AND INSERTS ", async () => {

      const gateway = {
        _id: "33-s-334",
        name: "Gateway1",
        ip4: "192.168.1.1" //IP validada
      }
      const peripheral = {
        uid: "45454", //number
        vendor: "PRUEBA" 
      }


      GatewaysCollection.remove({});
      PeripheralsCollection.remove({});

      // await GatewaysCollection.findOne(gateway._id) && await GatewaysCollection.findOne(gateway._id).peripherals.map(
      //   (idPeripheral) => {
      //     PeripheralsCollection.remove(idPeripheral.id);
      //   }
      // );
      // await GatewaysCollection.remove(gateway._id);

      let idPeripherals;
      let idGateways;
      idGateways = await GatewaysCollection.insert(gateway);
      idPeripherals = await PeripheralsCollection.insert(peripheral);
      
      await GatewaysCollection.update(
        { _id: idGateways },
        { $push: { peripherals: { id: idPeripherals } } }
      );

    });

  }
});

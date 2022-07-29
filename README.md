# MusalaProyect2022

## TO ADD GATEWAY
#### GET to /addgateway with the nexts params in the URL
```js

    serialnumber //ID of Gateway
    name 
    ip4          //IP Validada

```
#### example
```bash
curl http://localhost:3000/addgateway?serialnumber=334-34433-43434&name=Gateway1&ip4=192.168.1.1
```

## To add Peripheral
#### GET to /addperipheral with the nexts params in the URL
```js
    uid //ONLY NUMBER
    vendor
```
#### example
```bash
curl http://localhost:3000/addperipheral?uid=55662233&vendor=Gateway1
```
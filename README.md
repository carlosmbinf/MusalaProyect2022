# MusalaProyect2022


## Necessary Installation
#### You need to install NodeJS
[Node.js](https://nodejs.org/en/)

#### You need to install MeteorJS 
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```bash
npm install -g meteor
```
#### Installing packages

- #####  Go to the root directory of the project
- #####  Run the following command: 
`npm install`



## Run project commands
#### Testing
```bash
npm test
```
#### Run project on port 3000
```bash
npm start
```

## To add Gateway
#### GET or POST to /addgateway with the nexts params in the URL
```js

    serialnumber // ID of Gateway
    name 
    ip4          // IP Validada

```
#### example
```bash
curl http://localhost:3000/addgateway?serialnumber=334-34433-43434&name=Gateway1&ip4=192.168.1.1
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```

## To add Peripheral
#### GET or POST to /addperipheral with the nexts params in the URL
```js
    uid             // ONLY NUMBER
    vendor
    serialnumber    // Gateway serial number
```
#### example
```bash
curl http://localhost:3000/addperipheral?uid=55662233&vendor=Vendor1&serialnumber=334-34433-43434
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```

## To remove Gateway
#### GET or POST to /addgateway with the nexts params in the URL
```js
    serialnumber // ID of Gateway
```
#### example
```bash
curl http://localhost:3000/removegateway?serialnumber=334-34433-43434
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```

## To remove Peripheral
#### GET or POST to /addperipheral with the nexts params in the URL
```js
    id             // Peripheral id
```
#### example
```bash
curl http://localhost:3000/removeperipheral?id=3ArJugbZGnRet3r3d
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```

## To update Gateway
#### GET or POST to /updategateway with the nexts params in the URL
```js
    serialnumber // ID of the Gateway to update
    //Values ​​to Update
    name
    ip4          // IP Validada
```
#### example
```bash
curl http://localhost:3000/updategateway?serialnumber=334-34433-43434&name=Gateway1&ip4=192.168.1.1
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```

## To update Peripheral
#### GET or POST to /updateperipheral with the nexts params in the URL
```js
    id              // ID of the Peripheral to update
    //Values ​​to Update
    uid             // ONLY NUMBER
    vendor
    status          // online/offline -- OPTIONAL
```
#### example
```bash
curl http://localhost:3000/updateperipheral?id=Pq3wrvHg6ik7wCjPQ&uid=52277888788&vendor=Vendor1
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```
#### example - change to online/offline
```bash
//TO ONLINE
curl http://localhost:3000/updateperipheral?id=Pq3wrvHg6ik7wCjPQ&status=online
or
//TO OFFLINE
curl http://localhost:3000/updateperipheral?id=Pq3wrvHg6ik7wCjPQ&status=offline
```
```js
// This returns an element JSON
{
    result: "Message returned"
}
//In case of error
{
    error: "Message returned"
}
```
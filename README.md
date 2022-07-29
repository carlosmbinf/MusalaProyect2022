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

    serialnumber //ID of Gateway
    name 
    ip4          //IP Validada

```
#### example
```bash
curl http://localhost:3000/addgateway?serialnumber=334-34433-43434&name=Gateway1&ip4=192.168.1.1
```

## To add Peripheral
#### GET or POST to /addperipheral with the nexts params in the URL
```js
    uid //ONLY NUMBER
    vendor
```
#### example
```bash
curl http://localhost:3000/addperipheral?uid=55662233&vendor=Gateway1
```
```js
//This returns an element JSON
{
result: "Message returned"
}
```

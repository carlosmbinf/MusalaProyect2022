# MustafaProyect2022

To add Gateway
GET to /addgateway 
Data:{
    serialnumber
    name
    ip4
}
example
curl http://localhost:3000/addgateway?serialnumber=334-34433-43434&name=Gateway1&ip4=192.168.1.1

To add Peripheral
GET to /addperipheral 
Data:{
    uid //ONLY NUMBER
    vendor
    status //OPTIONAL
}
example
curl http://localhost:3000/addgateway?uid=55662233&vendor=Gateway1&status=offline
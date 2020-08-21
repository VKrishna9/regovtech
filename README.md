# regovtech

* **Configurations**
`{
    "Database": 
    {
       "host": "<hostname>", 
       "port": <port Number>,
       "username": "<DB Username>",
       "password": "<DB Password>",
       "db":"<<DB Name>>",
       "dialect": "<<DB>>" 
    }
     ,
  "service":
      {
      "port": "<port Number>",
      "basecontext": "/v1/api",
      "loginterval":5000,
      "userloginTimeout": 1000
      }
    
}`

* **Build**
>npm run build

* **Start**
>npm run start
Note: before start please copy the config folder from /src to /dist


* **Rest API Endpoints**
All services use post method and data in json format

* **User Registration:auth/registeruser**

* **Request :**
`{"username":"testuser1",
 "password":"test1",
 "firstname":"Test1",
 "lastname":"User1",
 "phonenumber":"24432242"
}`
* **Response**
`{
"userName": "testuser1",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3R1c2VyMSIsImlhdCI6MTU5Nzk5NTIxNCwiZXhwIjoxNTk4MDgxNjE0fQ.s_wJf31N7dqJHQLayGc1oszLf_y9r9R88bqzHqTnQwU",
"date": "08-21-2020 15:33:34"
}`

* **User Login:auth/registeruser**
* **Request:**
`{"username":"testuser1",
 "password":"test1"
}`

* **Response:**
`{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTc5OTU0NDEsImV4cCI6MTU5ODA4MTg0MX0.dxGVw7lhhTZpknuoEPOgDywWtYmUZMQ8pQqUN4Oyghk",
"date": "08-21-2020 15:37:21"
}`

* **Logout:auth/registeruser**
* **Request:**
`{"username":"testuser1",
 "error":0
}`
* **Response:**
``{
"status": 200,
"message": "User log out successful"
}`

* **Note: all services from here will expect “authorization” key in header**

* **WareHouse Add:warehouse/add**
* **Request:**
`{"warehousename":"WareHouse1",
 "warehousetype":3,
 "location":"Kualalumpur"
}`
* **Response:**
`{
"wareHouseName": "WareHouse1",
"message": "Success"
}`

* **WareHouse: /warehouse/details
* **Request:**
`{"warehousename":"WareHouse3",
 "warehousetype":4,
 "location":"Kualalumpur"
}`
* **Response:**
`[
  {
"id": null,
"warehousename": "WareHouse3",
"warehousetype": 4,
"location": "Kualalumpur",
"createdby": null,
"createddate": null,
"productname": null,
"producttype": null,
"quantity": null,
"price": null,
"whid": null,
"category": null
}
]`



* **WareHouses: /warehouse/all**
* **Request:**
`{"warehousename":"WareHouse",
 "location":"Kualalumpu"
}`
* **Response:**
`[
  {
"warehousename": "WareHouse1",
"location": "Kualalumpur"
},
  {
"warehousename": "WareHouse3",
"location": "Kualalumpur"
}
]`



* **WareHouse Delete:/warehouse/delete**
* **Request:**
`{"warehousename":"testuser1"
}`
* **Response:**
`{
"wareHouseName": "testuser1",
"message": "Succes"
}`

* **Products Add:product/add**
* **Request:**
`{"productname":"product1",
 "producttype":"2",
 "quantity":10,
 "price":55,
 "category":"A",
 "wareHouseId":2
}`
* **Response:**
`{
"productName": "product1",
"message": "Success"
}`


* **Products List All:product/all**
* **Request:**
`{"productname":"product"
}`
* **Response:**
`[
  {
"productname": "product1",
"producttype": 2,
"quantity": 10,
"category": "A"
},
  {
"productname": "product2",
"producttype": 3,
"quantity": 100,
"category": "AA"
},
  {
"productname": "product3",
"producttype": 4,
"quantity": 15,
"category": "B"
}
]`


* **Products Delete:product/delete**
* **Request:**
`{"productname":"testuser1"
}`
* **Response:**
`{
"productName": "testuser1",
"message": "Success"
}`


* **Stock Add:stock/add:**
* **Request:**
`{"productname":"product1",
 "quantity":"5",
 "price":"555",
 "warehouse":"WAREHOUSE1"
}`
* **Response:**
`{
"ProductName": "product1",
"message": "Success"
}`


* **Stock Delete:stock/delete**
* **Request:**
`{"productname":"product1",
 "quantity":"5",
 "price":"555",
 "warehouse":"WAREHOUSE1"
}`
* **Response:**
`{
"ProductName": "product1",
"message": "Success"
}`



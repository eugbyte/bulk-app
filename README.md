# bulkApi
BulkApi is a community buying platform where consumers can come together to purchase goods in bulk at reduced prices. If the minimum purchase quantity is not met by the specified date, both consumers and producers can backout. Until then, they are "locked in".  

BulkApi also aims to reduce delivery cost. Buyers are encouraged to select a community pick up point to share the costs amongst them. 

Sellers have the discretion to set their own discount schemes, ensuring that sellers can offer a discount that is optimal and sustainable for their business.

# How to login to the website
   
Go to https://bulk-aspnet.azurewebsites.net  

## Consumer
* **username:** TestConsumer  
* **password:** TestPassword  

## Producer
* **username:** TestProducer  
* **password:** TestPassword  

# How to run locally
1. **Database:** Run the latest sql script
2. **Backend Api:** Run the ASP.NET Core application
3. **Frontend:** Run `npm install` and then `npm start`

# Tech stack and features
1. React, Redux Thunk, JS, Typescript, Material UI for the front end
2. ASP.NET Core, Identity, C# for the backend
3. SQL Server for the database
4. JWT Authentication and Authorization
5. REST API for CRUD operations

# Docker support
Navigate to the docker folder  
See [DOCKER_README](https://github.com/eugbyte/bulk-app/blob/master/docker/DOCKER_README.md)

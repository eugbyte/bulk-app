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

# Tech stack and features
1. React, Redux Thunk, JS, Typescript, Material UI for the front end
2. ASP.NET Core, Identity, C# for the backend
3. SQL Server for the database
4. JWT Authentication and Authorization
5. REST API for CRUD operations
6. Docker support

---

# Docker-Compose support
## Run Docker Compose
```
cd docker
docker-compose build
docker-compose up -d
docker ps
```

## Restore the .bak file in the Mssql container
```
# omit the "winpty" if you are not using git bash
winpty docker exec -it mssql opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '28DockerPass!' -Q "RESTORE DATABASE [Bulk] FROM DISK = '/var/opt/mssql/backup/Bulk.bak' WITH MOVE 'Bulk' TO '/var/opt/mssql/data/Bulk.ndf', MOVE 'Bulk_Log' TO '/var/opt/mssql/data/Bulk_log.ldf' "
```

Unfortunately, the above command cannot be integrated into the Dockerfile or the docker-compose file. The command would have been executed before the mssql server is up.

## Access the website
In your browser, go to <http://localhost:3000>

---

# Local set up
1. **Database:** Run the latest sql script
2. **Backend Api:** Run the ASP.NET Core application
   * Check that ```Extensions/ServiceCollectionExtensions.AddDbContextExtension()``` uses the variable ```localConnectionString```
3. **Frontend:** Run `npm install` and then `npm start`
   * Check that ```services/UtilService.getApiUrl()``` returns the variable ```localhost```




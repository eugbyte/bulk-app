## Install git bash
Git bash will be used as the shell to execute the docker commands

## Navigate to the docker folder
```
# assuming the root directory is the bulkapi folder 
cd docker
```

## Create the network 
The network is for the db container, aspnet container and react container to communicate with each other
```
docker network create bulk-network --driver=bridge
```

## Create the volume
The volume is to persist the sql files 
```
docker volume create bulk-vol
```

## Create the MSSQL container
```
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=28DockerPass!' --name 'mssql' -p 1433:1433 -v bulk-vol:/var/opt/mssql --network=bulk-network -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
docker ps
```

 
 ### Copy .bak file
 ```
 winpty docker exec -it mssql mkdir var/opt/mssql/backup
 docker cp Bulk.bak mssql:/var/opt/mssql/backup 
 ```
 
 ### Restore the .bak file 
 #### To get the path directory of the .ndf and .ldf files
```
winpty docker exec -it mssql opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '28DockerPass!' -Q "RESTORE FILELISTONLY FROM DISK = '/var/opt/mssql/backup/Bulk.bak' "
```

#### Execute the RESTORE
```
winpty docker exec -it mssql opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '28DockerPass!' -Q "RESTORE DATABASE [Bulk] FROM DISK = '/var/opt/mssql/backup/Bulk.bak' WITH MOVE 'Bulk' TO '/var/opt/mssql/data/Bulk.ndf', MOVE 'Bulk_Log' TO '/var/opt/mssql/data/Bulk_log.ldf' "
```

#### Verify that the table is created
```
winpty docker exec -it mssql opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '28DockerPass!' -Q "SELECT * FROM [Bulk].sys.tables"
```

## Create the aspnet core container
### Change directory to aspnet folder
```
cd ./../backend
```

### Make sure that the db connection string refers to the mssql container
```
cd BulkApi\Extensions
```
Open ```ServiceCollectionExtension.cs```
Under ```AddDbContextExtension()```, make sure the ```dockerConnectionString``` is chosen
```
services.AddDbContext<BulkDbContext>(options =>
  options.UseSqlServer(dockerConnectionString));
```

Then, navigate back to the backend folder
```
cd ../../
```

### Build the image
```
docker image build --tag bulkapi .
```

### Run the container
```
docker container run --name bulkapi -p 44397:80 -d --network=bulk-network bulkapi
docker ps
```
### Test the api
##### Note that the port has been changed from https to http
```
curl "http://localhost:44397/api/products"
```

## Create the react container
### Change directory to react folder
```
cd ./../frontend
```

### Make sure to change the API url to match that of the aspnet container
```
cd src\services
```
Open ```UtilService.ts```
Under the ```getApiUrl()``` method, make sure to return the ```docker``` variable
```
static getApiUrl(): string {
    //const localhost: string = "https://localhost:44397/api/";   
    const docker: string = "http://localhost:44397/api/"; // http and not https
    //const azure: string = "https://bulk-aspnet.azurewebsites.net/api/";
    return docker;
}
```

Then, navigate back to the react folder
```
cd ../../
```

### Build the image
```
docker image build --tag bulk-react-app .
```

### Run the container
```
docker container run --name bulk-react-app -p 3000:80 -d --network=bulk-network bulk-react-app
docker ps
```

### Test the react container
In your browser, go to <http://localhost:3000>


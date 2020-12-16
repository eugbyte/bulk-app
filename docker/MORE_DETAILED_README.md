## Purpose of this readme
This readme is a more detailed guide on how to run the docker-compose file, as compared to the more general readme at bulkapi/README.md

## Clear local ports
The bulk apps will be using port 1433, 3000 and 44397. Kill these ports if they are in use, or exit the applications using these ports.

```
# On bash
fuser -k 1433/tcp
```

## Verify connection strings

### Check db connection string for the aspnet core app
```
cd bulkApi\backend\BulkApi\Extensions
ls
```
Check that ```ServiceCollectionExtensions.AddDbContextExtension()``` uses the variable ```dockerConnectionString```

### Check the api string for the react app
```
cd bulkApi\frontend\src\services
ls
```
Check that ```UtilService.getApiUrl()``` returns the variable ```localhost```

### Navigate back to the docker folder  
```
cd bulkApi\docker
```


## Run Docker Compose
```
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

## Validate containers  

### Test the db
```
# omit the "winpty" if you are not using git bash
winpty docker exec -it mssql opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '28DockerPass!' -Q "SELECT * FROM [Bulk].sys.tables"
```

### Test the aspnet core container
```
curl "http://localhost:44397/api/products"
```

### Test the react container
In your browser, go to <http://localhost:3000>


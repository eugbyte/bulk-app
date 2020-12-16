FROM mcr.microsoft.com/mssql/server

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=28DockerPass!
EXPOSE 1433

RUN ["mkdir", "-p", "var/opt/mssql/backup"]
COPY Bulk.bak var/opt/mssql/backup

FROM mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=28Stratton!

COPY mssql.sql /docker-entrypoint-initdb.d/
#### Table of Content:
1. [Prerequisites](#1-prerequisites)
2. [Filling out config files](#2-filling-out-config-files)
3. [Create Database](#3-create-database)
4. [Build the application from the sources](#4-build-the-application-from-the-sources)
5. [Launch Karaf environment](#5-launch-karaf-environment)
6. [Takeoff!](#6-takeoff)

---

### 1. Prerequisites
1. Java OpenJDK version "1.8.0_372" (use your favorite package manager)
2. Maven 3.6.3 for project build ([Download](https://maven.apache.org/docs/3.6.3/release-notes.html)).
   Alternatively, you can use generated Maven Wrapper
3. Apache Karaf 4.2.2 as environment ([Download](https://karaf.apache.org/archives))
4. Docker

### 2. Filling out config files
To run this project you need two config files with API and DB properties ([navigate to folder](../weather-fetcher-parent/weather-fetcher/wf-provisioning/etc)).  
[Generate](https://home.openweathermap.org/api_keys) your own API key or use existing one (if it isn't revoked yet).  
You can use defaults for database as long as you keep consistency with docker-compose values.

### 3. Create Database
Create Database executing docker-compose file. Use [docker-compose.yml](../weather-fetcher-parent/docker-compose.yml):

Start database:

`
docker-compose up
`

Disconnect (add flag `-v` if you want to remove volume and delete stored data):

`
docker-compose down
`


### 4. Build the application from the sources
Execute from the application [root](../weather-fetcher-parent):

`
mvn clean install
`

or execute Maven Wrapper script from the application [root](../weather-fetcher-parent):

`
./mvnw clean install
`

---
### 5. Launch Karaf environment
Run following command from the Apache Karaf root folder (`clean` is an optional argument for "clean environment start"):
```
bin/karaf clean
```
---
After Karaf has started, execute the following commands:
```
repo-add mvn:org.apache.cxf.karaf/apache-cxf/3.5.5/xml/features
repo-add mvn:org.hibernate/hibernate-osgi/5.2.18.Final/xml/karaf
repo-add mvn:com.wfproject/wf-provisioning/1.0.0-SNAPSHOT/xml
feature:install weather-fetcher
```
**NOTE:** you can skip these commands execution by overriding the original karaf files:
```
${KARAF_DIR}/apache-karaf-4.2.2/etc/org.apache.karaf.features.cfg
${KARAF_DIR}/apache-karaf-4.2.2/etc/org.ops4j.pax.url.mvn.cfg
```
with files located in karaf-configs folder ([navigate locally](./weather-fetcher/karaf-configs)):
``
${PROJECT_DIR}/weather-fetcher-parent/weather-fetcher/karaf-configs
``

**NOTE:** do such overriding before karaf launching or make sure to do clean restart afterwards as described in [#Launch Karaf environment](#launch-karaf-environment) section

---
### 6. Takeoff

On successful services creation you'll see `"WeatherApiProxy has been successfully initialized"` message in the console.

Make a request:
http://localhost:8181/cxf/weather/currentWeather?country=UA&city=Kyiv

Parameters:

**country**: country alpha-2 code ([list of country codes](https://www.iban.com/country-codes)), _[required]_  
**city**: city name, _[optional]_

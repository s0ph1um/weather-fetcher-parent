### Prerequisites
1. Java OpenJDK version "1.8.0_372" (use your favorite package manager)
2. Maven 3.6.3 for project build ([Download](https://maven.apache.org/docs/3.6.3/release-notes.html))
3. Apache Karaf 4.2.2 as environment ([Download](https://karaf.apache.org/archives))

### Build the application

`
mvn clean install
`
---
### Launch Karaf environment <a id="start_karaf"></a>
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
OR you can skip this commands execution by overriding the original karaf files:
```
${KARAF_DIR}/apache-karaf-4.2.2/etc/org.apache.karaf.features.cfg
${KARAF_DIR}/apache-karaf-4.2.2/etc/org.ops4j.pax.url.mvn.cfg
```
with files located in karaf-configs folder ([navigate locally](./weather-fetcher/karaf-configs)):
``
${PROJECT_DIR}/weather-fetcher-parent/weather-fetcher/karaf-configs
``

NOTE: do such overriding before karaf launching or make sure to do clean restart afterwards as described in [#Launch Karaf environment](#start_karaf) section

---

On successful services creation you'll see `"WeatherApiProxy has been successfully initialized"` message in the console

Make a request:
http://localhost:8181/cxf/weather/currentWeather?country=UA&city=Kyiv

Parameters:

**country**: alpha-2 code ([list of country codes](https://www.iban.com/country-codes))  

**city**: city name

FROM java:8-jre

ADD ./target/gateway.jar /app/
COPY truststore.jks /app/
CMD java  -Djavax.net.ssl.trustStore=/app/truststore.jks -Djavax.net.ssl.trustStoreType=jks  -Xmx200m -jar /app/gateway.jar

EXPOSE 4000
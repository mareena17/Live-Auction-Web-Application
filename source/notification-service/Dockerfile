FROM java:8-jre

ADD ./target/notification-service.jar /app/
COPY truststore.jks /app/
CMD java -Xmx200m  -Djavax.net.ssl.trustStore=/app/truststore.jks -Djavax.net.ssl.trustStoreType=jks -jar /app/notification-service.jar

EXPOSE 8000
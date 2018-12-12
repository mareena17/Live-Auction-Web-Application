FROM java:8-jre

ADD ./target/items-service.jar /app/
COPY truststore.jks /app/
CMD java ${JAVA_OPTS} -Djavax.net.ssl.trustStore=/app/truststore.jks -Djavax.net.ssl.trustStoreType=jks -Xmx200m -jar /app/items-service.jar

EXPOSE 8010
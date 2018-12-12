FROM java:8-jre

ADD ./target/registry.jar /app/
COPY truststore.jks /app/
CMD java  -Djavax.net.ssl.trustStore=/app/truststore.jks -Djavax.net.ssl.trustStoreType=jks -Xmx200m -jar /app/registry.jar


EXPOSE 8761
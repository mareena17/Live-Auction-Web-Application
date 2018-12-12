FROM java:8-jre

ADD ./target/bidding.jar /app/
COPY truststore.jks /app/
CMD java ${JAVA_OPTS} -Djavax.net.ssl.trustStore=/app/truststore.jks -Djavax.net.ssl.trustStoreType=jks -Xmx200m -jar /app/bidding.jar

EXPOSE 8050
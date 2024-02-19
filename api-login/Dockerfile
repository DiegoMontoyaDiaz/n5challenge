FROM --platform=linux/arm64 maven:3.8.3-openjdk-17 as build
ENV TIME_ZONE America/Guayaquil
ENV TZ=$TIME_ZONE
ENV JAVA_OPTS "-Djava.awt.headless=true -Xmx1250m -Xms256m -Dmaven.artifact.threads=10"

WORKDIR /app

COPY . /app

RUN mvn -f /app/pom.xml clean package -Dmaven.artifact.threads=20 -e -X

EXPOSE 9902
ENTRYPOINT exec java -jar /app/target/api-login-1.0.0-SNAPSHOT.jar -e java.io.tmpDir=/app

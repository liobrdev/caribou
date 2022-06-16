FROM maven:3-eclipse-temurin-8

WORKDIR /server
COPY . .
ENV JAVA_ENV production
RUN mvn package

EXPOSE 4567

# ---- Build stage: compile the fat jar with the Maven wrapper ----
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy the wrapper first so dependency download is cached when only src changes.
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -q dependency:go-offline

# Copy sources and build (tests skipped for faster, deterministic image builds).
COPY src ./src
RUN ./mvnw -B -q clean package -DskipTests

# ---- Run stage: small JRE image that just runs the jar ----
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Render provides PORT at runtime; Spring reads it via server.port=${PORT:8080}.
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

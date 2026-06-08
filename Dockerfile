# ---- Etapa 1: Compilar el proyecto con Maven ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom.xml primero para cachear dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar
COPY src ./src
RUN mvn package -DskipTests -B

# ---- Etapa 2: Imagen final ligera para ejecutar ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el .jar generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Render usa el puerto 8080 por defecto para web services
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]

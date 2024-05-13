@REM Build the Docker image

docker build -t ajmalj/carreralink-admin admin
docker build -t ajmalj/carreralink-company company
@REM docker build -t ajmalj/carreralink-ai ai
@REM docker build -t ajmalj/carreralink-auth auth
@REM docker build -t ajmalj/carreralink-client client
@REM docker build -t ajmalj/carreralink-communication communication
@REM docker build -t ajmalj/carreralink-compiler compiler
@REM docker build -t ajmalj/carreralink-order order
@REM docker build -t ajmalj/carreralink-user users

@REM Push the Docker image to Docker Hub

docker push ajmalj/carreralink-admin
docker push ajmalj/carreralink-company
@REM docker push ajmalj/carreralink-ai
@REM docker push ajmalj/carreralink-auth
@REM docker push ajmalj/carreralink-client
@REM docker push ajmalj/carreralink-communication
@REM docker push ajmalj/carreralink-compiler
@REM docker push ajmalj/carreralink-order
@REM docker push ajmalj/carreralink-user
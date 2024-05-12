@REM Build the Docker image

docker build -t ajmalj/carreralink-admin admin
docker build -t ajmalj/carreralink-ai ai
docker build -t ajmalj/carreralink-auth auth
docker build -t ajmalj/carreralink-client client
docker build -t ajmalj/carreralink-communication communication
docker build -t ajmalj/carreralink-company company
docker build -t ajmalj/carreralink-compiler compiler
docker build -t ajmalj/carreralink-order order
docker build -t ajmalj/carreralink-user users

@REM Push the Docker image to Docker Hub

docker push ajmalj/carreralink-admin
docker push ajmalj/carreralink-ai
docker push ajmalj/carreralink-auth
docker push ajmalj/carreralink-client
docker push ajmalj/carreralink-communication
docker push ajmalj/carreralink-company
docker push ajmalj/carreralink-compiler
docker push ajmalj/carreralink-order
docker push ajmalj/carreralink-user
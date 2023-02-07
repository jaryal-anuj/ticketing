docker build -t anujjaryal/auth:latest -t anujjaryal/auth:$SHA ./auth
docker build -t anujjaryal/client:latest -t anujjaryal/client:$SHA ./client
docker build -t anujjaryal/expiration:latest -t anujjaryal/expiration:$SHA ./expiration
docker build -t anujjaryal/orders:latest -t anujjaryal/orders:$SHA ./orders
docker build -t anujjaryal/payments:latest -t anujjaryal/payments:$SHA ./payments
docker build -t anujjaryal/tickets:latest -t anujjaryal/tickets:$SHA ./tickets
docker push anujjaryal/auth:latest
docker push anujjaryal/client:latest
docker push anujjaryal/expiration:latest
docker push anujjaryal/orders:latest
docker push anujjaryal/payments:latest
docker push anujjaryal/tickets:latest

docker push anujjaryal/auth:$SHA
docker push anujjaryal/client:$SHA
docker push anujjaryal/expiration:$SHA
docker push anujjaryal/orders:$SHA
docker push anujjaryal/payments:$SHA
docker push anujjaryal/tickets:$SHA
kubectl apply -f infra/k8s && kubectl apply -f infra/k8s-dev
kubectl set image deployments/auth-depl server=anujjaryal/auth:$SHA
kubectl set image deployments/client-depl server=anujjaryal/client:$SHA
kubectl set image deployments/expiration-depl server=anujjaryal/expiration:$SHA
kubectl set image deployments/orders-depl server=anujjaryal/orders:$SHA
kubectl set image deployments/payments-depl server=anujjaryal/payments:$SHA
kubectl set image deployments/tickets-depl server=anujjaryal/tickets:$SHA


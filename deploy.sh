# docker build -t anujjaryal/auth:latest -t anujjaryal/auth:$SHA ./auth
# docker build -t anujjaryal/client:latest -t anujjaryal/client:$SHA ./client

# docker push anujjaryal/auth:latest
# docker push anujjaryal/client:latest


# docker push anujjaryal/auth:$SHA
# docker push anujjaryal/client:$SHA

# kubectl apply -f infra/k8s && kubectl apply -f infra/k8s-dev
# kubectl set image deployments/auth-depl auth=anujjaryal/auth:$SHA



docker build -t anujjaryal/auth ./auth
docker build -t anujjaryal/client ./client
docker build -t anujjaryal/expiration ./expiration
docker build -t anujjaryal/orders:latest ./orders
docker build -t anujjaryal/payments:latest ./payments
docker build -t anujjaryal/tickets:latest ./tickets

docker push anujjaryal/auth
docker push anujjaryal/client
docker push anujjaryal/expiration
docker push anujjaryal/orders
docker push anujjaryal/payments
docker push anujjaryal/tickets

kubectl apply -f infra/k8s
kubectl apply -f infra/k8s-gc

kubectl rollout restart deployment auth-depl
kubectl rollout restart deployment client-depl
kubectl rollout restart deployment expiration-depl
kubectl rollout restart deployment orders-depl
kubectl rollout restart deployment payments-depl
kubectl rollout restart deployment tickets-depl


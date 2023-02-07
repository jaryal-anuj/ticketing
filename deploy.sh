# docker build -t anujjaryal/auth:latest -t anujjaryal/auth:$SHA ./auth
# docker build -t anujjaryal/client:latest -t anujjaryal/client:$SHA ./client
# docker build -t anujjaryal/expiration:latest -t anujjaryal/expiration:$SHA ./expiration
# docker build -t anujjaryal/orders:latest -t anujjaryal/orders:$SHA ./orders
# docker build -t anujjaryal/payments:latest -t anujjaryal/payments:$SHA ./payments
# docker build -t anujjaryal/tickets:latest -t anujjaryal/tickets:$SHA ./tickets
# docker push anujjaryal/auth:latest
# docker push anujjaryal/client:latest
# docker push anujjaryal/expiration:latest
# docker push anujjaryal/orders:latest
# docker push anujjaryal/payments:latest
# docker push anujjaryal/tickets:latest

# docker push anujjaryal/auth:$SHA
# docker push anujjaryal/client:$SHA
# docker push anujjaryal/expiration:$SHA
# docker push anujjaryal/orders:$SHA
# docker push anujjaryal/payments:$SHA
# docker push anujjaryal/tickets:$SHA
# kubectl apply -f infra/k8s && kubectl apply -f infra/k8s-dev
# kubectl set image deployments/auth-depl auth=anujjaryal/auth:$SHA
# kubectl set image deployments/client-depl client=anujjaryal/client:$SHA
# kubectl set image deployments/expiration-depl expiration=anujjaryal/expiration:$SHA
# kubectl set image deployments/orders-depl orders=anujjaryal/orders:$SHA
# kubectl set image deployments/payments-depl payments=anujjaryal/payments:$SHA
# kubectl set image deployments/tickets-depl tickets=anujjaryal/tickets:$SHA


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
kubectl apply -f infra/k8s-dev

kubectl rollout restart deployment auth-depl
kubectl rollout restart deployment client-depl
kubectl rollout restart deployment expiration-depl
kubectl rollout restart deployment orders-depl
kubectl rollout restart deployment payments-depl
kubectl rollout restart deployment tickets-depl


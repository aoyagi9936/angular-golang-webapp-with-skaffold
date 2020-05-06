# angular-golang-webapp-with-skaffold

## Setup
Install Skaffold and Minikube

*Linux*
``` shell
$ curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
sudo install skaffold /usr/local/bin/
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
```

*MacOS*
``` shell
$ brew install skaffold
$ brew install minikube
```

## Usage
Start Minikube
``` shell
$ minikube start
```

Services of type LoadBalancer can be exposed
``` shell
$ minikube tunnel
```

Start Skaffold
``` shell
$ skaffold dev --trigger polling
```


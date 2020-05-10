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
homebrew is *not* install latest version.

## Usage
Start Minikube
``` shell
$ minikube start
$ minikube addons enable ingress
```

Preparation for access
``` shell
$ echo $(minikube ip) 'webapp-example.test' | sudo tee -a /etc/hosts
```

*MacOS*
``` shell
$ echo $(minikube ip) 'webapp-example.test' | sudo tee -a /private/etc/hosts
```

Start Skaffold
``` shell
$ skaffold dev --trigger polling
```
Reason of add `--trigger polling` option.
>there are differences in case (created folder case vs. current directory), no file watcher events are triggered.
https://github.com/GoogleContainerTools/skaffold/issues/3109

## Development Angular

``` shell
$ cd client/dev
$ docker-compose up app-init # setup node_modules
$ docker-compose up ng-serve
```

Access to `localhost:4200` with a brawser.

Start mock server [Prism](https://stoplight.io/open-source/prism/) .
``` shell
$ docker-compose up api-mock
```

Deploy is below.

(Skaffold detect the angular output-path)

``` shell
$ docker-compose up ng-build
```

## Development Golang
Modify files under the server/src directory.

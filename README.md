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

## OpenAPI (OAS)

Modify `common/src/openapi3/<version>/*` 

This Command generate `openapi.yaml` `postman.json` under the `common/src/openapi3/build/`

Thanks for great sample [dgarcia360/openapi-boilerplate](https://github.com/dgarcia360/openapi-boilerplate)

``` shell
$ cd common/dev
$ docker-compose up api-gen-test
$ docker-compose up api-gen-init
$ docker-compose up api-gen-postman
```

For client:
``` shell
$ docker-compose up api-gen-angular
```

For server:
``` shell
$ docker-compose up api-gen-gogin
```
*The server outputs only the models*

If you want to version up api:

1. create next version directory.
``` shell
$ cd common/src/openapi3/
$ cp -R v1 v2
```

2. Edit `common/src/openapi/v2/openapi.yaml`
``` ini
servers:
  - url: http://webapp-example.test/api/v2
```

3. Edit `common/dev/.env`
``` ini
DEFINE_API_PATH=common/src/openapi3/v2/openapi.yaml
```

4. Edit `common/dev/DevelopEnvironment.postman_environment.json`
``` json
	"values": [
		{
			"key": "baseUrl",
			"value": "10.96.100.20:9002/api/v2",
			"enabled": true
		}
	],
```

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

Build is below:

``` shell
$ docker-compose up ng-build
```
Skaffold detect the angular output-path.

## Development Golang
Modify files under the server/src directory.

Skaffold detect this source path.

*Testing Api*
If you change `openapi.yaml` , update `common/src/openapi3/build/postman.json`
``` shell
$ cd common/dev
$ docker-compose up api-gen-postman
```

Backend Services can be exposed via the `minikube tunnel` command.
``` shell
$ minikube tunnel
```

Api test with newman:
``` shell
$ cd server/dev
$ docker-compose up newman-test
```

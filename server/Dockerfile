ARG GOLANG_VER
ARG ALPINE_VER

FROM golang:${GOLANG_VER}-alpine${ALPINE_VER} as builder
RUN apk add --update --no-cache ca-certificates git
WORKDIR /app
COPY src/ .
RUN go mod download
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64
RUN go test ./...
RUN go build -o webapp-api

FROM alpine:${ALPINE_VER}
# Define GOTRACEBACK to mark this container as using the Go language runtime
# for `skaffold debug` (https://skaffold.dev/docs/workflows/debug/).
COPY --from=builder /app/webapp-api /usr/bin/
ENV GOTRACEBACK=single
ENTRYPOINT ["/usr/bin/webapp-api"]

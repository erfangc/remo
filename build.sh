#!/usr/bin/env bash

#
# build the front-end application
#
cd ui;
rm -rf dist/
yarn && yarn build
cd ..

#
# copy the client artifacts into the server's static
# asset directory
#
rm -rf server/src/main/resources/static/*
cp -r ui/dist/* server/src/main/resources/static/

#
# package the app into an uber JAR
#
cd server;
mvn clean package
cd ..;

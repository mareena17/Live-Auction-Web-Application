#!/bin/bash

set -e
set -u

echo "Current Directory $PWD"
# ROOT=$PWD
# echo "Building Web App"
# cd ./web/BidBig-console
# npm install
# npm run build

# echo $ROOT
# yes | cp -rf ./build/. $ROOT/gateway/src/main/resources/static/

# echo ""
# echo ""
# echo  "Building Backend"
# cd $ROOT
. en.sh
mvn clean package -Dmaven.test.skip=true -Dmaven.site.skip=true -Dmaven.javadoc.skip=true 
docker-compose -f docker-compose.light.yml -f docker-compose.dev.light.yml build
docker-compose -f docker-compose.light.yml -f docker-compose.dev.light.yml up  > out.txt

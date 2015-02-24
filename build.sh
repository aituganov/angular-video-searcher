#!/bin/bash
npm install
bower install
#proxy fix
cp -rf bower_components src/
grunt

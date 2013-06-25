#!/bin/bash

#compile app with grunt
grunt requirejs
grunt cssmin
#commit changes and push to master
git add -A
git commit -m "compile app"
git push origin master
#change branch
git checkout prod
#copy files from master branch
git show master:build/fnsea-tablet-min.js > public/js/fnsea-tablet-min.js
git show master:build/style-min.css > public/css/style-min.css
#commit changes on production branch
git add -A
git commit -m "compile, ready to deploy"
git push origin prod
#return on master
git checkout master
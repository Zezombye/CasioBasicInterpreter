#!/bin/bash
set -e

BUILD_DATE=$(date "+%Y-%m-%d")
NOW=$(date "+%s")
FIRST_AUG2014=$(date -d '1 Aug 2014' "+%s")
REVISION=$(echo "r$$(($NOW - $FIRST_AUG2014))")

mkdir build || true

echo -e "\033[32m#"
echo "# Modify/extend 'driver_web.js' from the javascript compiler compiler"
echo -e "#\033[0m"
sed "s/parse( src, err_off, err_la )/parse( src, err_off, err_la, prgNodes, prgLabels )/g" lib/jscc/driver_web.js_ > build/driver_web.js

echo -e "\033[32m#"
echo "# Regen RELEASE NUMBER and BUILD DATE"
echo -e "#\033[0m"
sed "s/\(var CBI_BUILD_DATE\)\(.*\)/\1 = '$BUILD_DATE';/g" src/js/cbiversion.js_ > build/cbiversion.js
sed -i "s/\(var CBI_VERSION\)\(.*\)/\1 = '$REVISION';/g" build/cbiversion.js

echo -e "\033[32m#"
echo "# Compile parser"
echo -e "#\033[0m"
node lib/jscc/jscc.js -o "build/cbiparser.js" -t "build/driver_web.js" "cbi_grammar.par"

echo -e "\033[32m#"
echo "# Concatenate javascript files"
echo -e "#\033[0m"
cat src/js/cbihelper.js src/js/cbimain.js build/cbiversion.js build/cbiparser.js > public/js/cbi.js


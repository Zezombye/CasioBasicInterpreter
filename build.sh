#!/bin/bash
set -e

BUILD_DATE=$(date "+%Y-%m-%d")
NOW=$(date "+%s")
FIRST_AUG2014=$(date -d '1 Aug 2014' "+%s")
REVISION=$(echo "r$(($NOW - $FIRST_AUG2014))")

if [[ ! -d build ]]; then
    mkdir build
fi

echo -e "\033[32m#"
echo "# Modify/extend 'driver_web.js' from the javascript compiler compiler"
echo -e "#\033[0m"
sed "s/parse( src, err_off, err_la )/parse( src, err_off, err_la, prgNodes, prgLabels )/g" lib/jscc/driver_web.js_ > build/driver_web.js

echo -e "\033[32m#"
echo "# Regen RELEASE NUMBER and BUILD DATE"
echo -e "#\033[0m"
echo "var CBI_BUILD_DATE = '$BUILD_DATE';" > build/cbiversion.js
echo "var CBI_VERSION = '$REVISION';" >> build/cbiversion.js

echo -e "\033[32m#"
echo "# Compile parser"
echo -e "#\033[0m"
node lib/jscc/jscc.js -o "build/cbiparser.js" -t "build/driver_web.js" "src/compiler/cbi_grammar.par"

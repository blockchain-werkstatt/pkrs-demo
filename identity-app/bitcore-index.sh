#!/bin/bash
#this is file is a hack for bicore-lib versiongaurd issue
echo 'fixing bitcore file issue'
cp ${PWD}/bitcore/index.js  ${PWD}/node_modules/bitcore-mnemonic/node_modules/bitcore-lib/index.js
echo 'fixed bitcore file issue'
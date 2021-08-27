#!/bin/bash

echo "\n\n\nNpm install:"
npm install

# echo "\n\n\nAwait test:"
# npm run test

echo "\n\n\nCopy .env file:"
file="./.env.example"
fileroot="./.env"
if [ ! -f "$fileroot" ];
then
if  [ -f "$file" ];
then
	echo "$file found."
	cp $file ./.env
	echo ".env created"
else
	echo "$file not found."
	exit 1
fi
fi

echo "\n\n\Npm start:"
npm run start:dev

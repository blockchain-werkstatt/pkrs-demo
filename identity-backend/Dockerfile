FROM node:10

# make the 'app' folder the current working directory
WORKDIR /faucet

COPY . /faucet

RUN npm install

RUN npm run postinstall

# Run only in ODK Prod , Hack to remove exposed port by null 
# RUN npm run ipfsprodfix

#Expose the port
EXPOSE 4000

#Running the project
CMD [ "npm", "start"]
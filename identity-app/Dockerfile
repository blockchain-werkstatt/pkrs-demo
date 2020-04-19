FROM node:10

# make the 'app' folder the current working directory
WORKDIR /app

COPY . /app

RUN npm install

RUN npm run postinstall

#Expose the port
EXPOSE 8001

#Running the project
CMD [ "npm", "start"]
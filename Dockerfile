FROM nodejscn/node:latest

COPY package.json /home/app/package.json
COPY api/swagger.yaml /home/app/api/swagger.yaml
COPY index.js /home/app/index.js
COPY controllers /home/app/controllers/
COPY service /home/app/service/
COPY utils /home/app/utils/
WORKDIR /home/app
RUN ["sh", "-c", "npm install"]
ENTRYPOINT ["sh", "-c", "export DEBUG=* && npm start"]

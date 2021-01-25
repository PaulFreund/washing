from node:14.15-alpine

add package.json /app/package.json
add package-lock.json /app/package-lock.json

env NODE_ENV=production
run cd /app && npm install

add workers /app/workers
add index.js /app/index.js

expose 80
cmd cd /app && node index.js

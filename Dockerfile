FROM node:20-bullseye

RUN swapon --show

# Show versions
RUN node -v
RUN npm -v

RUN apt-get update

# Install libreoffice (for Word/Excel conversion)
RUN apt-get install -y libreoffice

# Install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY . .
RUN npm run build

CMD [ "npm", "start" ]

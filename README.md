# beclosed

### Requirements

- Node 18.7.0

### Installation

```
npm install
```

### Copy the local environment

```
cp .env.local .env
```

<sub>note: see project owner for updated vars</sub>

### How to run the app locally

To start the backend server:

```
npm run dev
```

To start the frontend server:

```
npm run web
```

### How to run the tests locally

(Before running the commands, please make sure Docker is up and running on your system.)

First we need to get the server and app up and running:

```
npm run pre-test-app
npm run test-app
```

Then to run the tests in the CLI, we use the following in a different terminal:

```
npm run cypress-tests
```

### Figma Wireframes

https://www.figma.com/file/XCKWymeXQMm2V7dQ6siqpt/ClosingX-Wireframes?node-id=0%3A1

### API Specifications

https://docs.google.com/document/d/1H28FWd6p9vgo9Adn4HwByngJrUW16MiScoVpzC_Dyvc/edit#heading=h.x5m71xtmmvaw

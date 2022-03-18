
Fetch Tweets from twitter from a twitter account and post data a Front End Application every five minutes while post to a slack channel every one hour.
once messages are post to slack update collection of tweets to slacked true. 

## Getting Started


Install dependencies for Front End app in Tweets-app

```bash
npm install
```

install dependencies for Backend End app in Tweets-server

```bash
npm install
```

Deploy the Front app in Tweets-app folder with the following command:

```bash
npm run start
```

Deploy the  Server app in Tweets-server folder with the following command:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Structure

### /FrontEnd App

    /components - React components
    /components/error
    /components/error-boundary
    /components/message
    /components/navbar
    /components/spinner
    /components/tweet
    /components/tweet-feed


### /Backend Server

    /jobs - Jobs to run
    /loader - Loads Middleware - Mongoose Connection - Jobs
    /models - MongoDB models
    /routes - api route
    /services - services to retrieve data from the collection

  


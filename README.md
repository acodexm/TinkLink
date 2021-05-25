# Tink Link integration

1.Build a web application that are using Tink Link for account aggregation.
2.Display the data so that you count the total amount spent on your favourite merchant during year 2020.
3.Display the merchant logo on the result page (not included in Tink Link).
4.For bonus points, include other data from the Tink api that you feel interesting in the result page. Be creative!

## Requirements
- mongodb

#Initial & run
```
npm install
npm run start
```
or
```
yarn
yarn start
```


# Server
Server is using https://api.tink.se/api/v1 API. 
1. Client can get authorized through Tink Link API
2. token is stored safely on database and it's kept up to date
3. data aggregation is done server side, stored on database for quick access and refreshed every X min

# Client
Server is using Server API.
1. User can login with Tink Link 
2. User can see and filter transactions by categories and type
3. Merchants logo is fetched from external API

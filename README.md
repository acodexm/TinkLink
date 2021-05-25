# Tink Link integration

1. Build a web application that are using Tink Link for account aggregation.
2. Display the data so that you count the total amount spent on your favorite merchant during year 2020.
3. Display the merchant logo on the result page (not included in Tink Link).
4. For bonus points, include other data from the Tink api that you feel interesting in the result page. Be creative!

## Requirements
- mongodb
or
- docker

## Initial & run
yarn is the preferred package manager
```
yarn
yarn start
```
or
```
docker-compose up
```

## Server
Express server is using https://api.tink.se/api/v1 API. 
1. Client can get authorized through Tink Link API
2. token is stored safely on database and it's kept up to date
3. data aggregation is done server side
4. merchant mapping is using https://clearbit.com/docs#autocomplete-api

## Client
React client is using Server API.
1. User can login with Tink Link 
2. Merchants logo is fetched from external API


## Important developer notes 25.05.2021
- for now when staring project locally (yarn start) proxy cannot handle too long pageToken for paginated transactions. no issues using docker
- a lot of tests are not written due to lack of time
- a lot of styles are not finished due to lack of time
- data aggregation could be stored in database instead of memory of the server
- merchant mappings could be stored in database instead of memory of the server
- app theme might change
- client and server is prepared for data filtering and sorting and will be handled in the future
- currently there is no redirect when authentication failed and will be handled in the future
- there are no navigation buttons in header they will be added soon
- not all errors are handled, there might occur some unexpected behaviors at this point

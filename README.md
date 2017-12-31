# NodeWeather #

Simple weather site, built on node + aws (lambda, s3, api gateway, cloudformation).

Geo data from [Geocodio](https://geocod.io)  
Weather data from [Dark Sky](https://darksky.net/dev)

## Running Locally ##
_Do this and get it working before worrying about deployment_

1. Create a .env file with your api keys, e.g.
   ~~~
   GEOCODIO_API_KEY=aaabbbcccc
   DARKSKY_API_KEY=cccdddeee
   ~~~
2. [Optional] Update query.js with a location that is more relevant to you
3. Run the local lambda script
   ~~~
   npm start
   ~~~

## Deploy ##

1. Set up your [aws cli](https://docs.aws.amazon.com/lambda/latest/dg/setup-awscli.html)
2. Configure IAM to allow the deployment of all of the various components (have fun)
3. Update weather-cf.json with your path
4. Update the package script in package.json with your s3 bucket
5. Run the go script 
   ~~~
   npm run go
   ~~~
   The lambda should be deployed to aws.
66. In the lambda console, add your api keys for geocodio and dark sky (GEOCODIO_API_KEY and DARKSKY_API_KEY)
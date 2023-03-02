# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server
1. Using two separate terminal windows, start up PostgreSQL with `startpostgres`.
2. A server will also need to be running to provide the data to our main client. Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) to do this.
3. If you haven't made the database, you can create one and run the provided schema files with `npm reset` in the root folder of the directory.
4. Once the database is setup, you can start it with `npm start`.

Now that our api is running, we can start our scheduler using webpack in the second terminal window. In the root directory of the scheduler, use:
```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Testbed
* A note of caution, cypress can be challenging to set up.
Cypress requires an [X Server](https://sourceforge.net/projects/vcxsrv/) and can be installed with `npm install -g cypress@9.7.0`. The cypress testing suite runs off of a separate database in scheduler-api. This requires a setup file with the following:

```env
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_test
PGPASSWORD=development
PGPORT=5432
```
Once the scheduler-api is configured, cypress can be started from the root directory with:
```sh
npm run cypress
```

## Troubleshooting
* If you see:
```sh
Error connecting to Postgres server:
Error: connect ECONNREFUSED 123.IP.ADDRESS
```
This means that Postgres hasn't started. Run step 1.

* If you see a webpack with only one line at 5pm, this means that the api server is not running. Run step 4.





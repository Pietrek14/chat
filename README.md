# chat

chat is a simple messaging web app made for school

## build

first you have to download the node modules specified in the **backend** and **frontend** directories. to do that you `cd` to them and run `npm install` from the command line (exactly like that, no arguments given). then you will need two seperate command lines. in one you will `cd` to the **backend** directory and run `npm run run` to run the backend. you can also run `npm run watch` during development to automatically refresh node on code changes. in the other command line you `cd` to the **frontend** and run `npm run build` to build the css from the tailwind sources or `npm run watch` to build the css on file changes.

## database setup

all the database setup scripts are in the **data/setup** directory. you start by running the `database.sql` script, and then all the scripts in the **tables** folder. remember to do that in the correct order, so that foreign keys will be valid (user before session and message).
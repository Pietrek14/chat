# chat

chat is a simple messaging web app made for school

## build

first you have to download the node modules specified in the **backend** and **frontend** directories. to do that you `cd` to them and run the **index.ts** file using [deno](https://deno.land/) (`deno run --allow-all index.ts`). use the `--watch` flag to automatically restart the program on code changes (`deno run --allow-all --watch index.ts`). in the other command line you `cd` to the **frontend** and run `npm run build` to build the css from the tailwind sources or `npm run watch` to build the css on file changes.

## database setup

all the database setup scripts are in the **database/scripts** directory. you then need to run the **db_setup.bat** script. just remember when you add an sql file to the **tables** folder, you also need to add it to the **db_setup** script.

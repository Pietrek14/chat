cd ../

:: Drop the old database
mysql -u root -p < drop.sql

cd setup

:: Create the new database
mysql -u root -p < database.sql

:: Create the tables
cd tables

:: We need to create the tables in the correct order

mysql -u root -p < user.sql
mysql -u root -p < email_confirmation.sql
mysql -u root -p < session.sql
mysql -u root -p < friend_request.sql
mysql -u root -p < friendship.sql
mysql -u root -p < message.sql

cd ..

cd ../scripts
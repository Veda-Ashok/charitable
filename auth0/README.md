#Auth0 Setup
This folder contains the scripts that we will need to put into out database connection when we have to shift to a new auth0 account since we use features that they offer only in the free trial period. 

We will need to select requires username on the database connection page as well. 

##How to set up

In Tenant Settings -> Advanced -> Tenant Login URI = https://charitable.vercel.app/

Universal Login -> New

Applications -> New Application -> Regular Web Application -> Allowed Callback URLs = http://localhost:3000/api/callback, https://charitable.vercel.app/api/callback

Applications -> New Application -> Regular Web Application -> Allowed Logout URLs = http://localhost:3000/, https://charitable.vercel.app/

Connections -> Database -> CreateDBConnection -> 
Settings -> Requires Username = true
Custom Database -> Use my own database = true 
Input the scripts
-> Settings -> MONGO_PASSWORD = ....

Application -> Charitable = true

Emails -> Email Templates -> Verification Email (using Link) 
Status = On 
Redirect to = https://charitable.vercel.app/


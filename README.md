# guvi_task

Register Module:
The user has to register from the "register.html".The form fields are validated accordingly and it would return an error if the email already exists in sql database.
If there are no errors the data is accepted into sql;a unique user id is alloted to the registered user.The password is stored as a hash using "MD5" algorithm.Parralelly,a 
MongoDb document consisting of user details is initialised once the user successfully registers.

Login Module:
The user has to login to their profile from "login.html".The form fileds are validated accordingly.If the user enters correct credentials they are directed to profile 
page.Browser's local storage is used provide session functionalities.The user-id is stored in the local storage of browser.It stays there untill or unless the user has 
logged out of the profile page.Once a user logins in a Redis (kay,value) pair is created with user-id as key with a expiration time of 1-hour(3600 seconds).If the 
ttl(Time To Live) of the redis data has expired the user will not be able to access the profile and the local storage session dettail is deleted.They have to login
to their profile again.

Profile Module:
When the profile loads,it makes use of an ajax call(to profile.php) to get data of the profile details in MongoDb of that particular user.The Edit button in the page 
enables the form fields and allows user to edit their profile details.Inorder to ensure that the user enters proper credentials form validation is aptly applied.The Save
button sends an ajax call to the profile.php which updates the profile details in both MongoDb and Sql database.Whenever the profile loads it checks for the session 
information of the user;if the session is expired or invalid the user is redirected to login page.The Logout button logs the user out(Redirecting to Login Page).It also 
clears the session details in browser local storage as well as from Redis database.The user can't simply press "back button" in browser and return to Profile after
logging out.Therefore,strong security is maintained by sessioning using Browser Local Storage and Redis.

![My Image](guvi_task/assets/outputs/register.png)

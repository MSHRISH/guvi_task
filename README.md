# guvi_task

Register Module:
The user has to register from the "register.html".The form fields are validated accordingly and it would return an error if the email already exists in sql database.
If there are no errors the data is accepted into sql;a unique user id is alloted to the registered user.The password is stored as a hash using "MD5" algorithm.Parralelly,a 
MongoDb document consisting of user details is initialised once the user successfully registers.

Login Module:
The user has to login to their profile from "login.html".The form fileds are validated accordingly.If the user enters correct credentials they are directed to profile 
page.Browser's local storage is used to provide session functionalities.The user-id is stored in the local storage of browser.It stays there untill or unless the user has 
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



## Outputs:

### Register Page:

![register](https://user-images.githubusercontent.com/59884160/230833992-0bb527e1-7ae6-4c29-bf7f-eaa020c5d387.png)

### User Registered:

![register_success](https://user-images.githubusercontent.com/59884160/230834262-fdce894d-3900-44c3-921c-461abbc56c55.png)

### SQL Data:

![sqldata](https://user-images.githubusercontent.com/59884160/230834441-eaf14dd3-7a3d-4478-9c20-d5404f649874.png)

Note:The user we created right now is "TesterNew" and the user-id(uid) is "4".

### Login Page:

![login_2](https://user-images.githubusercontent.com/59884160/230836249-ff91f0e8-cce0-4aae-ba9f-612a093feed2.png)

### Browser Local Storage:

Once the user logs in a local storage session data is created in form of unique user id.

![local_session_new](https://user-images.githubusercontent.com/59884160/230836457-0d5c18e2-0dcb-4dd1-968a-5ab32888c9c5.png)

### Redis Session Expiration:

Once the user logs in a Redis (key,value) pair with user id as key is created with a ttl of 1-hour.We can ses that ttl of "4" getting
decreemented every second.

![redis_ttl](https://user-images.githubusercontent.com/59884160/230834944-05316557-fb4f-48af-aa2e-527c5bb965eb.png)

### Profile Page:

![profile](https://user-images.githubusercontent.com/59884160/230834996-b840057e-9ce3-4458-874a-999b5523baa6.png)

### Profile After Editing the details:

![profile_aftr_edit](https://user-images.githubusercontent.com/59884160/230836772-89c3e1e3-972e-4ed5-8916-0d498973fc61.png)

### Profile Details in MongoDb:

As you can see the given Profile Details of "TesterNew" is updated.

![mongosh](https://user-images.githubusercontent.com/59884160/230835127-eb59ea8f-ea1f-4494-b7a7-0d296e78b73b.png)

### Logout:

Once the user Logs out the Session is cleared from Local Storage:

![logout](https://user-images.githubusercontent.com/59884160/230835403-307bdb6e-3ea8-4f64-886e-d057293e0554.png)

### Redis Expired:

Once Logged out the Redis Session is also deleted that's why we could see the ttl of "4" returning "-2".

![redis_logout](https://user-images.githubusercontent.com/59884160/230835718-e44212f1-353b-435f-9739-a5dea50ed725.png)








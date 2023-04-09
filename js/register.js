function register_validation(name,email,password,rePassword){
    var name_flag=name_validation(name)
    var email_flag=email_validation(email)
    var password_flag=validate_password(password)
    var rePassword_flag=validate_rePassword(password,rePassword)

    if(name_flag && email_flag && password_flag && rePassword_flag){
        console.log("VALID");   
        return true;
    }
    else{
        alert("Enter Valid Details");
        return false;
    }



}

//Validate Name
function name_validation(name){
    var flag=true;
    if(name==""){
        document.getElementById("p1").innerHTML="Name is required";
        flag=false;
        return flag;
       }
       else if( /^[a-zA-Z]+$/.test(name)==false){
        document.getElementById("p1").innerHTML="Enter valid name";
        flag=false;
        return flag;
      }
      else{
        document.getElementById("p1").innerHTML=""
        return true;

      }

}

//Validate Email
function email_validation(email){
    var flag=true;
    if(email==""){
        document.getElementById("p2").innerHTML="Email is required";
        flag=false;
        return false;             
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
        document.getElementById("p2").innerHTML="invalid email";
        flag=false;
        return false;
    }
    else{
        document.getElementById("p2").innerHTML="";
        return true;
    }
}

//Validate Password
function validate_password(password){
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)==false){
        document.getElementById("p3").innerHTML="Enter Valid Password";
        return false;
    }
    else{
        document.getElementById("p3").innerHTML="";
        return true;
    }
}


//Validate rePassword
function validate_rePassword(rePassword,password){
    if(rePassword!=password){
        document.getElementById("p4").innerHTML="Passwords don't Match"
        return false;
    }
    else{
        document.getElementById("p4").innerHTML="";
        return true;
    }
}


$(document).ready(function(){
    $("#registerBtn").click(function(){
        var name=document.getElementById("userName").value
        var email=document.getElementById("userEmail").value
        var password=document.getElementById("userPassword").value
        var rePassword=document.getElementById("rePassword").value

        if(register_validation(name,email,password,rePassword)){
            // console.log("YESA")
            $.post("php/register.php",
                {name:name,email:email,password:password},
                function(data,status){
                    // console.log(status)
                    // console.log(data);
                    if(data=="ALREADY"){
                        alert("This Email Already Exists!");
                    }
                    else{
                        alert("Registered Succesfully.You will be redirected to Login.");
                        document.getElementById("userName").value="";
                        document.getElementById("userEmail").value="";
                        location.href="http://localhost/guvi_task/login.html";
                    }
                }
            )
        }

        


    });

});
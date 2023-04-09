function validate(email,password){
    var email_flag=validate_email(email)
    var password_flag=validate_password(password)

    if(email_flag && password_flag){
        console.log("VALID");
        return true;
    }
    else{
        alert("Enter Proper Credentials");
        return false;
    }
}

//Validate Password
function validate_password(password){
    if(password==""){
        document.getElementById("p2").innerHTML="Enter a Password";
        return false;
    }
    else{
        document.getElementById("p2").innerHTML=""
        return true;
    }
}

//Validate Email
function validate_email(email){
    if(email==""){
        document.getElementById("p1").innerHTML="Enter an Email"
        return false;             
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
        document.getElementById("p1").innerHTML="Enter Valid Email";
        return false;
    }
    else{
        document.getElementById("p1").innerHTML=""
        return true;
    }
}

$(document).ready(function(){
    $("#loginBtn").click(function(){
        var email=document.getElementById("userEmail").value;
        var password=document.getElementById("userPassword").value;

       if(validate(email,password)){
        $.post('php/login.php',
        {email:email,password:password},
        function(data,status){
            console.log(status);
            console.log(data);

            var response_data=JSON.parse(data);

            if(response_data.status=="-1"){
                alert("This Email Doesn't Exist.Kindly Register it....");
            }
            else if(response_data.status=="0"){
                alert("Passwords Don't Match");
            }
            else{
                document.getElementById("userEmail").value=""
                localStorage.setItem(response_data.uid,response_data.uid);
                var url_str="http://localhost/guvi_task/profile.html?uid"+"="+response_data.uid;
                location.href=url_str;
            }
            
        })
       }
        

    });
});
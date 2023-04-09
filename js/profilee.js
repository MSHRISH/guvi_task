function validate(name,dob,phone,email,college,degree,dept){
    var name_flag=name_validation(name)
    var dob_flag=dob_validation(dob);
    var phone_flag=phone_validation(phone)
    var email_flag=email_validation(email)
    var college_flag=validate_college(college)
    var degree_flag=validate_degree(degree);
    var dept_flag=validate_dept(dept);

    if(name_flag &&  dob_flag && phone_flag && email_flag && college_flag && degree_flag && dept_flag){
        console.log("VALID");
        return true;
    }
    else{
        alert("Enter Valid Credentials");
        return false;
    }

}

//validate Name
function name_validation(name){
    var flag=true; 
    if(name==""){
        document.getElementById("p1").innerHTML="Name is required";
        flag=false;
        return false;
       }
       else if( /^[a-zA-Z]+$/.test(name)==false){
        document.getElementById("p1").innerHTML="Enter valid name";
        flag=false;
        return false;
      }
      else{
        document.getElementById("p1").innerHTML=""
        return true;

      }

}

//Validate DOB
function dob_validation(dob){
    if(!dob){
        document.getElementById("p2").innerHTML="Enter a Valid Date";
        return false;
    }
    else if(!(parseInt(dob.slice(0,4))>=2000 && parseInt(dob.slice(0,4))<=2005)){
        document.getElementById("p2").innerHTML="Enter a Correct Date"
        return false;
    }
    else{
        document.getElementById("p2").innerHTML="";
        return true;
    }
    
}

//validate Phone
function phone_validation(phone){
    if(phone==""){
        document.getElementById("p3").innerHTML="Phone No. is required";
        return false;
       }
    else if(/^[0-9]+$/.test(phone)==false  || phone.length!=10){
            document.getElementById("p3").innerHTML="Invalid mobile number";
            return false;
       }
    else{
        document.getElementById("p3").innerHTML=""
        return true;
       }
}


//Validate Email
function email_validation(email){
    var flag=true;
    if(email==""){
        document.getElementById("p4").innerHTML="Email is required";
        flag=false;
        return false;             
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
        document.getElementById("p4").innerHTML="invalid email";
        flag=false;
        return false;
    }
    else{
        document.getElementById("p4").innerHTML="";
        return true;
    }
}



//Validate College
function validate_college(college){
    if(college==""){
        document.getElementById("p5").innerHTML="Select a College";
        return false;
    }
    else{
        document.getElementById("p5").innerHTML="";
        return true;
    }
} 

//validate Degree
function validate_degree(degree){
    if(degree==""){
        document.getElementById("p6").innerHTML="Select a Degree";
        return false;
    }
    else{
        document.getElementById("p6").innerHTML="";
        return true;
    }
}

//Validate Department
function validate_dept(dept){
    if(dept==""){
        document.getElementById("p7").innerHTML="Select a Department";
        return false;
    }
    else{
        document.getElementById("p7").innerHTML="";
        return true;
    }
}


$(document).ready(function(){
    //console.log(window.location.href);
    //console.log("TEST");
    var current_url=window.location.href;
    var query_array=current_url.split("=")
    //console.log(query_array[1]);
    var uid=query_array[1];
    var temp_mail="mynameisshrish@gmail.com"




    //Session
    console.log("UID");
    console.log(localStorage.getItem("UID"))


    if(localStorage.getItem(uid)==uid){
        console.log("SESSION THERE");

        $.post("php/profilee.php",{uid:uid,type:0},
    function(data,status){
        console.log(status);
        console.log(data);
        
        // console.log(typeof data);
        var user_data=JSON.parse(data);
        console.log(user_data.name)

        if(user_data.session==1){
            document.getElementById("userName").value=user_data.name;
            document.getElementById("userDOB").value=user_data.dob; 
            document.getElementById("userAge").value=user_data.age;
            document.getElementById("userPhone").value=user_data.phone;
            document.getElementById("userEmail").value=user_data.email;
            document.getElementById("userCollege").value=user_data.college;
            document.getElementById("userDegree").value=user_data.degree;
            document.getElementById("userDept").value=user_data.dept;
        }
        else{
            alert("Log in Session Expired.Please Log In."); 

            //var session_values=[]
            for(let key in localStorage){
              //  session_values.push[key];
                if(uid==key){
                    localStorage.removeItem(uid);
                }   
            }
            
            location.href="http://localhost/guvi_task/login.html";  


        }
        
        
        

       

    })





    }
    else{
        console.log("SESSION NOT");
        alert("Invalid Session.Please Login");
        location.href="http://localhost/guvi_task/login.html";
    }
    

    


    $("#editBtn").click(function(){
        document.getElementById("userName").disabled=false;
        document.getElementById("userDOB").disabled=false;
        //document.getElementById("userAge").disabled=false;
        document.getElementById("userPhone").disabled=false;
        document.getElementById("userEmail").disabled=false;
        document.getElementById("userCollege").disabled=false;
        document.getElementById("userDegree").disabled=false;
        document.getElementById("userDept").disabled=false;


        document.getElementById("saveBtn").disabled=false;
        document.getElementById("editBtn").disabled=true;
    });

    $("#saveBtn").click(function(){
        

        var name=document.getElementById("userName").value
        var dob=document.getElementById("userDOB").value
        //var age=document.getElementById("userAge").value
        var phone=document.getElementById("userPhone").value 
        var email=document.getElementById("userEmail").value
        var college=document.getElementById("userCollege").value;
        var degree=document.getElementById("userDegree").value;
        var dept=document.getElementById("userDept").value;
        
        
        //console.log(dob.slice(0,4));

        if(validate(name,dob,phone,email,college,degree,dept)){
            document.getElementById("userName").disabled=true;
            document.getElementById("userDOB").disabled=true;
            //document.getElementById("userAge").disabled=true;
            document.getElementById("userPhone").disabled=true;
            document.getElementById("userEmail").disabled=true;
            document.getElementById("userCollege").disabled=true;
            document.getElementById("userDegree").disabled=true;
            document.getElementById("userDept").disabled=true;

            document.getElementById("saveBtn").disabled=true;
            document.getElementById("editBtn").disabled=false;

            var current_url=window.location.href;
            var query_array=current_url.split("=")
            console.log(query_array[1]);
            var uid=query_array[1];

            var current_year=new Date().getFullYear() 
            var age=parseInt(current_year)-parseInt(dob.slice(0,4));
            document.getElementById("userAge").value=age;

            //console.log(name,dob,age,phone,email,college,degree,dept);
            

           

            $.post("php/profilee.php",{type:1,name:name,dob:dob,age:age,phone:phone,email:email,college:college,degree:degree,dept:dept,uid:uid},
                function(data,status){
                    console.log(status);
                    console.log(data);

                    alert("Profile Saved Succesfully")
                })


        }
        


        


    });

    $("#logoutBtn").click(function(){
        var current_url=window.location.href;
        var query_array=current_url.split("=")
        //console.log(query_array[1]);
        var uid=query_array[1];
        
        localStorage.removeItem(uid);

        alert("Logged Out");
        
        $.post("php/profilee.php",{type:2,uid:uid},
        function(data,status){
            //alert(status);
        });

        location.href="http://localhost/guvi_task/login.html";


    });

});
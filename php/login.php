<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guviregister";

$output=array();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "connected";



$email=$_POST['email'];
$password=$_POST['password'];


$checker=$conn->prepare("SELECT * FROM `userdata` WHERE email=?;");
$checker->bind_param("s",$email);
$checker->execute();
$result=$checker->get_result();

if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        // echo $row['name'];
        // echo $row['email'];
        // echo $row['password'];

        if(hash("md5",$password)==$row['password']){
            //echo "LOGIN";
            $output['status']="1";
            $output['uid']=$row['uid'];

            $redis=new Redis();
            $redis->connect('localhost',6379);

            //Sets that user is logged in and expiration is 3600 seconds(1hr)
            if($redis){
                $redis->setex($row['uid'],30,1);
                
            }
            




        }
        else{
            //echo "Wrong Password";
            $output['status']='0';
        }
    }
}   
else{
    //echo "DOESN'T EXIST";
    $output['status']="-1";
}

echo json_encode($output);

?>
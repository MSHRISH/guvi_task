<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guviregister";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//echo "Connected";

$name=$_POST['name'];
$email=$_POST['email'];
$password=$_POST['password'];

$password=hash("md5",$password);






$checker=$conn->prepare("SELECT * FROM `userdata` WHERE email=?;");
$checker->bind_param("s",$email);
$checker->execute();
$result=$checker->get_result();
if($result->num_rows>0){
    echo "ALREADY";    
}
else{
    $sqlQuery=$conn->prepare("INSERT INTO userdata (name,email,password) VALUES (?,?,?)");
    $sqlQuery->bind_param("sss",$name,$email,$password);
    $sqlQuery->execute();
    echo "INSERTED";


    //Mongo Document Creation
    $m = new MongoDB\Driver\Manager("mongodb://localhost:27017");

    $bulkWrite = new MongoDB\Driver\BulkWrite;

    $doc = ['name' => $name, 'dob'=>"",'age' => '','phone'=>"",'email'=>$email,'college'=>'','degree'=>"",'dept'=>""];

    $bulkWrite->insert($doc);

    $m->executeBulkWrite('profile.users', $bulkWrite);
    



}




?>
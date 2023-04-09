<?php
    
    $type=$_POST['type'];

    if($type==0){
        $email='';
        $uid=$_POST['uid'];

        $redis=new Redis();
        $redis->connect('localhost',6379);
        
        $result=array();

        if($redis->exists($uid)==1){

            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "guviregister";
            $conn = new mysqli($servername, $username, $password, $dbname);
            
    
            $checker=$conn->prepare("SELECT * FROM `userdata` WHERE uid=?;");
            $checker->bind_param("i",$uid);
            $checker->execute();
            $qdata=$checker->get_result();
    
            if($qdata->num_rows>0){
                while($row=$qdata->fetch_assoc()){
                    $email=$row['email'];                
                }
            }   
    
            $m = new MongoDB\Driver\Manager("mongodb://localhost:27017");
            $filter = ['email' => $email];
            $options = ['limit' => 1];
            $query = new MongoDB\Driver\Query($filter,$options);
            $cursor=$m->executeQuery('profile.users', $query);
            
            
            foreach($cursor as $document){
                $document=(array) $document;
                $result['name']=$document['name'];
                $result['email']=$document['email'];
                $result['dob']=$document['dob'];
                $result['age']=$document['age'];
                $result['phone']=$document['phone'];
                $result['college']=$document['college'];
                $result['dept']=$document['dept'];
                $result['degree']=$document['degree'];
        }
    
        $result['session']=1;

        }
        else{
            $result['session']=0;
        }
  
      
    echo json_encode($result);
}
elseif($type==2){
    $redis=new Redis();
    $redis->connect('localhost',6379);

    if($redis){
        $redis->del($_POST['uid']);
    }
    

}

else {
    $email='';

        $uid=$_POST['uid'];

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "guviregister";
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $checker=$conn->prepare("SELECT * FROM `userdata` WHERE uid=?;");
        $checker->bind_param("i",$uid);
        $checker->execute();
        $qdata=$checker->get_result();


        if($qdata->num_rows>0){
            while($row=$qdata->fetch_assoc()){
                // echo $row['name'];
                // echo $row['email'];
                // echo $row['password'];
                $email=$row['email'];
                
            }
        }   
        



    $new_mail=$_POST['email'];
    $name=$_POST['name'];
    $dob=$_POST["dob"];
    $age=$_POST['age'];
    $phone=$_POST['phone'];
    $college=$_POST['college'];
    $degree=$_POST['degree'];
    $dept=$_POST['dept'];

    $uid=$_POST['uid'];

    $m = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $bulkWrite = new MongoDB\Driver\BulkWrite;

    $filter = ['email' => $email];

    $doc = ['name' => $name, 'dob'=>$dob,'age' => $age,'phone'=>$phone,'email'=>$new_mail,'college'=>$college,'degree'=>$degree,'dept'=>$dept];

    $update = ['$set' => $doc];
    $options = ['multi' => false, 'upsert' => false];

    $bulkWrite->update($filter, $update, $options);
    $m->executeBulkWrite('profile.users', $bulkWrite); 


    //sql_query=UPDATE userdata SET `email`="newTESSTer" WHERE `name`="shrish"



    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "guviregister";


    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    
    $query=$conn->prepare('UPDATE userdata SET `email`=?,`name`=? WHERE `uid`=?');
    $query->bind_param("ssi",$new_mail,$name,$uid);
    $query->execute();

}


?>
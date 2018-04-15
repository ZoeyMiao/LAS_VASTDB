<?php
  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------
  include ('database.php');

  $con = mysqli_connect($host,$user,$pass,$databaseName);
//   if ($con){
//     echo "Successfully connect to database, start fetch data";
//   };
  /* check connection */
  if (mysqli_connect_errno()) {
      echo ("Connection Failed");
      //echo "Connect failed: %s\n", mysqli_connect_error();
      exit();
  };

  // Retrieve data from Query String
  $startTime = $_POST['startTime'];
  $endTime = $_POST['endTime'];
  $location = $_POST['location'];
  $x_low =-1;
  $x_high =100;
  $y_low =-1;
  $y_high =100;

//   echo $startTime;
//   echo($startTime);
//   echo($endTime);
  //match location to the possible x,y coordinate
  function parselocation($location){
    if($location == 'Kiddle Land'){
            $x_low = 70;
            $y_high =45;
    }
    else if($location == 'Entry Corridor'){
            $x_low =50;
            $x_high = 70;
            $y_high = 45;
      }
    else if($location == 'Tundra Land'){
            $x_high =  50;
            $y_high = 45;
    }
    else if($location == 'Wet Land'){
           $x_high = 70;
           $y_low = 45;
    }
    else if($location == 'Coaster Alley'){
           $y_low = 70;
    };}


  parselocation($location);

  // right now for fast access limit the result number to 5,
  // remove it later after optimizing the databse access speed
  $query = "SELECT * FROM $tableName1 WHERE (TS BETWEEN
    '$startTime' AND '$endTime')
  AND XCOR BETWEEN $x_low and $x_high AND YCOR BETWEEN $y_low and $y_high  LIMIT 5";
  //echo ($query);
  //--------------------------------------------------------------------------
  // 2) Query database for data
  //--------------------------------------------------------------------------
  $result = mysqli_query($con,$query);          //query
  $array =mysqli_fetch_array($result);

  //--------------------------------------------------------------------------
// 3) echo result as json
//--------------------------------------------------------------------------
echo json_encode($array);
//Build Result String
$display_string = "<table>";
$display_string .= "<tr>";
$display_string .= "<th>TimeStamp</th>";
$display_string .= "<th>   ID</th>";
// $display_string .= "<th>   Location</th>";
$display_string .= "<th>   Activity</th>";
$display_string .= "<th>XCOR</th>";
$display_string .= "<th>YCOR</th>";
$display_string .= "</tr>";

// Insert a new row in the table for each person returned
while($row = mysqli_fetch_array($result)) {
   $display_string .= "<tr>";
   $display_string .= "<td>$row[0]</td>";
   $display_string .= "<td>$row[1]</td>";
   $display_string .= "<td>$row[2]</td>";
   $display_string .= "<td>$row[3]</td>";
   $display_string .= "<td>$row[4]</td>";
   $display_string .= "</tr>";
}

//echo "Query: " . $query . "<br />";
$display_string .= "</table>";
/* free result set */
//$result->free();
/* close connection */
//$mysqli->close();
echo ";";
echo $display_string;
?>

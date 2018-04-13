<!-- API to get connected to mysql database and try fetch data
 -->
<?php

  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------
  include ('database.php');

  // $host = "localhost";
  // $user = "hcvlab";
  // $pass = "J0rdansLab";
  //
  // $databaseName = "lasresearch";
  // $tableName1 = "MOVEMENT";
  // $tableName2 = "COMMUNICATION";

  $con = mysqli_connect($host,$user,$pass,$databaseName);

  /* check connection */
  if (mysqli_connect_errno()) {
      printf("Connect failed: %s\n", mysqli_connect_error());
      exit();
  }


  // Retrieve data from Query String
  printf ("Reached Here");

  $startTime = $_GET['startTime'];
  $endTime = $_GET['endTime'];
  $location = $_GET['location'];
  $query = "SELECT * FROM $tableName WHERE TS >= '$startTime' AND TS <='$endTime'";

  //--------------------------------------------------------------------------
  // 2) Query database for data
  //--------------------------------------------------------------------------
  $result = $con->query($query);          //query
  //$result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
  // get both associative and numeric array
  $row = $result->fetch_array(MYSQLI_BOTH);
  printf ("%s (%s)\n", $row[0], $row["TimeStamp"]);


  //--------------------------------------------------------------------------
  // 3) echo result as json
  //--------------------------------------------------------------------------
  echo json_encode($array);

  //Build Result String
  $display_string = "<table>";
  $display_string .= "<tr>";
  $display_string .= "<th>TimeStamp</th>";
  $display_string .= "<th>ID</th>";
  $display_string .= "<th>Location</th>";
  $display_string .= "<th>Activity</th>";
  $display_string .= "<th>XCOR</th>";
  $display_string .= "<th>YCOR</th>";
  $display_string .= "</tr>";

  // Insert a new row in the table for each person returned
  while($row = mysql_fetch_array($qry_result)) {
     $display_string .= "<tr>";
     $display_string .= "<td>$row[0]</td>";
     $display_string .= "<td>$row[1]</td>";
     $display_string .= "<td>$row[2]</td>";
     $display_string .= "<td>$row[3]</td>";
     $display_string .= "<td>$row[4]</td>";

     $display_string .= "</tr>";
  }

  echo "Query: " . $query . "<br />";
  $display_string .= "</table>";
    /* free result set */
  $result->free();

  /* close connection */
  $mysqli->close();

  echo $display_string;
  ?>

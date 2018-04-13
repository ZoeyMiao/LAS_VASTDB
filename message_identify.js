/*tundra land (0,0) - (50,45)
entry corridor (50,0) - (70,45)
kiddle land (70,0) - (100,45)
wet land (0,45) - (100,70)
coaster alley (0,70) - (100,100) */


$(document).ready(function(){
      var map = new Image();
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      map.onload = function(){
        //draw the original park graph
        context.drawImage(map,0,0,500,500);

        // blur the map
        image = context.getImageData(0,0,500,500);
        var imageData = image.data;
        length = imageData.length;
        //set every alpha value to 60 to get a 60% transparency map
        for (var i =3;i<length;i+=4){
          imageData[i] = 60;
        }
        image.data = imageData;
        context.putImageData(image,0,0);
      }
      map.src =  "parkmap.jpg";
});

//search available
function search(){
    var timestamp = document.getElementById("timestamp").value;
    var margin = document.getElementById("margin").value;
    var location = document.getElementById("location").value;
    var inputTime = new Date(timestamp);
    var startTime = new Date(inputTime.getTime() - 1000*margin);
    var endTime = new Date(inputTime.getTime() + 1000*margin);
    console.log(inputTime);
    console.log(startTime);
    console.log(endTime);
    console.log(location);

    // try connect to remote server
    var Client = require('hcvlab_vast').Client;
    var client = new Client();
    client.host ='scidb.smith.edu';
    client.user = 'hcvlab';
    client.password = 'J0J0rdansLab';
    console.log("connecting...");
    client.connect(function(err, results) {
        if (err) {
            console.log("ERROR: " + err.message);
            throw err;
        }
        console.log("connected.");
        clientConnected(client);
    });


    // search SQL for match
    var queryString = "?startTime = " + startTime ;
    queryString +=  "&endTime = " + endTime + "&location = " + location;
    console.log(queryString);
    // get data from SQL
    $.ajax({    //create an ajax request to display.php
        type: "POST",
        url: "scidb.smith.edu",
        success: function(queryString){
        }
    });

     $.ajax({    //create an ajax request to display.php
        type: "GET",
        url: "api.php",
        success: function(display_string){
            console.log(display_string);
        }
    });

}

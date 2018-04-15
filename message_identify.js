/*tundra land (0,0) - (50,45)
entry corridor (50,0) - (70,45)
kiddle land (70,0) - (100,45)
wet land (0,45) - (100,70)
coaster alley (0,70) - (100,100) */
<<<<<<< HEAD
var resultTable;
var resultdot;
var context;
var map;
var canvas;

$(document).ready(function(){
      map = new Image();
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
      map.onload = function(){
        //draw the original park graph
        context.drawImage(map,0,0,500,500);
        // blur the map
        image = context.getImageData(0,0,500,500);
        var imageData = image.data;
        length = imageData.length;
        //set every alpha value to 60 to get a 60% transparency map
        for (var i =3;i<length;i+=4){
          imageData[i] = 95;
        }
        image.data = imageData;
        context.putImageData(image,0,0);
      }
      map.src =  "parkmap.jpg";
});

//container for display of dots
var Marker = function () {
    this.Sprite = new Image();
    this.Sprite.src = "people.png"
    this.Width = 35;
    this.Height = 35;
    this.XPos = 0;
    this.YPos = 0;
}

var Markers = new Array();

//append new candidate, push each candidate to markers array.

function append(rowCells){
    $("p").append(document.createTextNode(rowCells["ID"]));
    $("p").append(document.createElement("br"));
    var marker = new Marker();
    marker.XPos = parseInt(rowCells["3"]) * 5;
    marker.YPos = parseInt(rowCells["4"]) * 5;
=======

var allRows;
var canvas;
var context;
var map;
//show coordinates on map
$(document).ready(function(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    map = new Image();
    map.src = "/Auxiliary Files/Park_Map.jpg";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw map
    // X location, Y location, Image width, Image height
    context.drawImage(map, 0, 0, 700, 700);}
);


var Marker = function () {
    this.Sprite = new Image();
    this.Sprite.src = "/Auxiliary Files/map-marker-hi.png"
    this.Width = 35;
    this.Height = 40;
    this.XPos = 0;
    this.YPos = 0;
}
var Markers = new Array();

$.ajax({
  url: '/MC1 Data June 2015 V3/park-movement-Fri-FIXED-2.0.csv',
  dataType: 'text',
}).done(processData);


function processData(data) {
    allRows = data.split(/\r?\n|\r/);
    console.log(allRows[2]);
}

//append new candidate, push each candidate to markers array.
function append(rowCells){
    $("p").append(document.createTextNode(rowCells[1]));
    $("p").append(document.createElement("br"));
    var marker = new Marker();
    marker.XPos = parseInt(rowCells[3]) * 7;
    marker.YPos = parseInt(rowCells[4]) * 7;
    console.log("add mark")
    Markers.push(marker);
}

var draw = function () {
    context.clearRect(0,0,canvas.width,canvas.height);
    // Clear Canvas
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw map
    // X location, Y location, Image width, Image height
    context.drawImage(map, 0, 0, 500, 500);
    console.log(Markers);


    // Draw map
    // X location, Y location, Image width, Image height
    context.drawImage(map, 0, 0, 700, 700);

    // Draw markers
    for (var i = 0; i < Markers.length; i++) {
        var tempMarker = Markers[i];
        // Draw marker
        console.log(tempMarker.XPos);
        context.drawImage(tempMarker.Sprite, tempMarker.XPos, tempMarker.YPos - 35, tempMarker.Width, tempMarker.Height);
        context.fillStyle = "#666";
        context.globalAlpha = 0.8;
        // Draw position above
        context.fillStyle = "#000";
    }
};

//search possible matches
function search(){
    var timestamp = document.getElementById("timestamp").value;
    var margin = document.getElementById("margin").value;
    var location = document.getElementById("location").value;
    var inputTime = new Date(timestamp);
    var inputTime2 = inputTime.getFullYear() + "-" + (inputTime.getMonth() + 1) + "-" + inputTime.getDate() + " " +  inputTime.getHours() + ":" + ("0" + inputTime.getMinutes()).substr(-2) + ":" + ("0" + inputTime.getSeconds()).substr(-2);
    var startTime = new Date(inputTime.getTime() - 1000*margin);
    var startTime2 = startTime.getFullYear() + "-" + (startTime.getMonth() + 1) + "-" + startTime.getDate() + " " +  startTime.getHours() + ":" + ("0" +startTime.getMinutes()).substr(-2) + ":" + ("0" +startTime.getSeconds()).substr(-2);
    var endTime = new Date(inputTime.getTime() + 1000*margin);
    var endTime2 = endTime.getFullYear() + "-" + (endTime.getMonth() + 1) + "-" + endTime.getDate() + " " +  endTime.getHours() + ":" + ("0" +endTime.getMinutes()).substr(-2) + ":"  + ("0" + endTime.getSeconds()).substr(-2);

    // search SQL for match
    var queryString = "startTime=" + startTime2 ;
    queryString +=  "&endTime=" + endTime2 + "&location=" + location;

    // get data from SQL
    $.ajax({
        type: "POST",
        url: "api.php",
        data: queryString,
        async:true,
        success: function(data){
          //alert(data);
          result = data.split(';',2);
          resultdot = $.parseJSON(result[0]);
          console.log(resultdot);
          append(resultdot);
          document.getElementById('resultTable').innerHTML = result[1];
        }
    });
    draw();

}


//        // Calculate postion text
//        var markerText = "Postion (X:" + tempMarker.XPos + ", Y:" + tempMarker.YPos;

        // Draw a simple box so you can see the position
//        var textMeasurements = context.measureText(markerText);
        context.fillStyle = "#666";
        context.globalAlpha = 0.7;
//        context.fillRect(tempMarker.XPos - (textMeasurements.width / 2), tempMarker.YPos - 15, textMeasurements.width, 20);
        context.globalAlpha = 1;

        // Draw position above
        context.fillStyle = "#000";
//        context.fillText(markerText, tempMarker.XPos, tempMarker.YPos);
    }
};

function search(){
    console.log("skjdfhskdhfkj");
    var timestamp = document.getElementById("timestamp").value;
    var margin = document.getElementById("margin").value;
    var location = document.getElementById("location").value;

    var inputTime = new Date(timestamp);
    var startTime = new Date(inputTime.getTime() - 1000*margin);
    var endTime = new Date(inputTime.getTime() + 1000*margin);
    console.log(inputTime);
    console.log(startTime);
    console.log(endTime);

    //loop through csv files to filter
    for (var singleRow = 1; singleRow < allRows.length; singleRow++) {
        var rowCells = allRows[singleRow].split(',');
        var cellTime = new Date(rowCells[0]);
        if (cellTime > endTime){
            break;
        }
        if (cellTime > startTime && cellTime < endTime){
            var x = parseInt(rowCells[3]);
            var y = parseInt(rowCells[4]);
            if(location == 'Kiddle Land'){
                if (x > 70 && y < 45){
                    append(rowCells);
                }
            }
            else if(location == 'Entry Corridor'){
                if (x > 50 && x < 70 && y < 45){
                    append(rowCells);
                }
            }
            else if(location == 'Tundra Land'){
                if (x < 50 && y < 45){
                    append(rowCells);
                }
            }
            else if(location == 'Wet Land'){
                if (y < 70 && y > 45){
                    append(rowCells);
                }
            }
            else if(location == 'Coaster Alley'){
                if (y < 100 && y > 70){
                    append(rowCells);
                }
            }
        }
    }
    draw();
}

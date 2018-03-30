/*tundra land (0,0) - (50,45)
entry corridor (50,0) - (70,45)
kiddle land (70,0) - (100,45)
wet land (0,45) - (100,70)
coaster alley (0,70) - (100,100) */

var allRows;

$.ajax({
  url: '/MC1 Data June 2015 V3/park-movement-Fri-FIXED-2.0.csv',
  dataType: 'text',
}).done(processData);

function processData(data) {
    allRows = data.split(/\r?\n|\r/);
    console.log(allRows[2]);
}

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
                    $("p").append(document.createTextNode(rowCells[1]));
                    $("p").append(document.createElement("br"));
                }
            }
            else if(location == 'Entry Corridor'){
                if (x > 50 && x < 70 && y < 45){
                    $("p").append(document.createTextNode(rowCells[1]));
                    $("p").append(document.createElement("br"));
                }
            }
            else if(location == 'Tundra Land'){
                if (x < 50 && y < 45){
                    $("p").append(document.createTextNode(rowCells[1]));
                    $("p").append(document.createElement("br"));
                }
            }
            else if(location == 'Wet Land'){
                if (y < 70 && y > 45){
                    $("p").append(document.createTextNode(rowCells[1]));
                    $("p").append(document.createElement("br"));
                }
            }
            else if(location == 'Coaster Alley'){
                if (y < 100 && y > 70){
                    $("p").append(document.createTextNode(rowCells[1]));
                    $("p").append(document.createElement("br"));
                }
            }
        }
    }    
}
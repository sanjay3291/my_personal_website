const standingsTable = document.querySelector("#standingsTable")
var picksLB = new Map([
    ["Chennai Super Kings", [3,4,7,8,8,6,8]],
    ["Delhi Capitals", [6,3,4,5,7,3,7]],
    ["Kolkata Knight Riders" , [8,2,6,4,4,7,6]],
    ["Kings XI Punjab" , [4,5,2,1,2,2,5]],
    ["Mumbai Indians" , [7,6,8,7,6,5,4]],
    ["Royal Challengers Bangalore" , [5,7,5,3,5,8,3]],
    ["Rajasthan Royals" , [1,1,1,2,1,1,2]],
    ["Sunrisers Hyderabad" , [2,8,3,6,3,4,1]]
]);

var picksBCB = new Map([
    ["Chennai Super Kings", [8,5,7,5,6,8,8,7,6,6]],
    ["Delhi Capitals", [7,4,4,1,7,4,7,8,5,5]],
    ["Kolkata Knight Riders" , [4,3,6,7,4,5,6,4,2,3]],
    ["Kings XI Punjab" , [1,2,2,3,2,2,5,1,3,2]],
    ["Mumbai Indians" , [5,8,8,8,8,6,4,6,8,8]],
    ["Royal Challengers Bangalore" , [6,7,5,6,5,1,3,3,4,4]],
    ["Rajasthan Royals" , [2,1,1,2,3,3,2,2,1,1]],
    ["Sunrisers Hyderabad" , [3,6,3,4,1,7,1,5,7,7]]
]);


$(document).ready(function() {
    let url = 'http://localhost:3000/';
        let data = {
            endPoint: url
            }; 
            try{
                $.ajax({
                    url: url,
                    method: 'GET',
                    data: data,
                    dataType: 'json' 
                  }).done(function(response) {
                      addDataToTable(response);
              });
            } catch(e){
                console.warn("Could not get rankings data from server!!");
            }
            
  });


  function addDataToTable(response){

      while(standingsTable.firstChild){
        standingsTable.removeChild(standingsTable.firstChild);
      }

      response.forEach((row) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = row.rank;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.className = "border-right";
        td2.textContent = row.teamName;
        tr.appendChild(td2);
        
        const td3 = document.createElement("td");
        td3.textContent = row.M;
        tr.appendChild(td3);
        
        const td4 = document.createElement("td");
        td4.textContent = row.W;
        tr.appendChild(td4);
        
        const td5 = document.createElement("td");
        td5.textContent = row.L;
        tr.appendChild(td5);
        
        const td6 = document.createElement("td");
        td6.textContent = row.NR;
        tr.appendChild(td6);
        
        const td7 = document.createElement("td");
        td7.textContent = row.PT;
        tr.appendChild(td7);
        
        const td8 = document.createElement("td");
        td8.textContent = row.NRR;
        tr.appendChild(td8);

        standingsTable.appendChild(tr);          
    });
  }

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  document.querySelector("#LB").onclick = function(event) {

    document.getElementById("picksInfo").innerHTML="";

    newHTML = "<div class=\"container\">\r\n  <div class=\"row h-100 justify-content-md-center align-items-center top-buffer\">\r\n <h4 style=\"color:blue;\"><strong><em>Picks Table<\/em><\/strong><\/h4> <div class=\"card  w-100 content-block row flex-row\">\r\n    <table class=\"card-table table table-striped table-hover mb-0 table-bordered border-bottom\">\r\n      <thead class=\"thead-light thead\">\r\n        <tr>\r\n          <th scope=\"col\">Team<\/th>\r\n          <th scope=\"col\">NC<\/th>\r\n          <th scope=\"col\">HKD<\/th>\r\n          <th scope=\"col\">SM<\/th>\r\n          <th scope=\"col\">PTP<\/th>\r\n          <th scope=\"col\">SC<\/th>\r\n          <th scope=\"col\">KM<\/th>\r\n          <th scope=\"col\">SA<\/th>\r\n        <\/tr>\r\n      <\/thead>\r\n      <tbody id=\"picksLBbody\">\r\n      <\/tbody>\r\n    <\/table>\r\n  <\/div>\r\n<\/div>\r\n<\/div>";

    document.getElementById("picksInfo").innerHTML+= newHTML;

    picksLBbody = document.getElementById("picksLBbody");
    for(var i=0; i<8; i++){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = standingsTable.children[i].children[1].textContent;
        tr.appendChild(td1);

        picksData = picksLB.get(td1.textContent);

        for(var j=0; j<7; j++){
            const td2 = document.createElement("td");
            td2.textContent = picksData[j];
            tr.appendChild(td2);
        }

        picksLBbody.appendChild(tr);
    }

    const pointsObj = {
        NC: parseInt(picksLBbody.children[0].children[1].textContent) + parseInt(picksLBbody.children[1].children[1].textContent) + parseInt(picksLBbody.children[2].children[1].textContent) + parseInt(picksLBbody.children[3].children[1].textContent),
        HKD: parseInt(picksLBbody.children[0].children[2].textContent) + parseInt(picksLBbody.children[1].children[2].textContent) + parseInt(picksLBbody.children[2].children[2].textContent) + parseInt(picksLBbody.children[3].children[2].textContent), 
        SM: parseInt(picksLBbody.children[0].children[3].textContent) + parseInt(picksLBbody.children[1].children[3].textContent) + parseInt(picksLBbody.children[2].children[3].textContent) + parseInt(picksLBbody.children[3].children[3].textContent), 
        PTP:parseInt(picksLBbody.children[0].children[4].textContent) + parseInt(picksLBbody.children[1].children[4].textContent) + parseInt(picksLBbody.children[2].children[4].textContent) + parseInt(picksLBbody.children[3].children[4].textContent),
        SC: parseInt(picksLBbody.children[0].children[5].textContent) + parseInt(picksLBbody.children[1].children[5].textContent) + parseInt(picksLBbody.children[2].children[5].textContent) + parseInt(picksLBbody.children[3].children[5].textContent), 
        KM: parseInt(picksLBbody.children[0].children[6].textContent) + parseInt(picksLBbody.children[1].children[6].textContent) + parseInt(picksLBbody.children[2].children[6].textContent) + parseInt(picksLBbody.children[3].children[6].textContent),
        SA: parseInt(picksLBbody.children[0].children[7].textContent) + parseInt(picksLBbody.children[1].children[7].textContent) + parseInt(picksLBbody.children[2].children[7].textContent) + parseInt(picksLBbody.children[3].children[7].textContent)
    };
    
    var sortable = [];
    for (var contestant in pointsObj) {
        sortable.push([contestant, pointsObj[contestant]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    var randBorderColors = [];
    var randBackgroundColors = [];

    function getDynamicColors() {
        var colors = [];
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        colors[0] = "rgb(" + r + "," + g + "," + b + ")";
        colors[1] = "rgb(" + r + "," + g + "," + b + "," + "0.2" + ")";
        return colors;
     };
     

     for (var i=0; i<7; i++){
        randColors = getDynamicColors();
        randBorderColors.push(randColors[0]);
        randBackgroundColors.push(randColors[1]);
     }

    document.getElementById("picksInfo").innerHTML+="<div class=\"container\">\r\n <h4 class = text-center style=\"color:blue;\"><strong><em>Leader Board<\/em><\/strong><\/h4> <div class=\"row h-100 justify-content-md-center align-items-center top-buffer\">\r\n  <div class=\"card content-block row flex-row\">\r\n  <div class=\"chart-container\" style=\"position: relative; height:40vh; width:80vh\">\r\n    <canvas id=\"horizontalBar\"><\/canvas>\r\n<\/div>\r\n<\/div>\r\n<\/div>\r\n<\/div>"

    new Chart(document.getElementById("horizontalBar"), {
        "type": "horizontalBar",
        "data": {
        "labels": [sortable[0][0],sortable[1][0],sortable[2][0],sortable[3][0],sortable[4][0],sortable[5][0],sortable[6][0]],
        "datasets": [{
        "label": "Points",
        "data": [sortable[0][1],sortable[1][1],sortable[2][1],sortable[3][1],sortable[4][1],sortable[5][1],sortable[6][1]],
        "fill": false,
        "backgroundColor": randBackgroundColors,
        "borderColor": randBorderColors,
        "borderWidth": 1
        }]
        },
        "options": {
        "scales": {
        "xAxes": [{
        "ticks": {
        "beginAtZero": true
        }
        }]
        }
        }
        });
    
   };

   document.querySelector("#BCB").onclick = function(event) {

    document.getElementById("picksInfo").innerHTML="";

    newHTML = "<div class=\"container\">\r\n  <div class=\"row h-100 justify-content-md-center align-items-center top-buffer\">\r\n <h4 style=\"color:blue;\"><strong><em>Picks Table<\/em><\/strong><\/h4> <div class=\"card  w-100 content-block row flex-row\">\r\n    <table class=\"card-table table table-striped table-hover mb-0 table-bordered border-bottom\">\r\n      <thead class=\"thead-light thead\">\r\n        <tr>\r\n          <th scope=\"col\">Team<\/th>\r\n          <th scope=\"col\">MA<\/th>\r\n          <th scope=\"col\">STM<\/th>\r\n          <th scope=\"col\">SM<\/th>\r\n          <th scope=\"col\">DP<\/th>\r\n          <th scope=\"col\">SCM<\/th>\r\n          <th scope=\"col\">AK<\/th>\r\n          <th scope=\"col\">SA<\/th>\r\n    <th scope=\"col\">PKL<\/th>\r\n   <th scope=\"col\">AC<\/th>\r\n    <th scope=\"col\">AR<\/th>\r\n <\/tr>\r\n      <\/thead>\r\n      <tbody id=\"picksBCBbody\">\r\n      <\/tbody>\r\n    <\/table>\r\n  <\/div>\r\n<\/div>\r\n<\/div>";

    document.getElementById("picksInfo").innerHTML+= newHTML;

    picksBCBbody = document.getElementById("picksBCBbody");
    for(var i=0; i<8; i++){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = standingsTable.children[i].children[1].textContent;
        tr.appendChild(td1);

        picksData = picksBCB.get(td1.textContent);

        for(var j=0; j<10; j++){
            const td2 = document.createElement("td");
            td2.textContent = picksData[j];
            tr.appendChild(td2);
        }

        picksBCBbody.appendChild(tr);
    }

    const pointsObj = {
        MA: parseInt(picksBCBbody.children[0].children[1].textContent) + parseInt(picksBCBbody.children[1].children[1].textContent) + parseInt(picksBCBbody.children[2].children[1].textContent) + parseInt(picksBCBbody.children[3].children[1].textContent),
        STM: parseInt(picksBCBbody.children[0].children[2].textContent) + parseInt(picksBCBbody.children[1].children[2].textContent) + parseInt(picksBCBbody.children[2].children[2].textContent) + parseInt(picksBCBbody.children[3].children[2].textContent), 
        SM: parseInt(picksBCBbody.children[0].children[3].textContent) + parseInt(picksBCBbody.children[1].children[3].textContent) + parseInt(picksBCBbody.children[2].children[3].textContent) + parseInt(picksBCBbody.children[3].children[3].textContent), 
        DP:parseInt(picksBCBbody.children[0].children[4].textContent) + parseInt(picksBCBbody.children[1].children[4].textContent) + parseInt(picksBCBbody.children[2].children[4].textContent) + parseInt(picksBCBbody.children[3].children[4].textContent),
        SCM: parseInt(picksBCBbody.children[0].children[5].textContent) + parseInt(picksBCBbody.children[1].children[5].textContent) + parseInt(picksBCBbody.children[2].children[5].textContent) + parseInt(picksBCBbody.children[3].children[5].textContent), 
        AK: parseInt(picksBCBbody.children[0].children[6].textContent) + parseInt(picksBCBbody.children[1].children[6].textContent) + parseInt(picksBCBbody.children[2].children[6].textContent) + parseInt(picksBCBbody.children[3].children[6].textContent),
        SA: parseInt(picksBCBbody.children[0].children[7].textContent) + parseInt(picksBCBbody.children[1].children[7].textContent) + parseInt(picksBCBbody.children[2].children[7].textContent) + parseInt(picksBCBbody.children[3].children[7].textContent),
        PKL: parseInt(picksBCBbody.children[0].children[8].textContent) + parseInt(picksBCBbody.children[1].children[8].textContent) + parseInt(picksBCBbody.children[2].children[8].textContent) + parseInt(picksBCBbody.children[3].children[8].textContent),
        AC: parseInt(picksBCBbody.children[0].children[9].textContent) + parseInt(picksBCBbody.children[1].children[9].textContent) + parseInt(picksBCBbody.children[2].children[9].textContent) + parseInt(picksBCBbody.children[3].children[9].textContent),
        AR: parseInt(picksBCBbody.children[0].children[10].textContent) + parseInt(picksBCBbody.children[1].children[10].textContent) + parseInt(picksBCBbody.children[2].children[10].textContent) + parseInt(picksBCBbody.children[3].children[10].textContent),
    };
    
    var sortable = [];
    for (var contestant in pointsObj) {
        sortable.push([contestant, pointsObj[contestant]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    var randBorderColors = [];
    var randBackgroundColors = [];

    function getDynamicColors() {
        var colors = [];
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        colors[0] = "rgb(" + r + "," + g + "," + b + ")";
        colors[1] = "rgb(" + r + "," + g + "," + b + "," + "0.2" + ")";
        return colors;
     };
     

     for (var i=0; i<10; i++){
        randColors = getDynamicColors();
        randBorderColors.push(randColors[0]);
        randBackgroundColors.push(randColors[1]);
     }




    document.getElementById("picksInfo").innerHTML+="<div class=\"container\">\r\n <h4 class = text-center style=\"color:blue;\"><strong><em>Leader Board<\/em><\/strong><\/h4> <div class=\"row h-100 justify-content-md-center align-items-center top-buffer\">\r\n  <div class=\"card content-block row flex-row\">\r\n  <div class=\"chart-container\" style=\"position: relative; height:40vh; width:80vh\">\r\n    <canvas id=\"horizontalBar\"><\/canvas>\r\n<\/div>\r\n<\/div>\r\n<\/div>\r\n<\/div>"

    new Chart(document.getElementById("horizontalBar"), {
        "type": "horizontalBar",
        "data": {
        "labels": [sortable[0][0],sortable[1][0],sortable[2][0],sortable[3][0],sortable[4][0],sortable[5][0],sortable[6][0],sortable[7][0],sortable[8][0],sortable[9][0]],
        "datasets": [{
        "label": "Points",
        "data": [sortable[0][1],sortable[1][1],sortable[2][1],sortable[3][1],sortable[4][1],sortable[5][1],sortable[6][1],sortable[7][1],sortable[8][1],sortable[9][1]],
        "fill": false,
        "backgroundColor": randBackgroundColors,
        "borderColor": randBorderColors,
        "borderWidth": 1
        }]
        },
        "options": {
        "scales": {
        "xAxes": [{
        "ticks": {
        "beginAtZero": true
        }
        }]
        }
        }
        });
    
   };


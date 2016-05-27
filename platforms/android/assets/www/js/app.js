 document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    alert('device ready');


    var db = window.sqlitePlugin.openDatabase({name: 'trace.db', location: 'default'});

 //---------------------------Create Users Data Table---------------------------------//

      db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE IF EXISTS car_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS locations (id integer primary key, username text, adress text, latit real, longit real, images text, dates DATETIME)');

    }, errorcb, successcb);

  function errorcb(err) {
     alert('error in table' + err.code);
}

  function successcb() {
    
    //alert('success in location table');
}


//---------------------------GET Current Geo Position---------------------------------//


var latInfo = document.querySelector('#lat_info'),
    longInfo = document.querySelector('#long_info');

   navigator.geolocation.getCurrentPosition(sucessCB, errorCB);

   function sucessCB(pos) {

             lat = pos.coords.latitude;
             Long = pos.coords.longitude;
     
         //longInfo.innerHTML = Long;

}

   function errorCB(err) {

     var errorPos = err;
     alert(errorPos);

}


//---------------------------Saving Geolocation in LocalStorage---------------------------------//

    
    var butSave = document.querySelector('#circle_but');
    var msgBox = document.querySelector('#text_msg');
    var msgInfo = document.querySelector('#msg_info');
    var resMsg = document.querySelector('#trace_res');

    butSave.onclick = function() {

         userTxt = msgBox.value;
         lati = lat.toString();
         longi = Long.toString();

  window.localStorage.setItem('info', userTxt);
  window.localStorage.setItem('latitude', lati);
  window.localStorage.setItem('longitude', longi);

         
  alert('Trace success');

  //---------------------------Display data from localStorage---------------------------------//


var traceInfo = window.localStorage.getItem('info');
var userLat = window.localStorage.getItem('latitude');
var userLong = window.localStorage.getItem('longitude');
  
  resMsg.innerHTML = 'Trace results: ' + '<br></br>';
  msgInfo.innerHTML = 'Place: ' + traceInfo;
  latInfo.innerHTML = 'Lat: ' + userLat;
  longInfo.innerHTML = 'Long: ' + userLong;

  
}


//---------------------------Saving Geolocation in SQLite---------------------------------//


    var butInv = document.querySelector('#invisible_but');
  
    butInv.onclick = function() {
          var userValue = userName.value,
              msgValue = msgBox.value,
              latValue = lat, 
              longValue = Long;

          db.transaction(function(tx) {

      tx.executeSql("INSERT INTO locations (username, adress, latit, longit) VALUES (?,?,?,?)", [userValue, msgValue, latValue, longValue]);


  }, errorcbk, successcbk);

  function errorcbk(err) {
     alert('error inserting' + err.code);

  }

  function successcbk() {
    
    alert('success inserting');

  }


}

//---------------------------Displlay data from SQLite---------------------------------//

  var userInfo = document.querySelector('#user_info');
       
       db.transaction(function(tx) {

          tx.executeSql('SELECT * FROM locations',[], function (tx, res) {
               
               var data = res.rows.length;
               for (var i = 0; i < data; i++) {

                 dataOne = res.rows.item(i).id;
                 dataTwo = res.rows.item(i).username;
                 dataTre = res.rows.item(i).adress;
                 dataFour = res.rows.item(i).latit;
                 dataFive = res.rows.item(i).longit;
                 dataSix = res.rows.item(i).images;
                 dataSeven = res.rows.item(i).dates;
                 //userInfo.innerHTML = "ID: " + ' ' + dataOne + ' ' + "USER: " + ' ' + dataTwo + ' ' + "PLACE: " + ' ' + dataTre + ' ' + "LAT: " + ' ' + dataFour + ' ' + "LONG: " + ' ' + dataFive; 
                

               }
           });

      });



//---------------------------Reload---------------------------------//
  
var butLoad = document.querySelector('#but_load');


  butLoad.onclick = function() {
      
    window.location.reload(true);

  }



}//------Device Ready--------///
var akey = null;
var fileTransfer = null;
var contentjsonText = null;
var contentText = null;
var contentText = [];
var contentButton = null;
var displayText = null;
var displayTitle = null;

var gridicon = '';
var appkeyarray = null;
var count = 0;
var clickButton = null;
var currentAppkey = null;
var currentButton = null;
var currentbuttonheading = null;
var db = null;
var count1 = 1;
var id = [];

var listdata = null;
var listTitle =[];
var listText =[];
var listId = [];
var listButtonId = [];
var left = 0;
var right = 0;
var v = 0;
var currentList = null;
var replyMgsNo ='';
var replyMgsNo1;
var bookMarkid = [];
var bookMarkdata = [];

var oauth;
var requestParams;
var options = { 
        consumerKey: 'UBjIy8qbq3JRrpBuZdhRhQ',
        consumerSecret: '4SOJDZvvnLA1iybfK884YUGier1XEUKEYHTb1OUF4',
        callbackUrl: 'http://www.nuatransmedia.com/' };
var mentionsId = 0;
var localStoreKey = "tmt5p1";

var storedAccessData, rawData = localStorage.getItem(localStoreKey);


    if(localStorage.fontbgcolor){
      if(localStorage.fontbgcolor == "white"){
        $('.backgroundcolor').children().css('background-color',"transparent");
      }else if(localStorage.fontbgcolor == "black"){
        $('.backgroundcolor').children().css('background-color',"black");
      }else{
        $('.backgroundcolor').children().css('background-color',"#f5f0de");
      }
    }else{

    }

    if(localStorage.fontstyle){
      $(".backgroundcolor").children().css('font-family',localStorage.fontstyle );
    }

    if(localStorage.fontSize){
      $(".backgroundcolor").children().css('font-size',localStorage.fontSize+'px');
    }else{
      $(".backgroundcolor").children().css('font-size','16px');
    }



function listviewchangeFun(){
  if(localStorage.Gridview == 0){
    $("#bookshelfListview").empty();
    count = 0;
    localStorage.Gridview = 1;
    db.transaction(populateDB, errorCB, successCB);

  }else if(localStorage.Gridview == 1){
    $("#bookshelfListview").empty();
    count = 0;
    localStorage.Gridview = 0;
    db.transaction(populateDB, errorCB, successCB);
  }else{
    $("#bookshelfListview").empty();
    count = 0;
    localStorage.Gridview = 1;
    db.transaction(populateDB, errorCB, successCB);
  }
  
}

if(localStorage.appwallLoginData){
    $('.logoutBtn').show();
}else{
    $('.logoutBtn').hide();
}

/*--------  Timestamp conversion ---------------*/

function relative_time(date_str) {
    if (!date_str) {return;}
    date_str = $.trim(date_str);
    date_str = date_str.replace(/\.\d\d\d+/,""); // remove the milliseconds
    date_str = date_str.replace(/-/,"/").replace(/-/,"/"); //substitute - with /
    date_str = date_str.replace(/T/," ").replace(/Z/," UTC"); //remove T and substitute Z with UTC
    date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // +08:00 -> +0800
    var parsed_date = new Date(date_str);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
    var delta = parseInt((relative_to.getTime()-parsed_date)/1000);
    delta=(delta<2)?2:delta;
    var r = '';
    if (delta < 60) {
    r = delta + ' seconds ago';
    } else if(delta < 120) {
    r = 'a minute ago';
    } else if(delta < (45*60)) {
    r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (2*60*60)) {
    r = 'an hour ago';
    } else if(delta < (24*60*60)) {
    r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
    r = 'a day ago';
    } else {
    r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
    return 'about ' + r;
}

/*--------    Integer To Roman Nummber Conversion ---------------*/

function convert_roman(num)
{
   var narr=new Array("1000000","900000","500000","400000","100000","90000","50000","40000","10000","9000","5000","4000","1000","900","500","400","100","90","50","40","10","9","5","4","1");
   var rarr=new Array("<span style='text-decoration: overline'>M</span>",
                      "<span style='text-decoration: overline'>CM</span>",
                      "<span style='text-decoration: overline'>D</span>",
                      "<span style='text-decoration: overline'>CD</span>",
                      "<span style='text-decoration: overline'>C</span>", 
                      "<span style='text-decoration: overline'>XC</span>",
                      "<span style='text-decoration: overline'>L</span>",
                      "<span style='text-decoration: overline'>XL</span>",
                      "<span style='text-decoration: overline'>X</span>",
                      "<span style='text-decoration: overline'>IX</span>",
                      "<span style='text-decoration: overline'>V</span>",
                      "<span style='text-decoration: overline'>IV</span>",
                      "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I");
     
     if(num > 3999999 || num < 1)
     {
       return;
     }
     var result = "";
     var chk = num;
     while (chk > 0)
     {
       var i;
       for (i=0; i<narr.length; i++)
       {
        if(chk >= narr[i] )
        {
          result += rarr[i];
          chk -= narr[i];
          break;
        }
       }
    }
    return result;
}
document.addEventListener("deviceready", onConnectionCheck, false);


function fblogin(passdata){

  FB.login( function(response) 
            {
                if (response.status == 'connected') {

                var uid= response.authResponse.userID;
                var userName = response.authResponse.userName;
                var userEmail = response.authResponse.userEmail
                localStorage.appwallLoginData ="";
                localStorage.sender_id ="";
                console.log("uid: "+uid+" userName: "+userName+" userEmail: "+userEmail );
                  $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
   
                  $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
                      success:function(response){
                         $('.logoutBtn').show();
                        //alert(response.name+":"+response.id);
                        if(response.name){
                          localStorage.appwallLoginData = response.name;
                        
                        }else{
                          localStorage.appwallLoginData = response.username;
                        }
                        localStorage.sender_id = response.id;
                        $.mobile.loading( 'hide');
                        if(passdata ==1){
                          $( "#appwallLoginPage" ).popup( "close" );
                          $('#appwallListview').empty();
                          appWallPostFun();
                        }else{
                          $( "#ElementappwallLoginPage" ).popup( "close" );
                          $('#ElementappwallListview').empty();
                          ElementAppWallPostFun();
                        }
                        
                      },
                      error:function(){

                        $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[username]":userName,"subscriber[email]":userEmail,"identity[provider]":"facebook","identity[uid]":uid},
                            success:function(response){
                              
                              $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
                                success:function(response){
                                     $('.logoutBtn').show();
                                  if(response.name){
                                    localStorage.appwallLoginData = response.name;
                                  
                                  }else{
                                    localStorage.appwallLoginData = response.username;
                                  }
                                  localStorage.sender_id = response.id;
                                  $.mobile.loading( 'hide');
                                  if(passdata ==1){
                                    $( "#appwallLoginPage" ).popup( "close" );
                                    $('#appwallListview').empty();
                                    appWallPostFun();
                                  }else{
                                    $( "#ElementappwallLoginPage" ).popup( "close" );
                                    $('#ElementappwallListview').empty();
                                    ElementAppWallPostFun();
                                  }
                                },
                                error:function(xhr, status, error){
                                  alert("error:"+xhr.responseText)
                                  if(passdata ==1){
                                    $( "#appwallLoginPage" ).popup( "close" );
                                    $('#appwallListview').empty();
                                    appWallPostFun();
                                  }else{
                                    $( "#ElementappwallLoginPage" ).popup( "close" );
                                    $('#ElementappwallListview').empty();
                                    ElementAppWallPostFun();
                                  }
                                  $.mobile.loading( 'hide');
                                }
                              });
                              

                            },error:function(){
                              alert("subscribers error")

                            }
                        });
                        
                      }
                    });
             } else {
              alert('Facebook could not connected');
             }
            },
            { scope: "email" }
  );

 FB.Event.subscribe('auth.login', function(response) {
    
      var uid= response.authResponse.userID;
      $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
      $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"facebook"},
          success:function(response){
            if(response.name){
              localStorage.appwallLoginData = response.name;
                                  
            }else{
              localStorage.appwallLoginData = response.username;
            }
            localStorage.sender_id = response.id;
             $('.logoutBtn').show();
            $.mobile.loading( 'hide');
   
            if(passdata ==1){
                $( "#appwallLoginPage" ).popup( "close" );
                $('#appwallListview').empty();
                appWallPostFun();
            }else{
                $('#ElementappwallListview').empty();
                $( "#ElementappwallLoginPage" ).popup( "close" );
                
                ElementAppWallPostFun();
            }
            
            
          },
          error:function(){
            $.mobile.loading( 'hide' );

            if(passdata ==1){
                $( "#appwallLoginPage" ).popup( "close" );
            }
            else{
                $( "#ElementappwallLoginPage" ).popup( "close" );
                
            }
          }
        });
   
  }); 

  
}

function appwallLogout(){
    
    localStorage.appwallLoginData ="";
    localStorage.sender_id = "";
    FB.logout(function(response) {
            $('.logoutBtn').hide();  
              //alert('logged out successfully');
              });
    window.localStorage.removeItem(localStoreKey);
    $('.logoutBtn').hide();
}

function twitterlogin(passdata){
    
    if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
        
        window.plugins.childBrowser.onLocationChange = function(loc){
            console.log("AppLaudLog: onLocationChange : " + loc);
            
            if (loc.indexOf("http://www.nuatransmedia.com/?") < 0) {
            	return;
            }else if (loc.indexOf("http://www.nuatransmedia.com/?denied")>=0) {
                window.plugins.childBrowser.close();
                return;
            }else if (loc.indexOf("http://www.nuatransmedia.com/?") >= 0) {
                var index, verifier = '';
                var params = loc.substr(loc.indexOf('?') + 1);
                
                params = params.split('&');
                for (var i = 0; i < params.length; i++) {
                    var y = params[i].split('=');
                    if(y[0] === 'oauth_verifier') {
                        verifier = y[1];
                    }
                }
                
                oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                          function(data) {
                          var accessParams = {};
                          var qvars_tmp = data.text.split('&');
                          for (var i = 0; i < qvars_tmp.length; i++) {
                            var y = qvars_tmp[i].split('=');
                            accessParams[y[0]] = decodeURIComponent(y[1]);
                          }
                          console.log('AppLaudLog: ' + accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                          
                          oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                          
                          // Save access token/key in localStorage
                          var accessData = {};
                          accessData.accessTokenKey = accessParams.oauth_token;
                          accessData.accessTokenSecret = accessParams.oauth_token_secret;
                          console.log("AppLaudLog: Storing token key/secret in localStorage");
                          localStorage.setItem(localStoreKey, JSON.stringify(accessData));
                          
                          oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                    function(data) {
                                    //                            	alert('uid1');
                                    var entry = JSON.parse(data.text);
                                    
                                    console.log("AppLaudLog: screen_name: " + entry.screen_name);
                                    //alert(entry.screen_name);
                                    //alert(entry.id);
                                    
                                    uid= entry.id;
                                    uname= entry.screen_name;
                                    email= entry.email;
                                    //alert('logged in');
                                    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
                                    
                                    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"twitter"},
                                           success:function(response){
                                           $('.logoutBtn').show();
                                            if(response.name){
                                              localStorage.appwallLoginData = response.name;
                                                                  
                                            }else{
                                              localStorage.appwallLoginData = response.username;
                                            }
                                           localStorage.sender_id = response.id;
                                           $.mobile.loading( 'hide');
                                           
                                           if(passdata ==1){
                                            $( "#appwallLoginPage" ).popup( "close" );
                                            $('#appwallListview').empty();
                                            appWallPostFun();
                                           }else{
                                            $('#ElementappwallListview').empty();
                                            $( "#ElementappwallLoginPage" ).popup( "close" );
                                           
                                            ElementAppWallPostFun();
                                           }
                                           
                                           },
                                           error:function(){
                                           $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
                                           
                                           $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[username]":uname,"subscriber[email]":email,"identity[uid]":uid,"identity[provider]":"twitter"},
                                                  success:function(response){
                                                  
                                                  $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"uid":uid,"provider":"twitter"},
                                                         success:function(response){
                                                         $('.logoutBtn').show();
                                                          if(response.name){
                                                            localStorage.appwallLoginData = response.name;
                                                                                
                                                          }else{
                                                            localStorage.appwallLoginData = response.username;
                                                          }
                                                         localStorage.sender_id = response.id;
                                                         $.mobile.loading( 'hide');
                                                         
                                                         if(passdata ==1){
                                                            $( "#appwallLoginPage" ).popup( "close" );
                                                            $('#appwallListview').empty();
                                                            appWallPostFun();
                                                         }else{
                                                            $('#ElementappwallListview').empty();
                                                            $( "#ElementappwallLoginPage" ).popup( "close" );
                                                         
                                                            ElementAppWallPostFun();
                                                         }
                                                         },
                                                         error:function(response){
                                                         //                                                   		    	  alert(response.id);
                                                         navigator.notification.alert(" Login after registration cancelled! ");
                                                         }
                                                         });
                                                  },
                                                  error:function(){
                                                  //                                           		    	  alert("uid= "+uid);
                                                  //                                             		    	  alert("UserName= "+uname);
                                                  //                                             		    	  alert("Email= "+email);
                                                  navigator.notification.alert(" Registration canceled! ");
                                                  }
                                                  });
                                           }
                                           });
                                    
                                    },
                                    function(data) {
                                    alert('Error getting user credentials'+data);
                                    console.log("AppLaudLog: Error " + data);
                                    
                                    }
                                    );
                          window.plugins.childBrowser.close();
                          },
                          function(data) {
                          alert('Error : No Authorization');
                          console.log("AppLaudLog: 1 Error " + data);
                          
                          }
                          );
            }
        };
    } // end if
    
    // Note: Consumer Key/Secret and callback url always the same for this app.
    
    oauth = OAuth(options);
    oauth.get('https://api.twitter.com/oauth/request_token',
              function(data) {
              requestParams = data.text;
              console.log("AppLaudLog: requestParams: " + data.text);
              window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text, 
                                                      { showLocationBar : false });                    
              },
              function(data) { 
              alert('Error : No Authorization');
              console.log("AppLaudLog: 2 Error " + data); 
              
              }
              );
    mentionsId = 0;
                                      
}

function onConnectionCheck(){
    
    if (db == null){
      db = window.openDatabase("iBookDatabase", "2.0", "iBookdb", 200000);
    }else{
      alert("DB is already there.");
    }

    fileTransfer = new FileTransfer();
    var networkState = navigator.network.connection.type;
    var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        if (states[networkState] == 'No network connection') {
          offline();
        }else{
          goOnline();
        }
}

function goOnline(){
   db.transaction(populateDB, errorCB, successCB);
   FB.init({ appId: "1436547346579776", nativeInterface: CDV.FB, useCachedDialogs: false });
   
   //db.transaction(querySelectDB,errorCB);
}

function offline(){
  $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
  navigator.notification.alert("Please Connect Your 3G or Wifi Connection");
  $.mobile.loading( 'hide' );
                    
}

function populateDB(tx){
  tx.executeSql('CREATE TABLE IF NOT EXISTS Appkey (appkey)');
  tx.executeSql('SELECT * FROM Appkey',[], querySuccess, errorCB);
}

function querySuccess(tx, results){
  //console.log("querySuccess:"+results.rows.length);

  $('#bookshelfListview').empty();
  appkeyarray =[];
  count = 0;
  
  //console.log("Length: "+results.rows.length);
    
  for(var i=0; i<results.rows.length; i++)
  {   
    appkeyarray.push(results.rows.item(i).appkey);
  } 
  if(appkeyarray.length > 0){ 
    AppKeyFun($.trim(appkeyarray[count].toLowerCase()));
    count = count + 1;
  }else{
    navigator.notification.alert("Please Add Your BookKey");
  }

}

function errorCB(tx, err){
   console.log("Error processing SQL: "+err.code);
}

function errorCB1(tx, err){
   console.log("ErrorCB processing SQL: "+err.code);
}

function successCB(){
  console.log("success delete");
}

function successCB1(){
  console.log("successCB1");
  $('#appkeyvalue').val('');
  db.transaction(populateDB, errorCB, successCB);
}





function successselect(tx, results){
  bookmarkdata = [];
  for(var i=0; i<results.rows.length; i++)
  {
    console.log("bookMark Data: "+results.rows.item(i).bookmarkdata);
    bookmarkdata.push(results.rows.item(i).bookmarkdata);
  }
  if(bookmarkdata.length > 0){
    bookMarkPageFun();
    console.log("successselect: "+bookmarkdata.length);
  }else{
    $('#BookMarkListview').append('<li data-role="list-divider" data-theme="e" >BookMark List Empty</li>');
    //$("#BookMarkListview").listview("refresh");
  }
}

function querySelectDB(tx){
  console.log("querySelectDB");
  tx.executeSql('CREATE TABLE IF NOT EXISTS bookmark (bookmarkid,bookmarkdata)');
  tx.executeSql('SELECT bookmarkdata FROM bookmark WHERE bookmarkid="'+currentAppkey+'"',[],successselect,errorCB);
}



function successCB5(){
  console.log("successCB5");
}

function queryInsert(tx){
  db.transaction(function(tx) {tx.executeSql('CREATE TABLE IF NOT EXISTS bookmark (bookmarkid,bookmarkdata)');tx.executeSql('SELECT * FROM bookmark WHERE bookmarkid="'+currentAppkey+'" AND bookmarkdata="'+currentList+'"',[],bookmarksuccessResult,function(tx,err){console.log("Error Occur.")})},errorCB, successCB);
}

function onConfirm(button){
    if(button == 2){
     db.transaction(function(tx){tx.executeSql('DELETE FROM bookmark WHERE bookmarkid="'+currentAppkey+'" AND bookmarkdata="'+currentList+'"');}, errorCB, successCB);
    }
    else{
      //alert('You selected button ' + button);
    }
  
}


function bookmarksuccessResult(tx,results){
  if(results.rows.length > 0){
    navigator.notification.confirm(
        'Already BookMarked! Are You Want Delete?',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'BookMark',            // title
        'Cancel,Yes'          // buttonLabels
    );
  }else{
    tx.executeSql('CREATE TABLE IF NOT EXISTS bookmark (bookmarkid,bookmarkdata)');
    tx.executeSql('INSERT INTO bookmark(bookmarkid,bookmarkdata) VALUES ("'+currentAppkey+'","'+currentList+'")');
  }
}


function addAppKeyvalue(){

  var appkeyvalue = $.trim($('#appkeyvalue').val().toLowerCase());

  if(appkeyvalue == ''){
    navigator.notification.alert("Enter Your App Key");  
  }else{
    var url = "http://build.myappbuilder.com/api/apps/"+appkeyvalue;
    var result = $.ajax({url: url,async: false}).responseText;

    var resultData =$.parseJSON(result)
    if(result){
      if(resultData.error == "Unauthorized"){
        navigator.notification.alert("Unauthorized Appkey");
      }else{
        
         db.transaction(function insertQuery(tx) {tx.executeSql('SELECT * FROM Appkey WHERE appkey="'+$.trim(appkeyvalue)+'"',[],successResult,function(tx,err){console.log("Error Occur.")})},errorCB, successCB);
      }
      
    }else{
      navigator.notification.alert("Server Failure");
    }
  }
}


function successResult(tx,results){
  if(results.rows.length > 0){
    navigator.notification.alert("Already Exists");
  }else{
    var appkeyvalue = $.trim($('#appkeyvalue').val().toLowerCase());
    tx.executeSql('CREATE TABLE IF NOT EXISTS Appkey (appkey)');
    db.transaction(function insertQuery(tx) {tx.executeSql('INSERT INTO Appkey VALUES("'+$.trim(appkeyvalue)+'");')},errorCB1, successCB1);
  }
}

function AppKeyFun(appkey){
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
    var url = "http://build.myappbuilder.com/api/apps/"+appkey;
    //if($.ajax({url: url,async: false}).responseText){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(fs)
        {
            var filePath = fs.root.fullPath+"/"+appkey+"Data.json";
            contentjsonText =$.ajax({url: filePath,async: false}).responseText
              if(contentjsonText){
                        contentText[count] = $.parseJSON(contentjsonText);
                        contentButton = contentText[count].buttons;
                        totalLen = contentButton.length-1;
                        $.each( contentButton, function( key, value ) {
                           // var imagePath = fs.root.fullPath+"/"+appkey+"/"+value["position"]+".png";
                           // fileTransfer.download(value["image"], imagePath, function (entry) {
                                if(key == totalLen){
                                      $.mobile.loading( 'hide' );
                                      if(count < appkeyarray.length){
                                        AppKeyFun($.trim(appkeyarray[count].toLowerCase()));
                                        count = count + 1;  
                                      }else{
                                        gridicon ='';
                                        var number =0;
                                        if(localStorage.Gridview == 1){
                                          $('#hideImage').hide();
                                          for(var i=0; i< Math.ceil(appkeyarray.length); i++){

                                            /*var imageName = fs.root.fullPath+"/"+appkeyarray[number]+"/appimage.png";
                                            for(var j=0;j<3;j++){
                                              if(j == 0){
                                                if(appkeyarray[number]){
                                                  gridicon += '<div class="ui-grid-b" style="width:100%"><div class="ui-block-a"><div class ="appIcon" id='+appkeyarray[number]+'><img src="'+imageName+'"/></div></div>';
                                                }else{
                                                  gridicon += '<div class="ui-grid-b" style="width:100%"><div class="ui-block-a"></div>';
                                                }
                                              }else if(j == 1){
                                                if(appkeyarray[number]){
                                                  gridicon +='<div class="ui-block-b"><div class ="appIcon" id='+appkeyarray[number]+'></div></div>';
                                                }else{
                                                  gridicon +='<div class="ui-block-b"></div>';
                                                }
                                              }else if(j == 2){
                                                if(appkeyarray[number]){
                                                  gridicon +='<div class="ui-block-c"><div class ="appIcon" id='+appkeyarray[number]+'></div></div></div>';
                                                }else{
                                                  gridicon +='<div class="ui-block-c"></div></div>';
                                                }
                                              }
                                              
                                            }*/
                                            var imageName =fs.root.fullPath+"/"+appkeyarray[i]+"/appimage.png" ;
                                            gridicon += '<li><a href="" style="text-shadow:none;" class ="appIcon" id='+appkeyarray[i]+'><img class="img1" src="'+imageName+'" style="margin:2% 2% 2% 2%"/><h2 style="margin:2% 2% 2% 2%; white-space:normal; word-wrap:break-word;" >'+contentText[i+1].title+'</h2></a></li>';
                                          }
                                        }else{
                                          if(appkeyarray.length > 9){$('#hideImage').hide();}else{$('#hideImage').show();}
                                          
                                          for(var i=0; i< Math.ceil(appkeyarray.length); i++){
                                             
                                              var imageName =fs.root.fullPath+"/"+appkeyarray[i]+"/appimage.png" ;
                                              gridicon += '<a href="" style="text-shadow:none;" class ="appIcon" id='+appkeyarray[i]+'><img style="position:relative; top:16px; bottom:10px; max-width: 25% !important; height:auto; width: 25% !important; padding:5% 4%;" class="img1" src="'+imageName+'"/></a>';
                                              
                                          }
                                        }
                                        
                                        $('#bookshelfListview').append(gridicon);
                                        $("#bookshelfListview").listview("refresh");

                                        $( ".appIcon" ).click(function(){
                                            //$('#splashScreen').css("background-image", "url('"+fs.root.fullPath+"/"+this.id+"/appsplash.png"+"')","background-size", "100% 100%", "margin-top", "0px");
                                            //$.mobile.changePage("#splashScreen",{transition:"slide",reverse:false}); 
                                                  currentAppkey = this.id;
                                                  contentjsonText = $.ajax({url: fs.root.fullPath+"/"+currentAppkey+"Data.json",async: false}).responseText;
                                                  contentText = $.parseJSON(contentjsonText);
                                                  contentButton = contentText.buttons
                                                  $.mobile.changePage("#chapterPage",{transition:"slide",reverse:false});
                                                  /* setTimeout(function(){
                                                      setTimeout(function(){
                                                        contentjsonText = $.ajax({url: fs.root.fullPath+"/"+currentAppkey+"Data.json",async: false}).responseText;
                                                        contentText = $.parseJSON(contentjsonText);
                                                        contentButton = contentText.buttons
                                                        $.mobile.changePage("#chapterPage",{transition:"slide",reverse:false});
                                                      },10);
                                                  },1500);*/
                                        });

                                        $( ".appIcon" ).bind( "taphold", tapholdHandler );

                                        function tapholdHandler( event ){
                                          
                                          currentAppkey = this.id;
                                          navigator.notification.confirm('Are You Want to Delete The Book',deletebook,'DeleteBook','Cancel,Ok');
                                        }

                                      }
                                }
                            //},
                            //function (error) {
                             //   console.log("Some error");
                            //});
                        });
                                      
                                      

                                      
                        
              }else{


                fileTransfer.download(url,filePath,
                    function(entry) {
                        contentjsonText = $.ajax({url: entry.fullPath,async: false}).responseText;
                        contentText[count] = $.parseJSON(contentjsonText);
                        //alert(contentText[count].title)
                        contentButton = contentText[count].buttons;
                        totalLen = contentButton.length-1;
                        $.each( contentButton, function( key, value ) {
                           // var imagePath = fs.root.fullPath+"/"+appkey+"/"+value["position"]+".png";
                           // fileTransfer.download(value["image"], imagePath, function (entry) {
                                if(key == totalLen){
                                      var imagePath = fs.root.fullPath+"/"+appkey+"/appimage.png";
                                       var splashPath = fs.root.fullPath+"/"+appkey+"/appsplash.png";

                                        if(contentText[count].app_image == null){
                                          contentText[count].app_image =  "http://salmonellabase.com/ptphp/ibook/book.png";
                                        }
                                         fileTransfer.download(contentText[count].app_image, imagePath, function(entry) {
                                          $.mobile.loading( 'hide' );
                                              if(count < appkeyarray.length){
                                                AppKeyFun($.trim(appkeyarray[count].toLowerCase()));
                                                count = count + 1;  
                                              }else{
                                                gridicon ='';
                                                if(localStorage.Gridview == 1){
                                                  for(var i=0; i< Math.ceil(appkeyarray.length); i++){
                                                    var imageName = fs.root.fullPath+"/"+appkeyarray[i]+"/appimage.png";
                                                    gridicon += '<li><a href="" style="text-shadow:none;" class ="appIcon" id='+appkeyarray[i]+'><img class="img1" src="'+imageName+'" style=" "/></a></li>';
                                                  }
                                                }else{
                                                  for(var i=0; i< Math.ceil(appkeyarray.length); i++){
                                                    var imageName = fs.root.fullPath+"/"+appkeyarray[i]+"/appimage.png";
                                                    gridicon += '<a href="" style="text-shadow:none;" class ="appIcon" id='+appkeyarray[i]+'><img style="position:relative; top:15px; bottom:10px; max-width: 25% !important;width: 25% !important; padding:5% 4%;" src="'+imageName+'"/></a>';
                                                    /*gridicon += '<a href="" style="text-shadow:none;" class ="appIcon" id='+appkeyarray[i]+'><div style="background-image: url(../img/book.png); background-size:100% 100%;"><img style="max-width: 25%; width: 25%; padding: 5px;" src="img/face.png"/></div></a>';*/
                                                  }
                                                }
                                                
                                                $('#bookshelfListview').append(gridicon);
                                                $("#bookshelfListview").listview("refresh");
                                                $(".appIcon").click(function(){
                                                   // $('#splashScreen').css("background-image", "url('"+fs.root.fullPath+"/"+this.id+"/appsplash.png"+"')","background-size", "100% 100%", "margin-top", "0px");
                                                    //$.mobile.changePage("#splashScreen",{transition:"slide",reverse:false}); 
                                                    currentAppkey = this.id;
                                                    contentjsonText = $.ajax({url: fs.root.fullPath+"/"+currentAppkey+"Data.json",async: false}).responseText;
                                                    contentText = $.parseJSON(contentjsonText);
                                                    contentButton = contentText.buttons
                                                    $.mobile.changePage("#chapterPage",{transition:"slide",reverse:false});
                                                     /*setTimeout(function(){
                                                        setTimeout(function(){
                                                          contentjsonText = $.ajax({url: fs.root.fullPath+"/"+currentAppkey+"Data.json",async: false}).responseText;
                                                          contentText = $.parseJSON(contentjsonText);
                                                          contentButton = contentText.buttons
                                                          $.mobile.changePage("#chapterPage",{transition:"slide",reverse:false});
                                                        },10);
                                                    },1500);*/
                                                });

                                                 $( ".appIcon" ).bind( "taphold", tapholdHandler );
                                                  function tapholdHandler( event ){
                                                    currentAppkey = this.id;
                                                    navigator.notification.confirm('Are You Want to Delete The Book',deletebook,'Delete Book','Cancel,Ok');
                                                  }

                                          }
                                        },
                                        function(error) {
                                            console.log("download error source " + error.source);
                                            console.log("download error target " + error.target);
                                            console.log("upload error code" + error.code);
                                            $.mobile.loading( 'hide' );
                                        });
                                        
                                        /*if(contentText[count].splash_image == null){
                                          contentText[count].splash_image =  "http://salmonellabase.com/ptphp/ibook/iBook_Splash.jpg";
                                        }else{
                                          
                                        }
                                         fileTransfer.download(contentText[count].splash_image, splashPath, function(entry) {
                                              
                                         },function(error){
                                              console.log("download error source " + error.source);
                                              console.log("download error target " + error.target);
                                              console.log("upload error code" + error.code);
                                          });*/
                                      
                                        

                                    }
                                      
                                
                            //},
                            //function (error) {
                             //   console.log("Some error");
                            //});
                        });
                    },
                    function(error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                    }
                );
          }
        });
    //}else{
    //  navigator.notification.alert("Please Enter Your Appkey");
   // }
    
}

function deletebook(button){
    if(button == 2){
        //alert("currentAppkey : "+currentAppkey);
        db.transaction(function(tx){tx.executeSql('DELETE FROM Appkey WHERE appkey="'+currentAppkey+'"');}, errorCB, successCB);
        db.transaction(populateDB, errorCB, successCB);
    }
    else{
        }
} 


$(document).on('pageshow', '#chapterPage', function(event) {
    chapterPageFun();
});

$(document).on("pagehide", '#chapterPage', function(event,ui){
    $("#contentListview").empty();
    $("#chapterPageback").off('click');
    $('.chapterTitle').empty();
});






function chapterPageFun(){
    var appendText = '';
    v = 0;
    w = 0;
    listId = [];
    listTitle = [];
    listText = [];
    listButtonId = [];
    for(var i=0;i<contentButton.length;i++){
      console.log(contentButton[i].id);
            listButtonId.push(contentButton[i].id);
            var elements = contentButton[i].elements
            for(var j=0;j<elements.length;j++){
              listTitle.push(elements[j].title);
              listText.push(elements[j].text);
              listId.push(elements[j].id);
              
            }
    }

    for(var i=0; i < contentButton.length; i++){
        var contentElement = contentButton[i].elements;

        if(contentElement.length > 0){
            appendText += '<li class="contentListview" id="buttonListview-'+v+'-'+i+'">'+contentButton[i].title+'</li>';
            for(var j=0; j < contentElement.length; j++ ){
                appendText += '<li class="contentListview" id="elementListview-'+v+'"><div data-role="content"><div class="ui-grid-a"><div class="ui-block-a" style="width:92%; white-space:normal; word-wrap:break-word;">&nbsp;&nbsp;&nbsp;'+convert_roman(j+1)+". "+contentElement[j].title+'</div><div class="ui-block-b" style="width:8%"> '+(v+1)+'</div></div></div></li>';
                v=v+1;
            }
        }else{
            //appendText += '<li class="contentListview" id="buttonListview-'+i+'">'+contentButton[i].title+'</li>';
        }
        
    }

    $('.chapterTitle').append(contentText.title);
    $('#contentListview').append(appendText);
    $("#contentListview").listview("refresh");

    $(".contentListview").click(function(){
      //alert(this.id)
        listdata = (this.id).split("-");
        displayTitle = listTitle[listdata[1]];
        displayText = listText[listdata[1]];
        currentList = listdata[1];
        if(listdata[0] == "buttonListview"){
          currentbuttonheading = contentButton[listdata[2]].title
          currentButton = listButtonId[listdata[2]];
         //alert(currentButton)
        }
        $.mobile.changePage("#ContentPage",{transition:"slide",reverse:false});
    });

    $('#chapterPageback').click(function(){
        $.mobile.changePage("#bookshelf",{transition:"slide",reverse:true});
    });

    $('#slider-fill1').change(function(){
        var slider_value = $(this).val() * 0.01;
        //console.log(slider_value)
        window.plugins.ScreenBrightness.SetScreenBrightness(slider_value);
    })
    
    $('.fontStyle').click(function(){
     
      localStorage.fontstyle = this.id;
      $(".backgroundcolor").children().children().css('font-family',localStorage.fontstyle );
    });
    
    $('.fontbgcolor').click(function(){
        if(this.id == "whitebgcolor"){
          localStorage.fontbgcolor = "white";
          $('.backgroundcolor').children().css('background-color',"transparent");
        }else if(this.id == "sepiabgcolor"){
          localStorage.fontbgcolor = "sepia";
          $('.backgroundcolor').children().css('background-color',"#f5f0de");
        }else{
          localStorage.fontbgcolor = "black";
          $('.backgroundcolor').children().css('background-color',"black");
        }
        
    });
    if(localStorage.fontSize){
            $(".backgroundcolor").css('font-size',localStorage.fontSize+'px');
          }else{
            $(".backgroundcolor").css('font-size','16px');
          }
}


$(document).on('pageshow', '#ContentPage', function(event){

    $('#slider-fill').change(function(){
        var slider_value = $(this).val() * 0.01;
        //console.log(slider_value)
        window.plugins.ScreenBrightness.SetScreenBrightness(slider_value);
    })
    
   
    
    $('.fontbgcolor').click(function(){
        if(this.id == "whitebgcolor"){
          localStorage.fontbgcolor = "white";
          $('.backgroundcolor').children().css('background-color',"transparent");
        }else if(this.id == "sepiabgcolor"){
          localStorage.fontbgcolor = "sepia";
          $('.backgroundcolor').children().css('background-color',"#f5f0de");
        }else{
          localStorage.fontbgcolor = "black";
          $('.backgroundcolor').children().css('background-color',"black");
        }
        
    });


    $("#ContentPageback").click(function(){
        $.mobile.changePage("#chapterPage",{transition:"slide",reverse:true});
    });
    
    $('.fontStyle').click(function(){
     
      localStorage.fontstyle = this.id;
      $(".backgroundcolor").children().children().css('font-family',localStorage.fontstyle );
    }); 

    $('#appTitle').append(contentText.title);
    //alert(currentbuttonheading)
    if(currentbuttonheading != null){
      $('#buttonheading').show();
      $("#buttonheading").append('<h2 align="center" style="white-space:normal; word-wrap:break-word;" ">'+currentbuttonheading+'</h2>');
      //$("#buttonheading").append('<div class="ui-grid-a" style="width:100%" ><div class="ui-block-a" style="width:90%"><h2 align="center" style="white-space:normal; word-wrap:break-word;" ">'+currentbuttonheading+'</h2></div><div class="ui-block-b" style="width:10%"><a href="javascript:buttonAppwallgo();" style="background:none;border:none;"><img class="imageactive" src="img/coments.png" /></a></div></div>');
    }else{

    }
    $('#ContentPageText').append(displayText);
    $('#ContentPageTitle').append(displayTitle);

    

    var pageno = parseInt(currentList)+1;
    $('#pageNo').append(pageno);
    if(currentList == listTitle.length-1){
      $('#arrowRight').hide();
      $('#arrowLeft').show();
    }else if(currentList == 0){
      $('#arrowRight').show();
      $('#arrowLeft').hide();
    }else{
      $('#arrowLeft').show();
      $('#arrowRight').show();
    }

      
      
    $('#arrowRight').click(function(){
      $('#buttonheading').hide();
      if(currentList <= listTitle.length-2){
        currentList = ++currentList;
          if(currentList == listTitle.length-1){
            $('#arrowRight').hide();
            $('#arrowLeft').show();
          }else if(currentList == 0){
            $('#arrowLeft').hide();
            $('#arrowRight').show();
          }else{
            $('#arrowLeft').show();
            $('#arrowRight').show();
          }
          
        if(currentList <= listTitle.length-1){
          $('#ContentPageText').empty();
          $('#ContentPageTitle').empty();
          $('#pageNo').empty();
          displayTitle = listTitle[currentList];
          displayText = listText[currentList];
          $('#ContentPageText').append(displayText);
          $('#ContentPageTitle').append(displayTitle);

          if(localStorage.fontstyle){
            $(".backgroundcolor").css('font-family',localStorage.fontstyle );
          } 

          if(localStorage.fontSize){
            $(".backgroundcolor").css('font-size',localStorage.fontSize+'px');
          }else{
            $(".backgroundcolor").css('font-size','16px');
          }

          var pageno = parseInt(currentList)+1;
          $('#pageNo').append(pageno);
        }else{

        }
      }
    });

    $('#arrowLeft').click(function(){
      $('#buttonheading').hide();
      if(currentList >= 1){
        currentList = currentList -1;
          if(currentList == listTitle.length-1){
            $('#arrowRight').hide();
            $('#arrowLeft').show();
          }else if(currentList == 0){
            $('#arrowLeft').hide();
            $('#arrowRight').show();
          }else{
            $('#arrowLeft').show();
            $('#arrowRight').show();
          }

        if(currentList >= 0){
          $('#ContentPageText').empty();
          $('#ContentPageTitle').empty();
          $('#pageNo').empty();
          displayTitle = listTitle[currentList];
          displayText = listText[currentList];
          $('#ContentPageText').append(displayText);
          $('#ContentPageTitle').append(displayTitle);

          if(localStorage.fontstyle){
            $(".backgroundcolor").css('font-family',localStorage.fontstyle );
          }

          if(localStorage.fontSize){
            $(".backgroundcolor").css('font-size',localStorage.fontSize+'px');
          }else{
            $(".backgroundcolor").css('font-size','16px');
          }

          var pageno = parseInt(currentList)+1;
          $('#pageNo').append(pageno);
        }else{

        }
      }
    });
});
 
$(document).on('pagehide', '#ContentPage',function(event, ui){
    $("#ContentPageback").off('click');
    $('#ContentPageText').empty();
    $('#ContentPageTitle').empty();
    $('#buttonheading').empty();
    $('#arrowRight').off('click');
    $('#arrowLeft').off('click');
    $('#pageNo').empty();
    $('#appTitle').empty();
    currentbuttonheading =null;
    $('.fontbgcolor').off('click');
    $('.fontStyle').off('click')

});

$(document).on('pageshow', '#BookMarkPage',function(event){
  db.transaction(querySelectDB,errorCB);
});

$(document).on('pagehide', '#BookMarkPage', function(event,ui){
  $('.BookMarkTitle').empty();
  $('#BookMarkListview').empty();
  $(".bookmarkListview").off('click');
});

function BookMarkPageback(){
  $.mobile.changePage("#chapterPage",{transition:"slide",reverse:true});
}

function bookMarkCallFun(){
   $.mobile.changePage("#BookMarkPage",{transition:"slide",reverse:false});
}


function bookMarkPageFun(){
    
    var appendText = '';
    v = 0;
    listTitle = [];
    listText = [];
    for(var i=0;i<contentButton.length;i++){
        var elements = contentButton[i].elements;
        for(var j=0;j<elements.length;j++){
            listTitle.push(elements[j].title);
            listText.push(elements[j].text);
            listId.push(elements[j].id);
        }
    }

    for(var i=0; i < contentButton.length; i++){
        var contentElement = contentButton[i].elements;

        if(contentElement.length > 0){
             for(var j=0; j < contentElement.length; j++ ){
               //console.log("success:"+j)
               for(var k=0;k < bookmarkdata.length;k++ ){
                if(bookmarkdata[k] == v){
                  //console.log(bookmarkdata[v] + v);
                  appendText += '<li>'+contentButton[i].title+'</li>';
                  appendText += '<li class="bookmarkListview" id="bookmarkelementListview-'+v+'"><div class="ui-grid-a"><div class="ui-block-a" style="width:92%; white-space:normal; word-wrap:break-word;">'+convert_roman(j+1)+". "+contentElement[j].title+'</div><div class="ui-block-b" style="width:8%"> '+(v+1)+'</div></li>';
                }
              }
              v=v+1;
            }
        }else{
        }
        
    }

    $('.BookMarkTitle').append(contentText.title);
    $('#BookMarkListview').append(appendText);
    $("#BookMarkListview").listview("refresh");

    $(".bookmarkListview").click(function(){
        listdata = (this.id).split("-");
        displayTitle = listTitle[listdata[1]];
        displayText = listText[listdata[1]];
        currentList = listdata[1];
        $.mobile.changePage("#ContentPage",{transition:"slide",reverse:false});
    });
}


function bookMarkFun(){
  db.transaction(queryInsert, errorCB, successCB5);
}




function smallletterFun(){
  if(localStorage.fontSize){
    if(localStorage.fontSize > 8){
      localStorage.fontSize = localStorage.fontSize - 2;
      console.log(localStorage.fontSize);
      $(".backgroundcolor").children().css('font-size',localStorage.fontSize+'px');
    }else{

    }
  }else{
    localStorage.fontSize = 14;
     $(".backgroundcolor").children().css('font-size',localStorage.fontSize+'px');
  }
  
}


function capitalltterFun(){

  if(localStorage.fontSize){
    if(localStorage.fontSize <= 36){
      localStorage.fontSize = parseInt(localStorage.fontSize)+2;
      console.log(localStorage.fontSize);
      $(".backgroundcolor").children().css('font-size',localStorage.fontSize+'px');
    }else{

    }
  }else{
    localStorage.fontSize = 18;
    $(".backgroundcolor").children().css('font-size',localStorage.fontSize+'px');
  }
}

function lettersaveFun(){
  navigator.notification.alert("Letter Effect Saved!");
}

function appwallgoFun(){
  $.mobile.changePage("#appwall",{transition:"slide",reverse:false});
}



/*--------------------------------- AppWall Posting----------------------*/

$(document).on('pageshow','#appwall', function(event){
   /* $('#appwallback').click(function(){
      $.mobile.changePage("#chapterPage",{transition:"slide",reverse:true});
    });*/
    $('#appwallTitle').append(contentText.title);
    $('.appwalllogtitle').append(contentText.title);
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
    setTimeout(function(){
      appWallPostFun();
    },100)
});

function appwallback(){
  $.mobile.changePage("#chapterPage",{transition:"slide",reverse:true});
}


function appWallPostFun(){
    $.mobile.loading( 'hide');
    var url = "http://build.myappbuilder.com/api/messages.json?api_key="+currentAppkey;
    var responsejson = $.ajax({url: url,async: false}).responseText;
    var messages = $.parseJSON(responsejson);
    var bodyMgs = '';
    var mgs_id = []; 
    var body = [];
    var created_at = [];
    var parent_id = []; 
    var element_name = [];
    var button_name =[];
    var sender_name = [];
    var sender_id = [];
    var replyappend ='';
    var z = 0;
    var p = 0;
    //alert("msgLen:"+messages.length);
    if(messages.length > 0){
      $.each( messages, function( key, value ) {
        $.each( value, function( k, v ) {
            if(k == "id"){
              mgs_id.push(v);
            }else if(k == "created_at"){
              created_at.push(v);
            }else if(k == "parent_id"){
              parent_id.push(v);
            }else if(k == "body"){
              body.push(v);
            }else if(k == "element_name"){
              element_name.push(v);
            }else if(k == "button_name"){
              button_name.push(v);
            }else if(k == "sender_name"){
              sender_name.push(v);
            }else if(k == "sender_id"){
              sender_id.push(v);
            }
        });
      });
    }else{
      bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
    }
    
    for(var i=0;i<body.length;i++){

      if(parent_id[i] == null){
        p=0;
        for(var j=0;j<body.length;j++){
           p = p+1;
          if(mgs_id[i] == parent_id[j]){
             z= -1;
             var k = parseInt(p)+z;
             if(localStorage.sender_id == sender_id[k]){
               if(element_name[k] != null && button_name[k] != null){
                replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.6em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:72%;"></div><div class="ui-block-b" style="width:28%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div></div></div></div></div><br /></div><br />';
               }else if(button_name[k] != null){
                replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.6em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:72%;"></div><div class="ui-block-b" style="width:28%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div></div></div></div></div><br /></div><br />';
               }else{
                replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.6em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[k])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:72%;"></div><div class="ui-block-b" style="width:28%;"><img src="img/delete.png" id="delete-'+k+'" class="deleteMgs" /></div></div></div></div></div><br /></div><br />';
               }
              }else{
                 if(element_name[k] != null && button_name[k] != null){
                  replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.6em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br /></div><br />';
                 }else if(button_name[k] != null){
                  replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.6em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br /></div><br />';
                 }else{
                  replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.6em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div><br /></div><br />';
                 }
              }
          }else{
           
          }
          
       }

        if(localStorage.sender_id == sender_id[i]){
          if(element_name[i] != null && button_name[i] != null){
            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><div class="ui-grid-a " style="width:100%"><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify"><p align="justify">'+body[i]+'</p></p></div><hr /><div class="ui-grid-c" style="width:100%"><div class="ui-block-a" style="width:40%"></div><div class="ui-block-b" style="width:27%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-c" style="width:5%"></div><div class="ui-block-d" style="width:28%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
          
          }else if(button_name[i] != null){
            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-c" style="width:100%"><div class="ui-block-a" style="width:40%"></div><div class="ui-block-b" style="width:27%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-c" style="width:5%"></div><div class="ui-block-d" style="width:28%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
          
          }else{
            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-c" style="width:100%"><div class="ui-block-a" style="width:40%"></div><div class="ui-block-b" style="width:27%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div><div class="ui-block-c" style="width:5%"></div><div class="ui-block-d" style="width:28%"><img src="img/delete.png" id="delete-'+i+'" class="deleteMgs"/></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
          }
        }else{
          if(element_name[i] != null && button_name[i] != null){
            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><div class="ui-grid-a " style="width:100%"><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify"><p align="justify">'+body[i]+'</p></p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:72%"></div><div class="ui-block-b" style="width:28%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
          
          }else if(button_name[i] != null){
            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'&nbsp;</font><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:72%"></div><div class="ui-block-b" style="width:28%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
          
          }else{
            bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" align="left" style="width:20%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" align="right" style="width:80%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div></div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:72%"></div><div class="ui-block-b" style="width:28%"><img src="img/reply.png" id="reply-'+i+'" class="replyMgs" /></div></div></div></div></div><div class="replyHide" id="replyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="replymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="textReplyMgs" data-mini="true" data-inline="true" onclick="javascript:replymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
          }
        }  

        replyappend ='';
        //$.mobile.loading( 'hide');
      }else{
        //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
      }
      
    }
    
    $('#appwallListview').append(bodyMgs).trigger("create");

    if($('.replyHide').is(':visible')){
      $('.replyHide').toggle();
    }else{
      
    }

    $(".replyMgs").click(function(){
          replyMgsNo1 = (this.id).split('-');
          replyMgsNo = mgs_id[replyMgsNo1[1]];
          var replyHide = "replyHide"+replyMgsNo1[1];
          $('#'+replyHide).toggle();
    });

    $(".deleteMgs").click(function(){
          $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
          var deleteMgsNo = (this.id).split('-');
          //alert(mgs_id[deleteMgsNo[1]])
          if(localStorage.appwallLoginData){
            $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"DELETE",data:{'api_key':currentAppkey,'message_id':mgs_id[deleteMgsNo[1]]},
              success:function(response){
                $.mobile.loading( 'hide');
                $('#appwallListview').empty();
                appWallPostFun();
              },
              error:function(){ alert("Failure");}
            });
          }else{
            $.mobile.loading( 'hide');
            $( "#appwallLoginPage" ).popup( "open" );
          }
    });
}

function replymessageFun(){
  $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
  if(localStorage.appwallLoginData){
    var replyarray = "replymessage"+replyMgsNo1[1];
    var replymessage = $('#'+replyarray).val();
      if(replymessage == ''){
       navigator.notification.alert("Please Enter Your Reply...");
      }else{
        //alert(replyMgsNo);
         $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{'message[body]':replymessage,'message[parent_id]':replyMgsNo,'message[sender_id]':localStorage.sender_id,'api_key':currentAppkey},
          success:function(response){
            $.mobile.loading( 'hide');
            $('#appwallListview').empty();
            appWallPostFun();
          },
          error:function(){ alert("Failure");}
        });
      }
  }else{
    $.mobile.loading( 'hide');
    $( "#appwallLoginPage" ).popup( "open" );
  }

}



function postmessageFun(){
  //alert(localStorage.appwallLoginData);
  $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
  if(localStorage.appwallLoginData){

    var postmessage = $('#postmessage').val();
    if(postmessage == ''){
     navigator.notification.alert("Please Enter Your Comments...");
    }else{
       $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{'message[body]':postmessage,'message[sender_id]':localStorage.sender_id,'api_key':currentAppkey},
        success:function(response){
          $.mobile.loading( 'hide');
          $('#appwallListview').empty();
          appWallPostFun();
        },
        error:function(){ alert("Failure");}
      });
    }
  }else{
    $.mobile.loading( 'hide');
    $( "#appwallLoginPage" ).popup( "open" );
    
  }

}

$(document).on('pagehide','#appwall', function(event,ui){
    $('#appwallback').off('click');
    $('#appwallListview').empty();
    $('#postmessage').val('');
    $('#appwallTitle').empty();
    $('.appwalllogtitle').empty();
});


/*------------------------------Element AppWall ------------------------------------*/


function elementAppwallgo(){
  $.mobile.changePage("#ElementAppwall",{transition:"slide",reverse:false});
}

$(document).on('pageshow','#ElementAppwall', function(event){
    
    $('#ElementAppwallTitle').append(contentText.title);
    $('.Elementappwalllogtitle').append(contentText.title);
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
    setTimeout(function(){
      ElementAppWallPostFun();
    },100);
    
});

function elementAppwallBack(){
  $.mobile.changePage("#ContentPage",{transition:"slide",reverse:true});
}


function ElementAppWallPostFun(){
    $.mobile.loading( 'hide' );
    var element_id = parseInt(currentList);
    $.ajax({url:'http://build.myappbuilder.com/api/messages.json',type:"GET",data:{"api_key":currentAppkey,"element_id":listId[element_id]},
            success:function(response){

              var messages=response;
              var bodyMgs = '';
              var mgs_id = []; 
              var body = [];
              var created_at = [];
              var parent_id = []; 
              var element_name = [];
              var button_name =[];
              var sender_name = [];
              var sender_id = [];
              var replyappend ='';
              var z = 0;
              var p = 0;
              //alert("msgLen:"+messages.length);
              if(messages.length > 0){
                $.each( messages.reverse(), function( key, value ) {
                  $.each( value, function( k, v ) {
                      if(k == "id"){
                        mgs_id.push(v);
                      }else if(k == "created_at"){
                        created_at.push(v);
                      }else if(k == "parent_id"){
                        parent_id.push(v);
                      }else if(k == "body"){
                        body.push(v);
                      }else if(k == "element_name"){
                        element_name.push(v);
                      }else if(k == "button_name"){
                        button_name.push(v);
                      }else if(k == "sender_name"){
                        sender_name.push(v);
                      }else if(k == "sender_id"){
                        sender_id.push(v);
                      }
                  });
                });
              }else{
                bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
              }
              
              for(var i=0;i<body.length;i++){

                if(parent_id[i] == null){
                  p=0;
                  for(var j=0;j<body.length;j++){
                     p = p+1;
                    if(mgs_id[i] == parent_id[j]){
                       z= -1;
                       var k = parseInt(p)+z;
                        if(localStorage.sender_id == sender_id[k]){
                          replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:72%;"></div><div class="ui-block-b" style="width:28%;"><img src="img/delete.png" id="Elementdelete-'+k+'" class="ElementdeleteMgs" /></div></div></div></div></div></div><br /></div><br />';
                        }else{
                          replyappend +='<div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:10%;"></div><div class="ui-block-b" style="width:90%;"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.6em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[k]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[k]+'</p></div><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br /></div><br />';
                        }
                    }else{
                     
                    }
                    
                 }
                  if(localStorage.sender_id == sender_id[i]){
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-c" style="width:100%"><div class="ui-block-a" style="width:40%"></div><div class="ui-block-b" style="width:27%"><img src="img/reply.png" id="Elementreply-'+i+'" class="ElementreplyMgs" /></div><div class="ui-block-c" style="width:5%"></div><div class="ui-block-d" style="width:28%"><img src="img/delete.png" id="Elementdelete-'+i+'" class="ElementdeleteMgs"/></div></div></div></div></div></div><div class="ElementreplyHide" id="ElementreplyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="Elementreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="ElementtextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ElementreplymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                  }else{
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:75%; font-size:0.7em"><table style="vertical-align: middle;"><tr><td><img src="img/clock.png" style="width:20px; height:20px;"/></td><td>'+relative_time(created_at[i])+'</td></tr></table></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font><font size="1">&nbsp;>&nbsp;</font><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+element_name[i]+'&nbsp;</font></p><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;"><p align="justify">'+body[i]+'</p></div><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:72%"></div><div class="ui-block-b" style="width:28%"><img src="img/reply.png" id="Elementreply-'+i+'" class="ElementreplyMgs" /></div></div></div></div></div><div class="ElementreplyHide" id="ElementreplyHide'+i+'" style="width:100%;"><div class="ui-grid-b" style="width:100%; "><div class="ui-block-a" style="width:15%;"></div><div class="ui-block-b" style="width:63%;"><input id="Elementreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-c" style="width:22%;"><button id="ElementtextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ElementreplymessageFun();" ><font color="white">Reply</font></button></div></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                  }
                  replyappend ='';

                }else{
                  //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
                }
              }
              
              $('#ElementappwallListview').append(bodyMgs).trigger("create");

              if($('.ElementreplyHide').is(':visible')){
                $('.ElementreplyHide').toggle();
              }else{
                
              }

              $(".ElementreplyMgs").click(function(){
                    replyMgsNo1 = (this.id).split('-');
                    replyMgsNo = mgs_id[replyMgsNo1[1]];
                    var replyHide = "ElementreplyHide"+replyMgsNo1[1];
                    $('#'+replyHide).toggle();
              });

              $(".ElementdeleteMgs").click(function(){
                   var deleteMgsNo = (this.id).split('-');
                    //alert(mgs_id[deleteMgsNo[1]]);
                    if(localStorage.appwallLoginData){
                        $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
                        $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+currentAppkey+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
                        success:function(response){
                          $.mobile.loading( 'hide' );
                          $('#ElementappwallListview').empty();
                          ElementAppWallPostFun();
                        },
                        error:function(){ alert("Failure");}
                      });
                    }else{
                      
                      $( "#ElementappwallLoginPage" ).popup( "open" ); 
                    }
              });
            },error:function(){ alert("Failure");}
    });
  
    
}

function ElementreplymessageFun(){
  if(localStorage.appwallLoginData){
    var replyarray = "Elementreplymessage"+replyMgsNo1[1];
    var replymessage = $('#'+replyarray).val();
      if(replymessage == ''){
       navigator.notification.alert("Please Enter Your Reply...");
      }else{
        $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
        var element_id = parseInt(currentList);
         $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":replymessage,"message[parent_id]":replyMgsNo,"message[sender_id]":localStorage.sender_id,"api_key":currentAppkey,"element_id":listId[element_id]},
          success:function(response){
            $.mobile.loading( 'hide');
            $('#ElementappwallListview').empty();
            ElementAppWallPostFun();
          },
          error:function(){ alert("Failure");}
        });
      }
  }else{
    $( "#ElementappwallLoginPage" ).popup( "open" ); 
  }

}



function ElementpostmessageFun(){
  //alert(localStorage.appwallLoginData)
  if(localStorage.appwallLoginData){
    var postmessage = $('#Elementpostmessage').val();
    if(postmessage == ''){
     navigator.notification.alert("Please Enter Your Comments...");
    }else{
        $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
        var element_id = parseInt(currentList);
        $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":postmessage,"message[sender_id]":localStorage.sender_id,"api_key":currentAppkey,"element_id":listId[element_id]},
        success:function(response){
          $.mobile.loading( 'hide');
          $('#ElementappwallListview').empty();
          ElementAppWallPostFun();
        },
        error:function(){ alert("Failure");}
      });
    }
  }else{
    $( "#ElementappwallLoginPage" ).popup( "open" ); 
  }
}

$(document).on('pagehide','#ElementAppwall', function(event,ui){
    $('#ElementappwallListview').empty();
    $('#Elementpostmessage').val('');
    $('#ElementAppwallTitle').empty();
    $('.Elementappwalllogtitle').empty();
});
 


 /*------------------------------Button AppWall ------------------------------------*/


/*function buttonAppwallgo(){
  $.mobile.changePage("#ButtonAppwall",{transition:"slide",reverse:false});
}

$(document).on('pageshow','#ButtonAppwall', function(event){
    
    $('#ButtonAppwallTitle').append(contentText.title);
    ButtonAppWallPostFun();
});

function buttonAppwallBack(){
  $.mobile.changePage("#ContentPage",{transition:"slide",reverse:true});
}


function ButtonAppWallPostFun(){
    console.log("button"+currentButton);
    //var button_id = parseInt(currentButton);
   
    $.ajax({url:'http://build.myappbuilder.com/api/messages.json',type:"GET",data:{"api_key":currentAppkey,"button_id":currentButton},
            success:function(response){
              var messages=response;
              var bodyMgs = '';
              var mgs_id = []; 
              var body = [];
              var created_at = [];
              var parent_id = []; 
              var element_name = [];
              var button_name =[];
              var sender_name = [];
              var sender_id = [];
              var replyappend ='';
              var z = 0;
              var p = 0;
              //alert("msgLen:"+messages.length);
              if(messages.length > 0){
                $.each( messages, function( key, value ) {
                  $.each( value, function( k, v ) {
                      if(k == "id"){
                        mgs_id.push(v);
                      }else if(k == "created_at"){
                        created_at.push(v);
                      }else if(k == "parent_id"){
                        parent_id.push(v);
                      }else if(k == "body"){
                        body.push(v);
                      }else if(k == "element_name"){
                        element_name.push(v);
                      }else if(k == "button_name"){
                        button_name.push(v);
                      }else if(k == "sender_name"){
                        sender_name.push(v);
                      }else if(k == "sender_id"){
                        sender_id.push(v);
                      }
                  });
                });
              }else{
                bodyMgs = '<a><p align="justify" class="divback" ><font color="black" size="2">No Result Found</font></p></a>';
              }
              
              for(var i=0;i<body.length;i++){

                if(parent_id[i] == null){
                  p=0;
                  for(var j=0;j<body.length;j++){
                     p = p+1;
                    if(mgs_id[i] == parent_id[j]){
                       z = -1;
                       var k = parseInt(p)+z;
                        if(localStorage.sender_id == sender_id[k]){
                          replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[k])+'</div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[k]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"><img src="img/delete.png" id="Buttondelete-'+k+'" class="ButtondeleteMgs" /></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br />';
                        }else{
                          replyappend +='<div ><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[k]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[k])+'</div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[k]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[k]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:25%;"></div><div class="ui-block-b" style="width:25%;"></div></div></div></div></div></div><br />';
                        }
                    }else{
                     
                    }
                    
                 }
                  if(localStorage.sender_id == sender_id[i]){
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="Buttonreply-'+i+'" class="ButtonreplyMgs" /></div><div class="ui-block-b" style="width:25%"><img src="img/delete.png" id="Buttondelete-'+i+'" class="ButtondeleteMgs"/></div></div></div></div></div><div class="ButtonreplyHide" id="ButtonreplyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="Buttonreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="ButtontextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ButtonreplymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                  }else{
                    bodyMgs +='<div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:85%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">'+sender_name[i]+'</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div></div><p><font color="white" size="1" style="background-color:#33CCFF">&nbsp;'+button_name[i]+'</font></p><hr /><br /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><br /><hr /><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:25%"><img src="img/reply.png" id="Buttonreply-'+i+'" class="ButtonreplyMgs" /></div><div class="ui-block-b" style="width:25%"></div></div></div></div></div><div class="ButtonreplyHide" id="ButtonreplyHide'+i+'" style="width:100%;"><div class="ui-grid-a" style="width:100%; "><div class="ui-block-a" style="width:70%;"><input id="Buttonreplymessage'+i+'" type="text" data-mini="true" data-inline="true" placeholder="Enter Your Reply...." value="" style="border: none;background-color: transparent;"></div><div class="ui-block-b" style="width:30%;"><button id="ButtontextReplyMgs" data-mini="true" data-inline="true" onclick="javascript:ButtonreplymessageFun();" ><font color="white">Reply</font></button></div></div></div><br /><div class="appendreplydata">'+replyappend+'</div><br />';
                  }
                  replyappend ='';

                }else{
                  //bodyMgs +='<div style="width:95%;margin-left:5%"><div class="ui-grid-a" style="width:100%;"><div class="ui-block-a" style="width:15%"><img src="img/face.png"/></div><div class="ui-block-b" style="width:80%;"><div class="divback"><div class="ui-grid-a" style="width:100%"><div class="ui-block-a" style="width:50%;font-size:0.7em">His Magesty</div><div class="ui-block-b" style="width:50%; font-size:0.7em">'+relative_time(created_at[i])+'</div><hr /><div style="width:100%; white-space:normal; word-wrap:break-word;font-size: 1em;">'+body[i]+'</div><div class="ui-grid-a" style="width:100%;" ><div class="ui-block-a" style="width:50%;"><button id="delete-'+i+'" class="deleteMgs">Delete</button></div><div class="ui-block-b" style="width:50%;"></div></div></div></div></div></div><br />';
                }
              }
              
              $('#ButtonappwallListview').append(bodyMgs).trigger("create");

              if($('.ButtonreplyHide').is(':visible')){
                $('.ButtonreplyHide').toggle();
              }else{
                
              }

              $(".ButtonreplyMgs").click(function(){
                    replyMgsNo1 = (this.id).split('-');
                    replyMgsNo = mgs_id[replyMgsNo1[1]];
                    var replyHide = "ButtonreplyHide"+replyMgsNo1[1];
                    $('#'+replyHide).toggle();
              });

              $(".ButtondeleteMgs").click(function(){
                    var deleteMgsNo = (this.id).split('-');
                    //alert(mgs_id[deleteMgsNo[1]])
                    if(localStorage.appwallLoginData){
                      $.ajax({url:'http://build.myappbuilder.com/api/messages.json?api_key='+currentAppkey+'&message_id='+mgs_id[deleteMgsNo[1]], type:"DELETE",data:{},
                        success:function(response){
                          $('#ButtonappwallListview').empty();
                          ButtonAppWallPostFun();
                        },
                        error:function(){ alert("Failure");}
                      });
                    }else{
                      $( "#ButtonappwallLoginPage" ).popup( "open" );
                    }
              });
            },error:function(){ alert("Failure");}
    });
  
    
}

function ButtonreplymessageFun(){
  if(localStorage.appwallLoginData){
    var replyarray = "Buttonreplymessage"+replyMgsNo1[1];
    var replymessage = $('#'+replyarray).val();
      if(replymessage == ''){
       navigator.notification.alert("Please Enter Your Reply...");
      }else{
        //alert(replyMgsNo);
        //var button_id = parseInt(currentButton);
        
        $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":replymessage,"message[parent_id]":replyMgsNo,"message[sender_id]":localStorage.sender_id,"api_key":currentAppkey,"button_id":currentButton},
          success:function(response){
            $('#ButtonappwallListview').empty();
            ButtonAppWallPostFun();
          },
          error:function(){ alert("Failure");}
        });
      }
  }else{
    $( "#ButtonappwallLoginPage" ).popup( "open" );
  }

}



function ButtonpostmessageFun(){
  if(localStorage.appwallLoginData){
    var postmessage = $('#Buttonpostmessage').val();
    if(postmessage == ''){
      navigator.notification.alert("Please Enter Your Comments...");
    }else{
        //var button_id = parseInt(currentButton);
      $.ajax({url:'http://build.myappbuilder.com/api/messages.json', type:"POST",data:{"message[body]":postmessage,"message[sender_id]":localStorage.sender_id,"api_key":currentAppkey,"button_id":currentButton},
        success:function(response){
          $('#ButtonappwallListview').empty();
          ButtonAppWallPostFun();
        },
        error:function(){ alert(" Network Failure ");}
      });
    }
  }else{
    $( "#ButtonappwallLoginPage" ).popup( "open" );
  }
}

$(document).on('pagehide','#ButtonAppwall', function(event,ui){
    $('#ButtonappwallListview').empty();
    $('#Buttonpostmessage').val('');
    $('#ButtonAppwallTitle').empty();
});*/

function appwallLoginFun(){
  if($('#appwallLogin').val() == "" || $('#appwallPassword').val() == ""){
    navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
  }else{
    var username = $('#appwallLogin').val();
    var password = $('#appwallPassword').val();
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"login":username,"password":password},
      success:function(response){
        $.mobile.loading( 'hide' );
        $('.logoutBtn').show();
        if(response.name){
              localStorage.appwallLoginData = response.name;
                                  
        }else{
              localStorage.appwallLoginData = response.username;
        }
        localStorage.sender_id = response.id;
        $( "#appwallLoginPage" ).popup( "close" );
        $('#appwallListview').empty();
        appWallPostFun();
      },
      error:function(){
        $.mobile.loading( 'hide' );
        navigator.notification.alert(" Enter Your Correct Username And Password! ");
      }
    });
  }
}

function ElementappwallLoginFun(){
  if($('#ElementappwallLogin').val() == "" || $('#ElementappwallPassword').val() == ""){
    navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
  }else{
    var username = $('#ElementappwallLogin').val();
    var password = $('#ElementappwallPassword').val();
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"login":username,"password":password,"api_key":currentAppkey},
      success:function(response){
        $.mobile.loading( 'hide' );
        $(".logoutBtn").show();
        if(response.name){
              localStorage.appwallLoginData = response.name;
                                  
        }else{
              localStorage.appwallLoginData = response.username;
        }
        localStorage.sender_id = response.id;
        $( "#ElementappwallLoginPage" ).popup( "close" );
        $('#ElementappwallListview').empty();
        ElementAppWallPostFun();
      },
      error:function(){
        $.mobile.loading( 'hide' );
        navigator.notification.alert(" Enter Your Correct Username And Password! ");
      }
    });
  }
  
}

/*function ButtonappwallLoginFun(){
  if($('#ButtonappwallLogin').val() == "" || $('#ButtonappwallPassword').val() == ""){
    navigator.notification.confirm("Enter Your User Name And Password!",buttonPressed,"Login",'Ok');
  }else{
    var username = $('#ButtonappwallLogin').val();
    var password = $('#ButtonappwallPassword').val();
    $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"login":username,"password":password,"api_key":currentAppkey},
      success:function(response){
        if(response.name){
              localStorage.appwallLoginData = response.name;
                                  
        }else{
              localStorage.appwallLoginData = response.username;
        }
        localStorage.sender_id = response.id;
        $( "#ButtonappwallLoginPage" ).popup( "close" );
        $('#ButtonappwallListview').empty();
          ButtonAppWallPostFun();
      },
      error:function(){
        navigator.notification.alert(" Enter Your Correct Username And Password! ");
      }
    });
  }
  
}*/
function buttonPressed(){

}



function appwallRegFun(datatype){
  //alert(datatype)
  if(datatype == 1){

  $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
   $( "#appwallLoginPage" ).popup( "close" );
   
   setTimeout(function() {
      $.mobile.loading( 'hide' );
     $('#appwallRegisterPage').popup("open"); 
   }, 100);
  }else{
    $( "#ElementappwallLoginPage" ).popup( "close" );
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
   setTimeout(function() {
    $.mobile.loading( 'hide');
      $('#ElementappwallRegisterPage').popup("open");
      
    }, 100);
  }
   
}

function regesiterPageFtn(datatype){
 if(datatype == 2){
  var fname = $('#appwallRegFnam1').val();
  var lname = $('#appwallRegLnam1').val();
  var uname = $('#appwallRegid1').val();
  var password = $('#appwallRegPassword1').val();
  var phone = $('#appwallRegPhone1').val();
  var email = $('#appwallRegEmail1').val();
}else{
  var fname = $('#appwallRegFnam').val();
  var lname = $('#appwallRegLnam').val();
  var uname = $('#appwallRegid').val();
  var password = $('#appwallRegPassword').val();
  var phone = $('#appwallRegPhone').val();
  var email = $('#appwallRegEmail').val();
}
  
  if(fname==''||lname==''||uname==''||password==''||phone==''||email==''){
    navigator.notification.alert(" All The Fields Are Required! ");
  }
  else{
    $.mobile.loading( 'show', {text: 'Please Wait',textVisible: true,theme: 'a',html: ""});
    $.ajax({url:"http://build.myappbuilder.com/api/subscribers.json", type:"POST", data:{"api_key":currentAppkey,"subscriber[firstname]":fname,"subscriber[lastname]":lname,"subscriber[username]":uname,"subscriber[password]":password,"subscriber[password_confirmation]":password,"subscriber[phone]":phone,"subscriber[email]":email},
      success:function(response){

        $.ajax({url:"http://build.myappbuilder.com/api/login.json", type:"POST", data:{"api_key":currentAppkey,"login":uname,"password":password},
          success:function(response){
            $('.logoutBtn').show();
            $.mobile.loading( 'hide');
            if(response.name){
              
            localStorage.appwallLoginData = response.name;
            }
            else{
            localStorage.appwallLoginData = response.username;
            }
            localStorage.sender_id = response.id;
            if(datatype == 1){
              $( "#appwallRegisterPage" ).popup( "close" );
              $('#appwallListview').empty();
              appWallPostFun();
            }else{
              $( "#ElementappwallRegisterPage" ).popup( "close" );
              $('#ElementappwallListview').empty();
              ElementappWallPostFun();
            }
            
          },
          error:function(){
            $.mobile.loading( 'hide' );
            navigator.notification.alert(" Enter Your Correct Username And Password! ");
          }
        });
      },
      error:function(){
        $.mobile.loading( 'hide' );
        navigator.notification.alert(" Registration canceled! ");
      }
    });
  }

}
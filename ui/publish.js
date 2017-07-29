$(document).ready(function(){

var token,userId;

  var dataUrl = 'http://data.c100.hasura.me/v1/query';

    function getCookie(cookie_name) {
        var name = cookie_name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

function displaydata() {
       // window.location = '/homepage.html';
        token = getCookie("cookie_name");
        userId = getCookie("cookie_user");
        //alert(token);
        $.ajax({
            url: dataUrl,
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "type": "select",
                "args": {
                    "table": "final_info",
                    "columns": ["id", "description", "file_id", "user_id", "fullname", "collegename"],
                    "where": {"user_id": userId}
                }
            })
        }).done(function(data) {
            var append_data = "";
            //for(var i =0; i<= data.length-1; i++)
            for (var i = data.length - 1; i >= 0; i--){
                var append_data = append_data.concat('<article class="timeline-entry"><div class="timeline-entry-inner"><div class="timeline-icon bg-success"><i class="entypo-feather"></i></div><div class="timeline-label"><h2><a href="#"> '+data[i].fullname+' </a><span>posted a new update from</span><strong> '+data[i].collegename+' </strong></h2><h3>'+data[i].description+'</h3><div id="image_div"></div></div></div></article>');                
                //console.log(append_data);
            }
            $(".timeline-centered").html(append_data);
        }).fail(function(k) {
            console.log(k);
        });
    }
    
    displaydata();
    setInterval(function() {
        displaydata()
    }, 5000);




});
    function check_cookie()
    {
        var decodedCookie = decodeURIComponent(document.cookie);
        if(decodedCookie =='')
        {
            window.location ='/login';
        }

    }
    check_cookie();
$(document).ready(function() {

    hasura .setBaseDomain ('c100.hsura.me.io');
    hasura .disableHttps (); // No HTTPS enabled on local-development
    
    var token, userId;
    cookie = document.cookie;
    
    var dataUrl = 'http://data.c100.hasura.me/v1/query';
    var authUrl = 'http://auth.c100.hasura.me/';
    

    //Extract cookie
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

$('#post_btn').click(function(){

    token = getCookie("cookie_name");
    userId = getCookie("cookie_user");

     $.ajax({
                    url: dataUrl,
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        "type": "insert",
                        "args": {
                            "table": "publish",
                            "objects": [{"description": $('#description').val(),
                                         "file_id": $('#my_file').val(),
                                         "user_id": userId}]
                        }
                    })
                }).done(function(){

                    console.log('updated');
                    window.location = '/my_events';
                }).fail(function(){

                    console.log('failed to update');
                });

})





    function displaydata() {
       // window.location = '/homepage.html';
        token = getCookie("cookie_name");
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
                    "columns": ["id", "description", "file_id", "user_id", "fullname", "collegename"]
                }
            })
        }).done(function(data) {
            var append_data = "";
            for (var i = data.length - 1; i >= 0; i--) {
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
    }, 15000);
});
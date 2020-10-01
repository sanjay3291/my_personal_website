//new WOW().init();
$(document).ready(function() {
    let url = 'http://localhost:3000/';
    $('#mybutton').on('click',function(e){
        e.preventDefault();
        let data = {
            endPoint: url
            }; 
            $.ajax({
              url: url,
              method: 'GET',
              data: data,
              //dataType: 'json' 
            }).done(function(response) {
                console.log(response);
            });
    }); 
  });
$(document).ready(function(){
    var searches = ['OMG', 'LOL', 'WOW', 'NO', 'WTF', 'JK', 'GTFO', 'ILY', 'ROFL', 'LMAO', 'BYE'];

    var lastClick = 0
    
   function doIt(it) {
        $('#gifsAppearHere').empty();
        var query = it;
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10&rating="+ ratingSelected;
        $.ajax({
                url: queryURL,
                method: 'GET'
        })
        .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div>');
                var p = $('<p>');
                p.text("Rating: "+results[i].rating);
                var gifImage = $('<img>');
                gifImage.attr('src',results[i].images.fixed_height_still.url);
                gifImage.addClass('gifImage')
                gifImage.attr('data-still',results[i].images.fixed_height_still.url);
                gifImage.attr('data-animate',results[i].images.fixed_height.url);
                gifImage.attr('data-state','still');
                gifDiv.append(p);
                gifDiv.append(gifImage)
                $('#gifsAppearHere').prepend(gifDiv);
            }

            $('.gifImage').on('click', function (){
                var state = $(this).attr('data-state');
                if (state == 'still'){
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                }else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            })  
        });

    };

   function ratingset(){
        var checkR = $("#r").is(':checked');
        var checkPg13 = $("#pg13").is(':checked');
        var checkPg = $("#pg").is(':checked');
        if ((checkR == false) && (checkPg13 == false) && (checkPg == false)){
                ratingSelected = 'g'
            } else if ((checkR == false) && (checkPg13 == false) && (checkPg == true)){
                ratingSelected = 'pg';
            } else if ((checkR == false) && (checkPg13 == true) && (checkPg == true)){
                ratingSelected = 'pg-13'
            } else if ((checkR == true) && (checkPg13 == true) && (checkPg == true)){
                ratingSelected = 'r'
            }
    };

    function renderButtons(){
        $("#buttonshere").empty();
        for (var i=0; i<searches.length; i++){
            var a= $('<button>');
            a.addClass('search');
            a.attr('data-search', searches[i]);
            a.text(searches[i]);
            $('#buttonshere').append(a);
        }
    };

    // function focused(){
    //     for (var i=0; i<searches.length; i++){
    //         if ( $('<button>').data('search') == lastClick){
    //             $('this').addClass('focused');
    //         }else{
    //             $('this').removeClass();
    //             $('this').addClass('search')
    //         }
    //     }
    //     console.log('got focused')

    // };

    renderButtons();
    ratingset();


    $("#ratingssubmit").on('click', function(){
        ratingset();
        doIt(lastClick);
        return false
    });

    $('#addnew').on('click', function(){
        var newsearch = $('#newcat').val().trim();
        searches.push(newsearch);
        console.log(searches)
        
        renderButtons();
        return false
    })


    $(document).on('click', 'button', function(){
          $('button').removeClass('focused'); 
          $(this).addClass('focused');
    });

    $(document).on('click', '.search', function (){
        lastClick = $(this).data('search');
        doIt(lastClick);
        focused()
    });

})

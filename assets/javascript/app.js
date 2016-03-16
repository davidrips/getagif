$(document).ready(function(){
    var searches = ['OMG', 'LOL', 'WOW', 'NO', 'WTF', 'JK', 'GTFO', 'ILY', 'ROFL', 'LMAO', 'BYE'];
    console.log(searches)

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

    renderButtons();

    $('#addnew').on('click', function(){
        var newsearch = $('#newcat').val().trim();
        searches.push(newsearch);
        console.log(searches)
        
        renderButtons();
        return false
    })
    
    //Clean this up by making all the parts of the if conditions into global vars//
   
   function ratingset(){

         if ( ($("#r").is(':checked') == false) && ($("#pg13").is(':checked') == false) && ($("#pg").is(':checked') == false) ){
                ratingSelected = 'g'
            } else if (($("#r").is(':checked') == false) && ($("#pg13").is(':checked') == false) && ($("#pg").is(':checked') == true)){
                ratingSelected = 'pg';
            } else if (($("#r").is(':checked') == false) && ($("#pg13").is(':checked') == true) && ($("#pg").is(':checked') == true)){
                ratingSelected = 'pg-13'
            } else if (($("#r").is(':checked') == true) && ($("#pg13").is(':checked') == true) && ($("#pg").is(':checked') == true)){
                ratingSelected = 'r'
            }
             console.log(ratingSelected);
    };

    ratingset();

//gotta figure out how to make a doIt() work with the previously clicked event... ///
    $("#ratingssubmit").on('click', function(){
        ratingset();
        doIt(aTest);

        console.log("shouldbe")
        console.log(ratingSelected)
        console.log(aTest);
        return false

    })
//maybe by defining 'this' as an argument in the doIt function, and then having the original onclick set a value to it? such as, onclick makes test = $(this) whatever it is on the click, and then run doIt(test). 

    
    function doIt(it) {
         $('#gifsAppearHere').empty();
        var query = it;
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10&rating="+ ratingSelected;


        $.ajax({
                url: queryURL,
                method: 'GET'
        })

        .done(function(response) {
            console.log(response)

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
                if ( state == 'still'){
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                }else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            })  
        });

    }
    var aTest = 0

    $(document).on('click', '.search', function (){
        aTest = $(this).data('search');
        console.log(aTest);
        doIt(aTest);


    });
})

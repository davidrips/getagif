$(document).ready(function(){
    var searches = ['OMG', 'LOL', 'WOW', 'NO', 'WTF', 'JK', 'GTFO', 'ILY', 'ROFL', 'LMAO', 'BYE'];
    console.log(searches)

    function renderButtons(){
        $("#buttonshere").empty();
        for (var i=0; i<searches.length; i++){
            var a= $('<button>');
            a.addClass('search');
            a.attr('data-animal', searches[i]);
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


    $(document).on('click', '.search', function() {
        $('#gifsAppearHere').empty();
        var animal = $(this).data('animal');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
        })

        .done(function(response) {
            console.log(response)

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $('<div>');
                var p = $('<p>');
                p.text("Rating: "+results[i].rating);
                var animalImage = $('<img>');
                animalImage.attr('src',results[i].images.fixed_height_still.url);
                animalImage.addClass('animalImage')
                animalImage.attr('data-still',results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate',results[i].images.fixed_height.url);
                animalImage.attr('data-state','still');
                animalDiv.append(p);
                animalDiv.append(animalImage)
                $('#gifsAppearHere').prepend(animalDiv);
            }

            $('.animalImage').on('click', function (){
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
    });
})

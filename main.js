$(document).ready(function(){

  var url_base = 'https://api.themoviedb.org/3/';
// intercetto il click del bottone
  $('#but_utente').click(function(){
// prendo il valore della parola digitata dall'utente
    var inserimento_utente = $('#input_utente').val();

// effettuo la chiamata ajax
    $.ajax({
      'url' : url_base + 'search/movie',
      'data' : {
        'api_key':'da08093a3b06b0ad6a16cb0b2a73ed6b',
        'query': inserimento_utente,
        'language':'it'
      },
      'method':'GET',
      success:function(data_response){
        console.log(data_response);
        var movies = data_response.results;
        console.log(movies);
      },
      error:function(){
        alert('errore');
      }
    })
  })
});

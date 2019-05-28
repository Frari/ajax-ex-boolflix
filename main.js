$(document).ready(function(){

  var template_html=$('#template_film').html();
  var template_function = Handlebars.compile(template_html);

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
// dichiaro una variabile per i risultati della ricerca
        var movies = data_response.results;
        console.log(movies);
// creo ciclo for per estrapolare i risultati richiesti dalla ricerca dell'utente
        for(var i=0; i<movies.length; i++){
          var movie = movies[i];
// dichiaro le variabili alle quali associo i valori che mi interessano
          var titolo = movie.title;
          var titolo_originale = movie.original_title;
          var lingua = movie.original_language;
          var voto = movie.vote_average;
// creo oggetto handlebars
          var handlebars_variables = {
            'title':titolo,
            'original_title':titolo_originale,
            'language':lingua,
            'rating':voto
          }
          var html_locandina = template_function(handlebars_variables);
          $('#cont_locandina').append(html_locandina);
        }
      },
      error:function(){
        alert('errore');
      }
    })
  })
});

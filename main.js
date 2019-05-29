$(document).ready(function(){

  var url_base = 'https://api.themoviedb.org/3/';

  var template_html=$('#template_film').html();
  var template_function = Handlebars.compile(template_html);

  // creo array con bandiere disponibili
  var bandiere_disponibili = ['en','it'];

// intercetto il pulsante invio per avviare la ricerca
  $('#input_utente').keyup(function(event){
    if(event.which==13){
      // recupero il valore inserito dall'utente
      var inserimento_utente = $('#input_utente').val();
// richiamo la funzione della chiamata api
      chiamata_api(inserimento_utente);
// azzero la ricerca
       $('#input_utente').val('');
    };

  })

// intercetto il click del bottone
  $('#but_utente').click(function(){
// prendo il valore della parola digitata dall'utente
    var inserimento_utente = $('#input_utente').val();
    chiamata_api(inserimento_utente);
// azzero la ricerca
    $('#input_utente').val('');

  });

// creo funzione per chiamata ajax
  function chiamata_api(inserimento_utente){
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
// svuoto la schermata dalle locandine precedenti per nuova ricerca
        $('#cont_locandina').html('');
// dichiaro una variabile per i risultati della ricerca
        var movies = data_response.results;

// creo ciclo for per estrapolare i risultati richiesti dalla ricerca dell'utente
        for(var i=0; i<movies.length; i++){
          var movie = movies[i];
// dichiaro le variabili alle quali associo i valori che mi interessano
          var titolo = movie.title;
          var titolo_originale = movie.original_title;
          var lingua = get_bandiera_lingua(movie.original_language);
          var numero_stelline = get_numero_stelline(parseFloat(movie.vote_average));
          var html_stelline = get_html_stelline(numero_stelline);

// creo oggetto handlebars
          var handlebars_variables = {
            'title':titolo,
            'original_title':titolo_originale,
            'language':lingua,
            'rating':html_stelline
          }
          var html_locandina = template_function(handlebars_variables);
          $('#cont_locandina').append(html_locandina);

        }
      },
      error:function(){
        alert('errore');
      }

    })
  }
  // funzione per dimezzare e arrontondare il voto dei film
  function get_numero_stelline(voto){
    var stelline = Math.ceil(voto/2);
    return stelline;
  }

  // funzione per convertire i voti in get_numero_stelline
  function get_html_stelline(n_stelline){
    var icone_stelline = '';
// ciclo for per creare stelline piene e vuote
    for(var i=0; i<5; i++){
      if(i<n_stelline){
        icone_stelline+='<i class="fas fa-star"></i>';
      }else{
        icone_stelline+='<i class="far fa-star"></i>';
      }
    }
    return icone_stelline;
  }
  // creo funzione per far apparire le bandiere a seconda della lingua del film
  function get_bandiera_lingua(lingua){
    if(bandiere_disponibili.includes(lingua)){
      return '<img src="img/'+ lingua +'.png">';
    }
    return lingua;
  }
});

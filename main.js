$(document).ready(function(){

  var url_base = 'https://api.themoviedb.org/3/';
  var img_url_base = 'https://image.tmdb.org/t/p/';
  var dim_img = 'w185';

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
    change_locandina();
// azzero la ricerca
    $('#input_utente').val('');

  });

// creo funzione per chiamata ajax
  function chiamata_api(inserimento_utente){
    var inserimento_utente = $('#input_utente').val();

// effettuo la chiamata ajax per i film
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
        stampa_locandine_movie(movies);
      },
      error:function(){
        alert('errore');
      }

    });
    // effettuo la chiamata ajax per le serie
        $.ajax({
          'url' : url_base + 'search/tv',
          'data' : {
            'api_key':'da08093a3b06b0ad6a16cb0b2a73ed6b',
            'query': inserimento_utente,
            'language':'it'
          },
          'method':'GET',
          success:function(data_response){
    // dichiaro una variabile per i risultati della ricerca
            var series = data_response.results;
            stampa_locandine_serie(series);
          },
          error:function(){
            alert('errore');
          }

        })
  }
  // funzione per stampare le locandine dei film
  function stampa_locandine_movie(movies){
    // svuoto la schermata dalle locandine precedenti per nuova ricerca
    $('#cont_locandina').html('');
    // creo ciclo for per estrapolare i risultati richiesti dalla ricerca dell'utente
    for(var i=0; i<movies.length; i++){
      var movie = movies[i];
    // dichiaro le variabili alle quali associo i valori che mi interessano
      var titolo = movie.title;
      var titolo_originale = movie.original_title;
      var lingua = get_bandiera_lingua(movie.original_language);
      var numero_stelline = get_numero_stelline(parseFloat(movie.vote_average));
      var html_stelline = get_html_stelline(numero_stelline);
      var tipo = 'film';

      if(movie.poster_path == null){
        var url_poster_movie = 'img/img_not.jpg'
      }else{
        var url_poster_movie = img_url_base + dim_img + movie.poster_path;
      }
    // creo oggetto handlebars
      var handlebars_variables = {
        'title':titolo,
        'original_title':titolo_originale,
        'language':lingua,
        'rating':html_stelline,
        'copertina':url_poster_movie,
        'type':tipo
      }
      var html_locandina = template_function(handlebars_variables);
      $('#cont_locandina').append(html_locandina);

    }


  }
  // funzione per stampare le locandine delle serie tv
  function stampa_locandine_serie(series){
    // svuoto la schermata dalle locandine precedenti per nuova ricerca
    $('#cont_locandina').html('');
    // creo ciclo for per estrapolare i risultati richiesti dalla ricerca dell'utente
    for(var i=0; i<series.length; i++){
      var serie = series[i];
    // dichiaro le variabili alle quali associo i valori che mi interessano
      var titolo = serie.name;
      var titolo_originale = serie.original_name;
      var lingua = get_bandiera_lingua(serie.original_language);
      var numero_stelline = get_numero_stelline(parseFloat(serie.vote_average));
      var html_stelline = get_html_stelline(numero_stelline);
      var tipo = 'serie tv';

      if(serie.poster_path == null){
        var url_poster_serie = 'img/img_not.jpg'
      }else{
        var url_poster_serie = img_url_base + dim_img + serie.poster_path;
      }

    // creo oggetto handlebars
      var handlebars_variables = {
        'title':titolo,
        'original_title':titolo_originale,
        'language':lingua,
        'rating':html_stelline,
        'type': tipo,
        'copertina':url_poster_serie
      }
      var html_locandina = template_function(handlebars_variables);
      $('#cont_locandina').append(html_locandina);

    }

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
// funzione per far apparire le caratteristiche del film quando si va sopra con il mause
  function change_locandina(){
    $('.locandina').mouseenter(function(){
      $(this).find('.poster img').addClass('.nascondi');
      $(this).find('dettagli').addClass('visibile');
    });
    $('.locandina').mouseleave(function(){
      $(this).find('.poster img').removeClass('.nascondi');
      $(this).find('dettagli').removeClass('visibile');
    });
  }
});

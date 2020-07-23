function searchMovie() {
	$("#movie-list").html("");

	// $.getJSON('http://omdbapi.com/')
	$.ajax({
		// urutan tertukar tidak masalah
		url: "http://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "93ce9991",
			s: $("#search-input").val(), //jquery tolong carikan #id ditag input, lalu ambil apapun valuenya
		},
		success: function (result) {
			//jika sukses jalankan 'variabel' result
			if (result.Response == "True") {
				let movies = result.Search;

				$.each(movies, function (i, data) {
					$("#movie-list").append(
						`
            <div class="col-md-3 mb-2">
              <div class="card shadow" >
                <img src="` +
							data.Poster +
							`" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">` +
							data.Title +
							`</h5>
                <p class="card-text"><small class="text-muted">` +
							data.Year +
							`</small></p>
                <a href="#" class="btn btn-outline-secondary read-more" role="button" aria-pressed="true" data-toggle="modal"
                data-target="#exampleModal" data-id="` +
							data.imdbID +
							`">Read more</a>
            </div>
              </div>
            </div>
          `
					);
				});

				$("#search-input").val(""); //menghilangkan inputan lama
			} else {
				$("#movie-list").html(
					`
          <h1 class="text-center">` +
						result.Error +
						`</h1>
        `
				);
			}
		},
	});
}
$("#search-button").on("click", function () {
	searchMovie();
});

$("#search-input").on("keyup", function (event) {
	if (event.keyCode === 13) {
		//enterkey = 13

		searchMovie();
	}
});

// Modal
$("#movie-list").on("click", ".read-more", function () {
	//event-bubling/binding/delegation:jquery carikan id parent = #movile-list, dan saat diklik element yang ada class .read-more, jalankan fungsi
	//console.log($(this).data("id")); //membaca id pada modal

	$.ajax({
		url: "http://omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "93ce9991",
			i: $(this).data("id"),
		},
		success: function (movie) {
			if (movie.Response === "True") {
				$(".modal-body").html(
					`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="` +
						movie.Poster +
						`" alt="" class="img-fluid" />
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item">` +
						movie.Title +
						`</li>
                  <li class="list-group-item">` +
						movie.Year +
						`</li>
                  <li class="list-group-item">` +
						movie.Genre +
						`</li>
                  <li class="list-group-item">` +
						movie.Actors +
						`</li>
                </ul>
              </div>
            </div>
          </div>
        `
				);
			}
		},
	});
});

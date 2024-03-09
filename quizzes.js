fetch("./06_2_41_MoviesFromJSON.json")
.then(response => response.json())
.then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {

    // Find the element “col” in HTML
    var CardMovie = document.getElementById("col");
    var checkboxes=[];
    var cards=[];

    // Read every movie from the array
    for (var i = 0; i < myMovies.movies.length; i++) {

        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;

        // create a new HTML div division
        let AddCardMovie = document.createElement("div");

        // add class = “col” to new division for Bootstrap
        AddCardMovie.classList.add("col");

        // create Bootstrap card
        let checkbox="checkbox"+i.toString();
        let card = "card"+i.toString();

        checkboxes.forEach((checkboxParam,index)=>{
            console.log(index);
            checkboxParam.addEventListener('change',()=> {
                if (checkboxParam.checked){
                    cards[index].style.display='block';
                } else {
                    cards[index].style.display='none';
                }
            });
        });

        AddCardMovie.innerHTML = `
            <input type="checkbox" id=${checkbox} class="form-check-input" checked>
            <label for=${checkbox} class="form-check-label">Show Image ${i}</label>

            <div id=${card} class="card shadow-sm">
                <img src=${url} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <p class="card-text"> <strong>${title}</strong>, ${year}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small class="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>
        `;
        // append new division
        CardMovie.appendChild(AddCardMovie);

        let cbox=document.getElementById(checkbox);
        checkboxes.push(cbox);

        let ccard=document.getElementById(card);
        cards.push(ccard);
    } // end of for
} // end of function



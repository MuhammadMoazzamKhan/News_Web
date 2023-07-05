const APIS = ["73jc8k7AT76sQJB6bUsi6LzvlMdhE_7cq9IdsI6UVDk", "6b-kmW_Yzybp40XXELp9AmkA2mJMSi5z5GWy08oNwdY", "y4TUVBAEZsWXwkoXQkMxW8XzqZCzIpvXrHi9w_pgw2w", "rbeCnWYb8UACES0AOI8OzFEcALF3cz53RyxHHx4CiGA"]
let key = Math.floor(Math.random()* APIS.length);
console.log(key)
let obj = {
    method: 'GET',
    headers: { "x-api-key": APIS[key] },
    contentType: 'application/json',
}
let card = document.getElementById("cards"),
    loader = document.getElementById("loader"),
    content = document.getElementById("content")
const FETCH = (search, page) => {
    fetch(`https://api.newscatcherapi.com/v2/search?q=${search ? search : "pakistan"}&page_size=12&page=${page ? page : 1}`, obj)
        .then(res => res.json())
        .then((response) => {
            console.log(response)
            loader.style.display = "none";
            content.style.display = "block";
            const res = response.articles;
            for (let i in res) {
                loader.style.visibility = "flex"
                let { country, title, media, link, published_date, topic, summary } = res[i]
                console.log(res)
                card.innerHTML += `
        <div class="card mx-3 my-3" style="width: 18rem;">
        <img src="${media ? media : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBPLVuN9DW1XsVWkidlhveo0lyy7HrJ2PwoQ&usqp=CAU"}" class="card-img-top" widht="300" height="188" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title.slice(0, 30)}...</h5>
          <h6 class="card-title">Country: ${country} || Topic: ${topic}</h6>
          <p class="card-text">${summary.slice(0, 90)}...</p>
          <span class="badge rounded-pill text-bg-danger mb-1">${moment(published_date).fromNow()}</span> <br>
          <a href="${link}" class="btn btn-danger">See details</a>
        </div>
      </div>
        `
            }

        })
        .catch(err => console.log("err" + err))
}
FETCH()

let page = 1;


function search() {
    let search = document.getElementById("searcher");
    console.log(search.value)
    page = 1
    card.innerHTML = "";
    loader.style.display = "flex";
    content.style.display = "none";
    FETCH(search.value)
}
function loadmore() {
    let search = document.getElementById("searcher");
    page++
    console.log(page)
    FETCH(search.value, page)
}

function topics(y) {
    let search = document.getElementById("searcher");
    search.value = y.innerHTML
    page = 1
    loader.style.display = "flex";
    content.style.display = "none";
    card.innerHTML = "";
    FETCH(search.value.toString(), page)
}

const speech = new SpeechSynthesisUtterance();
    document.getElementById("listenButton").addEventListener("click", () => {
        speech.text = document.querySelector("textarea").value;
        window.speechSynthesis.speak(speech);
    });

    let accessKey = "cssWghFbkZW8yRt9xRAPrd26gg0xSoYRygmIr2ExAK4";
    const searchBox = document.querySelector("textarea");
    const searchResult = document.getElementById("searchResult");
    const searchButton = document.getElementById("searchButton");
    const showMoreBtn= document.getElementById("show-more-btn");

   let keyword = "";
   let page=1;

    async function searchImages() {
        keyword = searchBox.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=9`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.self;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        showMoreBtn.style.display="block";
        return true;
    }

    searchButton.addEventListener("click", () => {
       console.log("Search button clicked");
       searchResult.innerHTML="";
       page=1;
       const value=searchImages();
    });

    showMoreBtn.addEventListener("click",()=>{
        page++;
        searchImages();
    });
let apiKey = "49b6fbf1-795c-49f9-977d-fbff7e90ed31";

getShowData();

function formatDate(timestamp) {
  return new Date(Number(timestamp)).toDateString();
}

// GET Show date info
function getShowData() {
  axios
    .get("https://project-1-api.herokuapp.com/showdates?api_key=" + apiKey)
    .then((response) => {
      buildShowsContent(response.data);
      addShowEffects();
    })
    .catch((error) => {
      alert("Could not load show dates, error occurred:\n" + error);
    });
}

function addShowEffects() {
  let showsRow = document.querySelectorAll(".shows-section__shows-card");

  showsRow.forEach((x, i) => {
    x.addEventListener("click", () => {
      showsRow.forEach((x) => {
        x.style.backgroundColor = "";
      });
      showsRow[i].style.backgroundColor = "#E1E1E1";
    });
  });

  document.body.addEventListener("click", (event) => {
    if (
      event.target.classList[0] !== "shows-section__shows-card" &&
      event.target.parentNode.classList[0] !== "shows-section__shows-card"
    ) {
      showsRow.forEach((x) => {
        if (x.style.backgroundColor !== "") {
          x.style.backgroundColor = "";
        }
      });
    }
  });
}

// declare function to build out Shows section
function buildShowsContent(shows) {
  let footer = document.querySelector(".foot-bar");
  let showsSection = document.createElement("section");
  let showsHeader = document.createElement("h1");
  let showsContainer = document.createElement("div");
  let headerContainer = document.createElement("div");
  let dateHeaderTablet = document.createElement("p");
  let venueHeaderTablet = document.createElement("p");
  let locationHeaderTablet = document.createElement("p");

  showsSection.classList.add("shows-section");
  showsHeader.classList.add("shows-section__header");
  showsHeader.innerText = "Shows";
  showsContainer.classList.add("shows-section__shows-container");
  headerContainer.classList.add("shows-section__header-container");

  dateHeaderTablet.classList.add("shows-section__label");
  venueHeaderTablet.classList.add("shows-section__label");
  locationHeaderTablet.classList.add("shows-section__label");
  dateHeaderTablet.classList.add("shows-section__label--tablet");
  venueHeaderTablet.classList.add("shows-section__label--tablet");
  locationHeaderTablet.classList.add("shows-section__label--tablet");

  dateHeaderTablet.innerText = "DATE";
  venueHeaderTablet.innerText = "VENUE";
  locationHeaderTablet.innerText = "LOCATION";

  for (i = 0; i < shows.length; i++) {
    let showsCard = document.createElement("div");
    let dateHeader = document.createElement("p");
    let dateInfo = document.createElement("p");
    let venueHeader = document.createElement("p");
    let venueInfo = document.createElement("p");
    let locationHeader = document.createElement("p");
    let locationInfo = document.createElement("p");
    let buyButton = document.createElement("button");
    let divider = document.createElement("hr");

    showsCard.classList.add("shows-section__shows-card");
    dateHeader.classList.add("shows-section__label");
    dateInfo.classList.add("shows-section__date");
    venueHeader.classList.add("shows-section__label");
    venueInfo.classList.add("shows-section__venue");
    locationHeader.classList.add("shows-section__label");
    locationInfo.classList.add("shows-section__location");
    buyButton.classList.add("shows-section__buy-button");
    divider.classList.add("shows-section__divider");

    dateHeader.innerText = "DATE";
    dateInfo.innerText = formatDate(shows[i].date);
    venueHeader.innerText = "VENUE";
    venueInfo.innerText = shows[i].place;
    locationHeader.innerText = "LOCATION";
    locationInfo.innerText = shows[i].location;
    buyButton.innerText = "BUY TICKETS";

    showsCard.appendChild(dateHeader);
    showsCard.appendChild(dateInfo);
    showsCard.appendChild(venueHeader);
    showsCard.appendChild(venueInfo);
    showsCard.appendChild(locationHeader);
    showsCard.appendChild(locationInfo);
    showsCard.appendChild(buyButton);

    showsContainer.appendChild(showsCard);
    showsContainer.appendChild(divider);
  }

  headerContainer.appendChild(dateHeaderTablet);
  headerContainer.appendChild(venueHeaderTablet);
  headerContainer.appendChild(locationHeaderTablet);
  showsContainer.prepend(headerContainer);

  showsSection.appendChild(showsHeader);
  showsSection.appendChild(showsContainer);
  document.body.insertBefore(showsSection, footer);
}
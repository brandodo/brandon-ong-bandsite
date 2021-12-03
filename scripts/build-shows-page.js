document.addEventListener("DOMContentLoaded", () => {
  let showsArray = [
    {
      date: "Mon Sept 06 2021",
      venue: "Ronald Lane",
      location: "San Francisco, CA",
    },
    {
      date: "Tue Sept 21 2021",
      venue: "Pier 3 East",
      location: "San Francisco, CA",
    },
    {
      date: "Fri Oct 15 2021",
      venue: "View Lounge",
      location: "San Francisco, CA",
    },
    {
      date: "Sat Nov 06 2021",
      venue: "Hyatt Agency",
      location: "San Francisco, CA",
    },
    {
      date: "Fri Nov 26 2021",
      venue: "Moscow Center",
      location: "San Francisco, CA",
    },
    {
      date: "Wed Dec 15 2021",
      venue: "Press Club",
      location: "San Francisco, CA",
    },
  ];

  function buildShowsContent(shows) {
    let footer = document.querySelector(".foot-bar");
    let showsSection = document.createElement("section");
    let showsHeader = document.createElement("h1");
    let showsContainer = document.createElement("div");

    showsSection.classList.add("shows-section");
    showsHeader.classList.add("shows-section__header");
    showsHeader.innerText = "Shows";
    showsContainer.classList.add("shows-section__shows-container");

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
      dateInfo.innerText = shows[i].date;
      venueHeader.innerText = "VENUE";
      venueInfo.innerText = shows[i].venue;
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
      showsCard.appendChild(divider);

      showsContainer.appendChild(showsCard);
    }

    showsSection.appendChild(showsHeader);
    showsSection.appendChild(showsContainer);
    document.body.insertBefore(showsSection, footer);
  }

  buildShowsContent(showsArray);
});

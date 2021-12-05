let nameField = document.querySelector("#user-name");
let commentField = document.querySelector("#comment-box");
let form = document.querySelector(".comments-section__comment-form");

let comments = [
  {
    username: "Miles Acosta",
    timestamp: convertDate("12/20/2020"),
    comment:
      "I can't stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    hasImage: false,
  },
  {
    username: "Emilie Beach",
    timestamp: convertDate("01/09/2021"),
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    hasImage: false,
  },
  {
    username: "Connor Walton",
    timestamp: convertDate("02/17/2021"),
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    hasImage: false,
  },
];

// display initial comments
for (i = 0; i < comments.length; i++) {
  displayComment(comments[i]);
}

// listen for field inputs, w/ validation
nameField.addEventListener("input", (e) => {
  if (e.target.value == "") {
    console.log("invalid entry!");
    e.target.style.border = "1px solid #D22D2D";
  } else {
    e.target.style.border = "";
  }
});

commentField.addEventListener("input", (e) => {
  if (e.target.value == "") {
    console.log("invalid entry!");
    e.target.style.border = "1px solid #D22D2D";
  } else {
    e.target.style.border = "";
  }
});

// listen for form submission, run displayComment if conditions are met
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page from refreshing after submit

  if (nameField.value !== "" && commentField.value !== "") {
    let nameCaptured = nameField.value;
    let commentCaptured = commentField.value;
    const datePosted = new Date();
    // const dateString =
    //   datePosted.getMonth() +
    //   1 +
    //   "/" +
    //   datePosted.getDate() +
    //   "/" +
    //   datePosted.getFullYear();

    comments.push({
      username: nameCaptured,
      timestamp: convertDate(datePosted.toString()),
      comment: commentCaptured,
      hasImage: true,
    });

    displayComment(comments[comments.length - 1]);
    form.reset();
  } else if (nameField.value === "" && commentField.value === "") {
    nameField.style.border = "1px solid #D22D2D";
    // nameField.placeholder = "You forgot to provide a name!";
    commentField.style.border = "1px solid #D22D2D";
    // commentField.placeholder = "You forgot to write a comment!"
    alert("Fields cannot be blank, please fill in missing information!");
  } else if (nameField.value === "" && commentField.value !== "") {
    nameField.style.border = "1px solid #D22D2D";
    // nameField.placeholder = "You forgot to provide a name!";
    alert("Please enter your name!");
  } else if (nameField.value !== "" && commentField.value === "") {
    commentField.style.border = "1px solid #D22D2D";
    // commentField.placeholder = "You forgot to write a comment!"
    alert("Please write a comment!");
  }
});

function displayComment(commentObject) {
  let parent = document.querySelector(".comments-section__comments-container");
  let commentContainer = document.createElement("article");
  let imageContainer = document.createElement("div");
  let imageDisplayed = document.createElement("div");
  let textContainer = document.createElement("div");
  let commentHeader = document.createElement("div");
  let nameText = document.createElement("p");
  let dateText = document.createElement("p");
  let commentText = document.createElement("p");
  let newDivider = document.createElement("hr");

  commentContainer.classList.add("comments-section__comment-posted");
  imageContainer.classList.add("comments-section__image-container");
  textContainer.classList.add("comments-section__user-comment-container");
  commentHeader.classList.add("comments-section__user-info");
  nameText.classList.add("comments-section__user-name");
  dateText.classList.add("comments-section__user-date");
  commentText.classList.add("comments-section__user-comment");

  if (commentObject.hasImage === false) {
    imageDisplayed.classList.add("comments-section__user-image");
    imageDisplayed.classList.add("comments-section__user-image--posted");
    imageDisplayed.classList.add("comments-section__user-image--placeholder");
  } else {
    imageDisplayed.classList.add("comments-section__user-image");
    imageDisplayed.classList.add("comments-section__user-image--posted");
  }

  newDivider.classList.add("comments-section__divider");

  nameText.innerText = commentObject.username;
  dateText.innerText = commentObject.timestamp;
  commentText.innerText = commentObject.comment;

  imageContainer.appendChild(imageDisplayed);

  commentHeader.appendChild(nameText);
  commentHeader.appendChild(dateText);

  textContainer.appendChild(commentHeader);
  textContainer.appendChild(commentText);

  commentContainer.appendChild(imageContainer);
  commentContainer.appendChild(textContainer);

  parent.prepend(commentContainer);
  parent.prepend(newDivider);
}

function convertDate(date) {
  let postedDate = new Date(date);
  let currentDate = new Date();

  let timeElapsed = currentDate.getTime() - postedDate.getTime();
  let yearsPassed = Math.round(timeElapsed / 1000 / 60 / 60 / 24 / 365);
  let monthsPassed = Math.round(timeElapsed / 1000 / 60 / 60 / 24 / 30);
  let daysPassed = Math.round(timeElapsed / 1000 / 60 / 60 / 24);
  let hoursPassed = Math.round(timeElapsed / 1000 / 60 / 60);
  let minutesPassed = Math.round(timeElapsed / 1000 / 60);
  let secondsPassed = Math.round(timeElapsed / 1000);

  if (daysPassed > 30 && monthsPassed > 11) {
    return yearsPassed + " year(s) ago";
  } else if (daysPassed > 30 && monthsPassed <= 11) {
    return monthsPassed + " month(s) ago";
  } else if (yearsPassed === 0 && monthsPassed === 0 && daysPassed > 0) {
    return daysPassed + " day(s) ago";
  } else if (daysPassed === 0 && hoursPassed < 24 && hoursPassed > 0) {
    return hoursPassed + " hour(s) ago";
  } else if (hoursPassed === 0 && minutesPassed < 60 && minutesPassed > 0) {
    return minutesPassed + " minute(s) ago";
  } else if (minutesPassed === 0 && secondsPassed < 60) {
    return secondsPassed+1 + " second(s) ago";
  }
}

/*                              ===== COMMENTS SECTION REQUIREMENTS =====

        - **(DONE)** You must have an array in JavaScript with 3 default comment objects to start. 
        Comments must have a name, a timestamp, and the comment text.

        - **(DONE)** You must have a function called displayComment() that takes in one 
        comment object as a parameter and displays it on the page using JavaScrip
        DOM manipulation.
    
        - **(DONE)** No template literals should be used. All dynamic HTML should be added to 
        DOM via DOM Methods for individual elements. Avoid bulk assigning stringified 
        HTML using innerHTML

        - **(DONE)** You must use an HTML Form with the following functionality: 
            - **(DONE)** That submits using the addEventListener
            - **(DONE)** Prevents the page from reloading when submitting a new comment
            - **(DONE)** Constructs a new comment object
            - **(DONE)** Pushes a new comment object to an array of comments
            - ??? Clears all comments from the page
            - **(DONE)** Re-renders to the page all comments from the comment array
            - **(DONE)** Clears the input fields after submitting a new comment
  */


document.addEventListener("DOMContentLoaded", () => {
  // Comments Section - Form
  /*                              -----REQUIREMENTS-----

        - You must have an array in JavaScript with 3 default comment objects to start. 
        Comments must have a name, a timestamp, and the comment text.

        - You must have a function called displayComment() that takes in one 
        comment object as a parameter and displays it on the page using JavaScrip
        DOM manipulation.
    
        - No template literals should be used. All dynamic HTML should be added to 
        DOM via DOM Methods for individual elements. Avoid bulk assigning stringified 
        HTML using innerHTML

        - You must use an HTML Form with the following functionality: 
            -That submits using the addEventListener
            - Prevents the page from reloading when submitting a new comment
            - Constructs a new comment object
            - Pushes a new comment object to an array of comments
            - Clears all comments from the page
    */

  let nameField = document.querySelector("#user-name");
  let commentField = document.querySelector("#comment-box");
  let form = document.querySelector(".comments-section__comment-form");

  let comments = [
    {
      username: "Connor Walton",
      timestamp: "02/17/2021",
      comment:
        "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    },
    {
      username: "Emilie Beach",
      timestamp: "01/09/2021",
      comment:
        "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    },
    {
      username: "Miles Acosta",
      timestamp: "12/20/2020",
      comment:
        "I can't stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    },
  ];

  function displaycomment(commentObject) {
    let parent = document.querySelector(
      ".comments-section__comments-container"
    );
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
    imageDisplayed.classList.add("comments-section__user-image");
    textContainer.classList.add("comments-section__user-comment-container");
    commentHeader.classList.add("comments-section__user-info");
    nameText.classList.add("comments-section__user-name");
    dateText.classList.add("comments-section__user-date");
    commentText.classList.add("comments-section__user-comment");
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

  nameField.addEventListener("input", (e) => {
    if (e.target.value == "") {
      console.log("invalid entry!");
      // e.target.style.borderColor = 'red';
    } else {
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let nameCaptured = nameField.value;
    let commentCaptured = commentField.value;

    comments.push({
      username: nameCaptured,
      timestamp: e.timeStamp,
      comment: commentCaptured,
    });

    displaycomment(comments[3]);

    console.log("this one: Submitted! Timestamp: " + e.timeStamp);
    console.log(nameCaptured + " said: " + commentCaptured);
  });
});

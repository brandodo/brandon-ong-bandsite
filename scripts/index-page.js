let nameField = document.querySelector("#user-name");
let commentField = document.querySelector("#comment-box");
let form = document.querySelector(".comments-section__comment-form");
let apiKey = "49b6fbf1-795c-49f9-977d-fbff7e90ed31";

populateCommentsSection();

// listen for field inputs, w/ validation
nameField.addEventListener("input", (e) => {
  if (e.target.value == "") {
    e.target.style.border = "1px solid #D22D2D";
  } else {
    e.target.style.border = "";
  }
});

commentField.addEventListener("input", (e) => {
  if (e.target.value == "") {
    e.target.style.border = "1px solid #D22D2D";
  } else {
    e.target.style.border = "";
  }
});

// listen for form submission, POST new comments to API and run displayComment
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page from refreshing after submit

  if (!!nameField.value && !!commentField.value) {
    let nameCaptured = nameField.value;
    let commentCaptured = commentField.value;

    // POST call to API
    axios
      .post("https://project-1-api.herokuapp.com/comments?api_key=" + apiKey, {
        name: nameCaptured,
        comment: commentCaptured,
      })
      .then((response) => {
        displayComment(response.data);
        addLikeFeature();
        addDeleteFeature();
      })
      .catch((error) => {
        alert("Error has occurred while trying to submit comment:\n" + error);
      });

    // reset form values
    form.reset();

    // error check validation for blank fields.
  } else if (nameField.value === "" && commentField.value === "") {
    nameField.style.border = "1px solid #D22D2D";
    commentField.style.border = "1px solid #D22D2D";
    alert("Fields cannot be blank, please fill in missing information!");
  } else if (nameField.value === "" && !!commentField.value) {
    nameField.style.border = "1px solid #D22D2D";
    alert("Please enter your name!");
  } else if (!!nameField.value && commentField.value === "") {
    commentField.style.border = "1px solid #D22D2D";
    alert("Please write a comment!");
  }
});

// GET comments, then load comments to DOM
function populateCommentsSection() {
  axios
    .get("https://project-1-api.herokuapp.com/comments?api_key=" + apiKey)
    .then((response) => {
      // sort comments ascending by timestamp
      let comments = response.data.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      // load comments to DOM
      for (i = 0; i < comments.length; i++) {
        displayComment(comments[i]);
      }

      addLikeFeature();
      addDeleteFeature();
    })
    .catch((error) => {
      alert(
        "The following error occurred while trying to load comments:\n" + error
      );
    });
}

// add event listener to like buttons
function addLikeFeature() {
  let likeButtons = document.querySelectorAll(
    ".comments-section__likes-button"
  );
  likeButtons.forEach((button) => {
    button.removeEventListener("click", updateLikes);
    button.addEventListener("click", updateLikes);
  });
}

// update like count on DOM and API
function updateLikes(event) {
  let parentId = event.target.parentNode.parentNode.id;
  let parentContainer = document.getElementById(parentId);
  let likeCount =
    parentContainer.childNodes[parentContainer.childNodes.length - 1]
      .childNodes[0];

  axios
    .put(
      "https://project-1-api.herokuapp.com/comments/" +
        parentId +
        "/like?api_key=" +
        apiKey
    )
    .then((response) => {
      let responseObj = response.data;
      likeCount.innerText = responseObj.likes;
    })
    .catch((error) => {
      alert("Could not like message, error:\n" + error);
    });
}

// add event listener for delete buttons
function addDeleteFeature() {
  let deleteButtons = document.querySelectorAll(
    ".comments-section__delete-button"
  );
  deleteButtons.forEach((button) => {
    button.removeEventListener("click", deleteComment);
    button.addEventListener("click", deleteComment);
  });
}

// remove comment from DOM and API
function deleteComment(event) {
  let deleteConfirm = confirm("Are you sure you want to delete this comment?");

  if (deleteConfirm === true) {
    let parentId = event.target.parentNode.parentNode.id;
    let parentContainer = document.getElementById(parentId);

    axios
      .delete(
        "https://project-1-api.herokuapp.com/comments/" +
          parentId +
          "?api_key=" +
          apiKey
      )
      .then((response) => {
        parentContainer.parentNode.previousSibling.remove();
        parentContainer.parentNode.remove();
      });
  }
}

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
  let likeContainer = document.createElement("div");
  let likeCount = document.createElement("p");
  let likeButton = document.createElement("img");
  let deleteButton = document.createElement("img");
  let newDivider = document.createElement("hr");

  commentContainer.classList.add("comments-section__comment-posted");
  imageContainer.classList.add("comments-section__image-container");
  textContainer.classList.add("comments-section__user-comment-container");
  textContainer.setAttribute("id", commentObject.id);
  commentHeader.classList.add("comments-section__user-info");
  nameText.classList.add("comments-section__user-name");
  dateText.classList.add("comments-section__user-date");
  commentText.classList.add("comments-section__user-comment");

  imageDisplayed.classList.add("comments-section__user-image");
  imageDisplayed.classList.add("comments-section__user-image--posted");
  imageDisplayed.classList.add("comments-section__user-image--placeholder");

  likeContainer.classList.add("comments-section__likes-container");
  likeCount.classList.add("comments-section__likes-counter");
  likeButton.classList.add("comments-section__likes-button");
  deleteButton.classList.add("comments-section__delete-button");

  newDivider.classList.add("comments-section__divider");

  nameText.innerText = commentObject.name;
  dateText.innerText = convertTimestamp(commentObject.timestamp);
  commentText.innerText = commentObject.comment;
  likeCount.innerText = commentObject.likes;
  likeButton.setAttribute("src", "./assets/icons/SVG/icon-like.svg");
  deleteButton.setAttribute("src", "./assets/icons/SVG/icon-delete.svg");

  imageContainer.appendChild(imageDisplayed);

  commentHeader.appendChild(nameText);
  commentHeader.appendChild(dateText);

  likeContainer.appendChild(likeCount);
  likeContainer.appendChild(likeButton);
  likeContainer.appendChild(deleteButton);

  textContainer.appendChild(commentHeader);
  textContainer.appendChild(commentText);
  textContainer.appendChild(likeContainer);

  commentContainer.appendChild(imageContainer);
  commentContainer.appendChild(textContainer);

  parent.prepend(commentContainer);
  parent.prepend(newDivider);
}

function convertTimestamp(timestamp) {
  let currentDate = new Date();
  let timeElapsed = currentDate.getTime() - timestamp;
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
    return secondsPassed + 1 + " second(s) ago";
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

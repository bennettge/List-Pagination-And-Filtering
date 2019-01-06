/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
FILE DESCRIPTION: This file holds all interactivity. It accesses the information
and formatted HTML in formatPage.js to accomplish this
*/

// Removes all of the li elements in the ul with class "student-list"
function removeCurrentLinks() {

  // Determines the li elements to remove
  const linksToRemove = studentListUl.children;

  // Determines number of elements to remove
  const numChildrenToRemove = linksToRemove.length;

  // Loops through all elements in linksToRemove and removes the from the ul
  for (let index = 0; index < numChildrenToRemove; index += 1) {
    const currStudent = linksToRemove[index];
    currStudent.style.display = "none";
  }

};

// Places li elements in the ul with class "student-list"
function placePaginatedLinks(pageNumber) {

  // Determines the index to start from in the formattedLiElements array
  const startIndex = (pageNumber-1)*10;

  // Determines the number of li elements based on page length
  let numButtons = 10;
  if (startIndex+10 >= linksToDisplay.length) {
    numButtons = linksToDisplay.length % 10;
  }

  // Determines if there are no matching links
  displayIfNoLinks();

  // Loops though a slice of formattedLiElements and adds them to studentListUl
  for (let index = startIndex; index < startIndex + numButtons; index += 1) {
    linksToDisplay[index].style.display = "";
  }

};

// Displays if there aren't any valid search results
function displayIfNoLinks() {

  // Used in showing if there are no results
  const page = document.querySelector(".page");

  // If there is already an h1 tag, it is removed
  if (page.lastElementChild.tagName === "H1") {
    page.removeChild(page.lastElementChild);
  }

  // If there are 0 links that match the search, then a message is outputted
  if (linksToDisplay.length === 0) {
    const noTextMessage = document.createElement("h1");
    noTextMessage.textContent = "No Search Matches!";

    // Makes h1 tag for output
    page.appendChild(noTextMessage);
  }
}


// Places button elements into the buttonsDiv div
function placeButtons(paginationButtons) {

  // Loops through all pagination buttons and adds them to the buttonsDiv div
  for (let index = 0; index < paginationButtons.length; index += 1) {
    buttonsDiv.appendChild(paginationButtons[index]);
  }

};

// Resets the button colors to the original colors
function resetButtonColors() {

  // Loops through the pagination buttons and changes their colors and background
  for (let index = 0; index < paginationButtons.length; index += 1) {
    paginationButtons[index].style.backgroundColor = "lightblue";
    paginationButtons[index].style.color = "white";
  }

};

// Actions for when a button is clicked
function onButtonClick(buttonClicked) {

  // Determines the number of the clicked button
  const buttonNumber = String(buttonClicked.textContent);

  // Makes the selected button a certain color and everything else default colors
  resetButtonColors();
  buttonClicked.style.backgroundColor = "white";
  buttonClicked.style.color = "lightblue";

  // Remakes the li elements based on button number clicked
  replaceLinks(buttonNumber);

};

// Remakes the li elements for the ul with class student-list
function replaceLinks (buttonNumber) {

  // Removes li elements currently in the ul
  removeCurrentLinks();

  // Adds the desired li elements to the ul
  placePaginatedLinks(buttonNumber, linksToDisplay);

};

// Puts a search bar in the page header div
function displaySearchBar() {
  const pageHeader = document.getElementsByClassName("page-header cf")[0];
  pageHeader.appendChild(searchBar);
};

// Checks if a the current input in the form currently matches a student's name
function soFarMatches(currentInput, studentName) {

  // Sentinel value for making sure it matches
  let soFarMatches = true;

  // Changes both local copies of the strings to lower case for evaluation
  currentInput = currentInput.toLowerCase();
  studentName = studentName.toLowerCase();

  // If the search is greater then the student's name it's always false
  if (currentInput > studentName) {
    soFarMatches = false;
  }

  // Checks each character and if they don't match then it sets the bool to false
  else {
    for (let index = 0; index < currentInput.length; index += 1) {
      if (currentInput.charAt(index) != studentName.charAt(index)) {
        soFarMatches = false;
      }
    }
  }

  return soFarMatches;

}

// Adds a button event listener to the parent of the buttons and changes
// Based on the button clicked because of event bubbling
buttonsDiv.addEventListener("click", (event) => {

  // Checks to make sure it was a button clicked
  if (event.target.tagName === "BUTTON") {
    onButtonClick(event.target);
  }

});

// Function for when a key is inputted into the search bar
function onKeyPressed () {

  // Gets the current text in the space bar
  const currInput = searchBar.firstElementChild.value;

  // Gets all matching li elements
  const nameMatches = findNameMatches(currInput);

  // Hides extra buttons
  hideButtons(nameMatches.length);

  // Sets the linksToDisplay to the matches for output
  linksToDisplay = nameMatches;

  // Shows first page of output
  replaceLinks(1);
}

// Finds all links that have an h3 text that matches the text in the search bar
function findNameMatches (currInput) {

  const nameMatches = []

  // Loops though formattedLiElements (All of the list elements)
  for (let index = 0; index < formattedLiElements.length; index += 1) {

    // Gets the text content of the list element to check
    const nameToCheck = document.querySelectorAll("h3")[index].textContent;

    // If it currently matches, it adds it to the nameMatches array and displays
    if (soFarMatches(currInput, nameToCheck)) {
      nameMatches.push(formattedLiElements[index]);
      formattedLiElements[index].style.display = "";
    }

    // If it doesn't it hides the element
    else {
      formattedLiElements[index].style.display = "none";
    }
  }

  return nameMatches;

}

// Hides search buttons that aren't needed
function hideButtons (numCurrMatches) {

  // Loops through all of the pagination buttons and hides them if not needed
  for (let index = 0; index < paginationButtons.length; index += 1) {
    if (index*10 < numCurrMatches) {
      paginationButtons[index].style.display = "";
    } else {
      paginationButtons[index].style.display = "none";
    }
  }

}

// Used in determining whether to separate search results or not
let linksToDisplay = formattedLiElements;

// Calls functions that set up the first view of the page
replaceLinks(1);
resetButtonColors();
placeButtons(paginationButtons);
displaySearchBar();

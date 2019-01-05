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
    const currStudent = linksToRemove[0];
    studentListUl.removeChild(currStudent);
  }

};

// Places li elements in the ul with class "student-list"
function placePaginatedLinks(pageNumber) {

  // Determines the index to start from in the formattedLiElements array
  const startIndex = (pageNumber-1)*10

  // Determines the number of li elements based on page length
  let numButtons = 10;
  if (startIndex+10 >= studentData.length) {
    numButtons = studentData.length % 10;
  }

  // Loops though a slice of formattedLiElements and adds them to studentListUl
  for (let index = startIndex; index < startIndex + numButtons; index += 1) {
    studentListUl.appendChild(formattedLiElements[index]);
  }

};

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
  placePaginatedLinks(buttonNumber);

};

// Adds a button event listener to the parent of the buttons and changes
// Based on the button clicked because of event bubbling
buttonsDiv.addEventListener("click", (event) => {

  // Checks to make sure it was a button clicked
  if (event.target.tagName === "BUTTON") {
    onButtonClick(event.target);
  }

});

// Calls functions that set up the first view of the page
replaceLinks(1);
resetButtonColors();
placeButtons(paginationButtons);

/*
Search Bar Idea: In editing state, call a function that updates the pages/buttons

Make function soFarMatches that compares a name to current string
*/

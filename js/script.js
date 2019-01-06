/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
FILE DESCRIPTION: This file holds all interactivity and adding HTML to the
index.html file. It accesses the information and formatted HTML in
the formatPage.js file to accomplish this
*/

// Shows and hides links based on if selected or not
function placePaginatedLinks(pageNumber) {

  // Determines the index to start from in the links
  const startIndex = (pageNumber-1)*10;

  // Determines the number of links based on page length
  const numLinks = findNumLinks(startIndex);

  // Determines if there are no matching links
  displayIfNoLinks();

  // Loops though all links and hides unneeded ones
  displayLinks(startIndex, numLinks);

};

// Finds the number of links to be displayed
function findNumLinks (startIndex) {

  let numLinks = 10;
  if (startIndex+10 >= linksToDisplay.length) {
    numLinks = linksToDisplay.length % 10;
  }

  return numLinks;

}

// Displays all wanted links and hides all unwanted links
function displayLinks (startIndex, numLinks) {

  for (let index = 0; index < linksToDisplay.length; index += 1) {
    if ((index >= startIndex) && (index < startIndex + numLinks)) {
      linksToDisplay[index].style.display = "";
    } else {
      linksToDisplay[index].style.display = "none";
    }
  }

}

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
    const noTextMessage = makeH1("No matches found!");

    // Makes h1 tag for output
    page.appendChild(noTextMessage);
  }
}


// Places button elements into the buttonsDiv div
function placeButtons() {

  // Loops through all pagination buttons and adds them to the buttonsDiv div
  for (let index = 0; index < paginationLinks.length; index += 1) {
    buttonsDiv.appendChild(paginationLinks[index]);
  }

};

// Actions for when a button is clicked
function onLinkClick(linkClicked) {

  // Determines the number of the clicked button
  const linkNumber = String(linkClicked.textContent);

  // Removes any class names from the anchor tags
  resetLinkClassNames();

  // Adds an active class to the selected button
  linkClicked.className = "active";

  // Remakes the links based on button number clicked
  placePaginatedLinks(linkNumber);

};

// Resets the button class names to make sure correct tag is selected
function resetLinkClassNames() {

  for (let index = 0; index < paginationLinks.length; index += 1) {
    const currTag = paginationLinks[index].firstElementChild;
    currTag.removeAttribute("class");
  }

}

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
  if (event.target.tagName === "A") {
    onLinkClick(event.target);
  }

});

// Function for when a key is inputted into the search bar
function onKeyPressed () {

  // Gets the current text in the space bar
  const currInput = searchBar.firstElementChild.value;

  // Gets all matching links
  const nameMatches = findNameMatches(currInput);

  // Hides extra buttons
  hideLinks(nameMatches.length);

  // Sets the linksToDisplay to the matches for output
  linksToDisplay = nameMatches;

  // Shows first page of output
  placePaginatedLinks(1, linksToDisplay);

}

// Finds all links that have an h3 text that matches the text in the search bar
function findNameMatches (currInput) {

  const nameMatches = []

  // Loops though all links and sets ones that don't match to not display
  for (let index = 0; index < formattedLiElements.length; index += 1) {

    // Gets the text content of the list element to check
    const nameToCheck = document.querySelectorAll("h3")[index].textContent;

    // If it currently matches, it adds it to the nameMatches array and displays
    if (soFarMatches(currInput, nameToCheck)) {
      nameMatches.push(formattedLiElements[index]);
      formattedLiElements[index].style.display = "";
    }

    // If it doesn't it hides the link
    else {
      formattedLiElements[index].style.display = "none";
    }
  }

  return nameMatches;

}

// Hides search buttons that aren't needed
function hideLinks (numCurrMatches) {

  // Loops through all of the pagination buttons and hides them if not needed
  for (let index = 0; index < paginationLinks.length; index += 1) {

    // Makes it so a button is displayed for every page of 10 people
    if (index*10 < numCurrMatches) {
      paginationLinks[index].style.display = "";
    }

    // Hides unneeded buttons
    else {
      paginationLinks[index].style.display = "none";
    }
  }

}

// Used in determining whether to separate search results or not
let linksToDisplay = formattedLiElements;

// Calls functions that set up the first view of the page
placePaginatedLinks(1, linksToDisplay);
placeButtons();
displaySearchBar();

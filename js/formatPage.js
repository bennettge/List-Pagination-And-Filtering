/*
FILE DESCRIPTION: This file holds all information/formatted HTML to be accessed
by the script.js file (which adds interactivity)
*/

// Makes a div element with given class name
function makeDiv (divClassName) {

  const newDiv = document.createElement("div");
  newDiv.className = divClassName;
  return newDiv;

};

// Makes a button element with given text content
function makeButton(buttonTextContent) {

  const newButton = document.createElement("button");
  newButton.textContent = String(buttonTextContent);
  return newButton;

};

// Makes the search bar
function makeSearchBar () {

  const searchBar = document.createElement("form");
  searchBar.appendChild(makeInput());
  return searchBar;

}

// Makes pagination buttons
function makePaginationButtons(numStudents) {

  const listOfButtons = [];

  // Determines number of buttons based on the number of students to be shown
  const numButtons = Math.ceil(numStudents / 10);

  // Makes numButtons number of buttons and appens them to listOfButtons
  for (let index = 0; index < numButtons; index += 1) {
    const currButton = makeButton(index+1);
    listOfButtons.push(currButton);
  }

  return listOfButtons;

};

// Makes a div for the buttons
function makeButtonsDiv () {

  const pageDiv = document.querySelector(".page");

  // Makes a buttonDiv to return and append to the pageDiv
  const buttonsDiv = makeDiv("button-list");

  // Appends a div with class button-list to the pageDiv
  pageDiv.appendChild(buttonsDiv);

  return buttonsDiv;

};

// Adds an element with given
function addAttribute(element, nameOfAttribute, attributeValue) {

  // Creates an attribute and sets its value to the given value
  const attribute = document.createAttribute(nameOfAttribute);
  attribute.value = attributeValue;

  // Adds the attricbute to the element
  element.setAttributeNode(attribute);

  return element;

}

function makeInput() {

  const input = document.createElement("input");

  // Adds attributes to the input element
  addAttribute(input, "type", "text");
  addAttribute(input, "name", "name");
  addAttribute(input, "placeholder", "Search for someone...");

  // This attribute calls the onKeyPressed function after a character is typed
  addAttribute(input, "onkeyup", "onKeyPressed()");

  return input;

}

// Initializes important data that is accessed by the script.js file
const studentListUl = document.querySelector(".student-list");
const formattedLiElements = document.querySelector(".student-list").children;
const paginationButtons = makePaginationButtons(formattedLiElements.length);
const buttonsDiv = makeButtonsDiv();
const searchBar = makeSearchBar();

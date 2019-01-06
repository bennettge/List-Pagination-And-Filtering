/*
FILE DESCRIPTION: This file holds all information/formatted HTML to be accessed
by the script.js file. It is responsible for making all elements for the display.
*/

// Makes a div element with given class name
function makeDiv (divClassName) {

  const newDiv = document.createElement("div");
  newDiv.className = divClassName;
  return newDiv;

};

// Makes a li element with given text content
function makeLink(buttonTextContent) {

  // Creates li element
  const linkLi = document.createElement("li");

  // Makes an anchor tag with an href attribute and a textContent with button #
  const liAnchor = document.createElement("a");
  liAnchor.textContent = String(buttonTextContent);
  addAttribute(liAnchor, "href", "#");

  // Adds attribute to li
  linkLi.appendChild(liAnchor);

  return linkLi;

};

// Makes the search bar
function makeSearchBar () {

  const searchBar = document.createElement("div");
  searchBar.className = "student-search";
  searchBar.appendChild(makeInput());
  return searchBar;

}

// Makes pagination buttons
function makePaginationLinks(numStudents) {

  const listOfLinks = [];

  // Determines number of buttons based on the number of students to be shown
  const numButtons = Math.ceil(numStudents / 10);

  // Makes numLinks number of links and appens them to listOfLinks
  for (let index = 0; index < numButtons; index += 1) {
    const currLink = makeLink(index+1);
    listOfLinks.push(currLink);
  }

  return listOfLinks;

};

// Makes a div for the links
function makeButtonsDiv () {

  const pageDiv = document.querySelector(".page");

  // Makes a linksDiv to return and append to the pageDiv
  const linksDiv = makeDiv("pagination");

  // Appends a linksDiv with class pagination to the pageDiv
  pageDiv.appendChild(linksDiv);

  return linksDiv;

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

// Makes an h1 tage with given text content
function makeH1 (h1TextContent) {

  const h1 = document.createElement("h1");
  h1.textContent = h1TextContent;
  return h1;

}

// Initializes important data that is accessed by the script.js file
const studentListUl = document.querySelector(".student-list");
const formattedLiElements = document.querySelector(".student-list").children;
const paginationLinks = makePaginationLinks(formattedLiElements.length);
const buttonsDiv = makeButtonsDiv();
const searchBar = makeSearchBar();

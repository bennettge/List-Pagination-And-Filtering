/*
FILE DESCRIPTION: This file holds all information/formatted HTML to be accessed
by the script.js file (which adds interactivity)
*/

// Makes a student object based on the info in the li elements
function makeStudent(currStudent) {

  // Gets student information
  const studentDetails = currStudent.firstElementChild.children;
  const studentImage = studentDetails[0].getAttribute("src");
  const studentName = studentDetails[1].textContent;
  const studentEmail = studentDetails[2].textContent;
  const studentDate = currStudent.lastElementChild.firstElementChild.textContent;

  // Makes the student object
  const student = {image: studentImage,
                   name: studentName,
                   email: studentEmail,
                   joinDate: studentDate};

  return student;

};

// Makes array of student objects
function makeStudentArray() {

  const studentData = [];

  // Gets all students on the page
  const listOfStudents = document.querySelector(".student-list").children;

  // Formats students into objects and adds them to the studentData array
  for (let index = 0; index < listOfStudents.length; index += 1) {
    const currStudent = makeStudent(listOfStudents[index]);
    studentData.push(currStudent);
  }

  return studentData;

};

// Makes an li element with given class name
function makeLi (liClassName) {

  const liElement = document.createElement("li");
  liElement.className = liClassName;
  return liElement;

};

// Makes a div element with given class name
function makeDiv (divClassName) {

  const newDiv = document.createElement("div");
  newDiv.className = divClassName;
  return newDiv;

};

// Makes an img element with given class name and source
function makeImg (imgClassName, imgSource) {

  const newImg = document.createElement("img");
  newImg.className = imgClassName;
  newImg.src = imgSource;
  return newImg;

};

// Makes a h3 element with given text
function makeH3 (h3TextContent) {

  const newH3 = document.createElement("h3");
  newH3.textContent = h3TextContent;
  return newH3;

};

// Makes a span element with given class name and text content
function makeSpan (spanClassName, spanTextContent) {

  const newSpan = document.createElement("span");
  newSpan.className = spanClassName;
  newSpan.textContent = spanTextContent;
  return newSpan;

};

// Makes a button element with given text content
function makeButton(buttonTextContent) {

  const newButton = document.createElement("button");
  newButton.textContent = String(buttonTextContent);
  return newButton;

};

// Makes a student-details div
function makeStudentDetailsDiv(currStudent) {

  const studentDetailsDiv = makeDiv("student-details");

  // Makes children tags for the studentDetails div and appends them to the div
  studentDetailsDiv.appendChild(makeImg("avatar", currStudent.image));
  studentDetailsDiv.appendChild(makeH3(currStudent.name));
  studentDetailsDiv.appendChild(makeSpan("email", currStudent.email));

  return studentDetailsDiv;

};

// Makes a joined-details div
function makeJoinedDetailsDiv(joinDate) {

  const joinedDetailsDiv = makeDiv("joined-details");

  // Makes a child tag for the joinedDetails div and appends them to the div
  joinedDetailsDiv.append(makeSpan("date", joinDate));

  return joinedDetailsDiv;

};

// Makes a student li element
function formatStudent(currStudent) {

  const liElement = makeLi("student-item cf");

  // Appends student-details and joined-details div to the li element
  liElement.appendChild(makeStudentDetailsDiv(currStudent));
  liElement.appendChild(makeJoinedDetailsDiv(currStudent.joinDate));

  return liElement;

};

// Makes a list of student li elements
function makeListOfLis() {

  const listOfLiElements = [];

  // Loops through all student objects, converts them to student lis,
  // And appends them to the listOfLiElements array
  for (let index = 0; index < studentData.length; index += 1) {
    const currLiElement = formatStudent(studentData[index]);
    listOfLiElements.push(currLiElement);
  }

  return listOfLiElements;

};

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

}

// Initializes important data that is accessed by the script.js file
const studentData = makeStudentArray();
const formattedLiElements = makeListOfLis();
const paginationButtons = makePaginationButtons(studentData.length);
const buttonsDiv = makeButtonsDiv();
const studentListUl = document.querySelector(".student-list");

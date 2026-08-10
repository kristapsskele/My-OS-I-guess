
setInterval(function(){
        document.querySelector("#time").innerHTML = new Date().toLocaleString();
      }, 1000)




// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeIcon = document.querySelector("#welcomeopen")
var welcome = document.querySelector("#welcome")
welcomeIcon.addEventListener("click", () => {openWindow(welcome);});

function makeClosable(elementName){
  var screen = document.querySelector("#" + elementName)
  var screenClose = document.querySelector("#" + elementName + "Close")
  if (screenClose) {
    screenClose.addEventListener("click", function() {closeWindow(screen);});
  }
}

function closeWindow(element) {
    element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  bottomBar.style.zIndex = biggestIndex + 1;
}


var chosenIcon = undefined
function selectIcon(element) {
  element.classList.add("chosen");
  chosenIcon = element
}
function deselectIcon(element) {
  if (!element) return;

  element.classList.remove("chosen");
  chosenIcon = undefined
}
function handleIconTap(element, screen) {
  if (element.classList.contains("chosen")) {
    deselectIcon(element)
    openWindow(screen)
  } else {
    selectIcon(element)
  }
}
function initializeIcon(name) {
  var icon = document.querySelector("#" + name + "Icon")
  var screen = document.querySelector("#" + name)
  icon.addEventListener("click", () => handleIconTap(icon, screen));
}


function initializeWindow(elementName){
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  dragElement(screen)
  makeClosable(elementName)
  if(elementName != "welcome") {
    initializeIcon(elementName)
  }
}

function handleNoteTap(element) {
   if (chosenIcon) {
    deselectIcon(chosenIcon)
   }
   selectIcon(element)
}


var biggestIndex = 1;
addWindowTapHandling(welcome);
addWindowTapHandling(notes);
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}


var bottomBar = document.querySelector("#bottom")

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  bottomBar.style.zIndex = biggestIndex + 1;
  deselectIcon(chosenIcon)
}

var content = [
  {
    title: "First cup of coffee",
    date: "07/28/2026",
    content: `
            <h2 contenteditable="True">
              These are my coffee <strong>thoughts</strong>:
            </h2>
            <br> 
            <p contenteditable="True">
              Espresso is the basis of almost all popular coffees, the same can be said about math, 
              because many sciences have come from it and are dependent on it, that is why drinking coffee 
              is almost certain to make you closer to math
            </p>   
            `  
  },
  {
    title: "Second cup of coffee",
    date: "07/28/2026",
    content:`
            <p contenteditable="True">
              You can write your coffee thoughts and mask them as mine
            </p> 
    `
  }
]

function setNotesContent(index) {
  var notesContent = document.querySelector("#notesContent")
  notesContent.innerHTML = content[index].content
}
setNotesContent(0)
function addToSideBar(index) {
  var sidebar = document.querySelector("#sidebar")
  var note = content[index]
  var newDiv = document.createElement("div")
  newDiv.className = "sidebar"
  newDiv.innerHTML = `
    <p style="margin: 0px; padding: 12px">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px; padding: 12px;">
      ${note.date}
    </p>
  `;
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
    handleNoteTap(this)
  });
  sidebar.appendChild(newDiv)
}
for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}

var beans = 100
var rolls = 0
function slotMachinePrize() {
  var a = slotMachine()
  var b = slotMachine()
  var x = slotMachineX()
  if (beans<10){
    return
  }
  document.getElementById("slotA").innerText = a
  document.getElementById("slotB").innerText = b
  document.getElementById("slotX").innerText = x
  document.getElementById("prize").innerText = "Prize: |"+a+"|"+b+"| x"+x+" = "+(a===b? (2**(a-1))*x:0)

  if (a === b){
    return (2**(a-1))*x
  }
  else{
    return 0
  }
}
function slotMachine(){
  return Math.floor(Math.random()*7)+1
}
function slotMachineX(){
  return Math.floor(Math.random()*10)+1
}
function play(){
  var prize = slotMachinePrize()
  if (beans<10){
    alert('Not enough beans :(')
    return
  }
  beans -=10
  if (prize > 0){
    beans += prize
  }
  rolls++
  document.getElementById("beans").innerText = "Coffee beans: " + beans
  document.getElementById("rolls").innerText = "Rolls: " + rolls
  return beans
}


initializeWindow("welcome")
initializeWindow("notes")
initializeWindow("slotMachine")
initializeWindow("map")
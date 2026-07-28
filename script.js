
setInterval(function(){
        document.querySelector("#time").innerHTML = new Date().toLocaleString();
      }, 1000)



      // Make the DIV element draggable:
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#coffeeThoughts"))

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
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
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

var welcomeScreen = document.querySelector("#welcome")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});
function closeWindow(element) {
    element.style.display = "none"
}
function openWindow(element) {
    element.style.display = "flex"
}

var coffeeScreen = document.querySelector("#coffeeThoughts")
var coffeeScreenClose = document.querySelector("#coffeeThoughtsClose")
var coffeeScreenOpen = document.querySelector("#coffeeThougtsOpen")
coffeeScreenClose.addEventListener("click", () => closeWindow(coffeeScreen));



var chosenIcon = undefined
function selectIcon(element) {
  element.classList.add("chosen");
  chosenIcon = element
}
function deselectIcon(element) {
  element.classList.remove("chosen");
  chosenIcon = undefined
}
function handleIconTap(element) {
  if (element.classList.contains("chosen")) {
    deselectIcon(element)
    openWindow(coffeeScreen)
  } else {
    selectIcon(element)
  }
}

function handleNoteTap(element) {
   if (chosenIcon) {
    deselectIcon(chosenIcon)
   }
   selectIcon(element)
}


var biggestIndex = 1;
addWindowTapHandling(welcomeScreen);
addWindowTapHandling(coffeeScreen);
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}


var bottomBar = document.querySelector("#bottom")
function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  bottomBar.style.zIndex = biggestIndex + 1;
}
function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  bottomBar.style.zIndex = biggestIndex + 1;
  deselectIcon(chosenIcon)
}

// I have to later (when I understand more) implement this thingy 
function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)
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
    <p style="margin: 0px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
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

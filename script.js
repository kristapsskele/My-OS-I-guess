
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
              I heard that some gnomes have reached infinite coffee beans, then they went to the slot machine and never returned.. 
              (there might be a secret if you get more than 1,797e308 beans and use the slot machine)
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
var clicks = 0
function formatNumber(number){
  if (number<1e15){
    const formatter = Intl.NumberFormat('en', {notation: 'compact'})
    return formatter.format(number)
  }
  const formatter = Intl.NumberFormat('en', {notation: 'scientific'})
  return formatter.format(number)
}
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
  if (beans>=Number.MAX_VALUE){
    document.getElementById("youBeatIt").style.display="block"
  }
  beans -=10
  if (prize > 0){
    beans += prize
  }
  rolls++
  document.querySelectorAll("#beans").forEach(element => {element.innerText = "Coffee beans: " + formatNumber(beans)})
  document.getElementById("rolls").innerText = "Rolls: " + rolls
  return beans
}

var x = 1
var x1 = 1
var x2 = 1
var bpc = 1
var bps = 0
var price1 = 1; var bought1 = 0
var price2 = 50; var bought2 = 0
var price3 = 1000; var bought3 = 0
var price4 = 5000; var bought4 = 0
var price5 = 1000000; var bought5 = 0
function cost(upgrade){
  if (upgrade === 1) {
    if (beans<price1){
    alert('Not enough beans :(')
    return
    }
    beans -= price1
    bought1 +=1
    price1 +=2  
  }
  if (upgrade === 2){
    if (beans<price2){
    alert('Not enough beans :(')
    return
    }
    beans -=price2
    bought2 +=1
    price2 += 25
  }
  if (upgrade === 3){
    if (beans<price3){
    alert('Not enough beans :(')
    return
    }
    beans -=price3
    x1 *=2
    bought3 +=1
    price3 += price3 -100
  }
  if (upgrade === 4){
    if (beans<price4){
    alert('Not enough beans :(')
    return
    }
    beans -= price4
    bought4 +=1
    x2 *=2
    price4 += price4 -100
  }
  if (upgrade === 5){
    if (beans<price5){
    alert('Not enough beans :(')
    return
    }
    beans =100
    x1 = 1
    x2 = 1
    price1 = 1; bought1 = 0
    price2 = 50; bought2 = 0
    price3 = 1000; bought3 = 0
    price4 = 5000; bought4 = 0
    x +=1
    bought5 +=1
    price5 *=10
  }
  bpc = ((1+bought1)*x1)**x
  bps = (bought2*5*x2)**x
  document.getElementById("cost1").innerText = "+1 Beans per click -> cost: " + formatNumber(price1)
  document.getElementById("bought1").innerText = "Multiple fingers at the same time (" +formatNumber(bought1)+")"
  document.getElementById("cost2").innerText = "+5 Beans per second -> cost: " + formatNumber(price2)
  document.getElementById("bought2").innerText = "Coffee garden (" +formatNumber(bought2)+")"
  document.getElementById("bought3").innerText = "Multiplicative fingers (" +formatNumber(bought3)+")"
  document.getElementById("cost3").innerText = "Try doubling your fingers: " + formatNumber(price3)
  document.getElementById("bought4").innerText = "Sparklier soil (" +formatNumber(bought4)+")"
  document.getElementById("cost4").innerText = "Sparkles make double -> cost: " + formatNumber(price4)
  document.getElementById("bought5").innerText = "Is that a garden GNOME? (" +formatNumber(bought5)+")"
  document.getElementById("cost5").innerText = "I heard they know how to make infinite beans.. but at what cost -> cost: " + formatNumber(price5)
  document.getElementById("beansPerClick").innerText = "Beans per click: ("+formatNumber(bpc)+")"
  document.querySelectorAll("#beans").forEach(element => {element.innerText = "Coffee beans: " + formatNumber(beans)})
  document.getElementById("beansPerSecond").innerText = "Beans per second: ("+formatNumber(bps)+")"
  return beans
}
function coffeeClick(){
  beans += bpc
  clicks += 1
  document.querySelectorAll("#beans").forEach(element => {element.innerText = "Coffee beans: " + formatNumber(beans)})
  document.getElementById("amountOfClicks").innerText = "Clicks: ("+formatNumber(clicks)+")"
  document.getElementById("beansPerClick").innerText = "Beans per click: ("+formatNumber(bpc)+")"
  return beans
}

var upgrades = [
  {
    content: function(){
          return`
            <div id="upgrades">
              <h2>Upgrades:</h2>
              <div class="upgrade" onclick="cost(1)">
                <p style="margin:0%;" id="bought1">Multiple fingers at the same time (${bought1})</p>
                <p style="margin:0%;" id="cost1">+1 Beans per click -> cost: ${formatNumber(price1)}</p>
              </div>
              <div class="upgrade" onclick="cost(2)">
                <p style="margin:0%;" id="bought2">Coffee garden (${bought2})</p>
                <p style="margin:0%;" id="cost2">+5 Beans per second -> cost: ${formatNumber(price2)}</p>
              </div>
              <div class="upgrade" onclick="cost(3)">
                <p style="margin:0%;" id="bought3">Multiplicative fingers (${bought3})</p>
                <p style="margin:0%;" id="cost3">Try doubling your fingers -> cost: ${formatNumber(price3)}</p>
              </div>
              <div class="upgrade" onclick="cost(4)">
                <p style="margin:0%;" id="bought4">Sparklier soil (${bought4})</p>
                <p style="margin:0%;" id="cost4">Sparkles make double -> cost: ${formatNumber(price4)}</p>
              </div>
              <div class="upgrade upgrade5" onclick="cost(5)">
                <p style="margin:0%;" id="bought5">Is that a garden GNOME? (${bought5})</p>
                <p style="margin:0%;" id="cost5">I heard they know how to make infinite beans.. but at what cost <br>-> cost: ${formatNumber(price5)}</p>
              </div>
            </div>
    `}
  },
  {
    content: function(){
          return`
            <div class="upgrades">
              <h2>Upgrades:</h2>
              <div>
                <p>Multiple fingers at the same time (${bought1})</p>
                <p>Coffee garden (${bought2})</p>
                <p>Multiplicative fingers (${bought3})</p>
                <p>Sparklier soil (${bought4})</p>
                <p>Is that a garden GNOME? (${bought5})</p>
              </div>
            </div>
    `}
  }
]
function upgradeMenu(){
  var menu = document.querySelector(".upgrades")
  menu.innerHTML = upgrades[0].content()
}
function noMenu(){
  var menu = document.querySelector(".upgrades")
  menu.innerHTML = upgrades[1].content()
}
setInterval(function() {
  beans +=bps
  document.querySelectorAll("#beans").forEach(element => {element.innerText = "Coffee beans: " + formatNumber(beans)})
}, 1000);
initializeWindow("welcome")
initializeWindow("notes")
initializeWindow("slotMachine")
initializeWindow("map")
initializeWindow("clicker")
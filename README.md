# Coffee-OS
This is an operating system similair to windows, but the twist is it is coffee themed and about me.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d330ab88-f987-4bd5-9959-a1dfbb26548f" />


You can try the OS here: https://kristapsskele.github.io/My-OS-I-guess/
Just open the link and explore.

New features:

^ Coffee map app that shows coffee shops around the world                    
^ Coffee clicker app that is connected with slot machine                       
^ Secret overlay that pops up after you reach infinite beans and play the slot machine

How coffee clicker works:                       
  It has many defined variables for each price and times they have been bought. When you buy upgrades the function checks if you have enough beans to
  buy them, then updates <b>beans -= price -> bought+=1 -> price += (what I chose)</b>. The bps (beans per second) works using setInterval, that is set to update once per second
  and adds bps to beans. The bpc(beans per click) works using onclick(function...) which runs the functions to beans+=bpc. Every time any of these functions run
  the values get updated to show inside the app (<b>document.getElementById("...").innerText = "..." + formatNumber(...)</b>). The <b>formatNumber()</b> makes the numbers use the english formatting
  1000 -> 1k, 1 000 000 -> 1M and so on, I added an if function for when the formatting ends which is at 1e15 to start using the scientific notation. There are also updates for when
  you hover over upgrades and for those to show the correct numbers I had to use some interesting text formatting (<b>${formatNumber(price1)}</b>) where the $ shows that it is a variable.

Old features:

 ^ 3 apps (Coffee OS text, note app and slot machine),      
 ^ Windows can be dragged, opened, closed,       
 ^ Time in the bottom right corner

How slot machine works:              
  Through a math.random function get generated numbers a,b,x
  if a=b,  then you get a certain number of coffee beans multiplied by x.
  Every time the function runs it updates the internal text of beans, rolls, and prize
  clicking on the -10 beans button activates onclick(play()) which is why the button starts the game.
  overall it is just a few math functions added together.

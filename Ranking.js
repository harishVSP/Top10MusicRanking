const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const Songs = [ 
  "Blinding Lights- The Weeknd",
   "Uptown Funk!- Mark Ronson ft. Bruno Mars", 
   "Party Rock Anthem- LMFAO", 
   "Macarena (Bayside Boys Mix)- Los Del Rio", 
   "Shape Of You- Ed Sheeran", 
   "Yeah!- Usher ft. Lil Jon & Ludacris", 
   "Despacito- Luis Fonsi ft. Daddy Yankee", 
   "Rolling In The Deep- Adele", 
   "Old Town Road- lil Nas X ft. Billy Ray Cyrus", 
   "Another One Bites The Dust- Queen", ];

const listItems = [];

let dragStartIndex;

function createList() {
  const newList = [...Songs];
  newList
    .map((song) => ({ value: song, sort: Math.random() })) // randomize list
    .sort((a, b) => a.sort - b.sort) // generate new order
    .map((song) => song.value) // retrieve original strings
    .forEach((song, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${song}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault(); // dragDrop is not executed otherwise
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  // Get Items
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  // Swap Items
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const songName = listItem.querySelector(".draggable").innerText.trim();
    if (songName !== Songs[index]) listItem.classList.add("wrong");
    else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

// Event Listeners
function addListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);

// Init
createList();
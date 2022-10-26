const todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
console.log(todoList);
const ul = document.getElementById('myUL');
const checkedElements = localStorage.getItem('CheckedElements') ? JSON.parse(localStorage.getItem('CheckedElements')) : [];
ul.innerHTML = todoList.map(item => {
  return `
    <li>
      <span class="data">${item}</span>
    </li>
  `
}).join('');

function removeItemFromList(li) {
  let text = li.firstElementChild.textContent
  todoList.splice(todoList.indexOf(text), 1);
  li.remove();
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
  if (checkedElements.includes(myNodelist[i].firstElementChild.textContent)) {
    myNodelist[i].classList.toggle('checked');
    }
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    removeItemFromList(div);
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("todo").value;

  if (inputValue === '') {
    alert("You must write something!");
    return
  }

  if (todoList.includes(inputValue)) {
    alert("You already have this task!");
    return
  }

  document.getElementById("myUL").appendChild(li);
  todoList.push(inputValue);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  document.getElementById("todo").value = "";


  var textSpan = document.createElement("SPAN");
  textSpan.className = "data";
  textSpan.textContent = inputValue;

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(textSpan);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      removeItemFromList(div);
    }
  }
}

//when press enter key call newElement function
document.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === 'Enter') {
    newElement();
    }
});

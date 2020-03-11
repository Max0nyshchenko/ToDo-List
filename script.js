// Select all Elements
const clear = document.querySelector("clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fas fa-poo";
const UNCHECK = "fas fa-poop";
const LINE_THROUGH = "lineThrough";

// Show todays date
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// ToDo Func
function ToDoFunc(ToDo) {
    let text = `
                    <li class="item">
                        <i class="fas fa-poop" job="complete" id="0"></i>
                        <p class="text">${ToDo}</p>
                        <i class="fas fa-toilet" job="delete" id="0"></i>
                    </li> 
                `; 


    list.insertAdjacentHTML('beforeend', text);
}

// add item to the list
document.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        const ToDo = input.value;

        if(ToDo) {
            ToDoFunc(ToDo);
        }
        input.value = '';
    }
})
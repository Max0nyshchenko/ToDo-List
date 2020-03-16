// Select all Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const toiletPaper = document.getElementById('toiletPaper');
const h = window.innerHeight;


// Classes names
const CHECK = "fa-poo";
const UNCHECK = "fa-poop";
const LINE_THROUGH = "lineThrough";
// Variables
let LIST, id;

// Local Storage



let data = localStorage.getItem("TODO");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
};

function loadList(array) {
    array.forEach(function (item) {
        ToDoFunc(item.name, item.id, item.done, item.trash);
    });
}

// clear event
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
}); 





// Show todays date
const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// ToDo Func
function ToDoFunc(ToDo, id, done, trash) {
    if(trash) {
        return;
    };

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';


    let item = `
                    <li class="item">
                        <i class="fas ${DONE}" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${ToDo}</p>
                        <i class="fas fa-toilet" job="delete" id="${id}"></i>
                    </li> 
                `; 


    list.insertAdjacentHTML('beforeend', item);
}

// add item to the list
document.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        const ToDo = input.value;

        if(ToDo) {
            ToDoFunc(ToDo, id, false, false);

            LIST.push({
                name: ToDo,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = '';
    }
})

document.addEventListener('keydown', (d) => {
    if(d.keyCode == 13) {
        toiletPaper.style.transform = 'scale(0.9, 0.9)';
    }        
});
document.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        toiletPaper.style.transform = 'scale(1, 1)';
    }
})

toiletPaper.addEventListener('click', () => {
    const ToDo = input.value;

    if (ToDo) {
        ToDoFunc(ToDo, id, false, false);

        LIST.push({
            name: ToDo,
            id: id,
            done: false,
            trash: false
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = '';
    
})

function completeToDo(el) {
    el.classList.toggle(CHECK);
    el.classList.toggle(UNCHECK);
    el.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    
    LIST[el.id].done = LIST[el.id].done ? false : true;
}

function removeToDo(el) {
    el.parentNode.parentNode.removeChild(el.parentNode);

    LIST[el.id].trash = true;
}

list.addEventListener('click', (event) => {
    const el = event.target;
    const elementJob = el.attributes.job.value;

    if(elementJob == 'complete'){
        completeToDo(el);
    } else if(elementJob == "delete") {
        removeToDo(el);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
})


// Background function

function bgFunc() {
    const contentH = document.querySelector('.content');
    let thisHeight = h * 0.8;
    contentH.style.height = `${h}px`;
}

$('.header').mousemove(function(e) {
    let moveX = (e.pageX * -1 / 15);
    let moveY = (e.pageY * -1 / 1);
    $(this).css('background-position', moveX + 'px ' + moveY + 'px');
})
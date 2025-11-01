// DARKMODE

const darkMode = localStorage.getItem('darkmode');
const toggleBtn = document.getElementById('toggle-mode');

const enableDarkode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'null');
}

if (darkMode === 'active') {
    enableDarkode();
}

toggleBtn.addEventListener('click', () => {
    const darkMode = localStorage.getItem('darkmode');

    if (darkMode !== 'active') {
        enableDarkode();
    } else {
        disableDarkMode();
    }
});

//TO-DO LOGIC

const listBox = document.getElementById('list');
const userInput = document.getElementById('input');

function addList() {
    if (userInput.value === "") return; 

    const li = document.createElement('li');
    const task = userInput.value.trim();
    li.textContent = task;
    listBox.appendChild(li);
    const span = document.createElement('span')
    span.innerHTML = ``;
    li.appendChild(span);

    userInput.value = "";

    saveTask();
}

listBox.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
        saveTask();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveTask();
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addList();
})

function saveTask() {
    localStorage.setItem('data', listBox.innerHTML);
}

function getTask() {
    listBox.innerHTML = localStorage.getItem('data');
}

getTask();
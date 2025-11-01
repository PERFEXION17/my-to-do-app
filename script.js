// DARKMODE

const darkMode = localStorage.getItem("darkmode");
const toggleBtn = document.getElementById("toggle-mode");

const enableDarkode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "null");
};

if (darkMode === "active") {
  enableDarkode();
}

toggleBtn.addEventListener("click", () => {
  const darkMode = localStorage.getItem("darkmode");

  if (darkMode !== "active") {
    enableDarkode();
  } else {
    disableDarkMode();
  }
});

//TO-DO LOGIC

// ASK FOR NOTIFICATION PERMISSION ON LOAD
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("✅ Notification permission granted.");
    } else {
      console.log("❌ Notification permission denied.");
    }
  });
}

const listBox = document.getElementById("list");
const userInput = document.getElementById("input");

function addList() {
  const timeInput = document.getElementById("task-time");
  const taskTime = timeInput.value ? new Date(timeInput.value) : null;

  if (userInput.value === "") return;

  const li = document.createElement("li");
  const task = userInput.value.trim();
  li.textContent = task;

  if (taskTime) {
    const clock = document.createElement("i");
    clock.classList.add("ri-notification-3-line");
    // clock.style.marginLeft = "-30%";
    li.appendChild(clock);
  }

  listBox.appendChild(li);

  const span = document.createElement("span");
  span.innerHTML = ``;
  li.appendChild(span);

  if (taskTime) scheduleReminder(task, taskTime);

  userInput.value = "";
  timeInput.value = "";

  saveTask();
}

listBox.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
    saveTask();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveTask();
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addList();
});

function saveTask() {
  localStorage.setItem("data", listBox.innerHTML);
}

function getTask() {
  listBox.innerHTML = localStorage.getItem("data");
}

function scheduleReminder(taskText, taskTime) {
  const now = new Date();
  const timeDiff = taskTime - now;

  if (timeDiff <= 0) {
    console.log("⚠️ Time has already passed, skipping reminder.");
    return;
  }

  setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("Task Reminder 🕒", {
        body: taskText,
        icon: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png",
      });
    } else {
      alert(`Reminder: ${taskText}`);
    }
  }, timeDiff);
}

getTask();

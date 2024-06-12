let dragElement = null;

function revealFruit(element, fruit) {
    const fruitImg = element.querySelector('.fruit');
    if (fruit === 'apple') {
        fruitImg.src = 'Asset/Image/apple.png';
    } else if (fruit === 'orange') {
        fruitImg.src = 'Asset/Image/orange.png';
    }
    fruitImg.style.display = 'block';
    fruitImg.style.top = '50px';
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    dragElement = event.target;
}

function dragEnter(event) {
    if (event.target.classList.contains('label')) {
        event.target.classList.add('dashed-border');
    }
}

function dragLeave(event) {
    if (event.target.classList.contains('label')) {
        event.target.classList.remove('dashed-border');
    }
}

function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains('label') && dragElement) {
        event.target.innerText = dragElement.innerText;
        event.target.style.backgroundColor = 'yellow';
        dragElement.style.display = 'none';
        event.target.classList.remove('dashed-border');
    }
}

function checkOrder() {
    const boxes = document.querySelectorAll('.box');
    const correctOrder = ["Apple & Orange", "Apple", "Orange"];
    let isCorrect = true;

    boxes.forEach((box, index) => {
        const label = box.querySelector('.label').innerText;
        if (label !== correctOrder[index]) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        showPopup("You've successfully solved the puzzle! 🧩✨");
    } else {
        showPopup("❌ Oops! That's not quite right. ❌");
        updateHearts(); // Update hearts on incorrect
        resetLabels(); // Reset labels on incorrect
    }
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const popupMessage = document.getElementById('popup-message');

    popupMessage.innerText = message;
    popup.style.display = 'flex';
    popupContent.classList.add('popup-content-show');

    if(message == "You've successfully solved the puzzle! 🧩✨"){
        var time = 5000;
    }else{
        time = 2000;
    }
    setTimeout(() => {
        popup.style.display = 'none';
        popupContent.classList.remove('popup-content-show');
    }, time);
}

function checkGameOver() {
    const hearts = document.querySelectorAll('.heart');
    let allEmpty = true;

    hearts.forEach(heart => {
        if (heart.innerHTML === "❤️") {
            allEmpty = false;
        }
    });

    if (allEmpty) {
        showPopup("🚫 Oh no! It seems all attempts have been exhausted. 🚫");
    }
}

function updateHearts() {
    const hearts = document.querySelectorAll('.heart');
    for (let i = hearts.length - 1; i >= 0; i--) {
        if (hearts[i].innerHTML === "❤️") {
            hearts[i].innerHTML = '<i class="fa-regular fa-heart"></i>';
            break;
        }
    }
    checkGameOver(); // Check if the game is over after updating hearts
}

function resetLabels() {
    document.querySelectorAll('.box .label').forEach(label => {
        label.innerText = '';
        label.style.backgroundColor = '#ddd';
        label.classList.remove('dashed-border'); // Ensure the dashed border is removed
    });

    document.querySelectorAll('.label-button').forEach(button => {
        button.style.display = 'inline-block';
    });
}

function resetGame() {
    resetLabels(); // Reset labels
    // Reset hearts to initial state
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.innerHTML = '❤️';
    });

    // Hide all fruit images
    const fruits = document.querySelectorAll('.fruit');
    fruits.forEach(fruit => {
        fruit.style.display = 'none';
    });
}

document.querySelectorAll('.box').forEach(box => {
    box.querySelector('.label').innerText = ''; // Set initial label text to empty
    box.addEventListener('dragover', allowDrop);
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

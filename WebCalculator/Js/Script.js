let resetDisplay = false;

function insert(num) {
    let display = document.getElementById('display').value;

    if (resetDisplay) {
        display = '';
        document.getElementById('display').value = '';
        resetDisplay = false;
    }

    let operations = ['+', '-', '*', '/', '%'];

    if (operations.includes(num) && operations.includes(display.slice(-1))) {
        return;
    }
    if (num === '.' && display === '') {
        document.getElementById('display').value = '0.';
        return;
    }
    if (num === '.' && display.includes('.')) {
        return;
    }
    document.getElementById('display').value += num;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display').value;
    document.getElementById('display').value = display.substring(0, display.length - 1);
}

function saveToHistory(calculation) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(calculation);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function calculate() {
    let expression = document.getElementById('display').value;
    try {
        let result = eval(expression);
        document.getElementById('display').value = result;
        saveToHistory(expression + '=' + result);
        resetDisplay = true;
    } catch (err) {
        document.getElementById('display').value = "Error";
    }
}

function updateHistory() {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    let historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(function (item) {
        let li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('history');
    updateHistory();
}

// Inicializar el historial al cargar la página
window.onload = function() {
    updateHistory();
};

window.arrayNumbers = Array.from({ length: 10 }, (_, i) => i);
window.arrayLetters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

function displayArray(array, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  array.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    container.appendChild(listItem);
  });
}

function sortArray(array, isDescending) {
    const compare = (a, b) => typeof a === 'string' ? a.localeCompare(b) : a - b;
    const length = array.length;
    const ascOrDesc = isDescending ? -1 : 1;
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            if (compare(array[i], array[j]) * ascOrDesc > 0) {
                [array[i], array[j]] = [array[j], array[i]]; 
            }
        }
    }
    displayArray(array, array === window.arrayNumbers ? 'numbers-array' : 'letters-array');
}

function showMessage(id, message, success) {
    const msgElement = document.getElementById(id);
    msgElement.textContent = message;
    msgElement.className = success ? 'success-message' : 'error-message';
    setTimeout(() => { msgElement.textContent = ''; }, 2000);
}

function search() {
    const searchNum = document.getElementById('search-numbers').value.trim();
    const searchLetter = document.getElementById('search-letters').value.trim();
    if (searchNum) {
      const num = parseInt(searchNum, 10);
      const index = window.arrayNumbers.indexOf(num);
      const msg = isNaN(num) ? `Erro: '${searchNum}' não é válido.` : 
        window.arrayNumbers.includes(num) ? `Sucesso: Número ${num} encontrado na posição ${index}.` : `Erro: Número ${num} não encontrado.`;
      showMessage('message-numbers', msg, !isNaN(num) && window.arrayNumbers.includes(num));
    }
    if (searchLetter) {
      const letter = searchLetter.toLowerCase();
      const index = window.arrayLetters.indexOf(letter);
      const msg = window.arrayLetters.includes(letter) ? 
        `Sucesso: Letra '${letter}' encontrada na posição ${index}.` : `Erro: '${letter}' não é válido.`;
      showMessage('message-letters', msg, window.arrayLetters.includes(letter));
    }
}  

displayArray(window.arrayNumbers, "numbers-array");
displayArray(window.arrayLetters, "letters-array");
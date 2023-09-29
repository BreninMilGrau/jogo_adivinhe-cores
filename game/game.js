const maxTentativas = 2; // Número máximo de tentativas permitidas
let tentativas = 0; // Inicializa o contador de tentativas

const colors = generateRandomColors(6);
const colorBox = document.getElementById('color-box');
const colorOptions = document.getElementById('color-options');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let pickedColor = pickColor();
colorBox.style.backgroundColor = pickedColor;

for (let i = 0; i < colors.length; i++) {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color-option');
    colorOption.style.backgroundColor = colors[i];
    colorOptions.appendChild(colorOption);

    colorOption.addEventListener('click', function() {
        const clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor) {
            message.textContent = 'Parabéns! Você acertou!';
            changeColors(pickedColor);
            resetButton.textContent = 'Jogar Novamente';
            resetButton.addEventListener('click', resetGame);
        } else {
            this.style.backgroundColor = '#fff';
            tentativas++;
            if (tentativas >= maxTentativas) {
                message.textContent = 'Você perdeu! Tente novamente.';
                resetButton.textContent = 'Reiniciar Jogo';
                resetButton.removeEventListener('click', resetGame);
            } else {
                message.textContent = `Tentativa ${tentativas}/${maxTentativas} - Tente novamente!`;
            }
        }
    });
}

function resetGame() {
    colors.length = 0;
    colors.push(...generateRandomColors(6));
    pickedColor = pickColor();
    colorBox.style.backgroundColor = pickedColor;
    message.textContent = '';
    resetButton.textContent = 'Novo Jogo';
    tentativas = 0; // Reinicia o contador de tentativas
    for (let i = 0; i < colors.length; i++) {
        colorOptions.children[i].style.backgroundColor = colors[i];
    }
}

resetButton.addEventListener('click', resetGame);

function generateRandomColors(num) {
    const colorArray = [];
    for (let i = 0; i < num; i++) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        colorArray.push(`rgb(${red}, ${green}, ${blue})`);
    }
    return colorArray;
}

function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function changeColors(color) {
    for (let i = 0; i < colors.length; i++) {
        colorOptions.children[i].style.backgroundColor = color;
    }
}

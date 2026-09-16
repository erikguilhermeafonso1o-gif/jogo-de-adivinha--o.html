const maxAttempts = 10;
let attemptsRemaining = 0;
const secretNumber = Math.floor(Math.random() * 100) + 1;

const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");

function updateAttempts() {
	attempts.textContent = "Tentativas restantes: " + attemptsRemaining;
}

function finishGame(text, className) {
	message.textContent = text;
	message.className = "message " + className;
	guessInput.disabled = true;
	guessButton.disabled = true;
}

guessForm.addEventListener("submit", function (event) {
	event.preventDefault();

	const guess = parseInt(guessInput.value, 10);

	if (isNaN(guess) || guess < 1 || guess > 100) {
		message.textContent = "Digite um número válido entre 1 e 100.";
		message.className = "message error";
		guessInput.focus();
	} else if (guess === secretNumber) {
		attemptsRemaining--;
		updateAttempts();
		finishGame("Você acertou!", "success");
	} else {
		attemptsRemaining--;

		if (attemptsRemaining === 0) {
			finishGame("Você perdeu! O número secreto era " + secretNumber, "error");
		} else if (guess < secretNumber) {
			message.textContent = "O número secreto é maior";
			message.className = "message";
		} else {
			message.textContent = "O número secreto é menor";
			message.className = "message";
		}

		updateAttempts();
		guessInput.value = "";
		guessInput.focus();
	}
});

while (attemptsRemaining < maxAttempts) {
	attemptsRemaining++;
}

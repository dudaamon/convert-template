// Cotação de moedas do dia
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

// Obtendo os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente numeros
amount.addEventListener("input", () => {
	const hasCharactersRegex = /\D+/g;
	amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Captando o evento de submit (enviar) no formulário
form.onsubmit = (event) => {
	event.preventDefault();

	switch (currency.value) {
		case "USD":
			convertCurrency(amount.value, USD, "US$");
			break;
		case "EUR":
			convertCurrency(amount.value, EUR, "€");
			break;
		case "GBP":
			convertCurrency(amount.value, GBP, "£");
			break;
	}
};

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
	try {
		// Exibindo a cotação da moeda selecionada
		description.textContent = `${symbol}1 = ${formatCurrencyBRL(price)}`;

		// Calcula e exibe o total
		let total = amount * price;

		if (isNaN(total)) {
			return alert("Por favor, digite um número válido.");
		}

		total = formatCurrencyBRL(total).replace("R$", ""); // Formatar o valor total para exibi-lo
		result.textContent = `${total} Reais`;

		// Habilita a classe que exibe o footer para mostrar o resultado
		footer.classList.add("show-result");
	} catch (error) {
		console.log(error);
		footer.classList.remove("show-result"); // Remove a classe
		alert("Não foi possível converter. Tente novamente mais tarde");
	}
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
	// Converte para numero para utilizar o toLocaleString para formatar no padrão BRL
	return Number(value).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}

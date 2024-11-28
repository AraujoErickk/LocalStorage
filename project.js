const attendanceForm = document.querySelector("#attendance-form");
const recordsContainer = document.querySelector("#records-container");

// Função para exibir os registros
function checkRecords() {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    recordsContainer.innerHTML = ""; // Limpa os registros antes de renderizar

    records.forEach((record, index) => {
        const recordCard = document.createElement("div");
        recordCard.classList.add("user-card");

        recordCard.innerHTML = `
            <h5>${record.name}</h5>
            <p><strong>CPF:</strong> ${record.cpf}</p>
            <p><strong>Horário:</strong> ${record.time}</p>
            <p><strong>Status:</strong> ${record.status}</p>
            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${index})">Excluir</button>
            <button class="btn btn-warning btn-sm" onclick="toggleStatus(${index})">Alterar para ${record.status === "Entrada" ? "Saída" : "Entrada"}</button>
        `;

        recordsContainer.appendChild(recordCard);
    });
}

// Função para adicionar um novo registro
attendanceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#name");
    const cpfInput = document.querySelector("#cpf");

    const records = JSON.parse(localStorage.getItem("records")) || [];
    records.push({ 
        name: nameInput.value, 
        cpf: cpfInput.value, 
        time: new Date().toLocaleString(),
        status: "Entrada" 
    });

    localStorage.setItem("records", JSON.stringify(records));
    nameInput.value = "";
    cpfInput.value = "";

    checkRecords();
});

// Função para excluir um registro
function deleteRecord(index) {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    checkRecords();
}

// Função para alternar status entre "Entrada" e "Saída"
function toggleStatus(index) {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records[index].status = records[index].status === "Entrada" ? "Saída" : "Entrada";
    records[index].time = new Date().toLocaleString(); // Atualiza o horário
    localStorage.setItem("records", JSON.stringify(records));
    checkRecords();
}

// Inicializa os registros ao carregar a página
document.addEventListener("DOMContentLoaded", checkRecords);

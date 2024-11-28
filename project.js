const attendanceForm = document.querySelector("#attendance-form");
const recordsContainer = document.querySelector("#records-container");


function checkRecords() {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    recordsContainer.innerHTML = ""; 

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


function deleteRecord(index) {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    checkRecords();
}


function toggleStatus(index) {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records[index].status = records[index].status === "Entrada" ? "Saída" : "Entrada";
    records[index].time = new Date().toLocaleString(); 
    localStorage.setItem("records", JSON.stringify(records));
    checkRecords();
}


document.addEventListener("DOMContentLoaded", checkRecords);

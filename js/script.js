
// Pega o array de locais de trabalho salvos na sessão 'arrLocaisTrabalho'
function getArrLocaisTrabalhoSession() {
    return JSON.parse(sessionStorage.getItem('arrLocaisTrabalho') || '[]');
}

// salva um array de locais de trabalho salvos na sessão 'arrLocaisTrabalho'
function saveArrLocaisTrabalho(arrLocaisTrabalho) {
    sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(arrLocaisTrabalho));
}

// Atribui o valor do array de locais de trabalho salvos na sessão 'arrLocaisTrabalho', para a viável local
// arrLocaisTrabalho
var arrLocaisTrabalho = getArrLocaisTrabalhoSession();

// Função de Geração de Tabela, conforme manipulação dos dados persistidos na sessão. 
function generationtable(table, data) {
    var count = 0;
    var countKey = 0;
    for (let element of data) {
        let row = table.insertRow();
        countKey = 0;
        for (key in element) {
            let cell = row.insertCell();
            if (countKey == 3) {

                // Add Button de Edição
                var editButton = document.createElement("BUTTON");
                editButton.setAttribute("onClick", "editInput(this)");
                editButton.setAttribute("class", "btn");
                editButton.setAttribute("type", "button");
                editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'
                editButton.setAttribute("id", "edit_" + count);
                cell.appendChild(editButton);

                // Add Button de Exclusão
                var removeButton = document.createElement("BUTTON");
                removeButton.setAttribute("onClick", "deleteCell(this)");
                removeButton.setAttribute("type", "button");
                removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
                removeButton.setAttribute("id", "remove_" + count);
                cell.appendChild(removeButton);

                // Add Button de Confirmação
                var confirmButton = document.createElement("BUTTON");
                confirmButton.setAttribute("onClick", "confirmEdit(this)");
                confirmButton.innerHTML = '<i class="fas fa-check"></i>'
                confirmButton.setAttribute("type", "button");
                confirmButton.setAttribute("id", "confirm_" + count);
                confirmButton.style.display = 'none';
                cell.appendChild(confirmButton);

                // Add Button de Cancelar Edição
                var cancellingButton = document.createElement("BUTTON");
                cancellingButton.setAttribute("onClick", "cancellingEdit(this)");
                cancellingButton.innerHTML = '<i class="fas fa-times"></i>'
                cancellingButton.setAttribute("type", "button");
                cancellingButton.setAttribute("id", "cancelling_" + count);
                cancellingButton.style.display = 'none';
                cell.appendChild(cancellingButton);
            } else if (countKey == 1) {

                // Adiciona um input text para as opções de Funcionário e Local de Trabalho.
                var select = document.createElement("SELECT");
                select.setAttribute("disabled", true);
                select.setAttribute("id", key + "_" + count);

                for (var i = 0; i < 3; i++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", "Predio " + (i + 1));
                    option.innerHTML = "Predio " + (i + 1);
                    select.appendChild(option);
                }

                select.value = element[key] || "Predio 1";
                cell.appendChild(select);

            } else {

                // Adiciona um input text para as opções de Funcionário e Local de Trabalho.
                var input = document.createElement("INPUT");
                input.setAttribute("type", "text");
                input.setAttribute("disabled", true);
                input.setAttribute("id", key + "_" + count);
                input.value = element[key];
                cell.appendChild(input);
            }
            countKey++;
        }
        count++;
    }
}

let table = document.querySelector("table");
let data = Object.keys(arrLocaisTrabalho[0]);

generationtable(table, arrLocaisTrabalho);

function clearTable() {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function insertFuncionario() {
    let func = document.getElementById("txtfunc").value;
    let predio = document.getElementById("txtpredio").value;
    let local = document.getElementById("txtlocal").value;

    if (!func || !predio || !local) {
        alert("TODOS OS CAMPOS SAO OBRIGATORIOS")
        return;
    }

    arrLocaisTrabalho.push({ funcionario: func, predio: predio, local_de_trabalho: local, edit: false });
    saveArrLocaisTrabalho(arrLocaisTrabalho);
    clearTable();
    generationtable(table, arrLocaisTrabalho);
}

function editInput(element) {
    var elementId = element.id.split("_")[1];
    console.log("Edit on " + elementId);

    let funcionario = document.getElementById("funcionario_" + elementId);
    let predio = document.getElementById("predio_" + elementId);
    let localDeTrabalho = document.getElementById("local_de_trabalho_" + elementId);
    let editButton = document.getElementById("edit_" + elementId);
    let removeButton = document.getElementById("remove_" + elementId);
    let confirmButton = document.getElementById("confirm_" + elementId);
    let cancellingButton = document.getElementById("cancelling_" + elementId);

    funcionario.disabled = false;
    predio.disabled = false;
    localDeTrabalho.disabled = false;

    editButton.style.display = 'none';
    removeButton.style.display = 'none';
    confirmButton.style.display = 'inline';
    cancellingButton.style.display = 'inline';
}

function deleteCell(element) {
    var index = element.id.split("_")[1];
    console.log(arrLocaisTrabalho);
    arrLocaisTrabalho.splice(index, 1);
    saveArrLocaisTrabalho(arrLocaisTrabalho);
    clearTable();
    generationtable(table, arrLocaisTrabalho);
}

function cancellingEdit(element) {
    var elementId = element.id.split("_")[1];

    let funcionario = document.getElementById("funcionario_" + elementId);
    let predio = document.getElementById("predio_" + elementId);
    let localDeTrabalho = document.getElementById("local_de_trabalho_" + elementId);
    let editButton = document.getElementById("edit_" + elementId);
    let removeButton = document.getElementById("remove_" + elementId);
    let confirmButton = document.getElementById("confirm_" + elementId);
    let cancellingButton = document.getElementById("cancelling_" + elementId);

    funcionario.disabled = true;
    predio.disabled = true;
    localDeTrabalho.disabled = true;

    editButton.style.display = 'inline';
    removeButton.style.display = 'inline';
    confirmButton.style.display = 'none';
    cancellingButton.style.display = 'none';

    clearTable();
    generationtable(table, arrLocaisTrabalho);
}

function confirmEdit(element) {
    var elementId = element.id.split("_")[1];

    let funcionario = document.getElementById("funcionario_" + elementId);
    let predio = document.getElementById("predio_" + elementId);
    let localDeTrabalho = document.getElementById("local_de_trabalho_" + elementId);
    let editButton = document.getElementById("edit_" + elementId);
    let removeButton = document.getElementById("remove_" + elementId);
    let confirmButton = document.getElementById("confirm_" + elementId);
    let cancellingButton = document.getElementById("cancelling_" + elementId);

    funcionario.disabled = true;
    predio.disabled = true;
    localDeTrabalho.disabled = true;

    editButton.style.display = 'inline';
    removeButton.style.display = 'inline';
    confirmButton.style.display = 'none';
    cancellingButton.style.display = 'none';

    arrLocaisTrabalho[elementId].funcionario = funcionario.value;
    arrLocaisTrabalho[elementId].predio = predio.value;
    arrLocaisTrabalho[elementId].local_de_trabalho = localDeTrabalho.value;
    saveArrLocaisTrabalho(arrLocaisTrabalho);
}
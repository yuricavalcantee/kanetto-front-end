var containerCards = document.getElementById("containerCards");
var btCallScreenAddMachineCard = document.getElementById("btCallScreenAddMachineCard");
var btnAddMachineCard = document.getElementById("btnAddMachineCard");
var btnCloseModal = document.getElementById("btnCloseModal");

const ALERT_TIMEOUT = 2000;

var xhttp = new XMLHttpRequest();
const url = "http://localhost:8080/settings/machineCard/";
const POST = "POST";
const GET = "GET";
const PUT = "PUT";
const DELETE = "DELETE";

var machineCardUpdated;
var inputsInterestRatedocument = document.querySelectorAll('.inputInterestRate');
var isValidForm = false;

inputsInterestRatedocument.forEach(function(input) {
    input.addEventListener("focusout", function() {

        var interestRate = this.value;
        var divCardID = this.id.split('-')[1]
        var feedbackLabel = document.getElementById("feedback-interestRate-" + divCardID);

        if (interestRate > 100 || interestRate == 0) {
            feedbackLabel.innerHTML = "Taxa inválida :/"
            feedbackLabel.classList.remove("my-valid-feedback");
            feedbackLabel.classList.add("my-invalid-feedback");
            feedbackLabel.style.display = "inline";
            this.style.borderColor = "#dc3545";
            isValidForm = false;
        } else if (interestRate == "") {
            feedbackLabel.innerHTML = "Esquecendo de nada?"
            feedbackLabel.classList.remove("my-valid-feedback");
            feedbackLabel.classList.add("my-invalid-feedback");
            feedbackLabel.style.display = "inline";
            isValidForm = false;
        } else {
            feedbackLabel.innerHTML = ""
            feedbackLabel.classList.remove("my-invalid-feedback");
            feedbackLabel.classList.add("my-valid-feedback");
            feedbackLabel.style.display = "inline";
            this.style.borderColor = "#28a745";
            isValidForm = true;

            if (divCardID == 3)
                feedbackLabel.innerHTML = "Muito bom!"
            else if (divCardID == 6)
                feedbackLabel.innerHTML = "Na metade :)"
            else if (divCardID == 11)
                feedbackLabel.innerHTML = "Quase lá :)"
        }

    })
});

btCallScreenAddMachineCard.addEventListener("click", function() {

    document.getElementById("modalTitleMachineCard").innerHTML = "Adicionar Maquineta"
    document.getElementById("btnAddMachineCard").innerHTML = "Salvar";
    $("#modalMachineCard").modal("show");
});

btnCloseModal.addEventListener("click", function() {
    cleanModalInputs();
});

var machineCardList = new Array();

function getAllMachineCards() {

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == "200") {
            data = xhttp.response;
            console.log(xhttp.status);
            var machineResponseArray = JSON.parse(data);
            machineCardList = new Array();
            fillMachineCardList(machineResponseArray);
        }
    }
    xhttp.onerror = function() {
        tata.error('Algo inesperado aconteceu :( Verifique sua conexão e tente novamente!', 'Kanetto Project', {
            duration: ALERT_TIMEOUT + 1000
        });
    }

    xhttp.open(GET, url, true);
    xhttp.send();
}

function fillMachineCardList(machineResponseArray) {

    containerCards.innerHTML = "";
    for (var i = 0; i < machineResponseArray.length; i++) {
        machineCardList[i] = machineResponseArray[i];
        addDivMachineCard(machineCardList[i]);
    }
}

btnAddMachineCard.addEventListener("click", function() {

    var btnSaveLabel = document.getElementById("btnAddMachineCard").innerHTML;

    if (btnSaveLabel == "Salvar")
        saveMachineCard();
    else
        updateMachineCardLocally(machineCardUpdated.id);

    cleanModalInputs();
    $("#modalMachineCard").modal("hide");

});

function addDivMachineCard(machineCard) {

    var divCard = document.createElement("div");
    divCard.classList.add("card-body");
    divCard.classList.add("col-sm-3");
    divCard.setAttribute("id", "machineCardId-" + machineCard.id);

    var divCardMain = document.createElement("div");
    divCardMain.classList.add("card");
    divCardMain.style = "margin-left: 7px; width:18rem";

    var divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");

    var divMachineName = document.createElement("h5");
    divMachineName.classList.add("card-title");
    divMachineName.innerHTML = machineCard.name;

    var divBankName = document.createElement("h6");
    divBankName.classList.add("card-subtitle");
    divBankName.classList.add("mb-2");
    divBankName.classList.add("text-muted");
    divBankName.innerHTML = machineCard.bankName;

    var btSeeMachineCard = document.createElement("button");
    btSeeMachineCard.setAttribute("type", "button");
    btSeeMachineCard.style = "margin-right:3px; margin-top:5px";
    btSeeMachineCard.classList.add("btn");
    btSeeMachineCard.classList.add("btn-outline-primary");

    var iconBtSeeMachineCard = document.createElement("i");
    iconBtSeeMachineCard.classList.add("fa");
    iconBtSeeMachineCard.classList.add("fa-credit-card");
    iconBtSeeMachineCard.innerHTML = " Visualizar";

    var btDeleteMachineCard = document.createElement("button");
    btDeleteMachineCard.setAttribute("type", "button");
    btDeleteMachineCard.style = "margin-top:5px";
    btDeleteMachineCard.classList.add("btn");
    btDeleteMachineCard.classList.add("btn-outline-danger");

    var iconBtDeleteMachineCard = document.createElement("i");
    iconBtDeleteMachineCard.classList.add("fa");
    iconBtDeleteMachineCard.classList.add("fa-trash");
    iconBtDeleteMachineCard.innerHTML = " Excluir";

    btDeleteMachineCard.appendChild(iconBtDeleteMachineCard);
    btSeeMachineCard.appendChild(iconBtSeeMachineCard);

    divCardBody.appendChild(divMachineName);
    divCardBody.appendChild(divBankName);
    divCardBody.appendChild(btSeeMachineCard);
    divCardBody.appendChild(btDeleteMachineCard);

    divCardMain.appendChild(divCardBody);
    divCard.appendChild(divCardMain);

    containerCards.appendChild(divCard);

    btSeeMachineCard.addEventListener("click", function() {

        var divCard = this.parentNode.parentNode.parentNode;
        var divCardID = divCard.id.split('-')[1];

        for (var i = 0; i < machineCardList.length; i++)
            if (machineCardList[i].id == divCardID) {
                var machineCardSelected = machineCardList[i];
                machineCardUpdated = machineCardList[i];
            }

        document.getElementById("modalTitleMachineCard").innerHTML = "Atualizar Maquineta"
        document.getElementById("inputMachineName").value = machineCardSelected.name;
        document.getElementById("inputMachineBank").value = machineCardSelected.bankName;
        document.getElementById("inputInterestRate-1").value = machineCardSelected.interestRate[0];
        document.getElementById("inputInterestRate-2").value = machineCardSelected.interestRate[1];
        document.getElementById("inputInterestRate-3").value = machineCardSelected.interestRate[2];
        document.getElementById("inputInterestRate-4").value = machineCardSelected.interestRate[3];
        document.getElementById("inputInterestRate-5").value = machineCardSelected.interestRate[4];
        document.getElementById("inputInterestRate-6").value = machineCardSelected.interestRate[5];
        document.getElementById("inputInterestRate-7").value = machineCardSelected.interestRate[6];
        document.getElementById("inputInterestRate-8").value = machineCardSelected.interestRate[7];
        document.getElementById("inputInterestRate-9").value = machineCardSelected.interestRate[8];
        document.getElementById("inputInterestRate-10").value = machineCardSelected.interestRate[9];
        document.getElementById("inputInterestRate-11").value = machineCardSelected.interestRate[10];
        document.getElementById("inputInterestRate-12").value = machineCardSelected.interestRate[11];
        document.getElementById("btnAddMachineCard").innerHTML = "Concluído";

        $("#modalMachineCard").modal("show");

    });

    btDeleteMachineCard.addEventListener("click", function() {

        var divCard = this.parentNode.parentNode.parentNode;
        var divCardID = divCard.id.split('-')[1];

        xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            if (this.readyState == 4 && this.status == "204") {
                for (var i = 0; i < machineCardList.length; i++) {
                    if (machineCardList[i].id == divCardID) {
                        divCard.remove();
                        tata.success('Maquineta deletada com sucesso!', 'Kanetto Project', {
                            duration: ALERT_TIMEOUT
                        });
                        getAllMachineCards();
                    }
                }
            } else {
                tata.error('Algo inesperado aconteceu :( Atualize a página e tente novamente!', 'Kanetto Project', {
                    duration: ALERT_TIMEOUT
                });
            }
        }
        xhttp.open(DELETE, url + divCardID, true);
        xhttp.send(null);
    });

}

function cleanModalInputs() {

    document.getElementById("inputMachineName").value = "";
    document.getElementById("inputMachineBank").value = "";
    document.getElementById("inputInterestRate-1").value = "";
    document.getElementById("inputInterestRate-2").value = "";
    document.getElementById("inputInterestRate-3").value = "";
    document.getElementById("inputInterestRate-4").value = "";
    document.getElementById("inputInterestRate-5").value = "";
    document.getElementById("inputInterestRate-6").value = "";
    document.getElementById("inputInterestRate-7").value = "";
    document.getElementById("inputInterestRate-8").value = "";
    document.getElementById("inputInterestRate-9").value = "";
    document.getElementById("inputInterestRate-10").value = "";
    document.getElementById("inputInterestRate-11").value = "";
    document.getElementById("inputInterestRate-12").value = "";

    var inputsInterestRatedocumentArray = document.querySelectorAll('.inputInterestRate');
    inputsInterestRatedocumentArray.forEach(function(input) {
        console.log(input);
        var divCardID = input.id.split('-')[1]
        var feedbackLabel = document.getElementById("feedback-interestRate-" + divCardID);
        feedbackLabel.classList.remove("my-valid-feedback");
        feedbackLabel.classList.remove("my-invalid-feedback");
        feedbackLabel.style.display = "none";
        input.style.borderColor = "#ced4da";
    });
}

function saveMachineCard() {

    if (!isValidForm) {
        console.log("Keep going!");
    } else {
        var machineCard = new Object();
        var interestRateArray = new Array(12);

        var machineName = document.getElementById("inputMachineName").value;
        var machineBank = document.getElementById("inputMachineBank").value;
        interestRateArray[0] = parseFloat(document.getElementById("inputInterestRate-1").value);
        interestRateArray[1] = parseFloat(document.getElementById("inputInterestRate-2").value);
        interestRateArray[2] = parseFloat(document.getElementById("inputInterestRate-3").value);
        interestRateArray[3] = parseFloat(document.getElementById("inputInterestRate-4").value);
        interestRateArray[4] = parseFloat(document.getElementById("inputInterestRate-5").value);
        interestRateArray[5] = parseFloat(document.getElementById("inputInterestRate-6").value);
        interestRateArray[6] = parseFloat(document.getElementById("inputInterestRate-7").value);
        interestRateArray[7] = parseFloat(document.getElementById("inputInterestRate-8").value);
        interestRateArray[8] = parseFloat(document.getElementById("inputInterestRate-9").value);
        interestRateArray[9] = parseFloat(document.getElementById("inputInterestRate-10").value);
        interestRateArray[10] = parseFloat(document.getElementById("inputInterestRate-11").value);
        interestRateArray[11] = parseFloat(document.getElementById("inputInterestRate-12").value);

        machineCard.name = machineName;
        machineCard.bankName = machineBank;
        machineCard.interestRate = interestRateArray;

        xhttp = new XMLHttpRequest();
        xhttp.open(POST, url, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.onload = function() {
            if (xhttp.readyState == 4 && xhttp.status == "201") {
                addDivMachineCard(machineCard);
                getAllMachineCards();
                tata.success('Maquineta cadastrada com sucesso!', 'Kanetto Project', {
                    duration: ALERT_TIMEOUT
                });
            } else {
                tata.error('Algo inesperado aconteceu :( Atualize a página e tente novamente!', 'Kanetto Project', {
                    duration: ALERT_TIMEOUT
                });
            }
        }

        xhttp.send(JSON.stringify(machineCard));
        $("#modalMachineCard").modal("hide");
    }
}

function updateMachineCardLocally(machineCardID) {

    for (var i = 0; i < machineCardList.length; i++)
        if (machineCardID == machineCardList[i].id) {
            machineCardList[i].name = document.getElementById("inputMachineName").value;
            machineCardList[i].bankName = document.getElementById("inputMachineBank").value;
            machineCardList[i].interestRate[0] = parseFloat(document.getElementById("inputInterestRate-1").value);
            machineCardList[i].interestRate[1] = parseFloat(document.getElementById("inputInterestRate-2").value);
            machineCardList[i].interestRate[2] = parseFloat(document.getElementById("inputInterestRate-3").value);
            machineCardList[i].interestRate[3] = parseFloat(document.getElementById("inputInterestRate-4").value);
            machineCardList[i].interestRate[4] = parseFloat(document.getElementById("inputInterestRate-5").value);
            machineCardList[i].interestRate[5] = parseFloat(document.getElementById("inputInterestRate-6").value);
            machineCardList[i].interestRate[6] = parseFloat(document.getElementById("inputInterestRate-7").value);
            machineCardList[i].interestRate[7] = parseFloat(document.getElementById("inputInterestRate-8").value);
            machineCardList[i].interestRate[8] = parseFloat(document.getElementById("inputInterestRate-9").value);
            machineCardList[i].interestRate[9] = parseFloat(document.getElementById("inputInterestRate-10").value);
            machineCardList[i].interestRate[10] = parseFloat(document.getElementById("inputInterestRate-11").value);
            machineCardList[i].interestRate[11] = parseFloat(document.getElementById("inputInterestRate-12").value);
        }
    updateAllMachineCards();
}

function updateAllMachineCards() {

    var machineCardToUpdate = new Object();

    for (var i = 0; i < machineCardList.length; i++) {
        xhttp = new XMLHttpRequest();
        xhttp.open(PUT, url + machineCardList[i].id, true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.onload = function() {
            if (xhttp.readyState == 4 && xhttp.status == "204") {
                tata.success('Maquininha atualizada com sucesso!', 'Kanetto Project', {
                    duration: ALERT_TIMEOUT
                });
            } else {
                if (i == machineCardList.length + 1) {} else {
                    // tata.error('Algo inesperado aconteceu :( Atualize a página e tente novamente!', 'Kanetto Project', {
                    //    duration: ALERT_TIMEOUT
                    // });
                    getAllMachineCards();
                }
            }
        }

        machineCardToUpdate.name = machineCardList[i].name;
        machineCardToUpdate.bankName = machineCardList[i].bankName;
        machineCardToUpdate.interestRate = machineCardList[i].interestRate;
        xhttp.send(JSON.stringify(machineCardToUpdate));
    }
    getAllMachineCards();
}
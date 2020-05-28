var containerCards = document.getElementById("containerCards");
var btCallScreenAddMachineCard = document.getElementById("btCallScreenAddMachineCard");
var btnSaveSettings = document.getElementById("btSaveSettings");
var btnAddMachineCard = document.getElementById("btnAddMachineCard");
var btnCloseModal = document.getElementById("btnCloseModal");

//quando tiver o banco esse cara vai ser carregado via API
var machinesCardList = new Array();

btCallScreenAddMachineCard.addEventListener("click", function () {
    $("#modalMachineCard").modal("show");
});

btnCloseModal.addEventListener("click", function () {
    cleanModalInputs();
});

btnAddMachineCard.addEventListener("click", function () {

    var machineCard = new Object();

    var interestRateArray = new Array(12);
    var machineName = document.getElementById("inputMachineName").value;
    var machineBank = document.getElementById("inputMachineBank").value;
    interestRateArray[0] = document.getElementById("inputInterestRate-1").value;
    interestRateArray[1] = document.getElementById("inputInterestRate-2").value;
    interestRateArray[2] = document.getElementById("inputInterestRate-3").value;
    interestRateArray[3] = document.getElementById("inputInterestRate-4").value;
    interestRateArray[4] = document.getElementById("inputInterestRate-5").value;
    interestRateArray[5] = document.getElementById("inputInterestRate-6").value;
    interestRateArray[6] = document.getElementById("inputInterestRate-7").value;
    interestRateArray[7] = document.getElementById("inputInterestRate-8").value;
    interestRateArray[8] = document.getElementById("inputInterestRate-9").value;
    interestRateArray[9] = document.getElementById("inputInterestRate-10").value;
    interestRateArray[10] = document.getElementById("inputInterestRate-11").value;
    interestRateArray[11] = document.getElementById("inputInterestRate-12").value;

    machineCard.id = machinesCardList.length + 1;
    machineCard.machineName = machineName;
    machineCard.machineBank = machineBank;
    machineCard.interestRateArray = interestRateArray;
    machineCard.inUse = false;
    if (machinesCardList.length == 0)
        machineCard.inUse = true;

    machinesCardList.push(machineCard);
    console.log(machinesCardList);

    addNewMachineCard(machineCard);
    $("#modalMachineCard").modal("hide");

    cleanModalInputs();

});

function addNewMachineCard(machineCard) {

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
    divMachineName.innerHTML = machineCard.machineName;

    var divBankName = document.createElement("h6");
    divBankName.classList.add("card-subtitle");
    divBankName.classList.add("mb-2");
    divBankName.classList.add("text-muted");
    divBankName.innerHTML = machineCard.machineBank;

    var divMachineInUse = document.createElement("div");
    divMachineInUse.classList.add("form-check");
    divMachineInUse.style = "margin-left : 3px";

    var inputCheckBoxInUse = document.createElement("input");
    inputCheckBoxInUse.classList.add("form-check-input");
    inputCheckBoxInUse.classList.add("checkbox");
    inputCheckBoxInUse.setAttribute("type", "checkbox");
    inputCheckBoxInUse.setAttribute("id", "checkboxCardInUse");
    inputCheckBoxInUse.checked = machineCard.inUse;

    var labelCheckBoxInUse = document.createElement("label");
    labelCheckBoxInUse.classList.add("form-check-label");
    labelCheckBoxInUse.innerHTML = "Em uso";

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

    divMachineInUse.appendChild(inputCheckBoxInUse);
    divMachineInUse.appendChild(labelCheckBoxInUse);

    divCardBody.appendChild(divMachineName);
    divCardBody.appendChild(divBankName);
    divCardBody.appendChild(divMachineInUse);
    divCardBody.appendChild(btSeeMachineCard);
    divCardBody.appendChild(btDeleteMachineCard);

    divCardMain.appendChild(divCardBody);
    divCard.appendChild(divCardMain);

    containerCards.appendChild(divCard);

    inputCheckBoxInUse.addEventListener("change", function () {
        var collectionCheckBoxInUse = document.querySelectorAll('.checkbox');
        for (var i = 0; i < collectionCheckBoxInUse.length; i++) {
            if (collectionCheckBoxInUse[i] != this)
                collectionCheckBoxInUse[i].checked = false;
        }
        this.checked = true;
    });

    btSeeMachineCard.addEventListener("click", function () {

        var divCard = this.parentNode.parentNode.parentNode;
        var divCardID = divCard.id.split('-')[1];

        for (var i = 0; i < machinesCardList.length; i++)
            if (machinesCardList[i].id == divCardID)
                var machineCardSelected = machinesCardList[i];

        document.getElementById("inputMachineName").value = machineCardSelected.machineName;
        document.getElementById("inputMachineBank").value = machineCardSelected.machineBank;
        document.getElementById("inputInterestRate-1").value = machineCardSelected.interestRateArray[0];
        document.getElementById("inputInterestRate-2").value = machineCardSelected.interestRateArray[1];
        document.getElementById("inputInterestRate-3").value = machineCardSelected.interestRateArray[2];
        document.getElementById("inputInterestRate-4").value = machineCardSelected.interestRateArray[3];
        document.getElementById("inputInterestRate-5").value = machineCardSelected.interestRateArray[4];
        document.getElementById("inputInterestRate-6").value = machineCardSelected.interestRateArray[5];
        document.getElementById("inputInterestRate-7").value = machineCardSelected.interestRateArray[6];
        document.getElementById("inputInterestRate-8").value = machineCardSelected.interestRateArray[7];
        document.getElementById("inputInterestRate-9").value = machineCardSelected.interestRateArray[8];
        document.getElementById("inputInterestRate-10").value = machineCardSelected.interestRateArray[9];
        document.getElementById("inputInterestRate-11").value = machineCardSelected.interestRateArray[10];
        document.getElementById("inputInterestRate-12").value = machineCardSelected.interestRateArray[11];

        $("#modalMachineCard").modal("show");

    });

    btDeleteMachineCard.addEventListener("click", function () {
        //lembrar de remover do back
        //check this out tomorrow
        var divCard = this.parentNode.parentNode.parentNode;
        var divCardID = divCard.id.split('-')[1];
        for (var i = 0; i < machinesCardList.length; i++) {
            if (machinesCardList.length == 1)
                machinesCardList.splice(i, 1);
            else if (machinesCardList[i].id == divCardID) {                
                var cardID = machinesCardList[i+1] != null ? i+1 : i-1;                
                var cardUpdateCheckBox = document.getElementById("machineCardId-"+cardID);
                var checkBoxInUse = cardUpdateCheckBox.firstChild.firstChild.childNodes[2].firstChild;
                checkBoxInUse.checked = true;
                machinesCardList[cardID].inUse = true;                
                machinesCardList.splice(i, 1);
            }
        }
        divCard.remove();
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
}
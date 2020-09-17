var table = document.getElementById("enviromentsTable");

var firstEnviromentCheckBoxTable = document.getElementById("firstEnviromentCheckBoxTable");
var firstEnviromentName = document.getElementById("firstEnviromentName");
var firstEnviromentQnt = document.getElementById("firstEnviromentQnt");
var firstEnviromentUnitAmount = document.getElementById("firstEnviromentUnitAmount");
var addEnviromentBtn = document.getElementById("addEnviromentBtn");
var totalAmountTable = document.getElementById("totalAmountCell");

var inputClientName = document.getElementById("inputName");
var inputClientAdress = document.getElementById("inputAddress");
var inputClientEmail = document.getElementById("inputEmail");
var inputClientPhone = document.getElementById("inputPhone");

var inputQtdProducts = document.getElementById("inputQtdProducts");
var inputTotalAmount = document.getElementById("inputTotalAmount");
var inputEntryAmountPercentage = document.getElementById("inputEntryAmountPercentage");
var inputEntryAmount = document.getElementById("inputEntryAmount");
var inputDiscountPercentage = document.getElementById("inputDiscountPercentage");
var inputDiscountAmount = document.getElementById("inputDiscountAmount");
var inputFinancedAmount = document.getElementById("inputFinancedAmount");
var inputPaymentCond = document.getElementById("inputPaymentCond");
var inputParcelAmount = document.getElementById("inputParcelAmount");

var selectPaymentOption = document.getElementById("selectPaymentOption");
var selectParcel = document.getElementById("selectParcel");

var btnPrint = document.getElementById("btnPrint");
var btnSaveProject = document.getElementById("btnSaveProject");

var oldEntryPercentageValue = 0;
var oldDiscountPercentageValue = 0;

var machineResponseArray;
var machineCardSelected;
var parcelPaymentSelected;

var xhttp = new XMLHttpRequest();
const url = "http://localhost:8080/settings/machineCard/";
const urlProject = "http://localhost:8080/projects";
const POST = "POST";
const GET = "GET";

const ALERT_TIMEOUT = 2000;

var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

window.onload = function() {

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == "200") {
            data = xhttp.response;
            machineResponseArray = JSON.parse(data);
            for (var i = 0; i < machineResponseArray.length; i++) {
                var option = document.createElement("option");
                option.text = "Maquininha - " + machineResponseArray[i].name;
                selectPaymentOption.add(option);
            }
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

firstEnviromentCheckBoxTable.addEventListener("change", function() {
    checkEnviroments();
});

firstEnviromentName.addEventListener("focusin", function() {
    if (this.innerHTML == "Ambiente")
        this.innerHTML = "";
})

firstEnviromentName.addEventListener("focusout", function() {
    if (this.innerHTML == "")
        this.innerHTML = "Ambiente";
})

firstEnviromentQnt.addEventListener("focusout", function() {
    updateQntyFields(this);
    checkEnviroments();
});

firstEnviromentUnitAmount.addEventListener("focusin", function() {
    focusInUnitAmountFields(this);
});

firstEnviromentUnitAmount.addEventListener("focusout", function(event) {
    focusOutUnitAmountFields(this);
});

selectParcel.addEventListener("change", function() {
    if (this.value != "Parcelas") {
        updateParcelAmount(selectParcel);
    }
})

selectPaymentOption.addEventListener("change", function() {
    var select = this;
    console.log(select);
    var valueSelected = select.value;
    console.log(valueSelected);
    switch (valueSelected) {
        case "1":
            inputPaymentCond.disabled = true;
            selectParcel.disabled = true;
            inputParcelAmount.disabled = true;
            break;
        case "2":
            inputPaymentCond.disabled = false;
            selectParcel.disabled = false;
            inputParcelAmount.disabled = false;
            break;
        case "3":
            break;
        default:
            for (var i = 0; i < machineResponseArray.length; i++)
                if (select.value == "Maquininha - " + machineResponseArray[i].name)
                    machineCardSelected = machineResponseArray[i];
            inputPaymentCond.disabled = false;
            selectParcel.disabled = false;
            inputParcelAmount.disabled = false;
    }
});


inputDiscountAmount.addEventListener("focusin", function() {
    focusInUnitAmountFields(this);
});

addEnviromentBtn.addEventListener("click", function() {

    var table = document.getElementById("enviromentsTable");
    var row = table.insertRow(table.rows.length - 1);
    var cellCheckBox = row.insertCell(0);
    var cellEnviromentName = row.insertCell(1);
    var cellEnviromentQnt = row.insertCell(2);
    var cellEnviromentUnitAmount = row.insertCell(3);
    var cellEnviromentTotalAmount = row.insertCell(4);
    var cellDeleteBtn = row.insertCell(5);

    row.id = table.rows.length - 2;
    row.classList.add("myRow");

    cellEnviromentUnitAmount.setAttribute("contenteditable", "true");
    cellEnviromentUnitAmount.classList.add("firstTimeAmountCell");
    cellEnviromentUnitAmount.innerHTML = formatter.format(0);

    cellEnviromentName.setAttribute("contenteditable", "true");
    cellEnviromentName.innerHTML = "Ambiente";

    cellEnviromentQnt.setAttribute("contenteditable", "true");
    cellEnviromentQnt.innerHTML = "1";

    cellEnviromentTotalAmount.innerHTML = formatter.format(0);

    var inputEnviromentCheckbox = document.createElement("input");
    inputEnviromentCheckbox.setAttribute("type", "checkbox");
    inputEnviromentCheckbox.checked = true;

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm");
    deleteButton.innerHTML = "X"

    inputEnviromentCheckbox.addEventListener("change", function() {
        checkEnviroments();
    });


    cellEnviromentName.addEventListener("focusin", function() {
        if (this.innerHTML == "Ambiente")
            this.innerHTML = "";
    })

    cellEnviromentName.addEventListener("focusout", function() {
        if (this.innerHTML == "")
            this.innerHTML = "Ambiente";
    })

    cellCheckBox.appendChild(inputEnviromentCheckbox);

    cellEnviromentQnt.addEventListener("focusout", function() {
        updateQntyFields(this);
    });

    cellEnviromentUnitAmount.addEventListener("focusin", function() {
        focusInUnitAmountFields(this);
    });

    cellEnviromentUnitAmount.addEventListener("focusout", function(event) {
        focusOutUnitAmountFields(this);
    });

    deleteButton.addEventListener("click", function() {
        document.getElementById(this.parentNode.parentNode.id).remove();
        checkEnviroments();
    });

    cellDeleteBtn.appendChild(deleteButton);
    checkEnviroments();
});

inputTotalAmount.addEventListener("input", function() {

});

inputEntryAmountPercentage.addEventListener("focusin", function() {
    oldEntryPercentageValue = this.value.replace(/[^0-9,]*/g, '').replace(',', '.');
});

inputEntryAmountPercentage.addEventListener("focusout", function() {
    updateEntryAmount(this);
});

inputEntryAmount.addEventListener("focusout", function() {
    updateEntryPercentage(this);
});

inputDiscountPercentage.addEventListener("focusin", function() {
    oldDiscountPercentageValue = this.value.replace(/[^0-9,]*/g, '').replace(',', '.');
});

inputDiscountPercentage.addEventListener("focusout", function() {
    updateDiscountAmount(this);
});

inputDiscountAmount.addEventListener("focusout", function() {
    updateDiscountPercentage(this);

});

btnPrint.addEventListener("click", function() {
    window.print();
});

btnSaveProject.addEventListener("click", function() {

    var project = new Object();
    var client = new Object();
    var enviromentList = new Array();

    client.name = document.getElementById("inputName").value;
    client.address = document.getElementById("inputAddress").value;
    client.email = document.getElementById("inputEmail").value;
    client.phone = document.getElementById("inputPhone").value;

    var enviromentsTable = document.querySelectorAll('.myRow');
    for (var i = 1; i < enviromentsTable.length; i++) {

        var enviromentLine = enviromentsTable[i];
        var enviroment = new Object();

        enviroment.name = enviromentLine.childNodes[1].innerText;
        enviroment.included = enviromentLine.firstChild.firstChild.checked;
        enviroment.quantity = enviromentLine.childNodes[2].innerHTML;
        enviroment.unitPrice = enviromentLine.childNodes[3].innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.');
        enviroment.totalPrice = enviromentLine.childNodes[4].innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.');
        enviromentList.push(enviroment);
    }

    project.client = client;
    project.enviromentList = enviromentList;
    project.totalAmountToPay = inputTotalAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.parcelAmount = inputParcelAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : inputParcelAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.percentageEntryValue = inputEntryAmountPercentage.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : inputEntryAmountPercentage.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.amountEntryValue = inputEntryAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : inputEntryAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.percentageDiscountValue = inputDiscountPercentage.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : inputDiscountPercentage.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.amountDiscountValue = inputDiscountAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : inputDiscountAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.amountToFinance = inputFinancedAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : inputFinancedAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.paymentOption = selectPaymentOption.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    project.paymentConditionParcel = selectParcel.value.replace(/[^0-9,]*/g, '').replace(',', '.') == '' ? 0 : selectParcel.value.replace(/[^0-9,]*/g, '').replace(',', '.');

    xhttp = new XMLHttpRequest();
    xhttp.open(POST, urlProject, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == "201") {
            tata.success('Projecto concluido com sucesso!', 'Kanetto Project', {
                duration: ALERT_TIMEOUT
            });
        } else {
            tata.error('Algo inesperado aconteceu :( Atualize a página e tente novamente!', 'Kanetto Project', {
                duration: ALERT_TIMEOUT
            });
        }
    }
    xhttp.onerror = function() {
        tata.error('Algo inesperado aconteceu :( Verifique sua conexão e tente novamente!', 'Kanetto Project', {
            duration: ALERT_TIMEOUT + 1000
        });
    }

    xhttp.send(JSON.stringify(project));
    $("#modalSaveProject").modal("hide");
});

function focusInUnitAmountFields(unitAmount) {

    var amount = unitAmount.innerHTML;
    amount = +amount.replace(/[^0-9,]*/g, '').replace(',', '.');
    unitAmount.innerHTML = amount;
}

function focusOutUnitAmountFields(unitAmount) {

    if (unitAmount.innerHTML == "")
        unitAmount.innerHTML = "0";

    var row = unitAmount.parentNode;

    var totalAmountEnviroment = row.cells[4];
    var quantity = row.cells[2].innerHTML;
    var unitAmountEnviroment = unitAmount.innerHTML;

    totalAmountEnviroment.innerHTML = formatter.format(unitAmountEnviroment * quantity);

    unitAmount.innerHTML = formatter.format(unitAmount.innerHTML);

    checkEnviroments();

}

function updateQntyFields(qntyFields) {

    var row = qntyFields.parentNode;
    var totalAmountEnviroment = row.cells[4];
    var unitAmountEnviroment = row.cells[3].innerHTML;
    var quantity = qntyFields.innerHTML;

    if (quantity == 0 || quantity == "") {
        unitAmountEnviroment.innerHTML = "1";
        totalAmountEnviroment.innerHTML = formatter.format("0");
        qntyFields.innerHTML = 0;
    } else {
        unitAmountEnviroment = unitAmountEnviroment.replace(/[^0-9,]*/g, '').replace(',', '.');
        totalAmountEnviroment.innerHTML = formatter.format(unitAmountEnviroment * quantity);
    }

    checkEnviroments();
}

function updateEntryAmount(entryPercentage) {

    entryPercentage = entryPercentage.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    var totalAmount = totalAmountTable.innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.');
    var entryAmount = totalAmount * (entryPercentage / 100);

    if (entryPercentage > 100) {
        console.log("Não pode ser maior - colocar um toast");
        inputEntryAmountPercentage.value = oldEntryPercentageValue + ",00";
    } else
        inputEntryAmount.value = formatter.format(entryAmount.toFixed(2));
}

function updateEntryPercentage(entryAmount) {

    var totalAmount = totalAmountTable.innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.');
    entryAmount = entryAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    var discountAmount = inputDiscountAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');

    if (entryAmount == 0 || totalAmount == 0) {} else {
        inputEntryAmountPercentage.value = ((entryAmount / totalAmount) * 100).toFixed(2).replace('.', ',');
        inputFinancedAmount.value = formatter.format(totalAmount - entryAmount - discountAmount);
    }
}

function updateDiscountAmount(percentageDiscount) {

    var totalAmount = inputTotalAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    percentageDiscount = percentageDiscount.value.replace(',', '.');
    var discountAmount = totalAmount * (percentageDiscount / 100);
    inputDiscountAmount.value = formatter.format(discountAmount.toFixed(2));
    if (percentageDiscount == "") {
        inputTotalAmount.value = formatter.format(totalAmountTable.innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.'));
        inputDiscountPercentage.value = "0";
    } else if (percentageDiscount > 100) {

        console.log("Não pode colocar um valor maior que 100!");
        inputDiscountPercentage.value = oldDiscountPercentageValue + ",00";
        percentageDiscount = inputDiscountPercentage.value.replace(/[^0-9,]*/g, '').replace(',', '.');
        inputDiscountAmount.value = formatter.format((totalAmount * (percentageDiscount / 100)).toFixed(2));
    } else
        inputTotalAmount.value = formatter.format(totalAmount - discountAmount);
}

function updateDiscountPercentage(discountAmount) {

    var totalAmount = inputTotalAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    discountAmount = discountAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');
    entryAmount = inputEntryAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');

    if (discountAmount == "" || discountAmount == 0 || totalAmount == 0) {
        inputTotalAmount.value = formatter.format(totalAmountTable.innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.'));
        inputDiscountPercentage.value = "0";
    } else {
        inputDiscountPercentage.value = ((discountAmount / totalAmount) * 100).toFixed(2).replace('.', ',');
        inputTotalAmount.value = formatter.format(totalAmount - discountAmount);

    }

}

function updateParcelAmount(selectParcel) {

    var parcelPaymentSelected = selectParcel.value.length == 2 ? selectParcel.value.substring(0, 1) : selectParcel.value.substring(0, 2)
    var totalAmountToPay = parseFloat(totalAmountTable.innerHTML.replace(/[^0-9,]*/g, '').replace(',', '.'));
    var newTotalAmountToPay = totalAmountToPay + (totalAmountToPay * (machineCardSelected.interestRate[parcelPaymentSelected - 1] / 100));
    inputTotalAmount.value = formatter.format(newTotalAmountToPay);
    inputParcelAmount.value = formatter.format(newTotalAmountToPay / parcelPaymentSelected);
}

function checkEnviroments() {

    var totalAmount = 0;
    var totalEnviroments = 0;
    for (var i = 1; i < table.rows.length - 1; i++) {
        var row = table.rows[i];
        if (row.cells[0].firstChild.checked) {
            totalEnviroments++;
            var amount = row.cells[4].innerHTML.split(";")[1];
            if (amount != undefined)
                totalAmount += +amount.replace(/[^0-9,]*/g, '').replace(',', '.');
        }
    }

    inputQtdProducts.value = totalEnviroments;
    inputTotalAmount.value = formatter.format(totalAmount);
    totalAmountTable.innerHTML = formatter.format(totalAmount);

    var totalAmount = inputTotalAmount.value.replace(/[^0-9,]*/g, '').replace(',', '.');

    updateEntryAmount(inputEntryAmountPercentage);
    updateEntryPercentage(inputEntryAmount);
    updateDiscountAmount(inputDiscountPercentage);
    updateDiscountPercentage(inputDiscountAmount)
    updateParcelAmount(selectParcel);
}
const gosNumber = document.getElementById('gos-number');
const date = document.getElementById('date');
const passSeries = document.getElementById('pass-series');
const passNum = document.getElementById('pass-num');
const when = document.getElementById('when');
const inputs = document.querySelectorAll('input');
const submit = document.getElementById('submit-button');
const cancel = document.getElementById('cancel-button');

function saveInputValues() {
  gosNumberCheck(gosNumber);
  dateCheck(date);
  passCheck(passSeries);
  passCheck(passNum);
  dateCheck(when);
  inputs.forEach(input => {
      localStorage.setItem(input.id, input.value);
  });
}

function loadInputValues() {
  inputs.forEach(input => {
      const savedValue = localStorage.getItem(input.id);
      if (savedValue) {
          input.value = savedValue;
      }
  });
}

document.addEventListener('DOMContentLoaded', loadInputValues);
inputs.forEach(input => {
  input.addEventListener('input', saveInputValues);
});

gosNumber.addEventListener('input', function() {
    gosNumberCheck(this);
});

date.addEventListener('input', function() {
    dateCheck(this);
});

passSeries.addEventListener('input', function() {
    passCheck(this, 4);
});

passNum.addEventListener('input', function() {
    passCheck(this, 6);
});

when.addEventListener('input', function() {
    dateCheck(this);
});

function gosNumberCheck(input) {
  let value = input.value;
  let formatted = "";

  value = value.toUpperCase();
  value = value.replace(/[^АВЕКМНОРСТУ0-9]/g, "");
  if (value.length > 6) {
    value = value.slice(0, 6);
  }

  if (value.length >= 1 && isNaN(value.charAt(0))) {
    formatted += value.charAt(0);
  }
  if (value.length >= 2 && !isNaN(value.charAt(1))) {
    formatted += value.charAt(1);
  }
  if (value.length >= 3 && !isNaN(value.charAt(2))) {
    formatted += value.charAt(2);
  }
  if (value.length >= 4 && !isNaN(value.charAt(3))) {
    formatted += value.charAt(3);
  }
  if (value.length >= 5 && isNaN(value.charAt(4))) {
    formatted += value.charAt(4);
  }
  if (value.length >= 6 && isNaN(value.charAt(5))) {
    formatted += value.charAt(5);
  }

  input.value = formatted;
}

function dateCheck(input) {
  let value = input.value; 
  let formatted = "";

  value = value.replace(/[^\d\.]/g, "");
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  if (value.length >= 1 && !isNaN(value.charAt(0))) {
    if (Number(value.charAt(0)) < 4) formatted += value.charAt(0);
  }
  if (value.length >= 2 && !isNaN(value.charAt(1))) {
    let num1 = Number(value.charAt(0));
    let num2 = Number(value.charAt(1));
    if ((num1 == 0 && num2 > 0) || (num1 > 0 && num1 < 3) || (num1 == 3 && num2 < 2)) {
      formatted += value.charAt(1);
      formatted += '.';
    } 
  }
  if (value.length >= 4 && !isNaN(value.charAt(3))) {
    if (Number(value.charAt(3)) < 2) formatted += value.charAt(3);
  }
  if (value.length >= 5 && !isNaN(value.charAt(4))) {
    let num1 = Number(value.charAt(3));
    let num2 = Number(value.charAt(4));
    if((num1 == 0 && num2 > 0) || (num1 == 1 && num2 < 3)) {
      formatted += value.charAt(4);
      formatted += '.';
    }
  }
  if (value.length >= 7 && !isNaN(value.charAt(6))) {
    if (Number(value.charAt(6)) < 3) formatted += value.charAt(6);
  }
  if (value.length >= 8 && !isNaN(value.charAt(7))) {
    let num1 = Number(value.charAt(6));
    let num2 = Number(value.charAt(7));
    if((num1 == 0 || num1 == 1) || (num1 == 2 && num2 < 1)) {
      formatted += value.charAt(7);
    }
  }
  if (value.length >= 9 && !isNaN(value.charAt(8))) {
    formatted += value.charAt(8);
  }
  if (value.length >= 10 && !isNaN(value.charAt(9))) {
    formatted += value.charAt(9);
  }


  input.value = formatted;
}

function passCheck(input, num) {
  let value = input.value; 
  let formatted = "";

  value = value.replace(/[^\d]/g, "");
  if (value.length > num) {
    value = value.slice(0, num);
  }

  input.value = value;
}

submit.addEventListener('click', (event) => {
  event.preventDefault();
  let allFilled = true;
  let formData = {};

  for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
          allFilled = false;
          break;
      }

      let inputName = inputs[i].placeholder;
      let inputValue = inputs[i].value;

      if (!formData[inputName]) {
          formData[inputName] = {};
      }

      formData[inputName].value = inputValue;
      formData[inputName].label = inputs[i].placeholder;
  }

  if (gosNumber.value.length !== 6) {
      allFilled = false;
      alert('Недостаточное количество символов в поле "Гос-номер"');
  }

  if (date.value.length !== 10) {
      allFilled = false;
      alert('Недостаточное количество символов в поле "Ориентировочная дата прибытия к покупателю"');
  }

  if (passSeries.value.length !== 4) {
      allFilled = false;
      alert('Недостаточное количество символов в поле "Серия"');
  }

  if (passNum.value.length !== 6) {
      allFilled = false;
      alert('Недостаточное количество символов в поле "Номер"');
  }

  if (when.value.length !== 10) {
    allFilled = false;
    alert('Недостаточное количество символов в поле "Когда выдан"');
  }

  if (allFilled) {
      alert("Все поля заполнены правильно и данные записаны в консоль");
      console.log(formData);
  } else {
      alert("Одно или несколько полей не заполнены или заполнены неправильно");
  }
});

cancel.addEventListener('click', function() {
  inputs.forEach(input => {
    localStorage.removeItem(input.id);
      input.value = '';
  });
});
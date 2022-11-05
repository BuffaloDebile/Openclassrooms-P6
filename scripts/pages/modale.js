const closeContact = document.querySelector('.close-contact');
const errorMsgContact = document.querySelectorAll('.message-erreur');
const submitContact = document.querySelector('.submit-form');
const formInputs = document.querySelectorAll('form.modal-form input');
const formTextArea = document.querySelector('textarea.input-message');
const modalWindow = document.getElementById('modal-window');
const modal = document.querySelector('.modal');
const mainContent = document.getElementById('main-photographe');
const form = document.querySelector('form#contact');
const modalTitle = document.querySelector('.modal-title');
const thankYou = document.querySelector('.modal-thanks');

let isAnimating = false;

const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const inputsValidity = {
  name: false,
  lastName: false,
  email: false,
  message: false,
};

function openContactModal() {
  modal.style.visibility = 'visible;';
  modalWindow.classList.add('open');
  document.body.classList.add('modal-open-antiscroll');
  modalWindow.ariaHidden = 'false';
  mainContent.ariaHidden = 'true';
  thankYou.style.display = 'none';
  modalTitle.style.display = 'block';
}

function closeContactModal() {
  modalWindow.classList.remove('open');
  document.body.classList.remove('modal-open-antiscroll');
  modalWindow.ariaHidden = 'true';
  mainContent.ariaHidden = 'false';
  form.style.display = 'block';
  thankYou.style.display = 'none';
  modalTitle.style.display = 'block';
  resetForm();
}

function showValidation(errorMsgIndex, inputindex, isvalid) {
  if (isvalid) {
    errorMsgContact[errorMsgIndex].style.display = 'none';
    formInputs[inputindex].style.outline = 'none';
  } else {
    errorMsgContact[errorMsgIndex].style.display = 'block';
    formInputs[inputindex].style.outline = '2px solid red';
  }
}

function nameValidation() {
  if (formInputs[0].value.length >= 3) {
    inputsValidity.name = true;
    showValidation(0, 0, true);
  } else {
    inputsValidity.name = false;
    showValidation(0, 0, false);
  }
}

function lastnameValidation() {
  if (formInputs[1].value.length >= 3) {
    inputsValidity.lastName = true;
    showValidation(1, 1, true);
  } else {
    inputsValidity.lastName = false;
    showValidation(1, 1, false);
  }
}

function emailValidation() {
  if (regexEmail.test(formInputs[2].value)) {
    inputsValidity.email = true;
    showValidation(2, 2, true);
  } else {
    inputsValidity.email = false;
    showValidation(2, 2, false);
  }
}

function textareaValidation() {
  if (formTextArea.value.length >= 10 && formTextArea.value.length <= 150) {
    errorMsgContact[3].style.display = 'none';
    formTextArea.style.outline = 'none';
    inputsValidity.message = true;
  } else {
    errorMsgContact[3].style.display = 'block';
    formTextArea.style.outline = '2px solid red';
  }
}

function resetForm() {
  form.reset();
  formInputs.forEach((input) => {
    input.value = '';
  });
  formTextArea.value = '';
  inputsValidity.name = false;
  inputsValidity.lastName = false;
  inputsValidity.email = false;
  inputsValidity.message = false;
}

function handleForm(e) {
  e.preventDefault();

  const keys = Object.keys(inputsValidity);

  const failedInputs = keys.filter((key) => !inputsValidity[key]);

  console.log(failedInputs);

  if (failedInputs.length && !isAnimating) {
    isAnimating = true;
    form.classList.add('shake');

    nameValidation();
    lastnameValidation();
    emailValidation();
    textareaValidation();

    setTimeout(() => {
      form.classList.remove('shake');
    }, 400);
    isAnimating = false;
  } else {
    form.style.display = 'none';
    thankYou.style.display = 'block';
    modalTitle.style.display = 'none';
    formInputs.forEach((input) => {
      console.log(input.value);
    });
    console.log(formTextArea.value);
    resetForm();
  }
}

window.onload = function () {
  const btnContact = document.querySelector('.banner-photographer-btn');
  btnContact.addEventListener('click', openContactModal);

  closeContact.addEventListener('click', closeContactModal);

  formInputs[0].addEventListener('blur', nameValidation);
  formInputs[0].addEventListener('input', nameValidation);

  formInputs[1].addEventListener('blur', lastnameValidation);
  formInputs[1].addEventListener('input', lastnameValidation);

  formInputs[2].addEventListener('blur', emailValidation);
  formInputs[2].addEventListener('input', emailValidation);

  formTextArea.addEventListener('blur', textareaValidation);
  formTextArea.addEventListener('input', textareaValidation);

  form.addEventListener('submit', handleForm);
};

// Close modal on click outside
window.onclick = (e) => {
  if (e.target == modalWindow) {
    closeContactModal();
  }
};

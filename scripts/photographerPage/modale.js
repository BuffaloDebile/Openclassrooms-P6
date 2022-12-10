/* eslint-disable semi */
const errorMsgContact = document.querySelectorAll('.message-erreur');
const modalWindow = document.getElementById('modal-window');
const modal = document.querySelector('.modal');
const mainContent = document.getElementById('main-photographe');
const formInputs = document.querySelectorAll('form.modal-form input');
const formTextArea = document.querySelector('textarea.input-message');
const form = document.querySelector('form#contact');
const modalTitle = document.querySelector('.modal-title');
const thankYou = document.querySelector('.modal-thanks');
const closeContact = document.querySelector('.close-contact');

let isAnimating = false;

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const inputsValidity = {
  name: false,
  lastName: false,
  email: false,
  message: false
};

export function closeContactModal () {
  const form = document.querySelector('form#contact');

  modal.style.visibility = 'hidden';
  modalWindow.classList.remove('open');
  document.body.classList.remove('modal-open-antiscroll');
  modalWindow.ariaHidden = 'true';
  mainContent.ariaHidden = 'false';
  form.style.display = 'block';
  thankYou.style.display = 'none';
  modalTitle.style.display = 'block';
  resetForm();
}

export function openContactModal () {
  modal.style.visibility = 'visible';
  modalWindow.classList.add('open');
  document.body.classList.add('modal-open-antiscroll');
  modalWindow.ariaHidden = 'false';
  mainContent.ariaHidden = 'true';
  thankYou.style.display = 'none';
  modalTitle.style.display = 'block';
}

export function showValidation (errorMsgIndex, inputindex, isvalid) {
  const formInputs = document.querySelectorAll('form.modal-form input');
  if (isvalid) {
    errorMsgContact[errorMsgIndex].style.display = 'none';
    formInputs[inputindex].style.outline = 'none';
  } else {
    errorMsgContact[errorMsgIndex].style.display = 'block';
    formInputs[inputindex].style.outline = '2px solid red';
  }
}

export function nameValidation () {
  const formInputs = document.querySelectorAll('form.modal-form input');
  if (formInputs[0].value.length >= 3) {
    inputsValidity.name = true;
    showValidation(0, 0, true);
  } else {
    inputsValidity.name = false;
    showValidation(0, 0, false);
  }
}

export function lastnameValidation () {
  const formInputs = document.querySelectorAll('form.modal-form input');
  if (formInputs[1].value.length >= 3) {
    inputsValidity.lastName = true;
    showValidation(1, 1, true);
  } else {
    inputsValidity.lastName = false;
    showValidation(1, 1, false);
  }
}

export function emailValidation () {
  const formInputs = document.querySelectorAll('form.modal-form input');
  if (regexEmail.test(formInputs[2].value)) {
    inputsValidity.email = true;
    showValidation(2, 2, true);
  } else {
    inputsValidity.email = false;
    showValidation(2, 2, false);
  }
}

export function textareaValidation () {
  const formTextArea = document.querySelector('textarea.input-message');
  if (formTextArea.value.length >= 10 && formTextArea.value.length <= 150) {
    errorMsgContact[3].style.display = 'none';
    formTextArea.style.outline = 'none';
    inputsValidity.message = true;
  } else {
    errorMsgContact[3].style.display = 'block';
    formTextArea.style.outline = '2px solid red';
  }
}

export function resetForm () {
  const form = document.querySelector('form#contact');
  const formInputs = document.querySelectorAll('form.modal-form input');
  const formTextArea = document.querySelector('textarea.input-message');

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

export function handleForm (e) {
  e.preventDefault();

  const form = document.querySelector('form#contact');
  const formInputs = document.querySelectorAll('form.modal-form input');
  const formTextArea = document.querySelector('textarea.input-message');

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

// Prevent animation from playing on page load
window.addEventListener('load', function () {
  document.body.classList.remove('preload');
});

formInputs[0].addEventListener('blur', nameValidation);
formInputs[0].addEventListener('input', nameValidation);

formInputs[1].addEventListener('blur', lastnameValidation);
formInputs[1].addEventListener('input', lastnameValidation);

formInputs[2].addEventListener('blur', emailValidation);
formInputs[2].addEventListener('input', emailValidation);

formTextArea.addEventListener('blur', textareaValidation);
formTextArea.addEventListener('input', textareaValidation);

form.addEventListener('submit', handleForm);

closeContact.addEventListener('click', closeContactModal);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && modal.style.visibility === 'visible') {
    closeContactModal();
  }
});

// Close modal on click outside
window.onclick = (e) => {
  if (e.target === modalWindow) {
    closeContactModal();
  }
};

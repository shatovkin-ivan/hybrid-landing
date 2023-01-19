'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var telFields = document.querySelectorAll('input[name="tel"]');
  telFields.forEach(function (field) {
    if (field) {
      field.addEventListener("input", function () {
        if (field.value.length) {
          if (field.value.match(/\d/g).length < 11) {
            field.closest(".field-wrap").classList.add("error");
            field.setAttribute("formnovalidate", "");
            field.closest('.field-wrap').querySelector('.error-text').textContent = "Заполните поле";
          } else {
            field.closest(".field-wrap").classList.remove("error");
            field.removeAttribute("formnovalidate", "");
            field.closest('.field-wrap').querySelector('.error-text').textContent = '';
          }
        }
      });
      var telMask = new Inputmask("+7 (999) 999-99-99");
      telMask.mask(field);
    }
  });
  var textAreaFields = document.querySelectorAll('textarea[name="message"]');
  var mailFields = document.querySelectorAll('input[name="email"]');
  var nameInputs = document.querySelectorAll('input[name="name"]');

  function setFieldMaxLength(fields, length) {
    fields.forEach(function (field) {
      if (field) {
        field.setAttribute('maxlength', length);
      }
    });
  }

  setFieldMaxLength(textAreaFields, 250);
  setFieldMaxLength(mailFields, 64);
  setFieldMaxLength(nameInputs, 32);
  mailFields.forEach(function (field) {
    if (field) {
      field.addEventListener('input', function () {
        var regular = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!field.value.match(regular)) {
          field.closest(".field-wrap").classList.add("error");
          field.setAttribute("formnovalidate", "");
          field.closest('.field-wrap').querySelector('.error-text').textContent = "Заполните поле";
        } else {
          field.closest(".field-wrap").classList.remove("error");
          field.removeAttribute("formnovalidate", "");
          field.closest('.field-wrap').querySelector('.error-text').textContent = '';
        }
      });
    }
  });
  var openModalBtn = document.querySelectorAll('.open-modal');
  openModalBtn.forEach(function (btn) {
    if (btn) {
      btn.addEventListener('click', function (e) {
        openModal(e);
      });
    }
  });
  var closeBtns = document.querySelectorAll('.modal__close');
  closeBtns.forEach(function (closeBtn) {
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        closeModal(e);
      });
    }
  });
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function (modal) {
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeModal(e);
        }
      });
    }
  });
  var animateTargets = document.querySelectorAll('.animateElement');
  animateTargets.forEach(function (animateTarget) {
    if (animateTarget) {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > animateTarget.getBoundingClientRect().top) {
          animateTarget.classList.add('animated');
        } else {
          animateTarget.classList.remove('animated');
        }
      });
    }
  });

  function getScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    var inner = document.createElement('div');
    outer.appendChild(inner);
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
  }

  function openModal(event) {
    var body = document.querySelector('body');
    var btnAttr = event.target.getAttribute('data-btn');
    var desiredModal = document.querySelector(".modal[data-modal=".concat(btnAttr, "]"));

    if (desiredModal) {
      desiredModal.classList.add('active');
      body.classList.add('hidden');
      body.style.paddingRight = getScrollbarWidth() + 'px';
    }
  }

  function closeModal(event) {
    var body = document.querySelector('body');

    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
      body.classList.remove('hidden');
      body.style.paddingRight = 0 + 'px';
    }

    if (event.target.closest('.modal').classList.contains('active')) {
      event.target.closest('.modal').classList.remove('active');
      body.classList.remove('hidden');
      body.style.paddingRight = 0 + 'px';
    }
  }
});
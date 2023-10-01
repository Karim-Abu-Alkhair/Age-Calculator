const months = [4, 6, 9, 11];
const form = document.querySelector(".form");
const btn = document.querySelector(".btn");
const label = document.querySelectorAll(".form__item__label");
const inputField = document.querySelectorAll(".input");
const dashes = document.querySelector(".dashes");

//this field is required
const emptyMonth = document.querySelector(".empty--month");
const emptyDay = document.querySelector(".empty--day");
const emptyYear = document.querySelector(".empty--year");

//invalid field
const errorMonth = document.querySelector(".error--month");
const errorDay = document.querySelector(".error--day");
const errorYear = document.querySelector(".error--year");
const wholeError = document.querySelector(".whole-error");

// Get current date data
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

//inputs
const dayOutline = document.getElementById("form__day__input");
const monthOutline = document.getElementById("form__month__input");
const yearOutline = document.getElementById("form__year__input");

//output date
const calculatedYear = document.querySelector(".years");
const calculatedMonths = document.querySelector(".months");
const calculatedDays = document.querySelector(".days");

const invalidAndEmpty = function (emptyName, errorOutlineNAme, i) {
  emptyName.classList.remove("hidden");
  errorOutlineNAme.classList.add("input-red");
  label.forEach((item, i) => label[i].classList.add("invalid"));
};

const removeInvalidAndEmpty = function (emptyName, errorOutlineNAme, i) {
  emptyName.classList.add("hidden");
  errorOutlineNAme.classList.remove("input-red");
  label.forEach((item, i) => label[i].classList.remove("invalid"));
};

const wholeDateError = function () {
  dayOutline.classList.add("input-red");
  monthOutline.classList.add("input-red");
  yearOutline.classList.add("input-red");
  wholeError.classList.remove("hidden");
  label.forEach((item, i) => label[i].classList.add("invalid"));
  yearOutline.blur();
};
///////////////////////////////////////////////////////

btn.addEventListener("click", (e) => {
  // prevent the form from submitting
  e.preventDefault();
  //changing btn color
  btn.classList.add("active");
  setTimeout(function () {
    if (e) {
      btn.classList.remove("active");
    }
  }, 250);

  // Get the form values
  const formData = new FormData(form);
  const values = [...formData.entries()];
  // console.log(values);
  const inputDay = formData.get("day");
  const inputMonth = formData.get("month");
  const inputYear = formData.get("year");

  /////////////////////////////////////////////////////////////////////////////
  //When input fields are empty
  if (!inputDay) {
    invalidAndEmpty(emptyDay, dayOutline, 0);
  } else {
    removeInvalidAndEmpty(emptyDay, dayOutline, 0);
  }

  if (!inputMonth) {
    invalidAndEmpty(emptyMonth, monthOutline, 1);
  } else {
    removeInvalidAndEmpty(emptyMonth, monthOutline, 1);
  }

  if (!inputYear) {
    invalidAndEmpty(emptyYear, yearOutline, 2);
  } else {
    removeInvalidAndEmpty(emptyYear, yearOutline, 2);
  }

  if (!inputDay || !inputMonth || !inputYear) return;

  ///////////////////////////////////////////////////////////////////////////
  //showing invalid messages & red outline

  if (inputDay) {
    if (inputDay <= 0 || inputDay > 31) {
      invalidAndEmpty(errorDay, dayOutline, 0);
      dayOutline.blur();
      return;
    } else {
      removeInvalidAndEmpty(errorDay, dayOutline, 0);
    }
  }

  if (inputYear) {
    if (inputYear > currentYear || inputYear <= 0) {
      invalidAndEmpty(errorYear, yearOutline, 2);
      yearOutline.blur();
      return;
    } else {
      removeInvalidAndEmpty(errorYear, yearOutline, 2);
    }
  }

  if (inputMonth) {
    if (inputMonth <= 0 || inputMonth > 12) {
      invalidAndEmpty(errorMonth, monthOutline, 1);
      monthOutline.blur();
      return;
    } else {
      removeInvalidAndEmpty(errorMonth, monthOutline, 1);
    }

    //whole date wrong
    for (let i = 0; i < months.length; i++) {
      if (+inputMonth === months[i]) {
        if (inputDay >= 31) {
          wholeDateError();
          return;
        }
      }
    }

    if (+inputMonth === 2) {
      if (inputDay >= 29) {
        wholeDateError();
        return;
      }
    }
  }

  // calculate user age
  calculatedYear.textContent = Math.abs(currentYear - inputYear);
  calculatedMonths.textContent = Math.abs(currentMonth - inputMonth);
  calculatedDays.textContent = Math.abs(currentDay - inputDay);
});

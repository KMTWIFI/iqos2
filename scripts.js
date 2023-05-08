// scripts.js
$(document).ready(function () {
    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementsByClassName("close")[0];

    const swiper = new Swiper('.swiper-container', {
        allowTouchMove: false,
        noSwiping: true,
    });

    let iti;

    $('#button1').on('click', function () {
        swiper.slideNext();
    });

    $('#button2').on('click', function () {
        window.location.href = 'http://kmt-group.instawp.xyz/';
    });

$('#yesBtn').on('click', function () {
  modal.style.display = "block";


        // Initialize intl-tel-input if it has not been initialized yet
        if (!iti) {
            const phoneInput = document.querySelector("#phone");
            iti = intlTelInput(phoneInput, {
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
                 initialCountry: "eg",
            });
        }
        closeBtn.onclick = function () {
          modal.style.display = "none";
        };

        window.onclick = function (event) {
          if (event.target === modal) {
            modal.style.display = "none";
  }}
    });

    $('#noBtn').on('click', function () {
        window.location.href = 'http://kmt-group.instawp.xyz/';
    });
    


    $('form').on('submit', function (event) {
        event.preventDefault();

        // Validate the name field
        const name = $('#name').val().trim();
        if (name.length < 3) {
            alert('Name should be at least 3 characters');
            return;
        }

        // Validate the phone field
        if (!iti.isValidNumber()) {
            alert('Please enter a valid phone number');
            return;
        }

        // Perform any additional data processing here
        const phoneNumber = iti.getNumber();

        // Redirect to the specified URL
        window.location.href = 'http://kmt-group.instawp.xyz/';
    });
});

const video = document.getElementById('my-video');
const yesButton = document.getElementById('yesBtn');
const noButton = document.getElementById('noBtn');
const hintMessage = document.getElementById('hint-message');
let countdownInterval;

video.addEventListener('play', () => {
    let remainingTime = Math.ceil(video.duration - video.currentTime);
    updateHintMessage(remainingTime);
    countdownInterval = setInterval(() => {
        remainingTime -= 1;
        updateHintMessage(remainingTime);
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            hintMessage.innerHTML = '';
            yesButton.disabled = false;
            noButton.disabled = false;
        }
    }, 1000);
});

video.addEventListener('pause', () => {
    clearInterval(countdownInterval);
});

function updateHintMessage(remainingTime) {
    const timeText = remainingTime === 1 ? 'ثانية' : 'ثواني';
    hintMessage.innerHTML = `يمكنك المتابعة في خلال ${remainingTime} ${timeText}`;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function updateDays() {
  const daySelect = document.getElementById('day');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');

  const month = parseInt(monthSelect.value, 10);
  const year = parseInt(yearSelect.value, 10);

  if (isNaN(month) || isNaN(year)) {
    return;
  }

  const days = daysInMonth(month, year);
  const currentDay = parseInt(daySelect.value, 10);

  daySelect.innerHTML = '<option value="">يوم</option>';

  for (let i = 1; i <= days; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  if (currentDay > 0 && currentDay <= days) {
    daySelect.value = currentDay;
  }
}

// Add the updateDays function to the populateMonths function
function populateMonths() {
  const monthSelect = document.getElementById('month');
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    monthSelect.appendChild(option);
  }
  monthSelect.addEventListener('change', updateDays);
}

// Add the updateDays function to the populateYears function
function populateYears(startYear) {
  const yearSelect = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  for (let i = startYear; i <= currentYear; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
  yearSelect.addEventListener('change', updateDays);
}


// Populate the date dropdowns
populateMonths();
populateYears(1950);
updateDays();

// scripts.js
$(document).ready(function () {
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
        $('.question-container').hide();
        $('.video-container').hide();
        $('.form-container').show();
        $('.rounded-box2').show();

        // Initialize intl-tel-input if it has not been initialized yet
        if (!iti) {
            const phoneInput = document.querySelector("#phone");
            iti = intlTelInput(phoneInput, {
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
                 initialCountry: "eg",
            });
        }
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

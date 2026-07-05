document.addEventListener('DOMContentLoaded', function () {
    const profileOverlay = document.querySelector('.profile-switcher-overlay');
    const pinOverlay = document.querySelector('.profile-pin-overlay');
    const pinInputs = Array.from(document.querySelectorAll('.profile-pin-input'));
    const switchButton = document.querySelector('.profile-pin-submit, .profile-pin-btn');
    const errorText = document.querySelector('.profile-pin-error');
    const backButton = document.querySelector('.profile-pin-back');
    const profileCards = document.querySelectorAll('.profile-switcher-card');
    const navbarAvatar = document.querySelectorAll('.user-dropdown-toggle img');
    const dropdownName = document.querySelectorAll('.user-dropdown-profile-text strong, .user-dropdown-profile-text span');

    let pendingProfile = null;

    function closePinModal() {
        if (pinOverlay) {
            pinOverlay.classList.remove('is-open');
        }
        document.body.style.overflow = '';
    }

    function resetPins() {
        pinInputs.forEach(function (input) {
            input.value = '';
        });
        if (pinInputs.length) {
            pinInputs[0].focus();
        }
        if (errorText) {
            errorText.textContent = '';
        }
    }

    function openPinModal(profileCard) {
        pendingProfile = profileCard;
        resetPins();
        if (pinOverlay) {
            pinOverlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
    }

    profileCards.forEach(function (card) {
        card.addEventListener('click', function () {
            openPinModal(card);
        });
    });

    if (backButton) {
        backButton.addEventListener('click', function (event) {
            event.preventDefault();
            closePinModal();
            if (profileOverlay) {
                profileOverlay.classList.add('is-open');
            }
        });
    }

    if (pinOverlay) {
        pinOverlay.addEventListener('click', function (event) {
            if (event.target === pinOverlay) {
                closePinModal();
                if (profileOverlay) {
                    profileOverlay.classList.add('is-open');
                }
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && pinOverlay && pinOverlay.classList.contains('is-open')) {
            closePinModal();
            if (profileOverlay) {
                profileOverlay.classList.add('is-open');
            }
        }
    });

    pinInputs.forEach(function (input, index) {
        input.addEventListener('input', function (event) {
            const value = event.target.value.replace(/\D/g, '').slice(0, 1);
            event.target.value = value;

            if (value && index < pinInputs.length - 1) {
                pinInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' && !input.value && index > 0) {
                pinInputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', function (event) {
            event.preventDefault();
            const pasteData = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 4);
            pasteData.split('').forEach(function (char, pasteIndex) {
                if (pinInputs[pasteIndex]) {
                    pinInputs[pasteIndex].value = char;
                }
            });
            const lastFilled = pinInputs[Math.min(pasteData.length, pinInputs.length - 1)];
            if (lastFilled) {
                lastFilled.focus();
            }
        });
    });

    if (switchButton) {
        switchButton.addEventListener('click', function () {
            const enteredPin = pinInputs.map(function (input) { return input.value; }).join('');

            if (enteredPin != '1234') {
                if (errorText) {
                    errorText.textContent = 'Incorrect PIN. Try again.';
                }
                resetPins();
                return;
            }

            if (pendingProfile) {
                if (window.EmboProfileSwitcher && typeof window.EmboProfileSwitcher.switchProfile === 'function') {
                    window.EmboProfileSwitcher.switchProfile(pendingProfile);
                } else {
                    profileCards.forEach(function (card) {
                        card.classList.remove('is-active');
                    });
                    pendingProfile.classList.add('is-active');

                    const avatarSrc = pendingProfile.getAttribute('data-avatar');
                    const profileName = pendingProfile.getAttribute('data-name');

                    navbarAvatar.forEach(function (img) {
                        if (avatarSrc) {
                            img.setAttribute('src', avatarSrc);
                        }
                    });

                    dropdownName.forEach(function (element) {
                        if (element.tagName === 'STRONG') {
                            element.textContent = 'Hello,';
                        } else if (element.tagName === 'SPAN') {
                            element.textContent = profileName;
                        }
                    });
                }
            }

            closePinModal();
            if (profileOverlay) {
                profileOverlay.classList.remove('is-open');
            }
        });
    }
});

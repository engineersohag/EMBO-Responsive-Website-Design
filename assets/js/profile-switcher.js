document.addEventListener('DOMContentLoaded', function () {
    const modalOverlay = document.querySelector('.profile-switcher-overlay');
    const modal = document.querySelector('.profile-switcher-modal');
    const backButton = document.querySelector('.profile-switcher-back');
    const triggerButtons = document.querySelectorAll('.user-dropdown-profile-arrow');
    const profileCards = document.querySelectorAll('.profile-switcher-card');
    const navbarAvatar = document.querySelectorAll('.user-dropdown-toggle img');
    const dropdownName = document.querySelectorAll('.user-dropdown-profile-text strong, .user-dropdown-profile-text span');

    if (!modalOverlay || !modal) return;

    function switchProfile(card) {
        const avatarSrc = card.getAttribute('data-avatar');
        const profileName = card.getAttribute('data-name');

        profileCards.forEach(function (item) {
            item.classList.remove('is-active');
        });

        card.classList.add('is-active');

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

        closeModal();
    }

    function closeModal() {
        modalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function openModal() {
        modalOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    triggerButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            openModal();
        });
    });

    if (backButton) {
        backButton.addEventListener('click', function (event) {
            event.preventDefault();
            closeModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    profileCards.forEach(function (card) {
        card.addEventListener('click', function () {
            switchProfile(card);
        });
    });

    window.EmboProfileSwitcher = {
        switchProfile: switchProfile,
        closeModal: closeModal,
        openModal: openModal
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.querySelector('.active-tv-overlay');
    const modal = document.querySelector('.active-tv-modal');
    const closeButton = document.querySelector('.active-tv-close');
    const input = document.querySelector('.active-tv-input');
    const activateButton = document.querySelector('.active-tv-btn');
    const errorText = document.querySelector('.active-tv-error');
    const successText = document.querySelector('.active-tv-success');

    if (!overlay || !modal) return;

    function openModal() {
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (input) {
            setTimeout(function () {
                input.focus();
            }, 50);
        }
    }

    function closeModal() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        if (errorText) errorText.textContent = '';
        if (successText) successText.textContent = '';
        if (input) input.value = '';
    }

    document.addEventListener('click', function (event) {
        const trigger = event.target.closest('.active-tv-trigger');

        if (!trigger) return;

        event.preventDefault();
        event.stopPropagation();

        const dropdownContainer = trigger.closest('.user-dropdown');
        const dropdownToggle = dropdownContainer ? dropdownContainer.querySelector('.user-dropdown-toggle') : null;

        if (dropdownToggle && window.bootstrap && window.bootstrap.Dropdown) {
            const dropdownInstance = window.bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
            dropdownInstance.hide();
        } else if (dropdownContainer) {
            const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }

        openModal();
    });

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            closeModal();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (activateButton) {
        activateButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (!input || !input.value.trim()) {
                if (errorText) errorText.textContent = 'Please enter TV Code.';
                if (successText) successText.textContent = '';
                return;
            }

            if (errorText) errorText.textContent = '';
            if (successText) successText.textContent = 'Device activated successfully.';

            setTimeout(function () {
                closeModal();
            }, 1500);
        });
    }
});

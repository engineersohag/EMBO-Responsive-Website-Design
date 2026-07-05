document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('[data-password-toggle]');

    toggles.forEach((toggle) => {
        const selector = toggle.getAttribute('data-password-toggle');
        const input = selector ? document.querySelector(selector) : null;
        if (!input) return;

        toggle.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye', !isPassword);
                icon.classList.toggle('fa-eye-slash', isPassword);
            }

            toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    });
});


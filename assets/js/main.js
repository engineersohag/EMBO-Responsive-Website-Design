// Shared mobile navbar behavior
(function () {
    function injectNavbarStyles() {
        if (document.getElementById('embo-mobile-navbar-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'embo-mobile-navbar-styles';
        style.textContent = `
            .navbar-mobile-overlay {
                position: fixed;
                inset: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.35);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.25s ease;
                z-index: 1040;
            }

            .navbar-mobile-overlay.is-visible {
                opacity: 1;
                pointer-events: auto;
            }

            .navbar {
                position: relative;
                z-index: 1050;
            }

            .navbar .navbar-collapse {
                position: relative;
                z-index: 1055;
            }

            .navbar .navbar-toggler {
                position: relative;
                z-index: 1055;
            }

            .navbar .navbar-toggler .fa-solid {
                transition: opacity 0.2s ease, transform 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }

    function initMobileNavbar() {
        const collapseEl = document.getElementById('nav');
        const togglers = Array.from(document.querySelectorAll('.navbar-toggler[data-bs-toggle="collapse"][data-bs-target="#nav"]'));

        if (!collapseEl || !togglers.length) {
            return;
        }

        injectNavbarStyles();

        const overlay = document.createElement('div');
        overlay.className = 'navbar-mobile-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(overlay);

        let originalBodyOverflow = '';
        let originalBodyPaddingRight = '';

        function setIcons(isOpen) {
            togglers.forEach((toggler) => {
                const icon = toggler.querySelector('i');
                if (!icon) {
                    return;
                }

                icon.classList.remove('fa-bars', 'fa-xmark');
                icon.classList.add(isOpen ? 'fa-xmark' : 'fa-bars');
            });
        }

        function lockScroll() {
            originalBodyOverflow = document.body.style.overflow;
            originalBodyPaddingRight = document.body.style.paddingRight;

            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';

            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

            overlay.classList.add('is-visible');
        }

        function unlockScroll() {
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.paddingRight = originalBodyPaddingRight;
            overlay.classList.remove('is-visible');
        }

        collapseEl.addEventListener('shown.bs.collapse', function () {
            setIcons(true);
            lockScroll();
        });

        collapseEl.addEventListener('hidden.bs.collapse', function () {
            setIcons(false);
            unlockScroll();
        });

        overlay.addEventListener('click', function () {
            if (window.bootstrap && bootstrap.Collapse) {
                bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false }).hide();
                return;
            }

            togglers[0].click();
        });

        setIcons(collapseEl.classList.contains('show'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNavbar);
    } else {
        initMobileNavbar();
    }
})();

// Home Search bar
if (!window.__emboSearchInitialized) {
    const searchWrapper=document.querySelector(".search-wrapper");
    const searchToggle=document.querySelector(".search-toggle");

    if (searchWrapper && searchToggle) {
        searchToggle.addEventListener("click",()=>{
            searchWrapper.classList.toggle("active");
            if(searchWrapper.classList.contains("active")){
                searchWrapper.querySelector("input").focus();
            }
        });

        document.addEventListener("click",(e)=>{
            if(!searchWrapper.contains(e.target)){
                searchWrapper.classList.remove("active");
            }
        });

        document.addEventListener("keydown",(e)=>{
            if(e.key==="Escape"){
                searchWrapper.classList.remove("active");
            }
        });
    }
}
(function () {
    const homeSection = document.querySelector('.home');
    const heroCarousel = $('.hero-thumbnail-carousel');

    if (!heroCarousel.length || !homeSection) {
        return;
    }

    // কোন পেজ?
    const isTVPage = heroCarousel.hasClass('hero-thumbnail-carousel-tv');
    const isCategoryPage = heroCarousel.hasClass('hero-thumbnail-carousel-2');

    // Desktop Items
    const desktopItems = isTVPage ? 1 : (isCategoryPage ? 7 : 4);

    function syncHomeBackground(event) {
        const currentIndex =
            event && event.item && typeof event.item.index === 'number'
                ? event.item.index
                : 0;

        let currentSlide = heroCarousel.find('.owl-item').not('.cloned').eq(currentIndex);

        if (!currentSlide.length) {
            currentSlide = heroCarousel.find('.owl-item').eq(currentIndex);
        }

        const img = currentSlide.find('.hero-thumb-item img').attr('src');

        if (img) {
            homeSection.style.backgroundImage = `url('${img}')`;
        }
    }

    heroCarousel.on('initialized.owl.carousel changed.owl.carousel', syncHomeBackground);

    heroCarousel.owlCarousel({
        loop: true,
        center: true,
        margin: 10,

        // TV Page
        nav: !isTVPage,
        dots: isTVPage,

        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 400,

        responsive: {
            0: {
                items: isTVPage ? 1 : 1
            },
            480: {
                items: isTVPage ? 1 : 2
            },
            768: {
                items: isTVPage ? 1 : 3
            },
            992: {
                items: desktopItems
            }
        }
    });

})();

(function () {
    $('.movie-carousel').each(function () {
        $(this).owlCarousel({
            loop: true,
            margin: 15,
            nav: false,
            dots: false,
            mouseDrag: true,
            touchDrag: true,
            autoplay: false,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
    });

    // Watching Carousel
    $('.watching-carousel').each(function () {
        $(this).owlCarousel({
            loop: true,
            margin: 15,
            nav: false,
            dots: false,
            mouseDrag: true,
            touchDrag: true,
            autoplay: false,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 5
                }
            }
        });
    });

    const coverCarousel = document.querySelector('.big-carousel-track');
    const cards = Array.from(document.querySelectorAll('.big-carousel-card'));
    const prevBtn = document.querySelector('.big-carousel-prev');
    const nextBtn = document.querySelector('.big-carousel-next');

    if (coverCarousel && cards.length) {
        const positions = ['position-left-2', 'position-left', 'position-center', 'position-right', 'position-right-2'];
        const shell = document.querySelector('.big-carousel-shell');
        let activeIndex = 2;

        function updateShellBackground() {
            const activeCard = document.querySelector('.big-carousel-card.position-center');

            if (!shell || !activeCard) {
                return;
            }

            const bg = window.getComputedStyle(activeCard).backgroundImage;

            shell.style.backgroundImage = bg;
            shell.style.backgroundSize = 'cover';
            shell.style.backgroundPosition = 'center';
            shell.style.backgroundRepeat = 'no-repeat';
        }

        function renderCarousel() {
            cards.forEach((card, index) => {
                const offset = (index - activeIndex + cards.length) % cards.length;
                let positionClass = 'position-center';

                if (offset === 1 || offset === -4) {
                    positionClass = 'position-right';
                } else if (offset === 2 || offset === -3) {
                    positionClass = 'position-right-2';
                } else if (offset === 4 || offset === -1) {
                    positionClass = 'position-left';
                } else if (offset === 3 || offset === -2) {
                    positionClass = 'position-left-2';
                }

                card.classList.remove(...positions);
                card.classList.add(positionClass);
            });

            updateShellBackground();
        }

        function nextSlide() {
            activeIndex = (activeIndex + 1) % cards.length;
            renderCarousel();
        }

        function prevSlide() {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
            renderCarousel();
        }

        renderCarousel();

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            }
            if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        coverCarousel.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        coverCarousel.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].screenX;
            if (touchEndX - touchStartX < -40) {
                nextSlide();
            }
            if (touchEndX - touchStartX > 40) {
                prevSlide();
            }
        }, { passive: true });

        let autoRotate = setInterval(nextSlide, 5000);
        coverCarousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
        coverCarousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextSlide, 5000);
        });
    }
})();

(function () {
    const signupModal = document.querySelector('#signup');
    const otpModal = document.querySelector('#otpModal');

    if (!signupModal || !otpModal) {
        return;
    }

    const form = signupModal.querySelector('[data-signup-form]');
    const nameInput = signupModal.querySelector('[data-signup-name]');
    const emailInput = signupModal.querySelector('[data-signup-email]');
    const passwordInput = signupModal.querySelector('[data-signup-password]');
    const passwordToggle = signupModal.querySelector('[data-signup-password-toggle]');
    const nameFeedback = signupModal.querySelector('[data-signup-name-feedback]');
    const emailFeedback = signupModal.querySelector('[data-signup-email-feedback]');
    const passwordFeedback = signupModal.querySelector('[data-signup-password-feedback]');
    const otpEmail = otpModal.querySelector('[data-otp-email]');
    const otpInputs = Array.from(otpModal.querySelectorAll('.otp-input'));
    const otpFeedback = otpModal.querySelector('[data-otp-feedback]');
    const verifyBtn = otpModal.querySelector('[data-otp-verify]');
    const resendBtn = otpModal.querySelector('[data-otp-resend]');
    const OTP_CODE = '123456';
    const RESEND_SECONDS = 57;
    let timerId = null;
    let secondsLeft = RESEND_SECONDS;

    function setFieldError(input, feedback, message) {
        if (!input || !feedback) {
            return;
        }
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        feedback.textContent = message;
    }

    function clearFieldState(input, feedback) {
        if (!input || !feedback) {
            return;
        }
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
        feedback.textContent = '';
    }

    function resetOtpError() {
        otpInputs.forEach((input) => input.classList.remove('is-invalid'));
        if (otpFeedback) {
            otpFeedback.textContent = '';
        }
    }

    function clearOtpInputs() {
        otpInputs.forEach((input) => {
            input.value = '';
            input.classList.remove('is-invalid');
        });
        resetOtpError();
    }

    function getOtpValue() {
        return otpInputs.map((input) => input.value.trim()).join('');
    }

    function updateResendLabel() {
        if (!resendBtn) {
            return;
        }
        if (secondsLeft > 0) {
            resendBtn.textContent = `Resend OTP -${secondsLeft}`;
            resendBtn.disabled = true;
            resendBtn.classList.remove('is-active');
        } else {
            resendBtn.textContent = 'Resend OTP';
            resendBtn.disabled = false;
            resendBtn.classList.add('is-active');
        }
    }

    function startResendTimer() {
        if (timerId) {
            clearInterval(timerId);
        }
        secondsLeft = RESEND_SECONDS;
        updateResendLabel();
        timerId = window.setInterval(() => {
            secondsLeft -= 1;
            updateResendLabel();
            if (secondsLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
            }
        }, 1000);
    }

    function openOtpModal(email) {
        if (otpEmail) {
            otpEmail.textContent = email;
        }
        if (!window.bootstrap) {
            return;
        }
        const signupInstance = window.bootstrap.Modal.getInstance(signupModal) || new window.bootstrap.Modal(signupModal);
        const otpInstance = window.bootstrap.Modal.getInstance(otpModal) || new window.bootstrap.Modal(otpModal);
        const showOtp = () => {
            signupModal.removeEventListener('hidden.bs.modal', showOtp);
            otpInstance.show();
        };
        signupModal.addEventListener('hidden.bs.modal', showOtp, { once: true });
        signupInstance.hide();
    }

    function focusFirstOtp() {
        if (otpInputs[0]) {
            otpInputs[0].focus();
            otpInputs[0].select();
        }
    }

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const icon = passwordToggle.querySelector('i');
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            if (icon) {
                icon.className = isHidden ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
            }
        });
    }

    [nameInput, emailInput, passwordInput].forEach((input) => {
        if (!input) {
            return;
        }
        input.addEventListener('input', () => {
            if (input === nameInput) {
                clearFieldState(nameInput, nameFeedback);
            } else if (input === emailInput) {
                clearFieldState(emailInput, emailFeedback);
            } else {
                clearFieldState(passwordInput, passwordFeedback);
            }
        });
    });

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            resetOtpError();
            input.value = input.value.replace(/\D/g, '').slice(0, 1);
            if (input.value && otpInputs[index + 1]) {
                otpInputs[index + 1].focus();
                otpInputs[index + 1].select();
            }
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') {
                if (!input.value && otpInputs[index - 1]) {
                    otpInputs[index - 1].focus();
                    otpInputs[index - 1].value = '';
                }
                resetOtpError();
                return;
            }
            if (event.key === 'ArrowLeft' && otpInputs[index - 1]) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].select();
            }
            if (event.key === 'ArrowRight' && otpInputs[index + 1]) {
                otpInputs[index + 1].focus();
                otpInputs[index + 1].select();
            }
            if (event.key.length === 1 && /\D/.test(event.key)) {
                event.preventDefault();
            }
        });

        input.addEventListener('paste', (event) => {
            event.preventDefault();
            const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, otpInputs.length);
            if (!pasted) {
                return;
            }
            pasted.split('').forEach((char, pastedIndex) => {
                if (otpInputs[index + pastedIndex]) {
                    otpInputs[index + pastedIndex].value = char;
                }
            });
            const nextIndex = Math.min(index + pasted.length, otpInputs.length - 1);
            if (otpInputs[nextIndex]) {
                otpInputs[nextIndex].focus();
                otpInputs[nextIndex].select();
            }
            resetOtpError();
        });
    });

    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const entered = getOtpValue();
            if (entered === OTP_CODE) {
                resetOtpError();
                alert('OTP Verified Successfully');
                if (window.bootstrap) {
                    const instance = window.bootstrap.Modal.getInstance(otpModal) || new window.bootstrap.Modal(otpModal);
                    instance.hide();
                }
                clearOtpInputs();
                return;
            }

            otpInputs.forEach((input) => input.classList.add('is-invalid'));
            if (otpFeedback) {
                otpFeedback.textContent = 'Enter valid code';
            }
        });
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            if (resendBtn.disabled) {
                return;
            }
            clearOtpInputs();
            startResendTimer();
            focusFirstOtp();
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            let valid = true;

            if (!name) {
                valid = false;
                setFieldError(nameInput, nameFeedback, 'Enter valid name');
            } else {
                clearFieldState(nameInput, nameFeedback);
            }

            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                valid = false;
                setFieldError(emailInput, emailFeedback, 'Enter valid email');
            } else {
                clearFieldState(emailInput, emailFeedback);
            }

            if (!password || password.length < 6) {
                valid = false;
                setFieldError(passwordInput, passwordFeedback, 'Enter valid password');
            } else {
                clearFieldState(passwordInput, passwordFeedback);
            }

            if (!valid) {
                return;
            }

            openOtpModal(email);
        });
    }

    if (otpModal) {
        otpModal.addEventListener('shown.bs.modal', () => {
            clearOtpInputs();
            startResendTimer();
            focusFirstOtp();
        });

        otpModal.addEventListener('hidden.bs.modal', () => {
            clearOtpInputs();
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
            secondsLeft = RESEND_SECONDS;
            updateResendLabel();
        });
    }
})();

(function () {
    const page = document.querySelector('.edit-profile-page');

    if (!page) {
        return;
    }

    page.querySelectorAll('[data-profile-file]').forEach((input) => {
        const card = input.closest('.edit-profile-card');
        const avatarImg = card ? card.querySelector('[data-profile-avatar]') : null;
        let objectUrl = null;

        if (!card || !avatarImg) {
            return;
        }

        const openPicker = () => input.click();
        const trigger = card.querySelector('.edit-profile-avatar-trigger');
        const editButton = card.querySelector('.edit-profile-edit-btn');

        if (trigger) {
            trigger.addEventListener('click', openPicker);
        }

        if (editButton) {
            editButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                openPicker();
            });
        }

        input.addEventListener('change', () => {
            const file = input.files && input.files[0];

            if (!file || !file.type || !file.type.startsWith('image/')) {
                return;
            }

            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }

            objectUrl = URL.createObjectURL(file);
            avatarImg.src = objectUrl;
        });
    });
})();

(function () {
    const page = document.querySelector('.adult-profile-page');

    if (!page) {
        return;
    }

    const previewImage = page.querySelector('[data-adult-preview-avatar]');
    const previewName = page.querySelector('[data-adult-preview-name]');
    const nameInput = page.querySelector('[data-adult-name-input]');
    const fileInput = page.querySelector('[data-adult-file-input]');
    const uploadButtons = page.querySelectorAll('[data-adult-upload-trigger]');
    const avatarChoices = page.querySelectorAll('[data-avatar-choice]');
    const openAvatarModalButtons = page.querySelectorAll('[data-open-avatar-modal]');
    const deleteModalEl = page.querySelector('#deleteProfileModal');
    const deleteButtons = page.querySelectorAll('[data-open-delete-modal]');
    let objectUrl = null;

    function setPreviewImage(src) {
        if (previewImage && src) {
            previewImage.src = src;
        }
    }

    function setPreviewName(value) {
        if (previewName) {
            previewName.textContent = value && value.trim() ? value.trim() : 'Profile Name';
        }
    }

    uploadButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (fileInput) {
                fileInput.click();
            }
        });
    });

    if (nameInput) {
        nameInput.addEventListener('input', () => setPreviewName(nameInput.value));
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files && fileInput.files[0];

            if (!file || !file.type || !file.type.startsWith('image/')) {
                return;
            }

            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }

            objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
        });
    }

    avatarChoices.forEach((choice) => {
        choice.addEventListener('click', () => {
            const src = choice.getAttribute('data-avatar-src');
            const modalEl = document.querySelector('#avatarModal');
            if (src) {
                setPreviewImage(src);
            }
            if (modalEl && window.bootstrap) {
                const instance = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
                instance.hide();
            }
        });
    });

    openAvatarModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalEl = document.querySelector('#avatarModal');
            if (modalEl && window.bootstrap) {
                const instance = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
                instance.show();
            }
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (deleteModalEl && window.bootstrap) {
                const instance = window.bootstrap.Modal.getInstance(deleteModalEl) || new window.bootstrap.Modal(deleteModalEl);
                instance.show();
            }
        });
    });
})();

(function () {
    const pinPage = document.querySelector('.kid-pin-page');

    if (!pinPage) {
        return;
    }

    pinPage.querySelectorAll('[data-pin-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const field = button.closest('.kid-pin-field');
            const input = field ? field.querySelector('input') : null;
            const icon = button.querySelector('i');

            if (!input) {
                return;
            }

            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            if (icon) {
                icon.className = isHidden ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
            }
        });
    });

    const nextBtn = pinPage.querySelector('[data-kid-pin-next]');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            window.location.href = 'add-kid.html';
        });
    }
})();

(function () {
    const kidPage = document.querySelector('.kid-profile-page');

    if (!kidPage) {
        return;
    }

    function updateRatingTrack(track, selectedIndex) {
        const dots = Array.from(track.querySelectorAll('.kid-rating-dot'));
        const line = track.querySelector('.kid-rating-line');

        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index <= selectedIndex);
        });

        if (line) {
            const count = dots.length || 1;
            const percent = count > 1 ? (selectedIndex / (count - 1)) * 100 : 0;
            line.style.background = `linear-gradient(90deg, #1e67ff 0%, #1e67ff ${Math.max(percent, 8)}%, rgba(255,255,255,0.08) ${Math.max(percent, 8)}%, rgba(255,255,255,0.08) 100%)`;
        }
    }

    kidPage.querySelectorAll('.kid-rating-track').forEach((track) => {
        const inputs = Array.from(track.querySelectorAll('.kid-rating-input'));
        const dots = Array.from(track.querySelectorAll('.kid-rating-dot'));

        const sync = () => {
            const checkedIndex = inputs.findIndex((input) => input.checked);
            updateRatingTrack(track, checkedIndex < 0 ? 0 : checkedIndex);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (inputs[index]) {
                    inputs[index].checked = true;
                    sync();
                }
            });
        });

        inputs.forEach((input) => {
            input.addEventListener('change', sync);
        });

        sync();
    });
})();

(function () {
    const authPage = document.querySelector('.tv-login-email-page');

    if (!authPage) {
        return;
    }

    authPage.querySelectorAll('[data-tv-password-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const wrapper = button.closest('.tv-login-password');
            const input = wrapper ? wrapper.querySelector('[data-tv-password]') : null;
            const icon = button.querySelector('i');

            if (!input) {
                return;
            }

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            if (icon) {
                icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
            }
        });
    });
})();

(function () {
    const loginPage = document.querySelector('.login-page');

    if (!loginPage) {
        return;
    }

    const overlay = loginPage.querySelector('.login-overlay');
    const closeBtn = loginPage.querySelector('[data-login-close]');
    const form = loginPage.querySelector('[data-login-form]');
    const emailInput = loginPage.querySelector('[data-login-email]');
    const passwordInput = loginPage.querySelector('[data-login-password]');
    const passwordToggle = loginPage.querySelector('[data-login-password-toggle]');
    const emailFeedback = loginPage.querySelector('[data-login-email-feedback]');
    const passwordFeedback = loginPage.querySelector('[data-login-password-feedback]');
    const successFeedback = loginPage.querySelector('[data-login-success]');

    function setError(input, feedback, message) {
        if (!input || !feedback) {
            return;
        }

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        feedback.textContent = message;
    }

    function clearError(input, feedback) {
        if (!input || !feedback) {
            return;
        }

        input.classList.remove('is-invalid');
        if (input.value.trim()) {
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
        }
        feedback.textContent = '';
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const icon = passwordToggle.querySelector('i');
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            if (icon) {
                icon.className = isHidden ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
            }
        });
    }

    if (emailInput && emailFeedback) {
        emailInput.addEventListener('input', () => clearError(emailInput, emailFeedback));
    }

    if (passwordInput && passwordFeedback) {
        passwordInput.addEventListener('input', () => clearError(passwordInput, passwordFeedback));
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            const emailOk = email === 'admin@gmail.com';
            const passwordOk = password === '12345678';

            if (successFeedback) {
                successFeedback.textContent = '';
            }

            if (!emailOk) {
                setError(emailInput, emailFeedback, 'Enter valid email');
            } else {
                clearError(emailInput, emailFeedback);
            }

            if (!passwordOk) {
                setError(passwordInput, passwordFeedback, 'Enter valid password');
            } else {
                clearError(passwordInput, passwordFeedback);
            }

            if (emailOk && passwordOk) {
                if (successFeedback) {
                    successFeedback.textContent = 'Login successful';
                }
                form.reset();
                [emailInput, passwordInput].forEach((input) => {
                    if (input) {
                        input.classList.remove('is-valid', 'is-invalid');
                    }
                });
            }
        });
    }
})();

(function () {
    const loginModal = document.querySelector('#loginModal');
    const forgotModal = document.querySelector('#forgotPasswordModal');
    const resetModal = document.querySelector('#resetPasswordModal');

    if (!loginModal || !forgotModal || !resetModal) {
        return;
    }

    const forgotLink = loginModal.querySelector('[data-forgot-open]');
    const forgotForm = forgotModal.querySelector('[data-forgot-form]');
    const forgotEmail = forgotModal.querySelector('[data-forgot-email]');
    const forgotEmailFeedback = forgotModal.querySelector('[data-forgot-email-feedback]');
    const resetForm = resetModal.querySelector('[data-reset-form]');
    const resetEmail = resetModal.querySelector('[data-reset-email]');
    const resetPassword = resetModal.querySelector('[data-reset-password]');
    const resetConfirmPassword = resetModal.querySelector('[data-reset-confirm-password]');
    const resetPasswordToggle = resetModal.querySelector('[data-reset-password-toggle]');
    const resetConfirmToggle = resetModal.querySelector('[data-reset-confirm-password-toggle]');
    const resetPasswordFeedback = resetModal.querySelector('[data-reset-password-feedback]');
    const resetConfirmFeedback = resetModal.querySelector('[data-reset-confirm-password-feedback]');
    const forgotInstance = window.bootstrap ? window.bootstrap.Modal.getInstance(forgotModal) || new window.bootstrap.Modal(forgotModal) : null;
    const resetInstance = window.bootstrap ? window.bootstrap.Modal.getInstance(resetModal) || new window.bootstrap.Modal(resetModal) : null;
    const loginInstance = window.bootstrap ? window.bootstrap.Modal.getInstance(loginModal) || new window.bootstrap.Modal(loginModal) : null;
    const VALID_EMAIL = 'admin@gmail.com';
    const VALID_PASSWORD = '12345678';

    function setError(input, feedback, message) {
        if (!input || !feedback) {
            return;
        }
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        feedback.textContent = message;
    }

    function clearError(input, feedback) {
        if (!input || !feedback) {
            return;
        }
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
        feedback.textContent = '';
    }

    function toggleVisibility(button, input) {
        if (!button || !input) {
            return;
        }
        const icon = button.querySelector('i');
        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        if (icon) {
            icon.className = isHidden ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
        }
    }

    if (forgotLink) {
        forgotLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (window.bootstrap) {
                const login = window.bootstrap.Modal.getInstance(loginModal) || new window.bootstrap.Modal(loginModal);
                const forgot = window.bootstrap.Modal.getInstance(forgotModal) || new window.bootstrap.Modal(forgotModal);
                const showForgot = () => {
                    loginModal.removeEventListener('hidden.bs.modal', showForgot);
                    forgot.show();
                    if (forgotEmail) {
                        forgotEmail.focus();
                    }
                };
                loginModal.addEventListener('hidden.bs.modal', showForgot, { once: true });
                login.hide();
            }
        });
    }

    if (forgotEmail) {
        forgotEmail.addEventListener('input', () => clearError(forgotEmail, forgotEmailFeedback));
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = forgotEmail ? forgotEmail.value.trim() : '';
            if (email !== VALID_EMAIL) {
                setError(forgotEmail, forgotEmailFeedback, 'Enter valid email');
                return;
            }

            clearError(forgotEmail, forgotEmailFeedback);

            if (window.bootstrap) {
                const forgot = window.bootstrap.Modal.getInstance(forgotModal) || new window.bootstrap.Modal(forgotModal);
                const reset = window.bootstrap.Modal.getInstance(resetModal) || new window.bootstrap.Modal(resetModal);
                const showReset = () => {
                    forgotModal.removeEventListener('hidden.bs.modal', showReset);
                    if (resetEmail) {
                        resetEmail.value = email;
                    }
                    reset.show();
                    if (resetPassword) {
                        resetPassword.focus();
                    }
                };
                forgotModal.addEventListener('hidden.bs.modal', showReset, { once: true });
                forgot.hide();
            }
        });
    }

    if (resetPasswordToggle && resetPassword) {
        resetPasswordToggle.addEventListener('click', () => toggleVisibility(resetPasswordToggle, resetPassword));
    }

    if (resetConfirmToggle && resetConfirmPassword) {
        resetConfirmToggle.addEventListener('click', () => toggleVisibility(resetConfirmToggle, resetConfirmPassword));
    }

    [resetPassword, resetConfirmPassword].forEach((input) => {
        if (!input) {
            return;
        }
        input.addEventListener('input', () => {
            if (input === resetPassword) {
                clearError(resetPassword, resetPasswordFeedback);
            } else {
                clearError(resetConfirmPassword, resetConfirmFeedback);
            }
        });
    });

    if (resetForm) {
        resetForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = resetEmail ? resetEmail.value.trim() : '';
            const password = resetPassword ? resetPassword.value : '';
            const confirmPassword = resetConfirmPassword ? resetConfirmPassword.value : '';
            let valid = true;

            if (!password || password.length < 8) {
                valid = false;
                setError(resetPassword, resetPasswordFeedback, 'Enter valid password');
            } else {
                clearError(resetPassword, resetPasswordFeedback);
            }

            if (!confirmPassword) {
                valid = false;
                setError(resetConfirmPassword, resetConfirmFeedback, 'Passwords do not match');
            } else if (confirmPassword !== password) {
                valid = false;
                setError(resetConfirmPassword, resetConfirmFeedback, 'Passwords do not match');
            } else {
                clearError(resetConfirmPassword, resetConfirmFeedback);
            }

            if (!valid) {
                return;
            }

            alert('Password Changed Successfully');
            if (window.bootstrap) {
                const instance = window.bootstrap.Modal.getInstance(resetModal) || new window.bootstrap.Modal(resetModal);
                instance.hide();
            }
            resetForm.reset();
            if (resetEmail) {
                resetEmail.value = email;
            }
        });
    }

    if (forgotModal) {
        forgotModal.addEventListener('hidden.bs.modal', () => {
            if (forgotForm) {
                forgotForm.reset();
            }
            clearError(forgotEmail, forgotEmailFeedback);
        });
    }

    if (resetModal) {
        resetModal.addEventListener('hidden.bs.modal', () => {
            if (resetForm) {
                resetForm.reset();
            }
            [resetPassword, resetConfirmPassword].forEach((input) => {
                if (input) {
                    input.type = 'password';
                }
            });
            [resetPasswordToggle, resetConfirmToggle].forEach((button) => {
                const icon = button ? button.querySelector('i') : null;
                if (icon) {
                    icon.className = 'fa-solid fa-eye-slash';
                }
            });
            clearError(resetPassword, resetPasswordFeedback);
            clearError(resetConfirmPassword, resetConfirmFeedback);
        });
    }
})();

(function () {
    const pricingPage = document.querySelector('.pricing-page');

    if (!pricingPage) {
        return;
    }

    const tabs = Array.from(pricingPage.querySelectorAll('[data-pricing-tab]'));
    const panels = Array.from(pricingPage.querySelectorAll('[data-pricing-panel]'));

    function activateTab(name) {
        tabs.forEach((tab) => {
            const isActive = tab.getAttribute('data-pricing-tab') === name;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-pressed', String(isActive));
        });

        panels.forEach((panel) => {
            const isActive = panel.getAttribute('data-pricing-panel') === name;
            panel.classList.toggle('active', isActive);
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activateTab(tab.getAttribute('data-pricing-tab'));
        });
    });

    activateTab('monthly');
})();

(function () {
    const businessPage = document.querySelector('.e-business-page');

    if (!businessPage) {
        return;
    }

    const qtyInput = businessPage.querySelector('[data-device-qty]');
    const totalEl = businessPage.querySelector('[data-device-total]');
    const continueBtn = businessPage.querySelector('[data-device-continue]');
    const feedback = businessPage.querySelector('[data-device-feedback]');
    const changeLink = businessPage.querySelector('[data-business-change]');
    const PRICE_PER_DEVICE = 5;
    const MIN = 10;
    const MAX = 1000;

    function setError(message) {
        if (!qtyInput || !feedback) {
            return;
        }
        qtyInput.classList.add('is-invalid');
        qtyInput.classList.remove('is-valid');
        feedback.textContent = message;
    }

    function clearError() {
        if (!qtyInput || !feedback) {
            return;
        }
        qtyInput.classList.remove('is-invalid');
        qtyInput.classList.remove('is-valid');
        feedback.textContent = '';
    }

    function updateTotal() {
        if (!qtyInput || !totalEl) {
            return;
        }
        const qty = parseInt(qtyInput.value, 10);
        if (!Number.isFinite(qty)) {
            totalEl.textContent = 'Total Price: $0';
            return;
        }
        totalEl.textContent = `Total Price: $${qty * PRICE_PER_DEVICE}`;
    }

    function validateQuantity() {
        if (!qtyInput) {
            return false;
        }
        const qty = parseInt(qtyInput.value, 10);

        if (!Number.isFinite(qty) || qty < MIN) {
            setError(`Minimum device is ${MIN}`);
            return false;
        }

        if (qty > MAX) {
            setError(`Maximum device is ${MAX}`);
            return false;
        }

        clearError();
        return true;
    }

    if (qtyInput) {
        qtyInput.addEventListener('input', () => {
            qtyInput.value = qtyInput.value.replace(/[^\d]/g, '');
            clearError();
            updateTotal();
        });

        qtyInput.addEventListener('blur', () => {
            if (!qtyInput.value) {
                qtyInput.value = String(MIN);
            }
            updateTotal();
            validateQuantity();
        });

        qtyInput.addEventListener('keydown', (event) => {
            const allowed = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
            if (allowed.includes(event.key) || event.ctrlKey || event.metaKey) {
                return;
            }
            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
            }
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (!validateQuantity()) {
                return;
            }
            alert('Continue');
        });
    }

    if (changeLink) {
        changeLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'price.html';
        });
    }

    if (qtyInput) {
        updateTotal();
    }
})();

(function () {
    const page = document.querySelector('.voucher-actions');
    const modal = document.querySelector('#voucherModal');

    if (!page || !modal) {
        return;
    }

    const openBtn = page.querySelector('[data-voucher-open]');
    const appliedCard = page.querySelector('[data-voucher-applied]');
    const removeBtn = page.querySelector('[data-voucher-remove]');
    const applyBtn = modal.querySelector('[data-voucher-apply]');
    const voucherInput = modal.querySelector('[data-voucher-input]');
    const voucherFeedback = modal.querySelector('[data-voucher-feedback]');
    const modalInstance = window.bootstrap ? window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal) : null;

    function setError(message) {
        if (!voucherInput || !voucherFeedback) {
            return;
        }
        voucherInput.classList.add('is-invalid');
        voucherInput.classList.remove('is-valid');
        voucherFeedback.textContent = message;
    }

    function clearError() {
        if (!voucherInput || !voucherFeedback) {
            return;
        }
        voucherInput.classList.remove('is-invalid');
        voucherInput.classList.remove('is-valid');
        voucherFeedback.textContent = '';
    }

    function showApplied() {
        if (openBtn) {
            openBtn.classList.add('d-none');
        }
        if (appliedCard) {
            appliedCard.classList.remove('d-none');
        }
    }

    function showButton() {
        if (openBtn) {
            openBtn.classList.remove('d-none');
        }
        if (appliedCard) {
            appliedCard.classList.add('d-none');
        }
    }

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            if (modalInstance) {
                modalInstance.show();
            }
            if (voucherInput) {
                setTimeout(() => voucherInput.focus(), 150);
            }
        });
    }

    if (voucherInput) {
        voucherInput.addEventListener('input', clearError);
    }

    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const value = voucherInput ? voucherInput.value.trim() : '';
            if (!value) {
                setError('Enter voucher code');
                return;
            }
            clearError();
            if (modalInstance) {
                modalInstance.hide();
            }
            showApplied();
        });
    }

    if (removeBtn) {
        removeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showButton();
        });
    }

    if (modal) {
        modal.addEventListener('hidden.bs.modal', () => {
            clearError();
            if (voucherInput) {
                voucherInput.value = '';
            }
        });
    }
})();

(function () {
    const redeemSection = document.querySelector('.redeem-section');
    const successModal = document.querySelector('#redeemSuccessModal');

    if (!redeemSection || !successModal) {
        return;
    }

    const codeInput = redeemSection.querySelector('[data-redeem-code]');
    const feedback = redeemSection.querySelector('[data-redeem-feedback]');
    const validateBtn = redeemSection.querySelector('[data-redeem-validate]');
    const homeBtn = successModal.querySelector('[data-redeem-home]');
    const modalInstance = window.bootstrap ? window.bootstrap.Modal.getInstance(successModal) || new window.bootstrap.Modal(successModal) : null;
    const VALID_CODE = 'EMBO2026';

    function setError(message) {
        if (!codeInput || !feedback) {
            return;
        }
        codeInput.classList.add('is-invalid');
        codeInput.classList.remove('is-valid');
        feedback.textContent = message;
    }

    function clearError() {
        if (!codeInput || !feedback) {
            return;
        }
        codeInput.classList.remove('is-invalid');
        codeInput.classList.remove('is-valid');
        feedback.textContent = '';
    }

    if (codeInput) {
        codeInput.addEventListener('input', clearError);
    }

    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            const value = codeInput ? codeInput.value.trim() : '';
            if (value !== VALID_CODE) {
                setError('Invalid coupon code.');
                return;
            }

            clearError();
            if (modalInstance) {
                modalInstance.show();
            }
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (successModal) {
        successModal.addEventListener('hidden.bs.modal', () => {
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
})();

(function () {
    const modal = document.querySelector('#loginModal');

    if (!modal) {
        return;
    }

    const form = modal.querySelector('[data-login-form]');
    const emailInput = modal.querySelector('[data-login-email]');
    const passwordInput = modal.querySelector('[data-login-password]');
    const passwordToggle = modal.querySelector('[data-login-password-toggle]');
    const emailFeedback = modal.querySelector('[data-login-email-feedback]');
    const passwordFeedback = modal.querySelector('[data-login-password-feedback]');
    const successFeedback = modal.querySelector('[data-login-success]');

    function setError(input, feedback, message) {
        if (!input || !feedback) {
            return;
        }

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        feedback.textContent = message;
    }

    function clearError(input, feedback) {
        if (!input || !feedback) {
            return;
        }

        input.classList.remove('is-invalid');
        if (input.value.trim()) {
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
        }
        feedback.textContent = '';
    }

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const icon = passwordToggle.querySelector('i');
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            if (icon) {
                icon.className = isHidden ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
            }
        });
    }

    if (emailInput && emailFeedback) {
        emailInput.addEventListener('input', () => clearError(emailInput, emailFeedback));
    }

    if (passwordInput && passwordFeedback) {
        passwordInput.addEventListener('input', () => clearError(passwordInput, passwordFeedback));
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            const emailOk = email === 'admin@gmail.com';
            const passwordOk = password === '12345678';

            if (successFeedback) {
                successFeedback.textContent = '';
            }

            if (!emailOk) {
                setError(emailInput, emailFeedback, 'Enter valid email');
            } else {
                clearError(emailInput, emailFeedback);
            }

            if (!passwordOk) {
                setError(passwordInput, passwordFeedback, 'Enter valid password');
            } else {
                clearError(passwordInput, passwordFeedback);
            }

            if (emailOk && passwordOk) {
                if (successFeedback) {
                    successFeedback.textContent = 'Login successful';
                }
                const instance = window.bootstrap ? window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal) : null;
                if (instance) {
                    instance.hide();
                }
                form.reset();
                [emailInput, passwordInput].forEach((input) => {
                    if (input) {
                        input.classList.remove('is-valid', 'is-invalid');
                    }
                });
            }
        });
    }
})();

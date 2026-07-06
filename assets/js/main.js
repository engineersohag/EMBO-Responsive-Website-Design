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

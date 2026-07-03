// Home Search bar
const searchWrapper=document.querySelector(".search-wrapper");
const searchToggle=document.querySelector(".search-toggle");

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

(function () {
    const homeSection = document.querySelector('.home');
    const heroCarousel = $('.hero-thumbnail-carousel');

    if (!heroCarousel.length || !homeSection) {
        return;
    }

    function syncHomeBackground(event) {
        const currentIndex = event && event.item && typeof event.item.index === 'number' ? event.item.index : 0;
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
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 400,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
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
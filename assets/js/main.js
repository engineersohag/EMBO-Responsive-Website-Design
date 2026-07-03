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

    $('.movie-big-carousel').owlCarousel({
        center:true,
        loop:true,
        margin:-180,
        nav:true,
        dots:false,

        responsive:{

            0:{
                items:1
            },

            768:{
                items:3
            },

            1200:{
                items:3
            }

        }

    });
})();
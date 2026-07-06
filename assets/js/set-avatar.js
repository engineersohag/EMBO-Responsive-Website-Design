(function () {
    const page = document.querySelector('.set-avatar-page');

    if (!page || !window.jQuery) {
        return;
    }

    const $ = window.jQuery;
    const categories = {
        Classic: [
            'https://randomuser.me/api/portraits/men/1.jpg',
            'https://randomuser.me/api/portraits/women/1.jpg',
            'https://randomuser.me/api/portraits/men/2.jpg',
            'https://randomuser.me/api/portraits/women/2.jpg',
            'https://randomuser.me/api/portraits/men/3.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/4.jpg',
            'https://randomuser.me/api/portraits/women/4.jpg',
            'https://randomuser.me/api/portraits/men/5.jpg',
            'https://randomuser.me/api/portraits/women/5.jpg',
            'https://randomuser.me/api/portraits/men/6.jpg',
            'https://randomuser.me/api/portraits/women/6.jpg',
            'https://randomuser.me/api/portraits/men/7.jpg',
            'https://randomuser.me/api/portraits/women/7.jpg',
            'https://randomuser.me/api/portraits/men/8.jpg'
        ],
        Baby: [
            'https://i.pravatar.cc/180?img=12',
            'https://i.pravatar.cc/180?img=13',
            'https://i.pravatar.cc/180?img=14',
            'https://i.pravatar.cc/180?img=15',
            'https://i.pravatar.cc/180?img=16',
            'https://i.pravatar.cc/180?img=17',
            'https://i.pravatar.cc/180?img=18',
            'https://i.pravatar.cc/180?img=19',
            'https://i.pravatar.cc/180?img=20',
            'https://i.pravatar.cc/180?img=21',
            'https://i.pravatar.cc/180?img=22',
            'https://i.pravatar.cc/180?img=23',
            'https://i.pravatar.cc/180?img=24',
            'https://i.pravatar.cc/180?img=25',
            'https://i.pravatar.cc/180?img=26'
        ],
        Male: [
            'https://randomuser.me/api/portraits/men/10.jpg',
            'https://randomuser.me/api/portraits/men/11.jpg',
            'https://randomuser.me/api/portraits/men/12.jpg',
            'https://randomuser.me/api/portraits/men/13.jpg',
            'https://randomuser.me/api/portraits/men/14.jpg',
            'https://randomuser.me/api/portraits/men/15.jpg',
            'https://randomuser.me/api/portraits/men/16.jpg',
            'https://randomuser.me/api/portraits/men/17.jpg',
            'https://randomuser.me/api/portraits/men/18.jpg',
            'https://randomuser.me/api/portraits/men/19.jpg',
            'https://randomuser.me/api/portraits/men/20.jpg',
            'https://randomuser.me/api/portraits/men/21.jpg',
            'https://randomuser.me/api/portraits/men/22.jpg',
            'https://randomuser.me/api/portraits/men/23.jpg',
            'https://randomuser.me/api/portraits/men/24.jpg'
        ],
        Female: [
            'https://randomuser.me/api/portraits/women/10.jpg',
            'https://randomuser.me/api/portraits/women/11.jpg',
            'https://randomuser.me/api/portraits/women/12.jpg',
            'https://randomuser.me/api/portraits/women/13.jpg',
            'https://randomuser.me/api/portraits/women/14.jpg',
            'https://randomuser.me/api/portraits/women/15.jpg',
            'https://randomuser.me/api/portraits/women/16.jpg',
            'https://randomuser.me/api/portraits/women/17.jpg',
            'https://randomuser.me/api/portraits/women/18.jpg',
            'https://randomuser.me/api/portraits/women/19.jpg',
            'https://randomuser.me/api/portraits/women/20.jpg',
            'https://randomuser.me/api/portraits/women/21.jpg',
            'https://randomuser.me/api/portraits/women/22.jpg',
            'https://randomuser.me/api/portraits/women/23.jpg',
            'https://randomuser.me/api/portraits/women/24.jpg'
        ],
        Robot: [
            'https://robohash.org/robot-avatar-1.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-2.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-3.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-4.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-5.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-6.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-7.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-8.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-9.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-10.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-11.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-12.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-13.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-14.png?size=180x180&set=set4',
            'https://robohash.org/robot-avatar-15.png?size=180x180&set=set4'
        ]
    };

    const selectedKey = 'selectedAvatar';
    const defaultSelected = localStorage.getItem(selectedKey);

    function renderCarousel(carousel, category) {
        const avatars = categories[category] || [];
        carousel.innerHTML = avatars.map((src, index) => (
            `<button type="button" class="set-avatar-item${defaultSelected === src ? ' is-selected' : ''}" data-avatar="${src}" aria-label="${category} avatar ${index + 1}">
                <img src="${src}" alt="${category} avatar ${index + 1}">
                <span class="set-avatar-check"><i class="fa-solid fa-check"></i></span>
            </button>`
        )).join('');
    }

    function setSelected(avatar) {
        page.querySelectorAll('.set-avatar-item').forEach((item) => {
            item.classList.toggle('is-selected', item.getAttribute('data-avatar') === avatar);
        });
        localStorage.setItem(selectedKey, avatar);
    }

    page.querySelectorAll('.set-avatar-carousel').forEach((carousel) => {
        const category = carousel.getAttribute('data-set-avatar-carousel');
        renderCarousel(carousel, category);

        $(carousel).owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            smartSpeed: 700,
            mouseDrag: true,
            touchDrag: true,
            freeDrag: true,
            dots: false,
            nav: true,
            margin: 12,
            responsive: {
                0: { items: 4 },
                480: { items: 5 },
                768: { items: 8 },
                992: { items: 10 },
                1200: { items: 15 }
            }
        });
    });

    page.addEventListener('click', (event) => {
        const backBtn = event.target.closest('[data-set-avatar-back]');
        if (backBtn) {
            history.back();
            return;
        }

        const item = event.target.closest('.set-avatar-item');
        if (item) {
            const avatar = item.getAttribute('data-avatar');
            if (avatar) {
                setSelected(avatar);
            }
        }
    });

    if (defaultSelected) {
        setSelected(defaultSelected);
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const seasonSelect = document.querySelector('.series-season-select');
    const episodeCarousels = Array.from(document.querySelectorAll('.episode-carousel-wrap .watching-carousel'));
    const settingsButton = document.querySelector('.series-settings-btn');
    const settingsPopup = document.querySelector('.series-settings-popup');
    const nextEpisodeCard = document.querySelector('.series-next-episode-card');
    const countdownOverlay = document.querySelector('.series-countdown-overlay');
    const countdownCounter = document.querySelector('.series-countdown-counter');
    const playNextButton = document.querySelector('.series-play-next');
    const cancelNextButton = document.querySelector('.series-cancel-next');
    const episodeCards = Array.from(document.querySelectorAll('.episode-card'));

    if (seasonSelect) {
        seasonSelect.addEventListener('change', function () {
            const selectedSeason = this.value;

            episodeCarousels.forEach(function (carousel) {
                carousel.classList.toggle('active-season', carousel.dataset.season === selectedSeason);
            });

            episodeCards.forEach(function (card) {
                card.classList.toggle('is-current', card.dataset.episode === '1' && selectedSeason === '1');
            });
        });
    }

    if (settingsButton && settingsPopup) {
        settingsButton.addEventListener('click', function () {
            settingsPopup.classList.toggle('is-open');
        });

        document.addEventListener('click', function (event) {
            if (!settingsButton.contains(event.target) && !settingsPopup.contains(event.target)) {
                settingsPopup.classList.remove('is-open');
            }
        });
    }

    if (nextEpisodeCard) {
        nextEpisodeCard.addEventListener('click', function () {
            if (countdownOverlay) {
                countdownOverlay.style.display = 'flex';
                let count = 5;
                countdownCounter.textContent = count;

                const interval = setInterval(function () {
                    count -= 1;
                    countdownCounter.textContent = count;

                    if (count <= 0) {
                        clearInterval(interval);
                        countdownOverlay.style.display = 'none';
                    }
                }, 1000);
            }
        });
    }

    if (playNextButton) {
        playNextButton.addEventListener('click', function () {
            if (countdownOverlay) {
                countdownOverlay.style.display = 'none';
            }
        });
    }

    if (cancelNextButton) {
        cancelNextButton.addEventListener('click', function () {
            if (countdownOverlay) {
                countdownOverlay.style.display = 'none';
            }
        });
    }
});

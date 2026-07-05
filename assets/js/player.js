document.addEventListener('DOMContentLoaded', function () {
    const videoElement = document.getElementById('premiumVideo');
    const posterElement = document.getElementById('playerPoster');
    const playTrigger = document.getElementById('playTrigger');
    const descriptionText = document.getElementById('descriptionText');
    const descriptionToggle = document.getElementById('descriptionToggle');
    const qualitySelect = document.getElementById('videoQualitySelect');

    if (!videoElement) return;

    const posterImage = videoElement.getAttribute('poster') || 'assets/img/home/card-1.png';
    const sourceUrl = videoElement.dataset.source || 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4';
    const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(sourceUrl);
    const isVimeo = /vimeo\.com/i.test(sourceUrl);
    const isHls = /\.m3u8($|\?)/i.test(sourceUrl);
    const isMp4 = /\.mp4($|\?)/i.test(sourceUrl);

    let player = null;
    let hls = null;

    function destroyPlayer() {
        if (player) {
            player.destroy();
            player = null;
        }

        if (hls) {
            hls.destroy();
            hls = null;
        }

        videoElement.removeAttribute('src');
        videoElement.load();
    }

    function updatePosterVisibility(visible) {
        if (!posterElement) return;
        posterElement.classList.toggle('hidden', !visible);
        posterElement.style.display = visible ? 'block' : 'none';
    }

    function attachPosterEvents() {
        if (playTrigger) {
            playTrigger.addEventListener('click', function () {
                if (player) {
                    player.play();
                }
                updatePosterVisibility(false);
            });
        }

        videoElement.addEventListener('play', function () {
            updatePosterVisibility(false);
        });

        videoElement.addEventListener('ended', function () {
            updatePosterVisibility(true);
        });
    }

    function createQualityOptions(levels) {
        if (!qualitySelect) return;

        const options = [{ value: 'auto', text: 'Auto' }];
        levels.forEach(function (level, index) {
            const label = level.height ? level.height + 'p' : 'Quality ' + (index + 1);
            options.push({ value: String(index), text: label });
        });

        qualitySelect.innerHTML = '';
        options.forEach(function (option) {
            const item = document.createElement('option');
            item.value = option.value;
            item.textContent = option.text;
            qualitySelect.appendChild(item);
        });
    }

    function bindQualitySelector(hlsInstance) {
        if (!qualitySelect || !hlsInstance) return;

        qualitySelect.addEventListener('change', function () {
            const selectedLevel = Number(this.value);
            if (selectedLevel >= 0) {
                hlsInstance.currentLevel = selectedLevel;
            } else {
                hlsInstance.currentLevel = -1;
            }
        });
    }

    function initializePlayer() {
        destroyPlayer();

        const commonOptions = {
            controls: [
                'play-large',
                'play',
                'rewind',
                'fast-forward',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'captions',
                'settings',
                'pip',
                'fullscreen'
            ],
            keyboard: { focused: true, global: true },
            tooltips: { controls: true, seek: true },
            autoplay: false,
            ratio: '16:9',
            hideControls: true,
            resetOnEnd: true,
            storage: { enabled: false }
        };

        if (isYouTube || isVimeo) {
            player = new Plyr(videoElement, commonOptions);
            player.source = {
                type: 'video',
                sources: [
                    {
                        src: sourceUrl,
                        provider: isYouTube ? 'youtube' : 'vimeo'
                    }
                ],
                poster: posterImage
            };
        } else if (isHls && window.Hls && window.Hls.isSupported()) {
            hls = new Hls({
                autoStartLoad: true,
                startLevel: -1
            });

            hls.attachMedia(videoElement);
            hls.loadSource(sourceUrl);

            player = new Plyr(videoElement, commonOptions);

            hls.on(window.Hls.Events.MANIFEST_PARSED, function (_, data) {
                createQualityOptions(data.levels);
            });

            bindQualitySelector(hls);
        } else {
            player = new Plyr(videoElement, commonOptions);
            player.source = {
                type: 'video',
                sources: [
                    {
                        src: sourceUrl,
                        type: isMp4 ? 'video/mp4' : 'application/x-mpegURL'
                    }
                ],
                poster: posterImage
            };
        }

        attachPosterEvents();

        if (player) {
            player.on('play', function () {
                updatePosterVisibility(false);
            });

            player.on('pause', function () {
                if (!videoElement.ended) {
                    updatePosterVisibility(false);
                }
            });
        }
    }

    descriptionToggle.addEventListener('click', function (event) {
        event.preventDefault();
        descriptionText.classList.toggle('is-collapsed');

        if (descriptionText.classList.contains('is-collapsed')) {
            descriptionToggle.textContent = 'See More';
        } else {
            descriptionToggle.textContent = 'See Less';
        }
    });

    initializePlayer();
});

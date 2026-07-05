const searchMovies = [
    {
        title: 'Avatar: The Way Of Water',
        poster: 'assets/img/home/card-1.png',
        cast: 'Sam Worthington, Zoe Saldana',
        genre: 'Sci-Fi / Adventure',
        year: '2022',
        category: 'Epic',
        duration: '3h 12m',
        description: 'Jake Sully returns to Pandora to protect his family against a new threat.'
    },
    {
        title: 'The Matrix',
        poster: 'assets/img/home/card-2.png',
        cast: 'Keanu Reeves, Carrie-Anne Moss',
        genre: 'Sci-Fi / Action',
        year: '1999',
        category: 'Classic',
        duration: '2h 16m',
        description: 'A hacker discovers the brutal truth about reality and his role in it.'
    },
    {
        title: 'The Dark Knight',
        poster: 'assets/img/home/card-3.png',
        cast: 'Christian Bale, Heath Ledger',
        genre: 'Action / Crime',
        year: '2008',
        category: 'Superhero',
        duration: '2h 32m',
        description: 'Batman faces the Joker in a city that is falling into chaos.'
    },
    {
        title: '365 Days',
        poster: 'assets/img/home/card-4.png',
        cast: 'Anna-Maria Sieklucka, Michele Morrone',
        genre: 'Romance / Drama',
        year: '2020',
        category: 'Romance',
        duration: '1h 45m',
        description: 'A passionate romance unfolds between a woman and a powerful mafia heir.'
    },
    {
        title: 'The Godfather',
        poster: 'assets/img/home/card-5.png',
        cast: 'Marlon Brando, Al Pacino',
        genre: 'Crime / Drama',
        year: '1972',
        category: 'Classic',
        duration: '2h 55m',
        description: 'The aging patriarch of an organized crime dynasty transfers control to his son.'
    },
    {
        title: 'Interstellar',
        poster: 'assets/img/home/card-6.png',
        cast: 'Matthew McConaughey, Anne Hathaway',
        genre: 'Sci-Fi / Drama',
        year: '2014',
        category: 'Epic',
        duration: '2h 49m',
        description: 'A team of astronauts travels through a wormhole to save humanity.'
    },
    {
        title: 'Dune',
        poster: 'assets/img/home/card-7.png',
        cast: 'Timothee Chalamet, Rebecca Ferguson',
        genre: 'Sci-Fi / Adventure',
        year: '2021',
        category: 'Epic',
        duration: '2h 35m',
        description: 'A young nobleman becomes entangled in a war over a desert planet.'
    },
    {
        title: 'Joker',
        poster: 'assets/img/home/card-8.png',
        cast: 'Joaquin Phoenix, Robert De Niro',
        genre: 'Crime / Thriller',
        year: '2019',
        category: 'Drama',
        duration: '2h 2m',
        description: 'An aspiring stand-up comedian descends into madness and violence.'
    }
];

const popularMovies = [
    { title: 'Dune', poster: 'assets/img/home/card-7.png', cast: 'Timothee Chalamet' },
    { title: 'Joker', poster: 'assets/img/home/card-8.png', cast: 'Joaquin Phoenix' },
    { title: 'The Matrix', poster: 'assets/img/home/card-2.png', cast: 'Keanu Reeves' }
];

const STORAGE_KEY = 'embo_recent_searches';
const MAX_RECENT = 5;

function getRecentSearches() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const items = stored ? JSON.parse(stored) : [];
        return Array.isArray(items) ? items : [];
    } catch (error) {
        return [];
    }
}

function saveRecentSearch(term) {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [trimmed, ...getRecentSearches().filter(item => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function removeRecentSearch(term) {
    const next = getRecentSearches().filter(item => item.toLowerCase() !== term.toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function normalizeQuery(value) {
    return (value || '').trim().toLowerCase();
}

function goToSearch(term) {
    const keyword = term.trim();
    if (!keyword) return;
    saveRecentSearch(keyword);
    window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
}

function renderSuggestions(query) {
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchInput = document.querySelector('.search-form input');
    const panel = document.querySelector('.search-suggestions-panel');
    const recentList = document.querySelector('.search-suggestions-recent');
    const popularList = document.querySelector('.search-suggestions-popular');
    if (!searchWrapper || !searchInput || !panel || !recentList || !popularList) return;

    const trimmed = normalizeQuery(query);
    if (!trimmed) {
        panel.classList.remove('is-visible');
        searchWrapper.classList.remove('has-suggestions');
        return;
    }

    recentList.innerHTML = '';
    const recentSearches = getRecentSearches();
    if (recentSearches.length) {
        recentSearches.slice(0, MAX_RECENT).forEach(term => {
            const row = document.createElement('div');
            row.className = 'search-suggestion-item search-suggestion-item--recent';
            row.innerHTML = `
                <div class="search-suggestion-item__body">
                    <div class="search-suggestion-item__title">${term}</div>
                    <div class="search-suggestion-item__meta">Recent search</div>
                </div>
            `;

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'search-suggestion-remove';
            removeBtn.setAttribute('aria-label', `Remove ${term}`);
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                removeRecentSearch(term);
                renderSuggestions(searchInput.value);
            });

            row.appendChild(removeBtn);
            row.addEventListener('click', () => goToSearch(term));
            recentList.appendChild(row);
        });
    } else {
        recentList.innerHTML = '<div class="search-empty-state search-empty-state--small">No recent searches yet.</div>';
    }

    popularList.innerHTML = '';
    popularMovies.forEach(movie => {
        const item = document.createElement('a');
        item.href = `search.html?q=${encodeURIComponent(movie.title)}`;
        item.className = 'search-suggestion-item';
        item.innerHTML = `
            <div class="search-suggestion-item__thumb">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="search-suggestion-item__body">
                <div class="search-suggestion-item__title">${movie.title}</div>
                <div class="search-suggestion-item__meta">${movie.cast}</div>
            </div>
        `;
        item.addEventListener('click', () => saveRecentSearch(movie.title));
        popularList.appendChild(item);
    });

    panel.classList.add('is-visible');
    searchWrapper.classList.add('has-suggestions');
}

function renderSearchResults() {
    const main = document.querySelector('.search-result .container');
    if (!main) return;

    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || 'Avatar';
    const normalized = normalizeQuery(query);
    const filteredMovies = searchMovies.filter(movie => movie.title.toLowerCase().includes(normalized));
    const resultMovies = filteredMovies.length ? filteredMovies : searchMovies.slice(0, 6);

    main.innerHTML = `
        <div class="search-shell">
            <div class="search-results-panel">
                <div class="search-results-heading">
                    <div class="search-results-label">Search Results</div>
                    <h2>Search result for "${query}"</h2>
                </div>
                ${resultMovies.map(movie => `
                    <a href="play-details.html" class="search-result-card">
                        <div class="search-result-card__thumb">
                            <img src="${movie.poster}" alt="${movie.title}">
                        </div>
                        <div class="search-result-card__content">
                            <div class="search-result-card__title">${movie.title}</div>
                            <div class="search-result-card__meta">
                                <span>${movie.cast}</span><br>
                                ${movie.genre} • ${movie.year} • ${movie.category} • ${movie.duration}
                            </div>
                            <div class="search-result-card__desc">${movie.description}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
            <aside class="search-sidebar-panel">
                <div class="search-sidebar-title">Blockbuster Movies</div>
                <div class="search-sidebar-list search-sidebar-list--scroll">
                    ${popularMovies.map(movie => `
                        <a href="play-details.html" class="search-sidebar-item">
                            <div class="search-sidebar-item__thumb">
                                <img src="${movie.poster}" alt="${movie.title}">
                            </div>
                            <div class="search-sidebar-item__body">
                                <div class="search-sidebar-item__title">${movie.title}</div>
                                <div class="search-sidebar-item__meta">${movie.cast}</div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </aside>
        </div>
    `;
}

function initSearchExperience() {
    if (window.__emboSearchInitialized) return;
    window.__emboSearchInitialized = true;

    renderSearchResults();

    const searchWrapper = document.querySelector('.search-wrapper');
    const searchToggle = document.querySelector('.search-toggle');
    const searchInput = document.querySelector('.search-form input');
    const searchForm = document.querySelector('.search-form');
    if (!searchWrapper || !searchToggle || !searchInput || !searchForm) return;

    if (!document.querySelector('.search-suggestions-panel')) {
        searchWrapper.insertAdjacentHTML('beforeend', `
            <div class="search-suggestions-panel" aria-live="polite">
                <div class="search-suggestions-panel__section">
                    <div class="search-suggestions-panel__title">Recent Search</div>
                    <div class="search-suggestions-list search-suggestions-recent"></div>
                </div>
                <div class="search-suggestions-panel__section">
                    <div class="search-suggestions-panel__title">Embo Most Popular</div>
                    <div class="search-suggestions-list search-suggestions-popular"></div>
                </div>
            </div>
        `);
    }

    const hidePanel = () => {
        const panel = document.querySelector('.search-suggestions-panel');
        panel?.classList.remove('is-visible');
        searchWrapper.classList.remove('has-suggestions');
    };

    searchToggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        searchWrapper.classList.toggle('active');
        if (searchWrapper.classList.contains('active')) {
            searchInput.focus();
            renderSuggestions(searchInput.value);
        } else {
            hidePanel();
        }
    });

    searchInput.addEventListener('input', () => {
        if (normalizeQuery(searchInput.value)) {
            searchWrapper.classList.add('active');
            renderSuggestions(searchInput.value);
        } else {
            hidePanel();
        }
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToSearch(searchInput.value);
        }
    });

    searchInput.addEventListener('focus', () => {
        if (normalizeQuery(searchInput.value)) {
            renderSuggestions(searchInput.value);
        }
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        goToSearch(searchInput.value);
    });

    document.addEventListener('click', (event) => {
        if (!searchWrapper.contains(event.target)) {
            hidePanel();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hidePanel();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchExperience);
} else {
    initSearchExperience();
}

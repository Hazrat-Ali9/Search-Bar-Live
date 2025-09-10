// Sample data - replace with your actual data
const items = [
    { id: 1, title: "Web Development", category: "Technology", description: "Learn modern web development techniques", icon: "fas fa-code" },
    { id: 2, title: "Digital Marketing", category: "Business", description: "Strategies for online marketing success", icon: "fas fa-bullhorn" },
    { id: 3, title: "Graphic Design", category: "Design", description: "Create stunning visual content", icon: "fas fa-paint-brush" },
    { id: 4, title: "Data Science", category: "Technology", description: "Extract insights from complex data", icon: "fas fa-chart-line" },
    { id: 5, title: "Mobile App Development", category: "Technology", description: "Build apps for iOS and Android", icon: "fas fa-mobile-alt" },
    { id: 6, title: "Content Writing", category: "Marketing", description: "Create engaging content for your audience", icon: "fas fa-pen-fancy" },
    { id: 7, title: "Photography", category: "Arts", description: "Capture beautiful moments professionally", icon: "fas fa-camera" },
    { id: 8, title: "Project Management", category: "Business", description: "Lead teams and deliver projects successfully", icon: "fas fa-tasks" },
    { id: 9, title: "UI/UX Design", category: "Design", description: "Create intuitive user experiences", icon: "fas fa-laptop-code" },
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const resultsContainer = document.getElementById('resultsContainer');
const noResults = document.getElementById('noResults');
const searchStats = document.getElementById('searchStats');
const resultsCount = document.getElementById('resultsCount');

// Event Listeners
searchInput.addEventListener('input', debounce(handleSearch, 300));
clearSearch.addEventListener('click', clearSearchHandler);

// Initial setup
updateClearButton();

// Functions
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    updateClearButton();

    if (searchTerm.length === 0) {
        resultsContainer.classList.add('hidden');
        noResults.classList.add('hidden');
        searchStats.classList.add('hidden');
        return;
    }

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );

    displayResults(filteredItems);
}

function displayResults(items) {
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
        resultsContainer.classList.add('hidden');
        noResults.classList.remove('hidden');
        searchStats.classList.add('hidden');
        return;
    }

    items.forEach((item, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item bg-white bg-opacity-90 rounded-lg p-4 shadow-md fade-in`;
        resultItem.style.animationDelay = `${index * 0.1}s`;
        resultItem.innerHTML = `
                    <div class="flex items-start">
                        <div class="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                            <i class="${item.icon} text-blue-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-semibold text-gray-900">${item.title}</h3>
                            <span class="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mt-1">${item.category}</span>
                            <p class="mt-2 text-gray-600">${item.description}</p>
                        </div>
                    </div>
                `;
        resultsContainer.appendChild(resultItem);
    });

    resultsCount.textContent = items.length;
    resultsContainer.classList.remove('hidden');
    noResults.classList.add('hidden');
    searchStats.classList.remove('hidden');
}

function updateClearButton() {
    if (searchInput.value.trim().length > 0) {
        clearSearch.classList.remove('hidden');
    } else {
        clearSearch.classList.add('hidden');
    }
}

function clearSearchHandler() {
    searchInput.value = '';
    searchInput.focus();
    updateClearButton();
    resultsContainer.classList.add('hidden');
    noResults.classList.add('hidden');
    searchStats.classList.add('hidden');
}

// Debounce function to limit how often the search runs
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Add ripple effect to search input on focus
searchInput.addEventListener('focus', function () {
    this.parentElement.classList.add('ring-2', 'ring-blue-400');
    this.parentElement.classList.remove('ring-0');
});

searchInput.addEventListener('blur', function () {
    this.parentElement.classList.remove('ring-2', 'ring-blue-400');
});
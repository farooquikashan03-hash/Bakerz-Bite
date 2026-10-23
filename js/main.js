/*
   main.js - everything the page does, in plain JavaScript.
   products.js must load before this file
*/


/* 1. SMALL HELPER FUNCTIONS */

// Shortcut so we don't type document.getElementById all the time
function byId(id) {
    return document.getElementById(id);
}

// Turns 4.5 into "$4.50"
function money(number) {
    return "$" + number.toFixed(2);
}

// Finds a product in the list by its id
function findProduct(id) {
    return products.find(function (product) {
        return product.id === id;
    });
}

// Cleans text that visitors type so they can't sneak HTML into the page
function cleanText(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// Reads something saved in the browser. If it fails (private mode, etc.)
// we just use the backup value so the page doesn't break.
function loadSaved(key, backup) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (saved === null) {
            return backup;
        }
        return saved;
    } catch (error) {
        return backup;
    }
}

// Saves something in the browser
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Nothing to do. The site still works, it just won't remember.
    }
}

// Shows a small note in the corner for a couple of seconds
let messageTimer;

function showMessage(text) {
    const box = byId("message");
    box.textContent = text;
    box.classList.add("show");

    clearTimeout(messageTimer);
    messageTimer = setTimeout(function () {
        box.classList.remove("show");
    }, 2500);
}


/* 2. VISITOR COUNTER */

const visits = Number(loadSaved("bakerzVisits", 0)) + 1;
saveData("bakerzVisits", visits);
byId("visitor-count").textContent = visits;


/* 3. TICKER AT THE BOTTOM */

// Updates the date and time in the ticker
function updateClock() {
    const now = new Date();
    const dates = document.querySelectorAll(".ticker-date");
    const times = document.querySelectorAll(".ticker-time");

    dates.forEach(function (item) {
        item.textContent = now.toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    });

    times.forEach(function (item) {
        item.textContent = now.toLocaleTimeString();
    });
}

// Shows the visitor's time zone (like "Europe/London").
// We don't ask for their location, so no permission pop-up appears.
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "your area";

document.querySelectorAll(".ticker-place").forEach(function (item) {
    item.textContent = timeZone.replace("_", " ");
});

// Copy the ticker text once so the scrolling never has an empty gap
const tickerLine = byId("ticker-line");
tickerLine.appendChild(tickerLine.firstElementChild.cloneNode(true));

updateClock();
setInterval(updateClock, 1000);


/* 4. CATEGORY PICTURES UNDER THE HERO */

const bannerCategories = ["cakes", "pastries", "cookies", "pies", "merchandise"];

let bannerHtml = "";

bannerCategories.forEach(function (category) {
    // Use the first product in each category as its picture
    const product = products.find(function (item) {
        return item.category === category;
    });

    bannerHtml +=
        '<a class="banner-tile" href="#products" data-category="' + category + '">' +
            '<img src="' + product.image + '" alt="' + category + '">' +
            '<span>' + category + '</span>' +
        '</a>';
});

byId("banner-strip").innerHTML = bannerHtml;


/* 5. PRODUCTS (CARDS, FILTER, SEARCH, SORT) */

const productGrid = byId("product-grid");
const searchBox = byId("search-box");

// What the visitor has picked so far
let chosenCategory = "all";
let chosenSearch = "";
let chosenSort = "default";

// Some browsers refill the search box after a refresh, so start empty
searchBox.value = "";

// Builds the HTML for one product card
function makeProductCard(product) {
    let badge = "";
    if (product.badge) {
        badge = '<span class="badge">' + product.badge + '</span>';
    }

    return '' +
        '<div class="card">' +
            '<img class="card-photo" src="' + product.image + '" alt="' + product.name + '">' +
            '<div class="card-body">' +
                badge +
                '<div class="product-category">' + product.category + '</div>' +
                '<h3 class="product-name">' + product.name + '</h3>' +
                '<p class="product-text">' + product.text + '</p>' +
                '<div class="product-bottom">' +
                    '<span class="product-price">' + money(product.price) + '</span>' +
                    '<span>' +
                        '<button class="link-button details-button" data-id="' + product.id + '">Details</button> ' +
                        '<button class="small-button add-button" data-id="' + product.id + '">Add</button>' +
                    '</span>' +
                '</div>' +
            '</div>' +
        '</div>';
}

// Works out which products to show for the current filter, search and sort
function getProductsToShow() {
    const searchWord = chosenSearch.toLowerCase().trim();

    const list = products.filter(function (product) {
        const rightCategory = chosenCategory === "all" || product.category === chosenCategory;
        const searchText = (product.name + " " + product.category + " " + product.text).toLowerCase();

        return rightCategory && searchText.includes(searchWord);
    });

    if (chosenSort === "price-low") {
        list.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (chosenSort === "price-high") {
        list.sort(function (a, b) {
            return b.price - a.price;
        });
    } else if (chosenSort === "name") {
        list.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    return list;
}

// Draws the product cards on the page
function showProducts() {
    const list = getProductsToShow();

    if (list.length === 1) {
        byId("result-count").textContent = "Showing 1 product";
    } else {
        byId("result-count").textContent = "Showing " + list.length + " products";
    }

    if (list.length === 0) {
        productGrid.innerHTML =
            '<p class="empty">No bakes match that search. ' +
            'Try another word, or press <strong>Everything</strong>.</p>';
        return;
    }

    let html = "";
    list.forEach(function (product) {
        html += makeProductCard(product);
    });
    productGrid.innerHTML = html;
}

// Highlights the chosen category button and redraws the cards
function chooseCategory(category) {
    chosenCategory = category;

    document.querySelectorAll(".filter").forEach(function (button) {
        if (button.dataset.category === category) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    showProducts();
}

// Draws the category buttons (Everything, Cakes, Pastries...)
let filterHtml = "";

categories.forEach(function (category) {
    let activeClass = "";
    if (category.name === chosenCategory) {
        activeClass = " active";
    }

    filterHtml +=
        '<button class="filter' + activeClass + '" data-category="' + category.name + '">' +
            category.label +
        '</button>';
});

byId("filter-buttons").innerHTML = filterHtml;

// The buttons are made by JavaScript, so we listen on the box around them
// and check which button was clicked.
byId("filter-buttons").addEventListener("click", function (event) {
    const button = event.target.closest(".filter");
    if (button) {
        chooseCategory(button.dataset.category);
    }
});

// Search as the visitor types
searchBox.addEventListener("input", function () {
    chosenSearch = searchBox.value;
    showProducts();
});

// Sort dropdown
byId("sort-box").addEventListener("change", function () {
    chosenSort = byId("sort-box").value;
    showProducts();
});

// Clicking a picture under the hero filters the products to that category.
// The link itself scrolls down to the products.
byId("banner-strip").addEventListener("click", function (event) {
    const tile = event.target.closest(".banner-tile");
    if (tile) {
        searchBox.value = "";
        chosenSearch = "";
        chooseCategory(tile.dataset.category);
    }
});

showProducts();


/* 6. GALLERY AND BIG PHOTO */

// The gallery uses every product photo plus three photos of the bakery
const galleryImages = [];

products.forEach(function (product) {
    galleryImages.push({ src: product.image, alt: product.name });
});

galleryImages.push({
    src: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/e888f41fa_generated_685effd4.png",
    alt: "The Bakerz Bite display case"
});
galleryImages.push({
    src: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/8aacc6500_generated_1794451d.png",
    alt: "Shaping bread dough by hand"
});
galleryImages.push({
    src: "https://media.base44.com/images/public/6ac406cdbd4f5ed78c91aaf8/a0584ae19_generated_271067cf.png",
    alt: "Inside the bakery"
});

let galleryHtml = "";

galleryImages.forEach(function (image) {
    galleryHtml +=
        '<div class="gallery-item">' +
            '<img src="' + image.src + '" alt="' + image.alt + '">' +
        '</div>';
});

byId("gallery-grid").innerHTML = galleryHtml;

// Click a photo to see it big
byId("gallery-grid").addEventListener("click", function (event) {
    const item = event.target.closest(".gallery-item");
    if (!item) {
        return;
    }

    const photo = item.querySelector("img");
    byId("lightbox-img").src = photo.src;
    byId("lightbox-img").alt = photo.alt;
    byId("lightbox").classList.add("open");
    updateOverlay();
});

function closeLightbox() {
    byId("lightbox").classList.remove("open");
    updateOverlay();
}

// Close with the X button, or by clicking the dark area around the photo
byId("lightbox").addEventListener("click", function (event) {
    if (event.target.id === "lightbox" || event.target.id === "lightbox-close") {
        closeLightbox();
    }
});


/* 7. BASKET */

// The dark background is shared by the basket and the popup.
// It shows while one of them is open, and the page behind stops scrolling.
function updateOverlay() {
    const basketOpen = byId("basket-panel").classList.contains("open");
    const popupOpen = byId("popup").classList.contains("open");
    const lightboxOpen = byId("lightbox").classList.contains("open");

    if (basketOpen || popupOpen) {
        byId("overlay").classList.add("show");
    } else {
        byId("overlay").classList.remove("show");
    }

    if (basketOpen || popupOpen || lightboxOpen) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove("no-scroll");
    }
}

// The basket is a list like [{ id: 4, quantity: 2 }] saved in the browser
function getBasket() {
    const basket = loadSaved("bakerzBasket", []);
    if (Array.isArray(basket)) {
        return basket;
    }
    return [];
}

function saveBasket(basket) {
    saveData("bakerzBasket", basket);
    showBasket();
}

function addToBasket(id) {
    const basket = getBasket();
    const item = basket.find(function (entry) {
        return entry.id === id;
    });

    if (item) {
        item.quantity = item.quantity + 1;
    } else {
        basket.push({ id: id, quantity: 1 });
    }

    saveBasket(basket);
    showMessage(findProduct(id).name + " added to your basket");
}

// Used by the + and - buttons
function changeQuantity(id, change) {
    const basket = getBasket();

    basket.forEach(function (item) {
        if (item.id === id) {
            item.quantity = item.quantity + change;
        }
    });

    // Anything that drops to zero gets removed
    const newBasket = basket.filter(function (item) {
        return item.quantity > 0;
    });

    saveBasket(newBasket);
}

function removeFromBasket(id) {
    const newBasket = getBasket().filter(function (item) {
        return item.id !== id;
    });

    saveBasket(newBasket);
}

// Redraws the basket panel, the number on the button and the total
function showBasket() {
    let html = "";
    let total = 0;
    let count = 0;

    getBasket().forEach(function (item) {
        const product = findProduct(item.id);
        if (!product) {
            return; // product doesn't exist anymore, skip it
        }

        const linePrice = product.price * item.quantity;
        total = total + linePrice;
        count = count + item.quantity;

        html +=
            '<div class="basket-item">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
                '<div class="basket-item-text">' +
                    '<strong>' + product.name + '</strong>' +
                    '<span class="item-price">' + money(product.price) + ' each</span>' +
                    '<button class="round-button change-button" data-id="' + product.id + '" data-change="-1">−</button>' +
                    '<span class="quantity">' + item.quantity + '</span>' +
                    '<button class="round-button change-button" data-id="' + product.id + '" data-change="1">+</button>' +
                    '<button class="remove-button" data-id="' + product.id + '">Remove</button>' +
                '</div>' +
                '<strong>' + money(linePrice) + '</strong>' +
            '</div>';
    });

    if (html === "") {
        html = '<p class="quiet">Your basket is empty. Add something from the products.</p>';
    }

    byId("basket-items").innerHTML = html;
    byId("basket-count").textContent = count;
    byId("basket-total").textContent = money(total);
}

function openBasket() {
    byId("basket-panel").classList.add("open");
    updateOverlay();
}

function closeBasket() {
    byId("basket-panel").classList.remove("open");
    updateOverlay();
}

byId("basket-button").addEventListener("click", openBasket);
byId("basket-close").addEventListener("click", closeBasket);

// Add and Details buttons are made by JavaScript, so we listen on the
// product grid and check which button was clicked.
productGrid.addEventListener("click", function (event) {
    const addButton = event.target.closest(".add-button");
    const detailsButton = event.target.closest(".details-button");

    if (addButton) {
        addToBasket(Number(addButton.dataset.id));
    }

    if (detailsButton) {
        openPopup(Number(detailsButton.dataset.id));
    }
});

// Same idea for the + - and Remove buttons inside the basket
byId("basket-items").addEventListener("click", function (event) {
    const changeButton = event.target.closest(".change-button");
    const removeButton = event.target.closest(".remove-button");

    if (changeButton) {
        changeQuantity(Number(changeButton.dataset.id), Number(changeButton.dataset.change));
    }

    if (removeButton) {
        removeFromBasket(Number(removeButton.dataset.id));
    }
});

byId("empty-basket").addEventListener("click", function () {
    saveBasket([]);
    showMessage("Basket emptied");
});

byId("checkout-button").addEventListener("click", function () {
    byId("basket-message").textContent = "Demo only - no payment is taken and no order is placed.";
});


/* 8. PRODUCT POPUP */

// Remembers which product the popup is showing
let popupProductId = null;

function openPopup(id) {
    const product = findProduct(id);
    if (!product) {
        return;
    }

    popupProductId = id;

    byId("popup-photo").src = product.image;
    byId("popup-photo").alt = product.name;
    byId("popup-category").textContent = product.category;
    byId("popup-name").textContent = product.name;
    byId("popup-text").textContent = product.text;
    byId("popup-ingredients").textContent = product.ingredients;
    byId("popup-price").textContent = money(product.price);

    byId("popup").classList.add("open");
    updateOverlay();
}

function closePopup() {
    byId("popup").classList.remove("open");
    updateOverlay();
}

byId("popup-add").addEventListener("click", function () {
    addToBasket(popupProductId);
    closePopup();
});

byId("popup-close").addEventListener("click", closePopup);
byId("popup-keep-browsing").addEventListener("click", closePopup);

// Clicking the dark background closes whatever is open
byId("overlay").addEventListener("click", function () {
    closePopup();
    closeBasket();
});

// Pressing Escape closes everything too
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePopup();
        closeBasket();
        closeLightbox();
    }
});


/* 9. STAR RATING AND FEEDBACK */

let chosenRating = 0;
const starsBox = byId("rating-stars");

// Lights up the first few stars
function paintStars(count) {
    starsBox.querySelectorAll(".star").forEach(function (star) {
        if (Number(star.dataset.value) <= count) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
}

// Preview the rating while hovering
starsBox.addEventListener("mouseover", function (event) {
    const star = event.target.closest(".star");
    if (star) {
        paintStars(Number(star.dataset.value));
    }
});

// Save the rating when a star is clicked
starsBox.addEventListener("click", function (event) {
    const star = event.target.closest(".star");
    if (star) {
        chosenRating = Number(star.dataset.value);
        paintStars(chosenRating);
    }
});

// Go back to the chosen rating when the mouse leaves
starsBox.addEventListener("mouseleave", function () {
    paintStars(chosenRating);
});

// Shows the saved feedback on the page
function showFeedback() {
    const feedback = loadSaved("bakerzFeedback", []);
    const list = byId("feedback-list");

    if (!Array.isArray(feedback) || feedback.length === 0) {
        list.innerHTML = '<p class="quiet">No feedback yet. Be the first to leave a review!</p>';
        return;
    }

    let html = "";

    feedback.forEach(function (item) {
        // Make sure the rating is a number between 0 and 5
        const rating = Math.min(5, Math.max(0, Number(item.rating) || 0));

        html +=
            '<div class="feedback-item">' +
                '<div class="feedback-stars">' + "★".repeat(rating) + "☆".repeat(5 - rating) + '</div>' +
                '<div class="feedback-name">' + cleanText(item.name) +
                    ' <span class="quiet">- ' + cleanText(item.date) + '</span></div>' +
                '<div class="feedback-text">' + cleanText(item.message) + '</div>' +
            '</div>';
    });

    list.innerHTML = html;
}

byId("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const messageBox = byId("feedback-message-box");

    // A star rating is needed first
    if (chosenRating === 0) {
        messageBox.textContent = "Please pick a star rating first.";
        return;
    }

    const name = byId("feedback-name").value.trim();

    // Newest feedback goes to the top of the list
    const feedback = loadSaved("bakerzFeedback", []);
    feedback.unshift({
        name: name,
        rating: chosenRating,
        message: byId("feedback-message").value.trim(),
        date: new Date().toLocaleDateString()
    });
    saveData("bakerzFeedback", feedback);

    messageBox.textContent = "Thank you " + name + "! Your feedback has been saved (demo only).";

    // Clear the form for next time
    byId("feedback-form").reset();
    chosenRating = 0;
    paintStars(0);
    showFeedback();
});

showFeedback();


/* 10. CONTACT AND NEWSLETTER FORMS (DEMO ONLY) */

byId("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = byId("contact-name").value.trim();

    byId("contact-message-box").innerHTML =
        "Thank you " + cleanText(name) + "! This is a demo website, so your message has " +
        "<strong>not really been sent</strong>. Call (555) 012-3456 to reach us.";

    byId("contact-form").reset();
});

byId("newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    byId("newsletter-message").textContent = "Demo only - nobody has really been subscribed yet.";

    byId("newsletter-form").reset();
});


/* 11. MENU (MOBILE TOGGLE AND HIGHLIGHT) */

const menu = byId("menu");
const menuToggle = byId("menu-toggle");

// Closes the dropdown menu on phones
function closeMenu() {
    menu.classList.remove("open");
    menuToggle.textContent = "☰";
}

// Handles the hamburger button
menuToggle.addEventListener("click", function () {
    if (menu.classList.contains("open")) {
        closeMenu();
    } else {
        menu.classList.add("open");
        menuToggle.textContent = "✕";
    }
});

// Close the menu after tapping a link
menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
        closeMenu();
    }
});

// Highlights the menu link of the section you're looking at.
// A section counts once its top has scrolled up near the menu bar.
const pageSections = document.querySelectorAll("section");
const menuLinks = menu.querySelectorAll("a");

function highlightMenu() {
    let currentId = "";

    pageSections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= 140) {
            currentId = section.id;
        }
    });

    menuLinks.forEach(function (link) {
        if (link.getAttribute("href") === "#" + currentId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", highlightMenu);
highlightMenu();


/* 12. FOOTER YEAR */

byId("current-year").textContent = new Date().getFullYear();


/* START */

// Draw the basket once when the page loads
showBasket();

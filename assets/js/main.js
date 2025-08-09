/**
* Template Name: HomeSpace
* Template URL: https://bootstrapmade.com/homespace-bootstrap-real-estate-template/
* Updated: Jul 05 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();



// /////////////////////////    PROPERTY DETAIL


  function sendMessage() {
    const phoneNumber = "2347018899056"; // Replace with your WhatsApp number (in international format without +)
    const message = "Hello, I'm interested in one of your properties."; // Optional pre-filled message

    // const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const url = `https://wa.me/2347018899056?text=Hello%20Mr%20Bernard%2C%20I'm%20interested%20in%20one%20of%20your%20properties`

    window.open(url, '_blank');
  }





// /////////////////////////    control search in properties.html


document.addEventListener("DOMContentLoaded", function () {
  const locationSelect = document.getElementById("filter-location");
  const typeSelect = document.getElementById("filter-type");
  const priceSelect = document.getElementById("filter-price");
  const bedroomBtns = document.querySelectorAll(".bed-btn");
  let selectedBeds = "any";

  function parsePriceRange(priceText) {
  priceText = priceText.trim().toLowerCase();
  if (priceText === "any price") return [0, Infinity];
  if (priceText.includes("+")) {
    const numStr = priceText.replace(/[^0-9]/g, "");
    const unit = priceText.includes("m") ? 1_000_000 : 1_000;
    const min = parseInt(numStr) * unit;
    return [min, Infinity];
  }
  // For ranges like "₦0 - ₦500k" or "₦500k - ₦1M"
  const matches = priceText.match(/(\d+)([km]?)/g); // captures numbers with optional unit
  if (!matches || matches.length < 2) return [0, Infinity];
  
  function toNumber(str) {
    const num = parseInt(str);
    if (str.includes("m")) return num * 1_000_000;
    if (str.includes("k")) return num * 1_000;
    return num;
  }
  
  const min = toNumber(matches[0]);
  const max = toNumber(matches[1]);
  return [min, max];
}


  function filterProperties() {
    const loc = locationSelect.value.trim().toLowerCase();
    const type = typeSelect.value.trim().toLowerCase();
    const priceRange = parsePriceRange(priceSelect.value);
    const minBeds = selectedBeds === "any" ? 0 : parseInt(selectedBeds);

    document.querySelectorAll(".property-item").forEach(item => {
      const itemLoc = (item.dataset.location || "").trim().toLowerCase();
      const itemType = (item.dataset.type || "").trim().toLowerCase();
      const itemPrice = parseInt(item.dataset.price) || 0;
      const itemBeds = parseInt(item.dataset.bedrooms) || 0;

      const matchesLocation = !loc || loc === "enter city" || itemLoc.includes(loc);
      const matchesType = !type || type === "any type" || itemType === type;
      const matchesPrice = itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
      const matchesBeds = itemBeds >= minBeds;

      if (matchesLocation && matchesType && matchesPrice && matchesBeds) {
        item.parentElement.style.display = "";
      } else {
        item.parentElement.style.display = "none";
      }
    });

    const visibleItems = [...document.querySelectorAll(".property-item")]
      .filter(item => item.parentElement.style.display !== "none");

    let noResultsMsg = document.querySelector("#no-results");
    if (visibleItems.length === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div");
        noResultsMsg.id = "no-results";
        noResultsMsg.className = "col-12 text-center text-muted mt-3";
        noResultsMsg.textContent = "No results found.";
        document.querySelector(".row.g-3").appendChild(noResultsMsg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  bedroomBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      bedroomBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      selectedBeds = this.dataset.beds;
      filterProperties();
    });
  });

  locationSelect.addEventListener("change", filterProperties);
  typeSelect.addEventListener("change", filterProperties);
  priceSelect.addEventListener("change", filterProperties);

  filterProperties();
});



// ///////////////////////////////    control sort in properties.html
function sortVisibleProperties(sortOrder) {
  const container = document.querySelector(".row.g-4");
  const visibleWrappers = [...container.children].filter(wrapper => wrapper.style.display !== "none");

  visibleWrappers.sort((a, b) => {
    const priceA = parseInt(a.querySelector(".property-item").dataset.price) || 0;
    const priceB = parseInt(b.querySelector(".property-item").dataset.price) || 0;

    if (sortOrder === "Price: Low to High") {
      return priceA - priceB;
    } else if (sortOrder === "Price: High to Low") {
      return priceB - priceA;
    }
    return 0; // no change if unknown order
  });

  visibleWrappers.forEach(wrapper => container.appendChild(wrapper));
}

const sortSelect = document.getElementById("filter-sort");
sortSelect.addEventListener("change", () => {
  sortVisibleProperties(sortSelect.value);
});


// /////////////////////////    control count results in properties.html



  function updateResultsCount(count) {
    const label = count === 1 ? "Property" : "Properties";
    document.querySelector('.results-info h5').textContent = `${count} ${label} Found`;
  }

  function filterProperties() {
    const locationInput = document.querySelector('#filter-location').value.trim().toLowerCase();
    const typeInput = document.querySelector('#filter-type').value.trim().toLowerCase();
    const priceRange = document.querySelector('#filter-price').value.trim();
    const bedroomBtns = document.querySelectorAll('.bed-btn');
    let selectedBeds = "any";
    bedroomBtns.forEach(btn => {
      if (btn.classList.contains('active')) {
        selectedBeds = btn.dataset.beds;
      }
    });

    // Parse price range
    let minPrice = 0;
    let maxPrice = Infinity;
    if (priceRange !== "Any Price") {
      if (priceRange.includes('+')) {
        minPrice = parseInt(priceRange.replace(/[^0-9]/g, '')) || 0;
      } else {
        const parts = priceRange.match(/\d+/g) || [];
        if(parts.length === 2) {
          minPrice = parseInt(parts[0]) * 1000 || 0;
          maxPrice = parseInt(parts[1]) * 1000 || Infinity;
        }
      }
    }

    const propertyItems = document.querySelectorAll('.property-item');
    let matchCount = 0;

    propertyItems.forEach(item => {
      const location = (item.getAttribute('data-location') || '').toLowerCase();
      const type = (item.getAttribute('data-type') || '').toLowerCase();
      const price = parseInt(item.getAttribute('data-price')) || 0;
      const beds = parseInt(item.getAttribute('data-bedrooms')) || 0;
      const minBeds = selectedBeds === "any" ? 0 : parseInt(selectedBeds);

      let match = true;

      if (locationInput && locationInput !== "enter city" && !location.includes(locationInput)) match = false;
      if (typeInput && typeInput !== "any type" && type !== typeInput) match = false;
      if (priceRange !== "Any Price" && (price < minPrice || price > maxPrice)) match = false;
      if (beds < minBeds) match = false;

      if (match) {
        item.parentElement.style.display = 'block';
        matchCount++;
      } else {
        item.parentElement.style.display = 'none';
      }
    });

    updateResultsCount(matchCount);

    // Show "no results" message if needed
    let noResultsMsg = document.querySelector('#no-results');
    if (matchCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results';
        noResultsMsg.className = 'col-12 text-center text-muted mt-3';
        noResultsMsg.textContent = 'No results found.';
        document.querySelector('.row.g-4').appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Initially set first bedroom button as active (or any)
    const bedroomBtns = document.querySelectorAll('.bed-btn');
    if (bedroomBtns.length) {
      bedroomBtns.forEach(btn => btn.classList.remove('active'));
      bedroomBtns[0].classList.add('active');
    }

    // Attach change listeners on selects
    document.querySelector('#filter-location').addEventListener('change', filterProperties);
    document.querySelector('#filter-type').addEventListener('change', filterProperties);
    document.querySelector('#filter-price').addEventListener('change', filterProperties);

    // Attach click listeners on bedroom buttons
    bedroomBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        bedroomBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProperties();
      });
    });

    // Run filter initially to set up results count
    filterProperties();
  });







// /////////////////////////    control search in index.html
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".property-search-form");
  const btn = form.querySelector(".search-btn");
  const locationInput = form.querySelector("#search-location");
  const typeSelect = form.querySelector("#search-type");
  const budgetSelect = form.querySelector("#search-budget");
  const roomsSelect = form.querySelector("#search-rooms");

  // Change button type to button to prevent form submission
  btn.setAttribute("type", "button");

  function allFieldsFilled() {
    return (
      locationInput.value.trim() !== "" &&
      typeSelect.value.trim() !== "" &&
      budgetSelect.value.trim() !== "" &&
      roomsSelect.value.trim() !== ""
    );
  }

  btn.addEventListener("click", () => {
    if (allFieldsFilled()) {
      const target = document.getElementById('featured-properties');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      alert("Please fill all fields before searching.");
    }
  });
});




// /////////////////////////      control search of  properties in index.html

  // document.querySelector('.property-search-form').addEventListener('submit', function (e) {
  //   e.preventDefault();

  //   const locationInput = document.querySelector('#search-location').value.toLowerCase();
  //   const typeInput = document.querySelector('#search-type').value.toLowerCase();
  //   const priceRange = document.querySelector('#search-budget').value;
  //   const bedrooms = document.querySelector('#search-rooms').value;

  //   const [minPrice, maxPrice] = priceRange.includes('+')
  //     ? [parseInt(priceRange), Infinity]
  //     : priceRange.split('-').map(Number);

  //   const propertyItems = document.querySelectorAll('.property-item');
  //   let anyMatch = false;

  //   propertyItems.forEach(item => {
  //     const location = item.getAttribute('data-location').toLowerCase();
  //     const type = item.getAttribute('data-type').toLowerCase();
  //     const price = parseInt(item.getAttribute('data-price'));
  //     const beds = item.getAttribute('data-bedrooms');

  //     let match = true;

  //     if (locationInput && !location.includes(locationInput)) match = false;
  //     if (typeInput && type !== typeInput) match = false;
  //     if (priceRange && (price < minPrice || price > maxPrice)) match = false;
  //     if (bedrooms && beds !== bedrooms) match = false;

  //     if (match) {
  //       item.parentElement.style.display = 'block';
  //       anyMatch = true;
  //     } else {
  //       item.parentElement.style.display = 'none';
  //     }
  //   });

  //   document.querySelector('#no-results').style.display = anyMatch ? 'none' : 'block';
  // });























// document.querySelectorAll('.share-btn').forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     // Find the closest property-item container for this button
//     const propertyItem = btn.closest('.property-item');
//     if (!propertyItem) return;

//     // Get the property link href (first .property-link inside propertyItem)
//     const propertyLinkElement = propertyItem.querySelector('a.property-link');
//     if (!propertyLinkElement) return;

//     // Resolve full absolute URL of the property
//     const relativeUrl = propertyLinkElement.getAttribute('href');
//     const propertyUrl = new URL(relativeUrl, window.location.origin).href;

//     // Construct social share URLs
//     const shareUrls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
//       twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent('Check out this property!')}`,
//       whatsapp: `https://wa.me/?text=${encodeURIComponent('Check out this property: ' + propertyUrl)}`
//     };

//     // Open a new popup window and write the share links
//     const shareWindow = window.open('', 'Share', 'width=400,height=300');
//     shareWindow.document.write(`
//       <html>
//       <head><title>Share Property</title></head>
//       <body style="font-family:sans-serif; padding:20px;">
//         <p>Share this property on:</p>
//         <ul>
//           <li><a href="${shareUrls.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a></li>
//           <li><a href="${shareUrls.twitter}" target="_blank" rel="noopener noreferrer">Twitter</a></li>
//           <li><a href="${shareUrls.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
//         </ul>
//       </body>
//       </html>
//     `);
//     shareWindow.document.close();
//   });
// });


document.querySelectorAll('.share-btn').forEach(button => {
  const shareMenu = document.createElement('div');
  shareMenu.className = 'share-menu';
  shareMenu.style.display = 'none';
  shareMenu.style.position = 'absolute';
  shareMenu.style.background = '#fff';
  shareMenu.style.border = '1px solid #ccc';
  shareMenu.style.padding = '8px';
  shareMenu.style.borderRadius = '6px';
  shareMenu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  shareMenu.style.zIndex = 1000;
  shareMenu.innerHTML = `
    <a href="#" class="share-link" data-network="facebook" target="_blank">Facebook</a><br>
    <a href="#" class="share-link" data-network="twitter" target="_blank">Twitter</a><br>
    <a href="#" class="share-link" data-network="whatsapp" target="_blank">WhatsApp</a>
  `;
  document.body.appendChild(shareMenu);

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = button.getBoundingClientRect();
    shareMenu.style.top = `${rect.bottom + window.scrollY}px`;
    shareMenu.style.left = `${rect.left + window.scrollX}px`;
    shareMenu.style.display = shareMenu.style.display === 'block' ? 'none' : 'block';
  });

  shareMenu.querySelectorAll('.share-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const url = window.location.href; // Replace if you have property-specific URL
      const network = e.target.dataset.network;
      let shareUrl = '';

      if (network === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      } else if (network === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
      } else if (network === 'whatsapp') {
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
      }

      window.open(shareUrl, '_blank', 'width=600,height=400');
      shareMenu.style.display = 'none'; // Hide menu after click
    });
  });

  // Close the menu if user clicks outside
  document.addEventListener('click', () => {
    shareMenu.style.display = 'none';
  });
});


// let activeElement = document.querySelectorAll(".nav-item a");
// activeElement.forEach((element) => {
//     element.addEventListener("click", () => {
//         // Remove 'selected' class from all elements
//         activeElement.forEach((e) => {
//             e.classList.remove("selected");
//         });
//         // Add 'selected' class to the clicked element
//         element.classList.add("selected");
//     });
// });

// let tabsNotHome = document.querySelectorAll(".nav-item:not(.product)");
// let homePage = document.querySelector("#product-page");
// tabsNotHome.forEach((tab) => {
//     tab.addEventListener("click", () => {
//         homePage.classList.add("d-none");
//     });
// });
// let addBtn = document.querySelector('.add-button');
// addBtn.addEventListener('click', () => {
//     homePage.classList.add("d-none");
// });

// let tabHome = document.querySelector(".product");
// tabHome.addEventListener("click", () => {
//     homePage.classList.remove("d-none");
// });

// Get the active tab from local storage
let activeTab = localStorage.getItem('activeTab');
if (activeTab) {
  // If there is an active tab in local storage, add 'selected' class to it
  document.querySelector(`#${activeTab}`).classList.add('selected');
}

// Get the hidden page from local storage
let hiddenPage = localStorage.getItem('hiddenPage');
if (hiddenPage) {
  // If there is a hidden page in local storage, add 'd-none' class to it
  document.querySelector(`#${hiddenPage}`).classList.add('d-none');
}

let activeElement = document.querySelectorAll('.nav-item a');
activeElement.forEach((element) => {
    element.addEventListener('click', () => {
        // Remove 'selected' class from all elements
        activeElement.forEach((e) => {
            e.classList.remove('selected');
            localStorage.removeItem('activeTab');
        });
        // Add 'selected' class to the clicked element
        element.classList.add('selected');
        
        // Save the active tab to local storage
        localStorage.setItem('activeTab', element.id);
  });
});



let tabsNotHome = document.querySelectorAll('.nav-item:not(.product)');
let homePage = document.querySelector('#product-page');
tabsNotHome.forEach((tab) => {
  tab.addEventListener('click', () => {
    homePage.classList.add('d-none');

    // Save the hidden page to local storage
    localStorage.setItem('hiddenPage', homePage.id);
  });
});

let addBtn = document.querySelector('.add-button');
addBtn.addEventListener('click', () => {
  homePage.classList.add('d-none');
  localStorage.setItem('hiddenPage', homePage.id);
});
let submitBtn =document.querySelector('.form-btn');
submitBtn.addEventListener('click', () => {
    homePage.classList.remove('d-none')
    localStorage.removeItem('hiddenPage');
})

let tabHome = document.querySelector('.product');
tabHome.addEventListener('click', () => {
  homePage.classList.remove('d-none');

  // Remove the hidden page from local storage
  localStorage.removeItem('hiddenPage');
});

let backBtn = document.querySelector('.back-btn')
backBtn.addEventListener('click', () => {
  homePage.classList.remove('d-none');
  localStorage.removeItem('hiddenPage');
});
let logOutBtn = document.querySelector('.bi-box-arrow-right')
logOutBtn.addEventListener('click', () => {
  localStorage.clear();
});

// Using jQurey for making reponsive side menu
(function ($) {
    "use strict";
    $(".sidebar-toggler").click(function () {
        $(".sidebar").toggleClass("open");
        return false;
    });

    $(".sidebar-toggler").click(function () {
        $(".sidebar-toggler").toggleClass("toggler-open");
        return false;
    });

    $(document).ready(function () {
        // Check window size on page load
        checkWindowSize();

        // Check window size on resize
        $(window).resize(function () {
            checkWindowSize();
        });

        function checkWindowSize() {
            var windowWidth = $(window).width();

            if (windowWidth < 991.99) {
                $(".nav-link").click(function () {
                    $(".sidebar").toggleClass("open");
                    $(".sidebar-toggler").toggleClass("toggler-open");
                });
            }
            return false;
        }
    });
})(jQuery);

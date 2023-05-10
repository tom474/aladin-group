let activeElement = document.querySelectorAll('.nav-item a');
activeElement.forEach((element) => {
    element.addEventListener('click', () => {
        // Remove 'selected' class from all elements
        activeElement.forEach((e) => {
            e.classList.remove('selected');
        });
        // Add 'selected' class to the clicked element
        element.classList.add('selected');
    });
});

let tabsNotHome = document.querySelectorAll('.nav-item:not(.home)');
let homePage = document.querySelector('#home-page');
tabsNotHome.forEach((tab) => {
    tab.addEventListener('click', () => {
        homePage.classList.add('d-none');
    });
});

let tabHome = document.querySelector('.home');
tabHome.addEventListener('click', () => {
    homePage.classList.remove('d-none');
});


// Using jQurey for making charts
(function ($) {
    "use strict";
    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";
    // Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: ['January', 'Febuary', "March", 'April', "May", 'June', "July", "August", 'September', 'October', 'November', 'December'],
            datasets: [{
                label: "Sales",
                fill: false,
                backgroundColor: "#f68713",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15, 14]
            }]
        },
        options: {
            responsive: true
        }
    });
    // Multiple Bar Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
            datasets: [{
                    label: "Ho Chi Minh",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgb(246,135,19, .7)"
                },
                {
                    label: "Da Nang",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgb(246,135,19, .5)"
                },
                {
                    label: "Ha Noi",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgb(246,135,19, .3)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });
})(jQuery);


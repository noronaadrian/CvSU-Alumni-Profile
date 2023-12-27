// function to toggle dark mode
// turn on if newState is "on", otherwise, turn off dark mode
function toggleDarkMode(newState) {
    var darkModeModification = `<style class='dark-mode-mod'>
    .logo-div,
    .footer-widget,
    .nav-link,
    .search-section,
    .button {
        filter: invert(1);
        transition: filter 0.5s ease;
    }
    body, .nav-bar, .footer, .section, .light-color-gradient {
        transition: background-color 0.2s ease;
    }
</style>`;
    // turning on dark mode
    if (newState == "on") {
        // enable dark mode using the DarkReader API 
        DarkReader.enable({ contrast: 110 });
        // set the toggle button to have the sun icon
        document.querySelector("div.dark-mode-toggle").firstElementChild.className = "gg-sun";
        // insert style element to apply some minor adjustments
        document.head.insertAdjacentHTML("beforeend", darkModeModification);
        // set cookie so that preference will be remembered
        setCookie("darkmode", "on", 9999);
    }
    // turning off dark mode
    else {
        // disable dark mode using the DarkReader API
        DarkReader.disable();
        // set the toggle button to have the moon icon
        document.querySelector("div.dark-mode-toggle").firstElementChild.className = "gg-moon";
        // find the style element with the modifications
        var cssMod = document.querySelector(".dark-mode-mod");
        // if the style element is on the page
        if (cssMod) {
            // remove the style element
            cssMod.parentElement.removeChild(cssMod);
        }
        // insert style element to remove adjustments
    var darkModeModificationOff = `<style class='dark-mode-mod-off'>
    .logo-div,
    .footer-widget,
    .nav-link,
    .search-section,
    .button {
        transition: filter 0.5s ease;
    }
    body, .nav-bar, .footer, .section, .light-color-gradient {
        transition: background-color 0.2s ease;
    }
    </style>`;

    // insert the style element to revert adjustments
    document.head.insertAdjacentHTML("beforeend", darkModeModificationOff);
        // set cookie so that preference will be remembered
        setCookie("darkmode", "off", 9999);
    }
}

// add an event listener to detect clicking on the dark mode toggle button
document.querySelector("div.dark-mode-toggle").addEventListener("click", function () {
    // if there is an element with the class "darkreader" on the page (DarkReader is enabled)
    if (document.querySelector(".darkreader")) {
        // turn off dark mode
        toggleDarkMode("off");
    }
    else {
        // turn on dark mode
        toggleDarkMode("on");
    }
}, false);

// code from w3schools to set a cookie (https://www.w3schools.com/js/js_cookies.asp)
// parameters: name of the cookie, value to set, number of days until it expires
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// code from w3schools to get the value of a cookie (https://www.w3schools.com/js/js_cookies.asp)
// parameters: name of the cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// when the page loads, toggle dark mode according to the cookie settings
window.addEventListener("load", function () {
    // get the dark mode cookie value
    var darkModeCookie = getCookie("darkmode");
    // if the cookie is set to "on", turn on dark mode
    if (darkModeCookie == "on") {
        // toggle dark mode
        toggleDarkMode(darkModeCookie);
    }
}, false);

// listen for changes in system dark mode preference
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (e.matches) {
            // System switched to dark mode
            toggleDarkMode("on");
        } else {
            // System switched to light mode
            toggleDarkMode("off");
        }
    });
}
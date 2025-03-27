/*console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a"); // Get all a's inside nav's
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname); // Acha o link que é o mesmo do URL atual
if (currentLink) { // So that it doesnt throw an error if no link to the current page is found
    currentLink.classList.add("current"); // Adds current class to the element list of classes
}*/

// Checks where we are in the file tree and deals with relative paths
const ARE_WE_HOME = document.documentElement.classList.contains("home"); // O <html> do index.html root é o único que tem classe "home"

// We want to create a bond between URLs and page titles
const pages = [
    {url: "/", title: "Home"},
    {url: "/projects/", title: "Projects"},
    {url: "/contact/", title: "Contact"},
    {url: "https://github.com/LarissaLAfonso", title: "GitHub"}
];

let nav = document.createElement("nav");
document.body.prepend(nav); // Create nav element at the beginning of <body>

for (let p of pages) {      // For each page
    let url = p.url;        // Get its URL
    let title = p.title;    // And its title

    /*if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }*/
    
    // Create a link with the page's URL and title
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current"); 
    }

    if (a.host !== location.host) { // External links create a new tab when clicked 
        a.target = "_blank";
    }

    nav.append(a); // Add <a> tag to <nav>
}

document.body.insertAdjacentHTML("afterbegin", `
    <div class="color-scheme">
        Theme
        <select>
            <option value="light dark">Auto</option>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
        </select>
    </div>`
);

let select = document.querySelector("select");

// Update scheme and save to storage
select.addEventListener("input", (event) => {
    document.documentElement.style.setProperty("color-scheme", event.target.value);
    localStorage.colorScheme = event.target.value;
});

// Load saved preference on page load
if (localStorage.colorScheme) {
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}
/*console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a");
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
currentLink?.classList.add("current");*/

const pages = [
    {url: ".", title: "Home"},
    {url: "projects", title: "Projects"},
    {url: "contact", title: "Contact"},
    {url: "https://github.com/LarissaLAfonso", title: "GitHub"}
];

// Create <nav> at the beginning of <body>
let nav = document.createElement("nav");
document.body.prepend(nav);

// Checks where we are in the file tree and deals with relative paths
const ARE_WE_HOME = document.documentElement.classList.contains("home");

// Iterate over pages and add <a> elements in each <nav>
for (let p of pages) {
    let url = p.url;
    let title = p.title;
    if (!ARE_WE_HOME && !url.startsWith("http")) {
       url = "../" + url;
    }
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current"); // Add to the <a> class
    }
    else if (a.host !== location.host) { // External links  
        a.target = "_blank";
    }
    nav.append(a); // Add <a> tag to <nav>
}

document.body.insertAdjacentHTML("afterbegin", `
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Auto</option>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
        </select>
    </label>`
);

const select = document.querySelector("select");

// Load saved preference on page load
if (localStorage.colorScheme) {
    document.documentElement.style.colorScheme = localStorage.colorScheme;
    select.value = localStorage.colorScheme;
}

// Update scheme and save to storage
select.addEventListener("input", (event) => {
    const scheme = event.target.value;
    
    // Update the color scheme
    document.documentElement.style.colorScheme = scheme;
    
    // Persist to localStorage
    localStorage.colorScheme = scheme;
});
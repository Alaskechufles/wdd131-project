const currentYear = document.querySelector("#currentyear");
const lastMod = document.querySelector("#lastModified");
const today = new Date();
let lastModifiedDate = document.lastModified;
currentYear.textContent = `©${today.getFullYear()}`;
lastMod.textContent = `Last Modified: ${lastModifiedDate}`;

// block full-page modal ad
document
  .querySelectorAll("div[class*='roadblock']")
  .forEach((e) => e.style.setProperty("display", "none"));

// block ads on news page, left, right and center
document
  .querySelectorAll("div[class*='-ad']")
  .forEach((e) => e.style.setProperty("display", "none"));

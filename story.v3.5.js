(() => {
  "use strict";
  const build = "3.6.0";
  const pinnedCore = "https://cdn.jsdelivr.net/gh/AhmedYYYA/SAMT4@5b6528716a87d8b6e5b1d61adf4f8d79e2383fbf/story.v3.5.js";

  function addStyle(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(link);
  }

  function addScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.append(script);
    });
  }

  document.body.dataset.build = `phase3-v${build}-story`;
  window.SAMT_BUILD = build;
  addStyle("styles.v3.6.css");

  addScript(pinnedCore)
    .then(() => addScript("navigation.v3.6.js"))
    .then(() => addScript("experience.v3.6.js"))
    .catch((error) => console.error("SAMT Story Phase 3.6 failed to initialise", error));
})();
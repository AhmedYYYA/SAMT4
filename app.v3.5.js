(() => {
  "use strict";
  const build = "3.6.0";
  const coreModule = "app.js";

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

  document.body.dataset.build = `phase3-v${build}`;
  window.SAMT_BUILD = build;
  addStyle("styles.v3.6.css");

  addScript(coreModule)
    .then(() => {
      window.SAMT_BUILD = build;
      return addScript("navigation.v3.6.js");
    })
    .then(() => addScript("experience.v3.6.js"))
    .catch((error) => {
      console.error("SAMT Phase 3.6 failed to initialise", error);
      document.body.classList.remove("is-loading");
    });
})();
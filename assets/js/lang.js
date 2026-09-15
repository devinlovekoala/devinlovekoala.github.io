// Has to be in the head tag, otherwise a flicker effect will occur.

// Determine the language setting from localStorage, falling back to the
// visitor's browser language, then to English.
let determineLangSetting = () => {
  let langSetting = localStorage.getItem("lang");
  if (langSetting == "en" || langSetting == "zh") {
    return langSetting;
  }
  return navigator.language && navigator.language.startsWith("zh") ? "zh" : "en";
};

// Change the language setting and apply it.
let setLangSetting = (langSetting) => {
  localStorage.setItem("lang", langSetting);
  document.documentElement.setAttribute("data-lang", langSetting);
};

// Toggle between English and Chinese.
let toggleLangSetting = () => {
  setLangSetting(determineLangSetting() == "zh" ? "en" : "zh");
};

let initLang = () => {
  setLangSetting(determineLangSetting());

  document.addEventListener("DOMContentLoaded", function () {
    const lang_toggle = document.getElementById("lang-toggle");
    if (!lang_toggle) return;

    lang_toggle.addEventListener("click", function () {
      toggleLangSetting();
    });
  });
};

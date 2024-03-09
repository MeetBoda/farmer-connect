export function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);

  window.googleTranslateElementInit = () => {
    // Create the translation element
    new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: true }, 'google_element');
  };
}

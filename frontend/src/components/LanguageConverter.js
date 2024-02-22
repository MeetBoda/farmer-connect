import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios'

function LanguageConverter() {
  const [options, setOptions] = useState([])
  const [to, setTo] = useState("en")
  const [loadGoogleTranslate, setLoadGoogleTranslate] = useState(false);

  useEffect(() => {
    if (!loadGoogleTranslate) {
      setLoadGoogleTranslate(true);
    }
  }, [loadGoogleTranslate]);

  useEffect(() => {
    if (loadGoogleTranslate) {
      document.addEventListener("visibilitychange", checkVisibility);
      return () => {
        document.removeEventListener("visibilitychange", checkVisibility);
      };
    }
  }, [loadGoogleTranslate]);

  const checkVisibility = () => {
    if (document.visibilityState === "visible") {
      new window.google.translate.TranslateElement("google_element");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <div id="google_element"></div>
      <Helmet>
        <script>
          {loadGoogleTranslate && `
            function loadGoogleTranslate(){
              window.onGoogleTranslateElementLoad = null;
              new window.google.translate.TranslateElement("google_element");
            }
          `}
        </script>
        <script src="https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"></script>
      </Helmet>
    </div>
  );
}

export default LanguageConverter;
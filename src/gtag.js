const gtag = (...args) => {
  if (typeof window !== "undefined") {
    if (typeof window.gtag === "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
    }

    window.gtag(...args);
  }
};

export default gtag;

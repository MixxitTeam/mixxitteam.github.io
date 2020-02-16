(function() {
  const scrollButton = document.querySelector("#scroll_arrow");
  scrollButton.addEventListener("click", _ => {
    window.scrollTo({
      "left": 0,
      "top": window.innerHeight,
      "behavior": "smooth"
    });
  });
}());

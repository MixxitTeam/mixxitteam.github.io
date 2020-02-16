(function() {
  const modpacks = {
    "classic": {"bg":"#ff002b", "fg": "#fff", "friendlyName": "Classic", "available": true },
    "arcane": {"bg":"#9500ff", "fg": "#fff", "friendlyName": "Arcane", "available": false },
    "fallout": {"bg":"#009eff", "fg": "#fff", "friendlyName": "Fallout", "available": false },
    "industry": {"bg":"#ff0", "fg": "#000", "friendlyName": "Industry", "available": false },
    "journey": {"bg":"#00ff30", "fg": "#000", "friendlyName": "Journey", "available": true },
  };
  const pSvg = document.querySelector("#pentagon");
  const gradient = document.querySelector("#pentagonGradient");
  const mpName = document.querySelector("#mp_name");
  
  let transitioning = false;

  addEventListener("mousemove", ev => {
    if (transitioning)
      return;
    
    const rect = pSvg.getBoundingClientRect();
    const relX = ev.clientX - rect.x;
    const relY = ev.clientY - rect.y;
    const nRelX = relX / rect.width;
    const nRelY = relY / rect.height;
    gradient.setAttribute("cx", nRelX);
    gradient.setAttribute("cy", nRelY);
  });

  Object.keys(modpacks).forEach(modpack => {
    const el = document.querySelector("#modpack_" + modpack);
    if (el !== null) {
      if (!modpacks[modpack].available) {
        el.setAttribute("disabled", "disabled");
        el.classList.add("modpack-unavailable");
        el.removeAttribute("href");
        el.addEventListener("click", ev => {
          ev.stopPropagation();
        }, true);
      }

      el.addEventListener("mouseenter", ev => {
        updateGradientColor(modpacks[modpack].bg);
        showModpackName(modpacks[modpack]);
      });
      el.addEventListener("focus", ev => {
        updateGradientColor(modpacks[modpack].bg);
        showModpackName(modpacks[modpack]);
      });
      el.addEventListener("mouseleave", ev => {
        updateGradientColor("#fff");
        showModpackName(null);
      });
      el.addEventListener("blur", ev => {
        updateGradientColor("#fff");
        showModpackName(null);
      });
    }
  });

  function updateGradientColor(color) {
    if (transitioning)
      return;
    
    gradient.querySelectorAll("stop").forEach(st => {
      st.setAttribute("stop-color", color);
    });
  }

  function showModpackName(modpack) {
    if (transitioning)
      return;

    if (modpack === null)
      modpack = { "bg": "", "friendlyName": "Select modpack", "available": true };
    if (!modpack.available)
      mpName.classList.add("unavailable");
    else
      mpName.classList.remove("unavailable");
    mpName.innerText = modpack.friendlyName;
    mpName.style.color = modpack.bg;
    mpName.classList.remove("bump");
    void mpName.clientHeight;
    mpName.classList.add("bump");
  }

  document.querySelectorAll("a[data-modpack]").forEach(el => {
    if (!modpacks[el.dataset.modpack].available)
      return;
    el.addEventListener("click", ev => {
      ev.preventDefault();

      if (transitioning)
        return false;

      transitioning = true;
      
      const logoFont = document.querySelector("#logo_font");
      logoFont.className = "logo-color-fade";
      logoFont.style.color = modpacks[el.dataset.modpack].fg;

      const transitionBlock = document.createElement("div");
      transitionBlock.className = "transition-block";
      transitionBlock.style.backgroundColor = modpacks[el.dataset.modpack].bg;
      transitionBlock.addEventListener("animationend", aev => {
        transitioning = false;
        location.href = el.href;
      });

      document.body.appendChild(transitionBlock);

      return false;
    });
  });
}());

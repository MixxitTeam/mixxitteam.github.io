function FetchModList() {
  const DOMmodlist = document.querySelector("#modlist");
  fetch("/modlists/" + MODPACK + ".json?t=" + (new Date().getTime().toString())).then(res => res.json()).then(dat => {
    if (dat.length < 1) {
      DOMmodlist.innerHTML = "Coming soon...";
      return;
    }
    dat.forEach(moditm => {
      const DOMentry = document.createElement("div");
      DOMentry.className = "mod-entry";
      
      const DOMmodname = document.createElement("span");
      DOMmodname.className = "entry-name";
      DOMmodname.innerText = moditm.modname;
      
      const DOMlinks = document.createElement("div");
      DOMlinks.className = "entry-links";
      
      const DOMlink = document.createElement("a");
      DOMlink.className = "mod-link mod-link-ws";
      DOMlink.innerHTML = '<i class="fas fa-globe-europe"></i>';
      DOMlink.href = moditm.website;
      DOMlink.target = "_blank";
      DOMlink.title = "Website";
      
      const DOMlinkwiki = document.createElement("a");
      DOMlinkwiki.className = "mod-link mod-link-wiki";
      DOMlinkwiki.innerHTML = '<i class="fab fa-wikipedia-w"></i>';
      if (moditm.wiki === null)
        DOMlinkwiki.classList.add("link-disabled");
      else {
        DOMlinkwiki.href = moditm.wiki;
        DOMlinkwiki.target = "_blank";
        DOMlinkwiki.title = "Mod wiki";
      }
      
      DOMlinks.appendChild(DOMlink);
      DOMlinks.appendChild(DOMlinkwiki);
      DOMentry.appendChild(DOMmodname);
      DOMentry.appendChild(DOMlinks);
      
      DOMmodlist.appendChild(DOMentry);
    });
  }).catch(rej => {
    DOMmodlist.innerHTML = "Coming soon...";
  });
}

(() => {
  const MAIN = {
    // selectors
    _: {
      // childImagesFromGlobalScope -  to reach child images from global scope
      childImages: ".product.grid .product__photo:not(:first-child) img",

      // to reach parent Element from child Image
      levelOfParentElementFromChildElement: 2,

      // to reach child parent elements from global scope
      childContainerElements: ".product.grid .product__photo:not(:first-child)",

      // to reach child images from parentContainer
      // childFromParent : "img",

      // static
      getParentElement: (childEl) => {
        let ret;
        i(childEl, MAIN._.levelOfParentElementFromChildElement);
        function i(el, l) {
          ret = el.parentElement;
          if (--l > 0) i(ret, l);
        }
        return ret;
      },
    },

    init: async () => {
      console.log("I see you", window.Shopify.theme.name || BOOMR.themeName);
      const o = await MAIN.makeJsJsonObject();

      // the js and json data
      MAIN.js = o.js;
      MAIN.json = o.json;

      // make images object to arrange images and thumbnail variant wise
      MAIN.arrangedImages = MAIN.createArrangedImagesObject(o);

      console.log(MAIN.getVariantId());
      console.log(MAIN.arrangedImages);

      MAIN.influenceImages();

      document
        .querySelectorAll("[class^='single-option-selector']")
        .forEach((s) => {
          s.addEventListener("change", MAIN.influenceImages);
        });

      console.log(MAIN);
    },
    makeJsJsonObject: async () => {
      const url = window.location.origin + window.location.pathname;
      js = await fetch(url + ".js").then((x) => x.json());
      json = await fetch(url + ".json").then((x) => x.json());
      return { js, json };
    },
    createArrangedImagesObject: (_o) => {
      const o = { common_media: {} };
      let ID = "common_media";
      let lastIndexOfMedia = -1;
      _o.js.variants.forEach((variant) => {
        for (let [index, media] of _o.js.media.entries()) {
          if (index > lastIndexOfMedia && variant.featured_media?.id) {
            if (variant.featured_media.id == media.id) {
              ("add media to the variant");
              o[variant.id] = {};
              o[variant.id][media.id] = media.preview_image.src;
              ID = variant.id;

              ("set the lastIndexOfMedia to the current index, so that already used images are not reused");
              lastIndexOfMedia = index;

              ("break the variant loop");
              break;
            } else {
              ("add media to the common_media");
              o[ID][media.id] = media.preview_image.src;
            }
          }
        }
      });
      return o;
    },

    getVariantId: () => document.querySelector(`[name="id"]`).value,

    influenceImages: () => {
      MAIN.commonMediaAtLast();
      document.querySelectorAll(MAIN._.childImages).forEach((imgEl) => {
        const imageContainer = MAIN._.getParentElement(imgEl);
        imageContainer.style.display = "";
        imageContainer.classList.remove("o_o");
      });
      if (MAIN.arrangedImages[MAIN.getVariantId()]) {
        document.querySelectorAll(MAIN._.childImages).forEach((imgEl) => {
          const imageContainer = MAIN._.getParentElement(imgEl);
          imageContainer.style.display = "none";
          imageContainer.classList.add("o_o");
        });

        for (const [i, [id, src]] of Object.entries([
          ...Object.entries(MAIN.arrangedImages[MAIN.getVariantId()]),
          ...Object.entries(MAIN.arrangedImages["common_media"]),
        ])) {
          if (i) {
            document
              .querySelectorAll(MAIN._.childImages)
              .forEach((imgEl, index) => {
                if (MAIN.getIdFromImageSrc(MAIN.cleanImageUrl(imgEl)) == id) {
                  const imageContainer = MAIN._.getParentElement(imgEl);
                  imageContainer.style.display = "";
                }
              });
          }
        }
      }

      // duplicate the third element alongwith adding class small--hide and append it before description and add class medium--hide to the third element
      document.querySelectorAll(".product__photo").forEach((div, index) => {
        if (index === 2) {
          const duplicateDiv = div.cloneNode(true);
          duplicateDiv.classList.add("small--hide");
        }
      });
    },
    commonMediaAtLast: () => {
      document
        .querySelectorAll(MAIN._.childContainerElements)
        .forEach((containerEl) => {
          for (let [id, src] of Object.entries(
            MAIN.arrangedImages["common_media"]
          )) {
            if (
              MAIN.getIdFromImageSrc(
                MAIN.cleanImageUrl(containerEl.querySelector("img"))
              ) == id
            ) {
              // common images at last
              containerEl.parentElement.appendChild(containerEl);
              containerEl.classList.remove("small--hide");
              if (containerEl.classList.contains("medium-up--hide"))
                containerEl.remove();
            }
          }
        });
    },

    // appendImageDivInBoundless: (index, element) => {
    //   if (index || window.matchMedia("(max-width: 750px)").matches) {
    //     element.parentElement.appendChild(element);
    //   } else {
    //     ("appendFirst");
    //     element.parentElement.insertBefore(
    //       element,
    //       document.querySelector(".product__details")
    //     );
    //   }
    // },

    // constant functions
    cleanImageUrl: (img) => img.src.replace("_300x", ""),
    getIdFromImageSrc: (src) => {
      let source;
      if (src?.match(/[a-z0-9\-\_.\/\:]{1,}/i))
        source = src.match(/[a-z0-9\-\_.\/\:]{1,}/i)[0];
      let ret = false;
      if (MAIN.getVariantId()) {
        for (let imgID in MAIN.arrangedImages["common_media"]) {
          if (MAIN.arrangedImages["common_media"][imgID].includes(source)) {
            ret = imgID;
          }
        }
        for (let imgID in MAIN.arrangedImages[MAIN.getVariantId()]) {
          if (
            MAIN.arrangedImages[MAIN.getVariantId()][imgID].includes(source)
          ) {
            ret = imgID;
          }
        }
      }

      return ret;
    },
  };
  // if the theme name is "Boundless" the code will run
  if (window.Shopify.theme.name === "Boundless") MAIN.init();
})();

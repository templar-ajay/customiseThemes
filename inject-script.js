(() => {
  const MAIN = {
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

    /*---------------------------------------------------------------------------------------------------------
    ----------------------------------------- Dynamic functions -----------------------------------------------
    ---------------------------------------------------------------------------------------------------------*/

    getAllThumbnailImageElements: () =>
      Array.from(document.querySelectorAll(".product__photo"))
        .filter((x, o) => o)
        .map((x) => x.querySelector("img")),

    // remove _300px from all image urls
    cleanImageUrl: (img) => img.src.replace("_300x", ""),

    getAllParentsOfThumbnailImageElements: () =>
      getAllParentsOfThumbnailImageElements().map(
        (x) => x.parentElement.parentElement
      ),

    getIdFromImageSrc: (src) => {
      let source;
      if (src?.match(/[a-z0-9\-\_.\/\:]{1,}/i))
        source = src.match(/[a-z0-9\-\_.\/\:]{1,}/i)[0];
      let ret = false;
      if (!MAIN.getVariantId()) {
        for (let imgID in MAIN.arrangedImages["common_images"]) {
          if (MAIN.arrangedImages["common_images"][imgID].includes(source)) {
            ret = "common_images";
          }
        }
      } else {
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
    getCurrentVariantImages: () =>
      MAIN.getAllThumbnailImageElements().filter(
        (x) =>
          MAIN.arrangedImages[MAIN.getVariantId()][
            MAIN.getIdFromImageSrc(MAIN.cleanImageUrl(x))
          ]
      ),
    getCurrentVariantParentELements: () =>
      MAIN.getCurrentVariantImages().map((x) => x.parentElement.parentElement),

    getParentElementsToHide: () =>
      MAIN.getAllThumbnailImageElements()
        .map((x) => MAIN.getParentElement(x))
        .filter((x) => !x.classList.contains("o_o")),

    getParentElement: (e) => e.parentElement.parentElement,

    getAllParentElements: () =>
      MAIN.getAllThumbnailImageElements().map((x) => MAIN.getParentElement(x)),

    influenceImages: () => {
      if (!MAIN.getVariantId()) return;
      MAIN.getAllParentElements().forEach((e) => {
        e.classList.remove("o_o");
      });

      MAIN.getAllParentElements().forEach((e) => {
        e.style.display = "";
      });

      MAIN.getCurrentVariantParentELements().forEach((e) => {
        e.classList.add("o_o");
      });

      MAIN.getParentElementsToHide().forEach((e) => {
        e.style.display = "none";
      });

      MAIN.rearrangeStupidImagesAtLast();
    },

    rearrangeStupidImagesAtLast: () => {
      MAIN.getParentElementsToHide().forEach((e) => {
        e.parentElement.appendChild(e);
      });
    },
  };
  // if the theme name is "Boundless" the code will run
  if (window.Shopify.theme.name === "Boundless") MAIN.init();
})();

// now if mobile layout then first image from childImageElements is discarded
// else if desktop layout then second image from childImageElements is discarded

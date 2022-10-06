(() => {
  const MAIN = {
    _: {
      smallImages: "[data-product-thumbnails] li img",
      containers: "[data-product-thumbnails] li",
      variantSelectors: { dropDowns: "select[id^='SingleOptionSelector-']" },
      parentContainer: "[data-product-thumbnails]",
      cleanImage: ["_150x.", "."],
    },
    init: async () => {
      console.log("it worked");
      MAIN.js = await fetch(location.origin + location.pathname + ".js").then(
        (x) => x.json()
      );

      MAIN.imageContainers = document.querySelectorAll(MAIN._.containers);
      console.log("imageContainers", MAIN.imageContainers);

      MAIN.arrangedImages = MAIN.makeImagesObj(MAIN.js, MAIN.imageContainers);
      console.log("arranged images", MAIN.arrangedImages);

      // firstTime
      MAIN.brooklynImageOperations();

      document
        .querySelectorAll(MAIN._.variantSelectors.dropDowns)
        .forEach(() => {
          addEventListener("change", () => {
            setTimeout(() => {
              MAIN.brooklynImageOperations();
            });
          });
        });
    },
    makeImagesObj: function (js, imageContainers) {
      /**
       * @params takes the json as argument
       * @note doesn't append common_media images after the end of each variant images
       * @throws error if argument is not a json
       * @returns imagesObj with images arranged variant wise
       * @example
       * input - json file retrieved from url.js
       * output - {
       * 11111111<variant_id>:{{1234<imageId>:"xyz.jpeg"<image_path>},{1234<imageId>:"xyz.jpeg"<image_path>}}},
       * 222222<variant_id>:{{1234<imageId>:"xyz.jpeg"<image_path>},{1234<imageId>:"xyz.jpeg"<image_path>}}},
       * 333333<variant_id>:{{1234<imageId>:"xyz.jpeg"<image_path>},{1234<imageId>:"xyz.jpeg"<image_path>}}},
       * common_media:{{1234<imageId>:"xyz.jpeg"<image_path>},{1234<imageId>:"xyz.jpeg"<image_path>}}}
       */

      if (Object(js) !== js)
        return console.error("bad argument passed in " + arguments.callee.name);
      // doesn't append common_media at the end of each variant images
      const o = { common_media: {} };
      let ID = "common_media";
      let lastIndexOfMedia = -1;
      [...js.variants, "emptyLoop"].forEach((variant) => {
        for (let [index, media] of js.media.entries()) {
          if (
            index > lastIndexOfMedia &&
            ((variant.featured_media?.id && media.media_type === "image") ||
              variant === "emptyLoop")
          ) {
            if (variant.featured_media?.id == media.id) {
              ("add media to the variant");
              o[variant.id] = {};
              // o[variant.id][media.id] = media.preview_image.getAttribute("data-src");
              o[variant.id][media.id] = { src: "", container: undefined };
              o[variant.id][media.id].src = media.preview_image.src;
              o[variant.id][media.id].container =
                MAIN.getImageFromDataMediaId(media.id) ||
                MAIN.getImageFromSrc(
                  media.preview_image.src,
                  MAIN.imageContainers
                );

              ID = variant.id;

              ("set the lastIndexOfMedia to the current index, so that already used images are not reused");
              lastIndexOfMedia = index;

              ("break the variant loop");
              break;
            } else {
              ("add media to the common_media");
              // o[ID][media.id] = media.preview_image.getAttribute("data-src");
              o[ID][media.id] = { src: "", container: undefined };
              o[ID][media.id].src = media.preview_image.src;
              o[ID][media.id].container =
                MAIN.getImageFromDataMediaId(media.id) ||
                MAIN.getImageFromSrc(
                  media.preview_image.src,
                  MAIN.imageContainers
                );
            }
          }
        }
      });
      return o;
    },

    getVariantId: () =>
      /* first priority should be from the href,
       in case the user desperately selected the soldout variant and shared it with other person */
      new URL(window.location.href).searchParams.get("variant") ||
      document.querySelector("[name='id']").value,

    scrollToTop: () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    getImageFromSrc: (src, imageContainers) => {
      const div = Array.from(imageContainers).filter(
        (container) =>
          // cleans impurity from image url to compare
          MAIN.cleanImageUrl(
            container.querySelector("img").src,
            [MAIN._.cleanImage[0]],
            [MAIN._.cleanImage[1]]
          ) === src
      )[0];
      return div;
    },
    cleanImageUrl: (imageUrl, oldPhrases, newPhrases) => {
      /**
       * @returns cleaned url of the image,
       * @desc
       * takes the oldPhrases in form of array and replaces each old phrase with a new one in the imageUrl and returns it
       * @args
       * imageUrl - url of the image we want to clean
       * oldPhrases:[] - type array, array of phrases to replace with the newPhrases,
       * newPhrases:[] - new set of phrases to replace the old phrases,
       */
      if (oldPhrases.length !== newPhrases.length)
        return console.error(
          "number of new phrases to replace should be equal to number of old phrases to replace, or you forgot to pass the phrases in form of array"
        );
      for (let i = 0; i < oldPhrases.length; i++) {
        imageUrl = imageUrl.replace(oldPhrases[i], newPhrases[i]);
      }
      return imageUrl;
    },
    getImageFromDataMediaId: (dataMediaId) =>
      Array.from(MAIN.imageContainers).filter(
        (x) =>
          x.querySelector("img").getAttribute("data-media-id") == dataMediaId
      )[0],

    brooklynImageOperations: () => {
      console.log("operating images");

      /* change the dropdown to the current selected variant
      this is needed because when the first variant is soldout the current variant is updated 
      to the next available variant but the change doesn't reflect on the dropdown shown on screen 
      document
        .querySelectorAll(MAIN._.variantSelectors.dropDowns)
        .forEach((x, i) => {
          x.querySelectorAll("option").forEach((x) => {
            x.value ==
            MAIN.js.variants.filter((x) => x.id == MAIN.getVariantId())[0][
              `option${i + 1}`
            ]
              ? x.setAttribute("selected", "selected")
              : x.removeAttribute("selected");
          });
        });
       we don't need the code because by default if the url params are empty it will goto the first available variant but
      in case any user deliberately chose the soldout variant for the purpose of sharing then our script should not change the 
      selected variant. hence we don't need the above code . but it's cool so keep it for future reference */

      const parentContainer = document.querySelector(MAIN._.parentContainer);

      // 1. remove all images
      document.querySelectorAll(MAIN._.containers).forEach((x) => {
        x.remove();
      });

      if (MAIN.arrangedImages[MAIN.getVariantId()]) {
        // selected variant has images

        // add images variant wise
        arr = [
          ...Object.entries(MAIN.arrangedImages[MAIN.getVariantId()]),
          ...Object.entries(MAIN.arrangedImages["common_media"]),
        ];

        for (const [id, { src, container }] of arr) {
          parentContainer.appendChild(container);
        }
      } else {
        // slected variant doesn't have images
        MAIN.imageContainers.forEach((x) => parentContainer.appendChild(x));
      }
    },
  };
  if (
    window.Shopify?.theme?.name === "Brooklyn" &&
    location.pathname.includes("/products/") &&
    location.pathname.length > 10
  )
    MAIN.init();
})();

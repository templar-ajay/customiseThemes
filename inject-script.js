/* logic 
1. on page load get all the elements in an array. >
2. save all the elements variant wise on page load. >
3. then on each variant change remove all child elements from page and append all the elements of the selected variant to the page,
if(selected variant === selectedVariantOnPageLoad) append all elements of the selected variant 
else append all elements fo the selected variant except the first.
*/

(() => {
  const MAIN = {
    _: {
      smallImages: ".product__photo:not(:first-child) img",
      containers: ".product__photo:not(:first-child)",
      variantSelectors: { dropDowns: ".single-option-selector" },
    },
    init: async () => {
      MAIN.js = await fetch(location.origin + location.pathname + ".js").then(
        (x) => x.json()
      );

      MAIN.imageContainers = document.querySelectorAll(MAIN._.containers);

      MAIN.arrangedImages = MAIN.makeImagesObj(MAIN.js, MAIN.imageContainers);
      console.log("arranged images", MAIN.arrangedImages);

      MAIN.firsLoadVariantId = MAIN.getVariantId();
      console.log(`firsLoadVariantId`, MAIN.firsLoadVariantId);

      setTimeout(() => {
        MAIN.boundlessImageOperations();
      });
      document
        .querySelectorAll(MAIN._.variantSelectors.dropDowns)
        .forEach(() => {
          addEventListener("change", () => {
            setTimeout(() => {
              MAIN.boundlessImageOperations();
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
              // o[variant.id][media.id] = media.preview_image.src;
              o[variant.id][media.id] = { src: "", container: undefined };
              o[variant.id][media.id].src = media.preview_image.src;
              o[variant.id][media.id].container = MAIN.getContainerFromImageSrc(
                MAIN.cleanImageUrl(media.preview_image.src, ["_300x"], [""]),
                imageContainers
              );
              ID = variant.id;

              ("set the lastIndexOfMedia to the current index, so that already used images are not reused");
              lastIndexOfMedia = index;

              ("break the variant loop");
              break;
            } else {
              ("add media to the common_media");
              // o[ID][media.id] = media.preview_image.src;
              o[ID][media.id] = { src: "", container: undefined };
              o[ID][media.id].src = media.preview_image.src;
              o[ID][media.id].container = MAIN.getContainerFromImageSrc(
                MAIN.cleanImageUrl(media.preview_image.src, ["_300x"], [""]),
                imageContainers
              );
            }
          }
        }
      });
      return o;
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
          "number of new phrases to replace should be equal to number of old phrases to replace"
        );
      for (let i = 0; i < oldPhrases.length; i++) {
        imageUrl = imageUrl.replace(oldPhrases[i], newPhrases[i]);
      }
      return imageUrl;
    },
    getContainerFromImageSrc: (src, imageContainers) => {
      const div = Array.from(imageContainers).filter(
        (container) =>
          MAIN.cleanImageUrl(
            container.querySelector("img").src,
            ["_300x"],
            [""]
          ) === src
      )[0];
      div?.classList.remove("small--hide", "medium-up--hide");
      return div;
    },
    getVariantId: () => document.querySelector("[name='id']").value,
    boundlessImageOperations: () => {
      console.log("triggred");
      // clear all child elements
      document.querySelectorAll(MAIN._.containers).forEach((x) => {
        x.classList.remove("small-hide", "medium-up--hide");
        x.remove();
      });

      // if (selected variant === selectedVariantOnPageLoad) append all elements of the selected variant
      // else append all elements fo the selected variant except the first.

      const body = document.querySelector(".product");
      condition = true;

      if (MAIN.arrangedImages[MAIN.getVariantId()]) {
        // if any variant is selected
        [
          ...Object.entries(MAIN.arrangedImages[MAIN.getVariantId()]),
          ...Object.entries(MAIN.arrangedImages["common_media"]),
        ].forEach((x, i) => {
          if (i)
            if (i > 1 && condition) {
              if (x[1].container) {
                const container = MAIN.cleanContainer(x[1].container);
                body.appendChild(container);
              }
            } else {
              if (!condition) condition = true;
              if (x[1].container) {
                const a = MAIN.cleanContainer(x[1].container).cloneNode(true);
                const b = MAIN.cleanContainer(x[1].container).cloneNode(true);
                a.classList.add("small--hide");
                body.insertBefore(
                  a,
                  document.querySelector(".product__details")
                );
                b.classList.add("medium-up--hide");
                body.appendChild(b);
              } else {
                condition = false;
              }
            }
        });
      } else {
        // if all variant selected
        MAIN.imageContainers.forEach((x, i) => {
          x = MAIN.cleanContainer(x);
          if (i) {
            if (i == 1) x.classList.add("medium-up--hide");
            body.appendChild(x);
          } else {
            y = x.cloneNode(true);
            y.classList.add("small--hide");
            body.insertBefore(y, document.querySelector(".product__details"));
          }
        });
      }
    },
    cleanContainer: (x) => {
      x.classList.remove("small--hide", "medium-up--hide");
      console.log(x);
      return x;
    },
  };
  if (
    window.Shopify?.theme?.name?.toLowerCase() === "boundless" &&
    location.pathname.split("/").indexOf("products") >= 0
  )
    MAIN.init();
})();

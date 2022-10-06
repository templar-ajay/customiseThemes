/* logic 
1. on page load get all the elements in an array. >
2. save all the elements variant wise on page load. >
3. then on each variant change remove all child elements from page and append all the elements of the selected variant to the page,

*/

(() => {
  const MAIN = {
    _: {
      smallImages: "",
      containers: "",
      variantSelectors: { dropDowns: "" },
      parentContainer: "",
    },
    init: async () => {
      MAIN.js = await fetch(location.origin + location.pathname + ".js").then(
        (x) => x.json()
      );

      MAIN.imageContainers = document.querySelectorAll(MAIN._.containers);
      // console.log(MAIN.imageContainers);

      MAIN.arrangedImages = MAIN.makeImagesObj(MAIN.js, MAIN.imageContainers);
      console.log("arranged images", MAIN.arrangedImages);

      document
        .querySelectorAll(MAIN._.variantSelectors.dropDowns)
        .forEach((x) => {
          x.addEventListener("change", () => {
            setTimeout(() => {
              // imageOperations function
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
              o[variant.id][media.id].container = MAIN.getImageFromDataMediaId(
                media.id
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
              o[ID][media.id].container = MAIN.getImageFromDataMediaId(
                media.id
              );
            }
          }
        }
      });
      return o;
    },

    getVariantId: () => document.querySelector("[name='id']").value,
    scrollToTop: () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },

    getImageFromDataMediaId: (dataMediaId) =>
      Array.from(MAIN.imageContainers).filter(
        (x) =>
          x.querySelector("img").getAttribute("data-media-id") == dataMediaId
      )[0],

    removeAllEventListeners: (x) => {
      let old_element = x;
      let new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);
    },
  };

  if (
    window.Shopify?.theme?.name === "<theme-name>" &&
    location.pathname.includes("/products/") &&
    location.pathname.length > 10
  )
    MAIN.init();
})();

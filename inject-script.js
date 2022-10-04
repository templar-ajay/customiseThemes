(() => {
  const MAIN = {
    INIT: async () => {
      console.log("hello", Shopify.theme.name);

      MAIN.imageContainers = document.querySelectorAll(
        "[data-product-thumbnails] li"
      );

      await MAIN.makeJsJson();
      MAIN.arrangedImages = MAIN.makeImagesObj(MAIN.js, MAIN.imageContainers);
      console.log(MAIN.arrangedImages);

      // if dropdown
      document
        .querySelectorAll("[id^='SingleOptionSelector-']")
        .forEach((x) => {
          x.addEventListener("change", MAIN.influenceDom);
          x.addEventListener("input", MAIN.influenceDom);
        });

      // if buttons
      document.querySelectorAll("fieldset label").forEach((label) => {
        label.addEventListener("click", MAIN.influenceDom);
      });

      document.querySelector("fieldset label")?.click();

      MAIN.influenceDom();

      // popup Script
      document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", MAIN.influencePopup);
      });
    },
    influenceDom: () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      setTimeout(() => {
        MAIN.influenceImages();
        MAIN.commonImagesAtLast();
        // removes the empty spaces between elements of slider
        // if (MAIN.imagesObj[MAIN.getVariantId()])
        MAIN.thumbnailHiddenElementsAtLast();

        if (window.matchMedia("(max-width: 590px)").matches)
          MAIN.influenceSlick();
      });
    },
    influencePopup: () => {
      var magnificPopup = $.magnificPopup.instance;
      if (MAIN.imagesObj[MAIN.getVariantId()] && magnificPopup.items) {
        console.log(magnificPopup.items);

        magnificPopup.items = Array.from(magnificPopup.items).filter((x) =>
          MAIN.isCurrentVariantImage(x)
        );
        magnificPopup.items = MAIN.arrangeZoomedImagesInOrder(
          magnificPopup.items
        );

        // console.log((magnificPopup.currItem.index = 0));
        console.log((magnificPopup.index = 0));
      }
    },
    commonImagesAtLast: () => {
      if(MAIN.arrangedImages["common_media"]){

        
        for(const [id,{src,container}] of Object.entries(MAIN.arrangedImages["common_media"])) {
          Array.from(MAIN.getAllStackedImageElements()).forEach((img) => {
            if (img.getAttribute("data-media-id") == id) {
              MAIN.getStackedImageParentElement(img).parentElement.append(
                MAIN.getStackedImageParentElement(img)
                );
              }
            });
          }

        Array.from(MAIN.getAllThumbnailImageElements()).forEach((img) => {
          const imageCurrentSource = img.currentSrc.replace("_150x", "");
          if (MAIN.getIdFromImageSrc(imageCurrentSource) == imgId_imgSrc[0]) {
            MAIN.getThumbnailImageParentElement(img).parentElement.append(
              MAIN.getThumbnailImageParentElement(img)
            );
          }
        });
      });
    },
    getVariantId: () =>
      document.querySelector(`[name="id"]`).value ||
      new URL(window.location.href).searchParams.get("variant") ||
      MAIN.getVariantIdFromSelects() ||
      MAIN.getVariantIdFromForm(),
    makeJsJson: async () => {
      const url = window.location.origin + window.location.pathname;
      MAIN.js = await fetchJSON(url + ".js");
      MAIN.json = await fetchJSON(url + ".json");
      async function fetchJSON(url) {
        const x = await fetch(url);
        return await x.json();
      }
      console.log("js", MAIN.js);
      console.log("json", MAIN.json);

      document.querySelector(`[name="id"]`);
    },
    getVariantIdFromForm: () => {
      const formData = {};
      Array.from(
        document.querySelector("form[action='/cart/add']").elements
      ).map((item) => {
        if (!item.name) return null;
        formData[item.name] = item.value;
      });
      return Number(formData.id);
    },
    getVariantIdFromSelects: () => {
      const arr = [];
      document
        .querySelectorAll("[id^='SingleOptionSelector-']")
        .forEach((select) => {
          select.options.forEach((option) => {
            if (option.attributes.selected)
              arr.push(option.attributes.value.nodeValue);
          });
        });
      return MAIN.js.variants.filter((v) => MAIN.arraysEqual(arr, v.options))[0]
        .id;
    },
    arraysEqual: (a, b) => {
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
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
    makeImagesObj: function (js, imageContainers) {
      /**
       * @params takes the json as argument
       * @note doesn't append common_media images after the end of each variant images
       * @throws error if argument is not a json
       * @returns imagesObj with images arranged variant wise
       * @example
       * input - json file retrieved from url.js
       * output - {
       * 11111111<variant_id>:{{1234<imageId>:{src:<image_path>,container:<container div of img>},{1234<imageId>:{src:<image_path>,container:<container div of img>}}},
       * 222222<variant_id>:{{1234<imageId>:{src:<image_path>,container:<container div of img>},{1234<imageId>:{src:<image_path>,container:<container div of img>}}},
       * 333333<variant_id>:{{1234<imageId>:{src:<image_path>,container:<container div of img>},,{1234<imageId>:{src:<image_path>,container:<container div of img>},}},
       * common_media:{{1234<imageId>:{src:<image_path>,container:<container div of img>},{1234<imageId>:{src:<image_path>,container:<container div of img>},}}
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

    influenceImages: () => {
      console.log(`influencing images...`);

      Array.from(MAIN.getAllStackedImageElements()).forEach((img) => {
        if (MAIN.arrangedImages[MAIN.getVariantId()]) {
          let show = false;
          for (let [id, { src, container }] of Object.entries(
            MAIN.arrangedImages[MAIN.getVariantId()]
          )) {
            id === Number(img.getAttribute("data-media-id"))
              ? (show = true)
              : null;
          }
          MAIN.getStackedImageParentElement(img).style.display = show
            ? ""
            : "none";
          if (show)
            MAIN.getStackedImageParentElement(img).classList.add("myClass");
          if (!show)
            MAIN.getStackedImageParentElement(img).classList.remove("myClass");
        } else {
          MAIN.getStackedImageParentElement(img).removeAttribute("style");
          MAIN.getStackedImageParentElement(img).classList.remove("myClass");
        }
      });

      Array.from(MAIN.getAllThumbnailImageElements()).forEach((img) => {
        const currentSource = img.currentSrc.replace("_150x", "");

        if (MAIN.arrangedImages[MAIN.getVariantId()]) {
          let show = false;
          for (const [id, { src, container }] of Object.entries(
            MAIN.arrangedImages[MAIN.getVariantId()]
          )) {
            if (id == MAIN.getIdFromImageSrc(currentSource)) show = true;
          }
          MAIN.getThumbnailImageParentElement(img).style.display = show
            ? ""
            : "none";
          if (show)
            MAIN.getThumbnailImageParentElement(img).classList.add("myClass");
          if (!show)
            MAIN.getThumbnailImageParentElement(img).classList.remove(
              "myClass"
            );
        } else {
          MAIN.getThumbnailImageParentElement(img).removeAttribute("style");
          MAIN.getThumbnailImageParentElement(img).classList.remove("myClass");
        }
      });
    },
    influenceSlick: () => {
      console.log("influencing slick");

      // unFiltering slick
      $("[data-product-single-media-group]").slick("slickUnfilter", ".myClass");

      const obj = $(".product-single__media-group").slick("getSlick").options;

      // remove slick
      $("[data-product-single-media-group]").slick("unslick", true);

      MAIN.influenceImages();
      MAIN.commonImagesAtLast();

      // make slick
      $("[data-product-single-media-group]").slick(obj);

      // filter
      if (MAIN.imagesObj[MAIN.getVariantId()])
        $("[data-product-single-media-group]").slick("slickFilter", ".myClass");
    },
    addSlideInSlick: () => {
      Array.from(document.querySelectorAll(""));
    },
    ////////////////////////////////////////////////////////////////

    getAllStackedImageElements: () => {
      return document.querySelectorAll(".product-single__media>img");
    },
    getAllThumbnailImageElements: () => {
      return document.querySelectorAll(".product-single__thumbnails img");
    },
    getStackedImageParentElement: (img) => {
      return img.parentElement.parentElement.parentElement.parentElement;
    },
    getThumbnailImageParentElement: (img) => {
      return img.parentElement.parentElement;
    },
    getImageElement: (id) => {
      return Array.from(MAIN.getAllStackedImageElements()).filter(
        (x) => x.getAttribute("data-media-id") == id
      )[0];
    },
    getIdFromImageSrc: (src) => {
      let source;
      if (src.match(/[a-z0-9\-\_.\/\:]{1,}/i))
        source = src.match(/[a-z0-9\-\_.\/\:]{1,}/i)[0];
      let ret;
      if (MAIN.arrangedImages[MAIN.getVariantId()]) {
        for (const [id, { src, container }] of Object.entries(
          MAIN.arrangedImages[MAIN.getVariantId()]
        )) {
          if (src.includes(source)) {
            ret = id;
          }
        }
      }
      return ret;
    },
    thumbnailHiddenElementsAtLast: () => {
      Array.from(document.querySelectorAll(".product-single__thumbnails>li"))
        .filter((e) => e.style.display == "none")
        .forEach((el) => {
          el.parentElement.appendChild(el);
        });
    },
    isCurrentVariantImage: (img) => {
      let ret = false;
      if (img.attributes) {
        const dataMediaId = Number(img.attributes["data-media-id"].nodeValue);
        MAIN.imagesObj[MAIN.getVariantId()].forEach((imgId_imgSrc) => {
          if (imgId_imgSrc[0] == dataMediaId) ret = true;
        });
      } else ret = true;
      return ret;
    },
    arrangeZoomedImagesInOrder: (magnificPopupItems) => {
      const arr = [];
      MAIN.imagesObj[MAIN.getVariantId()].forEach((imgId_imgSrc) => {
        arr.push(MAIN.findZoomedImage(imgId_imgSrc[0], magnificPopupItems));
      });
      return arr;
    },
    findZoomedImage: (id, magnificPopupItems) => {
      return Array.from(magnificPopupItems).filter((x) => {
        let ret = false;
        const dataMediaId = Number(
          (x.attributes ? x : x.el[0]).attributes["data-media-id"].nodeValue
        );
        if (id == dataMediaId) ret = true;
        return ret;
      })[0];
    },
  };
  if (
    location.pathname.includes("/products/") &&
    location.pathname.length > 10 &&
    window.Shopify?.theme?.name === "Brooklyn"
  )
    MAIN.INIT();
})();

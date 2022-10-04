(() => {
  const MAIN = {
    INIT: async () => {
      console.log("hello", Shopify.theme.name);

      await MAIN.makeJsJson();
      MAIN.createImagesObj(MAIN.js, MAIN.json);

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

      document.querySelectorAll("[id^='SingleOptionSelector-']").value =
        Object.entries(MAIN.imagesObj)[1][0];

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
      MAIN.imagesObj["common-images"]?.forEach((imgId_imgSrc) => {
        Array.from(MAIN.getAllStackedImageElements()).forEach((img) => {
          if (img.getAttribute("data-media-id") == imgId_imgSrc[0]) {
            MAIN.getStackedImageParentElement(img).parentElement.append(
              MAIN.getStackedImageParentElement(img)
            );
          }
        });

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
    createImagesObj: (JS, JSON) => {
      const sortedImageObj = {};
      let arrLastID = [];
      function innerFunction() {
        JSON.product.images.forEach((image) => {
          if (image.variant_ids[0]) {
            image.variant_ids.forEach((variant_id) => {
              sortedImageObj[variant_id]
                ? null
                : (sortedImageObj[`${variant_id}`] = []);
              sortedImageObj[variant_id].push(image.src);
            });
            arrLastID = image.variant_ids;
          } else {
            if (arrLastID.length == 0) {
              arrLastID.push("common-images");
            }
            arrLastID.forEach((lastID) => {
              (sortedImageObj[lastID] || (sortedImageObj[lastID] = [])).push(
                image.src
              );
            });
          }
        });

        // push global images at the end of each
        for (let key in sortedImageObj) {
          if (key != "common-images") {
            if (sortedImageObj["common-images"]) {
              sortedImageObj[key].push(...sortedImageObj["common-images"]);
            }
          }
        }

        JS.media.forEach((e) => {
          e.media_type != "image"
            ? (
                sortedImageObj["common-media"] ||
                (sortedImageObj["common-media"] = [])
              ).push([e.id, e.preview_image.src])
            : null;
        });

        const featuredMediaIds = [];

        JS.variants.forEach((variant) => {
          if (variant.featured_media?.id)
            featuredMediaIds.push(variant.featured_media.id);
        });

        Object.keys(sortedImageObj).forEach((productId) => {
          sortedImageObj[productId].forEach((imageSrc) => {
            sortedImageObj[productId].splice(
              sortedImageObj[productId].indexOf(imageSrc),
              1,
              [getID(imageSrc), imageSrc]
            );
          });
        });
      }
      function getID(src) {
        let id;
        JS.media.forEach((media) => {
          if (media.src === src) {
            id = media.id;
          }
        });
        return id;
      }
      innerFunction();
      MAIN.imagesObj = sortedImageObj;
      console.log(MAIN.imagesObj);
    },

    influenceImages: () => {
      console.log(`influencing images...`);

      Array.from(MAIN.getAllStackedImageElements()).forEach((img) => {
        if (MAIN.imagesObj[MAIN.getVariantId()]) {
          let show = false;
          MAIN.imagesObj[MAIN.getVariantId()].forEach((imgId_imgSrc) => {
            imgId_imgSrc[0] === Number(img.getAttribute("data-media-id"))
              ? (show = true)
              : null;
          });
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

        if (MAIN.imagesObj[MAIN.getVariantId()]) {
          let show = false;
          MAIN.imagesObj[MAIN.getVariantId()].forEach((imgId_imgSrc) => {
            if (imgId_imgSrc[0] == MAIN.getIdFromImageSrc(currentSource))
              show = true;
          });
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
      MAIN.imagesObj[MAIN.getVariantId()]?.forEach((imgId_imgSrc) => {
        if (imgId_imgSrc[1].includes(source)) {
          ret = imgId_imgSrc[0];
        }
      });
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

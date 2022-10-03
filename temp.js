!(function (t, e) {
  function n(t, e) {
    let n;
    return (...i) => {
      clearTimeout(n), (n = setTimeout(() => t.apply(this, i), e));
    };
  }
  function i(t) {
    const e = t || theme.stylesheet;
    return (
      void 0 === this.stylesheetPromise &&
        (this.stylesheetPromise = new Promise((t) => {
          const n = document.querySelector(`link[href="${e}"]`);
          n.loaded && t(),
            window.onloadCSS(n, function () {
              t();
            });
        })),
      this.stylesheetPromise
    );
  }
  function s(t) {
    const e = [
        "webkitTransitionEnd",
        "otransitionend",
        "oTransitionEnd",
        "msTransitionEnd",
        "transitionend",
      ],
      n = [
        "WebkitTransition",
        "MozTransition",
        "OTransition",
        "msTransition",
        "transition",
      ];
    let i = 0,
      s = Promise.resolve();
    return (
      n.forEach(() => {
        i || (i = parseFloat(window.getComputedStyle(t).transitionDuration));
      }),
      i > 0 &&
        (s = new Promise((n) => {
          function i(e) {
            e.target === t &&
              (s.forEach(({ event: event, handler: handler }) => {
                t.removeEventListener(event, handler);
              }),
              n());
          }
          const s = e.map((e) => {
            return (
              t.addEventListener(e, i),
              {
                event: e,
                handler: i,
              }
            );
          });
        })),
      s
    );
  }
  function r() {
    let t = window.navigator.cookieEnabled;
    return (
      t ||
        ((document.cookie = "testcookie"),
        (t = document.cookie.indexOf("testcookie") !== -1)),
      t
    );
  }
  function o(t) {
    const e = document.createElement("span");
    (e.innerHTML = t.selectedOptions[0].label),
      document.querySelector(".footer").appendChild(e);
    const n = e.offsetWidth;
    e.remove(), (t.style.width = `${n + 50}px`);
  }
  function a() {
    return (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    );
  }
  function c(t, e = "min") {
    return `(${e}-width: ${
      {
        medium: "46.85em",
        large: "61.85em",
        widescreen: "87.5em",
      }[t]
    })`;
  }
  function d() {
    return JSON.parse(
      JSON.stringify({
        credentials: "same-origin",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json;",
        },
      })
    );
  }
  function l(t, e) {
    return fetch(t, e).then(function (t) {
      if (!t.ok) throw t;
      return t.json();
    });
  }
  function u() {
    return l("/cart.js", d());
  }
  function h(t) {
    var e = d();
    return (
      delete e.headers["Content-Type"],
      (e.method = "POST"),
      (e.body = t),
      l("/cart/add.js", e)
    );
  }
  function m(t, e) {
    var n = d();
    return (
      (e = e || {}),
      (n.method = "POST"),
      (n.body = JSON.stringify({
        line: t,
        quantity: e.quantity,
        properties: e.properties,
      })),
      l("/cart/change.js", n)
    );
  }
  function p(t) {
    var e = d();
    return (
      (e.method = "POST"), (e.body = JSON.stringify(t)), l("/cart/update.js", e)
    );
  }
  function f(t) {
    if ("string" != typeof t || 2 !== t.split(":").length)
      throw new TypeError(
        "Theme Cart: Provided key value is not a string with the format xxx:xxx"
      );
  }
  function g(t) {
    if ("number" != typeof t || isNaN(t))
      throw new TypeError(
        "Theme Cart: An object which specifies a quantity or properties value is required"
      );
  }
  function y(t) {
    if ("number" != typeof t || isNaN(t))
      throw new TypeError("Theme Cart: Variant ID must be a number");
  }
  function v(t) {
    if ("object" != typeof t)
      throw new TypeError("Theme Cart: Properties must be an object");
  }
  function w(t) {
    if (!(t instanceof HTMLFormElement))
      throw new TypeError(
        "Theme Cart: Form must be an instance of HTMLFormElement"
      );
  }
  function b(t) {
    if ("object" != typeof t)
      throw new TypeError("Theme Cart: Options must be an object");
    if (void 0 === t.quantity && void 0 === t.properties)
      throw new Error(
        "Theme Cart: You muse define a value for quantity or properties"
      );
    void 0 !== t.quantity && g(t.quantity),
      void 0 !== t.properties && v(t.properties);
  }
  function C() {
    return u();
  }
  function E(t) {
    return (
      f(t),
      u().then(function (e) {
        var n = -1;
        return (
          e.items.forEach(function (e, i) {
            n = e.key === t ? i + 1 : n;
          }),
          n === -1
            ? Promise.reject(
                new Error(
                  "Theme Cart: Unable to match line item with provided key"
                )
              )
            : n
        );
      })
    );
  }
  function S(t) {
    w(t);
    var e = new FormData(t);
    return y(parseInt(e.get("id"), 10)), h(e);
  }
  function L(t, e) {
    return (
      f(t),
      b(e),
      E(t).then(function (t) {
        return m(t, e);
      })
    );
  }
  function _(t) {
    return p({
      note: t,
    });
  }
  function T() {
    return p({
      note: "",
    });
  }
  function I() {
    this.entries = [];
  }
  function k(t, e) {
    return q(t), A(t, M(t, e));
  }
  function A(t, e) {
    return (
      q(t),
      H(e),
      t.variants.filter(function (t) {
        return e.every(function (e, n) {
          return t.options[n] === e;
        });
      })[0] || null
    );
  }
  function M(t, e) {
    q(t), P(e);
    var n = [];
    return (
      e.forEach(function (e) {
        for (var i = 0; i < t.options.length; i++)
          if (t.options[i].name.toLowerCase() === e.name.toLowerCase()) {
            n[i] = e.value;
            break;
          }
      }),
      n
    );
  }
  function q(t) {
    if ("object" != typeof t) throw new TypeError(t + " is not an object.");
    if (0 === Object.keys(t).length && t.constructor === Object)
      throw new Error(t + " is empty.");
  }
  function P(t) {
    if (!Array.isArray(t)) throw new TypeError(t + " is not an array.");
    if (0 === t.length) return [];
    if (!t[0].hasOwnProperty("name"))
      throw new Error(t[0] + "does not contain name key.");
    if ("string" != typeof t[0].name)
      throw new TypeError(
        "Invalid value type passed for name of option " +
          t[0].name +
          ". Value should be string."
      );
  }
  function H(t) {
    if (Array.isArray(t) && "object" == typeof t[0])
      throw new Error(t + "is not a valid array of options.");
  }
  function x(t, e, n) {
    (this.element = t),
      (this.product = F(e)),
      (n = n || {}),
      (this._listeners = new I()),
      this._listeners.add(this.element, "submit", this._onSubmit.bind(this, n)),
      (this.optionInputs = this._initInputs(gt.optionInput, n.onOptionChange)),
      (this.quantityInputs = this._initInputs(
        gt.quantityInput,
        n.onQuantityChange
      )),
      (this.propertyInputs = this._initInputs(
        gt.propertyInput,
        n.onPropertyChange
      ));
  }
  function N(t, e) {
    return t.reduce(function (t, n) {
      return (
        (n.checked || ("radio" !== n.type && "checkbox" !== n.type)) &&
          t.push(
            e({
              name: n.name,
              value: n.value,
            })
          ),
        t
      );
    }, []);
  }
  function O(t, e) {
    return t.reduce(function (t, n) {
      return (
        (n.checked || ("radio" !== n.type && "checkbox" !== n.type)) &&
          (t[e(n.name)] = n.value),
        t
      );
    }, {});
  }
  function F(t) {
    if ("object" != typeof t) throw new TypeError(t + " is not an object.");
    if (void 0 === t.variants[0].options)
      throw new TypeError(
        "Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route"
      );
    return t;
  }
  t = "default" in t ? t.default : t;
  const D = {
      TAB: "tab",
      ENTER: "enter",
      ESC: "escape",
      SPACE: " ",
      END: "end",
      HOME: "home",
      LEFT: "arrowleft",
      UP: "arrowup",
      RIGHT: "arrowright",
      DOWN: "arrowdown",
    },
    B = {
      stage: "data-popup-stage",
      popup: "data-popup",
      open: "data-popup-open",
      close: "data-popup-close",
      focus: "data-popup-focus",
    },
    R = {
      open: "is-open",
      transitionReady: "transition-ready",
      preventScrolling: "prevent-scrolling",
    };
  class W {
    constructor(t) {
      this.name = t;
    }
    init() {
      (this.elements = this._getElements()),
        this._bindEvents(),
        (this.keyUpHandler = this._onKeyUp.bind(this)),
        (this.scrollPosition = window.pageYOffset);
    }
    openPopup(t) {
      t.preventDefault && t.preventDefault(),
        this._prepareAnimation(),
        this.elements.stage.classList.add(R.open),
        this._sleepAnimation(),
        this.elements.focus
          ? e.trapFocus(this.elements.popup, {
              elementToFocus: this.elements.focus,
            })
          : e.trapFocus(this.elements.popup),
        (this.elements.triggerNode = t.currentTarget),
        this.elements.triggerNode.setAttribute("aria-expanded", !0),
        this._enableScrollLock(),
        document.addEventListener("keyup", this.keyUpHandler);
    }
    closePopup(t = !0) {
      this._prepareAnimation(),
        this.elements.stage.classList.remove(R.open),
        this._sleepAnimation(),
        t &&
          (e.removeTrapFocus(),
          this.elements.triggerNode.focus(),
          document.removeEventListener("keyup", this.keyUpHandler)),
        this.elements.triggerNode.setAttribute("aria-expanded", !1),
        this._disableScrollLock(),
        this.elements.triggerNode.dispatchEvent(
          new window.CustomEvent("popup_closed")
        );
    }
    getElements() {
      return this.elements;
    }
    resetContainerFocus() {
      e.removeTrapFocus(),
        this.elements.focus
          ? e.trapFocus(this.elements.popup, {
              elementToFocus: this.elements.focus,
            })
          : e.trapFocus(this.elements.popup);
    }
    _prepareAnimation() {
      this.elements.stage.classList.add(R.transitionReady);
    }
    _sleepAnimation() {
      return s(this.elements.popup).then(() => {
        this.elements.stage.classList.remove(R.transitionReady);
      });
    }
    _getElements() {
      return {
        stage: document.querySelector(`[${B.stage}=${this.name}]`),
        popup: document.querySelector(`[${B.popup}=${this.name}]`),
        open: document.querySelectorAll(`[${B.open}=${this.name}]`),
        close: document.querySelectorAll(`[${B.close}=${this.name}]`),
        focus: document.querySelector(`[${B.focus}=${this.name}]`),
      };
    }
    _bindEvents() {
      this.elements.open.forEach((t) => {
        t.addEventListener("click", (t) => this.openPopup(t));
      }),
        this.elements.close.forEach((t) => {
          t.addEventListener("click", () => this.closePopup());
        });
    }
    _enableScrollLock() {
      (this.scrollPosition = window.pageYOffset),
        (document.body.style.top = `-${this.scrollPosition}px`),
        document.body.classList.add(R.preventScrolling);
    }
    _disableScrollLock() {
      document.body.classList.remove(R.preventScrolling),
        document.body.style.removeProperty("top"),
        window.scrollTo(0, this.scrollPosition);
    }
    _onKeyUp(t) {
      t.key.toLowerCase() === D.ESC && this.closePopup();
    }
  }
  var Q = (function (t, e) {
      return (
        (e = {
          exports: {},
        }),
        t(e, e.exports),
        e.exports
      );
    })(function (t, e) {
      "use strict";
      function n(t, e) {
        function n(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 2,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : ",",
            i =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : ".";
          if (isNaN(t) || null == t) return 0;
          t = (t / 100).toFixed(e);
          var s = t.split(".");
          return (
            s[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + n) +
            (s[1] ? i + s[1] : "")
          );
        }
        "string" == typeof t && (t = t.replace(".", ""));
        var s = "",
          r = e || i;
        switch (r.match(/\{\{\s*(\w+)\s*\}\}/)[1]) {
          case "amount":
            s = n(t, 2);
            break;
          case "amount_no_decimals":
            s = n(t, 0);
            break;
          case "amount_with_comma_separator":
            s = n(t, 2, ".", ",");
            break;
          case "amount_no_decimals_with_comma_separator":
            s = n(t, 0, ".", ",");
        }
        return r.replace(/\{\{\s*(\w+)\s*\}\}/, s);
      }
      Object.defineProperty(e, "__esModule", {
        value: !0,
      }),
        (e.formatMoney = n);
      var i = "${{amount}}";
    }),
    U = Q.formatMoney;
  const j = {
      cartItemsWrapper: "[data-cart-items]",
      cartItem: "data-cart-item",
      quantityInput: "[data-cart-item-quantity]",
      remove: "[data-remove]",
      cartCountBubble: "[data-cart-count-bubble]",
      cartCount: "[data-cart-count]",
      cartNote: "[data-cart-note]",
      cartPrice: "[data-cart-price]",
      priceLiveRegion: "[data-price-live-region]",
      checkoutButton: "[data-checkout-button]",
      cartItemError: "[data-cart-item-error]",
      closeButton: "[data-cart-close]",
      emptyText: "[data-cart-empty-text]",
      discounts: "[data-discounts]",
    },
    V = {
      hidden: "hidden",
      isEmpty: "is-empty",
      cookiesDisabled: "cookies-disabled",
      hasError: "has-error",
    };
  class K {
    constructor(t) {
      this.elements = {
        cart: t,
      };
    }
    init() {
      if (!r()) return void this.elements.cart.classList.add(V.cookiesDisabled);
      Object.assign(
        this.elements,
        this.getCartElements(),
        this.getItemElements()
      ),
        this.bindContextOfThis(),
        (this.debouncedOnCartItemInput = n((t, e) => {
          this.onCartItemInput(t, e);
        }, 300)),
        this.addCartEvents(),
        this.addItemEvents();
    }
    bindContextOfThis() {
      (this.onCartItemInput = this.onCartItemInput.bind(this)),
        (this.onCartItemClick = this.onCartItemClick.bind(this)),
        (this.updateCartNote = this.updateCartNote.bind(this));
    }
    getItemElements() {
      return {
        cartItems: this.elements.cart.querySelectorAll(`[${j.cartItem}]`),
      };
    }
    getCartElements() {
      return {
        cartNote: this.elements.cart.querySelector(j.cartNote),
      };
    }
    addItemEvents() {
      this.elements.cartItems.forEach((t) => {
        t.addEventListener("change", (t) => {
          this.debouncedOnCartItemInput(t, t.currentTarget);
        }),
          t.addEventListener("click", this.onCartItemClick);
      });
    }
    addCartEvents() {
      this.elements.cartNote &&
        this.elements.cartNote.addEventListener("input", this.updateCartNote);
    }
    onCartItemInput(t, e) {
      t.preventDefault();
      const n = e.querySelector(j.quantityInput);
      return t.target === n && this.updateQuantity(t, e);
    }
    onCartItemClick(t) {
      const e = t.currentTarget.querySelector(j.remove);
      t.target === e &&
        (t.preventDefault(), (t.target.disabled = !0), this.removeItem(t));
    }
    updateQuantity(t, e) {
      const n = e.dataset.cartItem,
        i = e.dataset.cartItemProductId,
        [s] = n.split(":"),
        r = t.target,
        o = r.value || 1,
        a = parseInt(o, 10);
      return (
        this.removeLineItemError(e),
        L(n, {
          quantity: a,
        })
          .then((t) => {
            return (
              this.renderCart(t, i),
              theme.cartQuantity.updateQuantityInputElements(n, a),
              t.item_count
                ? this.renderCartItems(t)
                : (this.renderEmptyCart(), !1)
            );
          })
          .then((t) => {
            if (t) {
              const e = t.items.find((t) => t.key === n),
                i = t.items.reduce((t, e) => {
                  return e.id === Number(s) ? t + e.quantity : t;
                }, 0),
                r = this.elements.cart.querySelector(`[${j.cartItem}="${n}"]`);
              if ((r && r.querySelector(j.quantityInput).focus(), !(a <= i))) {
                const t = r.querySelector(j.cartItemError);
                this.updateLineItemError(t, e);
              }
            }
          })
      );
    }
    updateCartNote() {
      const t = this.elements.cartNote.value;
      if (t) return void _(t);
      T();
    }
    removeItem(t) {
      const e = t.currentTarget,
        n = e.dataset.cartItem,
        i = e.dataset.cartItemProductId;
      return L(n, {
        quantity: 0,
      }).then((t) => {
        if (
          (this.renderCart(t, i),
          theme.cartQuantity.updateQuantityInputElements(n, 0),
          !t.item_count)
        )
          return void this.renderEmptyCart();
        this.renderCartItems(),
          (this.elements.closeButton =
            this.elements.closeButton ||
            this.elements.cart.querySelector(j.closeButton)),
          this.elements.closeButton.focus();
      });
    }
    updateLineItemError(t, e) {
      let n = theme.strings.quantityError;
      (n = n.replace("[quantity]", e.quantity).replace("[title]", e.title)),
        (t.innerHTML = n),
        t.classList.add(V.hasError);
    }
    removeLineItemError(t) {
      const e = t.querySelector(j.cartItemError);
      e.classList.remove(V.hasError), (e.textContent = "");
    }
    changeCheckoutButtonState(t) {
      (this.elements.checkoutButton =
        this.elements.checkoutButton ||
        this.elements.cart.querySelector(j.checkoutButton)),
        (this.elements.checkoutButton.disabled = t);
    }
    onCartUpdated(t) {
      return (
        this.renderCartItems(),
        C().then((e) => {
          this.renderCart(e, t);
        })
      );
    }
    renderCartItems(t) {
      return fetch(`${theme.rootUrl}?section_id=cart-items`)
        .then((t) => {
          return t.text();
        })
        .then((e) => {
          return (
            (this.elements.cartItemsWrapper =
              this.elements.cartItemsWrapper ||
              this.elements.cart.querySelector(j.cartItemsWrapper)),
            (this.elements.cartItemsWrapper.innerHTML = e),
            Object.assign(this.elements, this.getItemElements()),
            this.addItemEvents(),
            t
          );
        });
    }
    renderCart(t, e) {
      this.renderSubtotalPrice(t.total_price),
        this.renderCartCountBubble(t.item_count),
        this.renderPriceLiveRegion(t),
        this.renderCartLevelDiscounts(),
        theme.cartQuantity.updateLocalCartState(t, e),
        t.item_count &&
          (this.elements.cart.classList.remove(V.isEmpty),
          this.changeCheckoutButtonState(!1));
    }
    renderEmptyCart() {
      this.elements.cart.classList.add(V.isEmpty),
        this.changeCheckoutButtonState(!0),
        (this.elements.cartEmptyText =
          this.elements.cartEmptyText ||
          this.elements.cart.querySelector(j.emptyText)),
        this.elements.cartEmptyText.setAttribute("tabindex", "-1"),
        this.elements.cartEmptyText.focus();
    }
    renderCartLevelDiscounts() {
      return fetch(`${theme.rootUrl}?section_id=cart-discounts`)
        .then((t) => {
          return t.text();
        })
        .then((t) => {
          (this.elements.discounts =
            this.elements.discounts ||
            this.elements.cart.querySelector(j.discounts)),
            (this.elements.discounts.innerHTML = t);
        });
    }
    renderSubtotalPrice(t) {
      const e = U(t, theme.moneyFormat);
      (this.elements.cartPrice =
        this.elements.cartPrice || document.body.querySelectorAll(j.cartPrice)),
        this.elements.cartPrice.forEach((t) => {
          t.innerHTML = e;
        });
    }
    renderCartCountBubble(t) {
      const e = document.querySelectorAll(j.cartCountBubble);
      document
        .querySelectorAll(j.cartCount)
        .forEach((e) => (e.innerText = t > 99 ? "99+" : t)),
        e.forEach((e) => e.classList.toggle(V.hidden, 0 === t));
    }
    renderPriceLiveRegion(t) {
      const e = t.total_price;
      this.elements.priceLiveRegion =
        this.elements.priceLiveRegion ||
        this.elements.cart.querySelector(j.priceLiveRegion);
      const n = this.formatPriceLiveRegionText(e);
      (this.elements.priceLiveRegion.textContent = n),
        this.elements.priceLiveRegion.setAttribute("aria-hidden", !1),
        window.setTimeout(() => {
          this.elements.priceLiveRegion.setAttribute("aria-hidden", !0);
        }, 1e3);
    }
    formatPriceLiveRegionText(t) {
      const e = U(t, theme.moneyFormat);
      return `${theme.strings.subtotal}: ${e}`;
    }
    getItemFromState(t, e) {
      return e.items.find((e) => e.key === t);
    }
  }
  const G = {
      quantityIndicatorId: (t) => `[data-quantity-indicator="${t}"]`,
      quantityInputKey: (t) => `[data-quantity-input-key="${t}"]`,
      quantityNumber: "[data-quantity-number]",
      quantityLabel: "[data-quantity-label]",
    },
    z = {
      inCart: "in-cart",
      isVisible: "is-visible",
      updated: "updated",
    };
  class J {
    constructor() {
      this.cartState = {};
    }
    updateLocalCartState(t, e) {
      t
        ? ((this.cartState = this._convertToLocalCartState(t)),
          this.updateQuantityIndicatorElements([e]))
        : C().then((t) => {
            (this.cartState = this._convertToLocalCartState(t)),
              this.updateQuantityIndicatorElements();
          });
    }
    updateQuantityInputElements(t, e) {
      document.querySelectorAll(G.quantityInputKey(t)).forEach((t) => {
        (t.dataset.quantityInCart = e),
          (t.value = e),
          e || t.dispatchEvent(new window.CustomEvent("removedFromCart"));
      });
    }
    updateQuantityIndicatorElements(t, e = document, n) {
      (t || Object.keys(this.cartState)).forEach((t) => {
        const i = this.cartState[t];
        (!i && n) ||
          e.querySelectorAll(G.quantityIndicatorId(t)).forEach((t) => {
            this._setQuantityIndicator(t, i);
          });
      });
    }
    _convertToLocalCartState(t) {
      const e = {};
      return (
        t.items.forEach((t) => {
          e[t.product_id] || (e[t.product_id] = 0),
            (e[t.product_id] += t.quantity);
        }),
        e
      );
    }
    _setQuantityIndicator(t, e) {
      const n = t.querySelector(G.quantityNumber),
        i = parseInt(n.dataset.quantity, 10),
        s = e ? e : 0;
      if (i !== s) {
        t.classList.contains(z.isVisible) && e
          ? this._animateUpdate(t)
          : this._animateShowOrHide(t, s),
          (n.dataset.quantity = s);
        const i = s < 100 ? s : "99+";
        n.textContent = i;
        const r =
          1 === e
            ? t.dataset.labelSingle
            : t.dataset.labelMulti.replace("[quantity]", s);
        t.querySelector(G.quantityLabel).textContent = r;
      }
    }
    _animateShowOrHide(t, e) {
      if ((t.classList.toggle(z.inCart, e), e))
        return void t.classList.add(z.isVisible);
      s(t).then(() => {
        t.classList.remove(z.isVisible);
      });
    }
    _animateUpdate(t) {
      t.classList.add(z.updated),
        s(t).then(() => {
          t.classList.remove(z.updated);
        });
    }
  }
  const Y = {
      form: "[data-form]",
      formInputWrapper: "[data-form-input-wrapper]",
      formStatus: "[data-form-status]",
    },
    X = {
      floatingLabel: "form__input-wrapper--floating-label",
    };
  class $ {
    constructor() {
      document.querySelectorAll(Y.form).forEach((t) => {
        this._focusFormStatus(t), this._handleFormInputLabels(t);
      });
    }
    _focusFormStatus(t) {
      const e = t.querySelector(Y.formStatus);
      e &&
        (e.focus(),
        e.addEventListener("blur", () => {
          e.removeAttribute("tabindex");
        }));
    }
    _handleFormInputLabels(t) {
      const e = t.querySelectorAll(Y.formInputWrapper);
      e &&
        e.forEach((t) => {
          t.addEventListener("focusin", () => {
            t.classList.add(X.floatingLabel);
          }),
            t.addEventListener("focusout", (e) => {
              "" === e.target.value && t.classList.remove(X.floatingLabel);
            });
        });
    }
  }
  const Z = {
    cookiesDisabled: "cookies-disabled",
  };
  class tt {
    constructor(t) {
      this.elements = {
        cart: t,
      };
    }
    init() {
      r() || this.elements.cart.classList.add(Z.cookiesDisabled);
    }
  }
  const et = {
      arrow: "[data-scroller-arrow]",
      menu: "[data-scroller-content]",
      wrapper: "[data-scroller-wrapper]",
    },
    nt = {
      noTransition: "scroller-content--no-transition",
      wrapper: "scroller-wrapper",
    },
    it = {
      offset: 150,
    };
  class st {
    constructor(t) {
      this.container = t;
    }
    init() {
      (this.wrapper = this.container.querySelector(et.wrapper)),
        this.wrapper &&
          ((this.initialized = !0),
          (this.menu = this.wrapper.querySelector(et.menu)),
          (this.arrows = this.container.querySelectorAll(et.arrow)),
          (this.isTransitioning = !1),
          this._setupEventHandlers(),
          i().then(() => {
            this._recalculateOverflow();
          }));
    }
    makeElementVisible(t) {
      if ("none" !== this.overflowValue && this.initialized) {
        let e = !0;
        const n = it.offset / 2,
          i = t.getBoundingClientRect(),
          s = Math.floor(i.left) - n,
          r = Math.floor(i.right) + n;
        if (
          (this.wrapperRect || this._recalculateOverflow(),
          r > this.wrapperRect.right
            ? ((this.direction = "next"), (e = !1))
            : s < this.wrapperRect.left &&
              ((this.direction = "previous"), (e = !1)),
          !e && !this.isTransitioning)
        ) {
          this.isTransitioning = !0;
          const e = this._getDistanceToElement(r, t.offsetLeft, n);
          this._setMenuTranslateX(e);
        }
      }
    }
    destroy() {
      this.initialized &&
        (this.wrapper.removeEventListener(
          "scroll",
          this.eventHandlers.recalculateOverflow,
          {
            passive: !0,
          }
        ),
        window.removeEventListener(
          "resize",
          this.eventHandlers.debounceScroller
        ),
        this.arrows.forEach((t) => {
          t.removeEventListener("click", this.eventHandlers.onArrowClick);
        }));
    }
    _recalculateOverflow() {
      const t = this._getOverflowValue();
      this._setOverflowClass(t);
    }
    _setupEventHandlers() {
      (this.eventHandlers = this._getEventHandlers()),
        this.wrapper.addEventListener(
          "scroll",
          this.eventHandlers.recalculateOverflow,
          {
            passive: !0,
          }
        ),
        window.addEventListener("resize", this.eventHandlers.debounceScroller),
        this.arrows.forEach((t) => {
          t.addEventListener("click", this.eventHandlers.onArrowClick);
        });
    }
    _getEventHandlers() {
      return {
        recalculateOverflow: this._recalculateOverflow.bind(this),
        onArrowClick: this._onArrowClick.bind(this),
        debounceScroller: n(() => {
          this._recalculateOverflow();
        }, 250),
      };
    }
    _getOverflowValue() {
      this._getSelectorsDomRect();
      const t = Math.floor(this.wrapperRect.left),
        e = Math.floor(this.wrapperRect.right),
        n = Math.floor(this.menuRect.left),
        i = Math.floor(this.menuRect.right),
        s = n < t,
        r = i > e;
      let o = "none";
      return s && r ? (o = "both") : s ? (o = "left") : r && (o = "right"), o;
    }
    _getSelectorsDomRect() {
      (this.wrapperRect = this.wrapper.getBoundingClientRect()),
        (this.menuRect = this.menu.getBoundingClientRect());
    }
    _setOverflowClass(t) {
      this.overflowValue !== t &&
        (this.wrapper.classList.remove(`${nt.wrapper}--${this.overflowValue}`),
        window.requestAnimationFrame(() => {
          this.wrapper.classList.add(`${nt.wrapper}--${t}`),
            (this.overflowValue = t);
        }));
    }
    _onArrowClick(t) {
      if (!this.isTransitioning) {
        (this.isTransitioning = !0),
          (this.direction = t.currentTarget.dataset.scrollerArrowDirection);
        const e = it.offset;
        let n = this._getDistanceToNextPosition();
        (n = n < 2 * e ? n : e), this._setMenuTranslateX(n);
      }
    }
    _getDistanceToNextPosition() {
      return "next" === this.direction
        ? Math.round(this.menuRect.right - this.wrapperRect.right)
        : this.wrapper.scrollLeft;
    }
    _getDistanceToElement(t, e, n) {
      if ("next" === this.direction) {
        const e = Math.ceil(
          this.menuRect.width - this.wrapperRect.width - this.wrapper.scrollLeft
        );
        let i = Math.round(t - this.wrapperRect.right) + n;
        return (i = i < e ? i : e);
      }
      let i = this.wrapper.scrollLeft - e + n;
      return (i = i < this.wrapper.scrollLeft ? i : this.wrapper.scrollLeft);
    }
    _setMenuTranslateX(t) {
      const e = "next" === this.direction ? -t : t;
      (this.menu.style.transform = `translateX(${e}px)`),
        (this.translatedValue = e),
        this.menu.classList.remove(nt.noTransition),
        s(this.menu).then(() => {
          this._setWrapperScrollLeft(), (this.isTransitioning = !1);
        });
    }
    _setWrapperScrollLeft() {
      const t = Math.abs(this.translatedValue);
      (this.menu.style.transform = "none"),
        this.menu.classList.add(nt.noTransition),
        "previous" === this.direction
          ? (this.wrapper.scrollLeft -= t)
          : (this.wrapper.scrollLeft += t);
    }
  }
  const rt = {
      disclosure: "[data-disclosure]",
      disclosureList: "[data-disclosure-list]",
      disclosureToggle: "[data-disclosure-toggle]",
      disclosureInput: "[data-disclosure-input]",
      disclosureOptions: "[data-disclosure-option]",
    },
    ot = {
      listVisible: "disclosure-list--visible",
    };
  class at {
    constructor(t) {
      (this.disclosureForm = t),
        (this.disclosure = t.querySelector(rt.disclosure)),
        (this.disclosureList = t.querySelector(rt.disclosureList)),
        (this.disclosureToggle = t.querySelector(rt.disclosureToggle)),
        (this.disclosureInput = t.querySelector(rt.disclosureInput)),
        (this.disclosureOptions = t.querySelectorAll(rt.disclosureOptions)),
        this._setupListeners();
    }
    destroy() {
      this.disclosureToggle.removeEventListener(
        "click",
        this.eventHandlers.toggleList
      ),
        this.disclosureOptions.forEach((t) =>
          t.removeEventListener("click", this.eventHandlers.connectOptions)
        ),
        this.disclosure.removeEventListener(
          "keyup",
          this.eventHandlers.onDisclosureKeyUp
        ),
        this.disclosureList.removeEventListener(
          "focusout",
          this.eventHandlers.onDisclosureListFocusOut
        ),
        this.disclosureToggle.removeEventListener(
          "focusout",
          this.eventHandlers.onDisclosureToggleFocusOut
        ),
        document.body.removeEventListener(
          "click",
          this.eventHandlers.onBodyClick
        );
    }
    _setupListeners() {
      (this.eventHandlers = this._setupEventHandlers()),
        this.disclosureToggle.addEventListener(
          "click",
          this.eventHandlers.toggleList
        ),
        this.disclosureOptions.forEach((t) => {
          t.addEventListener("click", this.eventHandlers.connectOptions);
        }),
        this.disclosure.addEventListener(
          "keyup",
          this.eventHandlers.onDisclosureKeyUp
        ),
        this.disclosureList.addEventListener(
          "focusout",
          this.eventHandlers.onDisclosureListFocusOut
        ),
        this.disclosureToggle.addEventListener(
          "focusout",
          this.eventHandlers.onDisclosureToggleFocusOut
        ),
        document.body.addEventListener("click", this.eventHandlers.onBodyClick);
    }
    _setupEventHandlers() {
      return {
        connectOptions: this._connectOptions.bind(this),
        toggleList: this._toggleList.bind(this),
        onBodyClick: this._onBodyClick.bind(this),
        onDisclosureKeyUp: this._onDisclosureKeyUp.bind(this),
        onDisclosureListFocusOut: this._onDisclosureListFocusOut.bind(this),
        onDisclosureToggleFocusOut: this._onDisclosureToggleFocusOut.bind(this),
      };
    }
    _connectOptions(t) {
      t.preventDefault(), this._submitForm(t.currentTarget.dataset.value);
    }
    _onDisclosureToggleFocusOut(t) {
      this.disclosure.contains(t.relatedTarget) === !1 && this._toggleList();
    }
    _onDisclosureListFocusOut(t) {
      const e = t.currentTarget.contains(t.relatedTarget);
      this.disclosureList.classList.contains(ot.listVisible) &&
        !e &&
        this._toggleList();
    }
    _onDisclosureKeyUp(t) {
      t.key.toLowerCase() === D.ESC &&
        (this._toggleList(), this.disclosureToggle.focus());
    }
    _onBodyClick(t) {
      const e = this.disclosure.contains(t.target);
      this.disclosureList.classList.contains(ot.listVisible) &&
        !e &&
        this._toggleList();
    }
    _submitForm(t) {
      (this.disclosureInput.value = t), this.disclosureForm.submit();
    }
    _toggleList() {
      const t = "true" === this.disclosureToggle.getAttribute("aria-expanded");
      this.disclosureList.classList.toggle(ot.listVisible),
        this.disclosureToggle.setAttribute("aria-expanded", !t);
    }
  }
  const ct = {
    disclosureForm: "[data-disclosure-form]",
  };
  t.register("footer", {
    onLoad() {
      const t = Array.from(this.container.querySelectorAll(ct.disclosureForm));
      this.disclosures = t.map((t) => {
        return new at(t);
      });
    },
    onUnload() {
      this.disclosures.forEach((t) => t.destroy());
    },
  });
  const dt = {
      dropdownMenu: "[data-dropdown-menu]",
      dropdownParent: "[data-dropdown-parent]",
      dropdownParentType: (t) => `[data-dropdown-parent-type="${t}"]`,
      headerIcon: "[data-header-icon]",
      menuNavigation: "[data-menu-navigation]",
      menuNavigationItem: "[data-menu-navigation-item]",
      menuNavigationLastItem: "[data-menu-navigation-last-item]",
      menuNavigationType: (t) => `[data-menu-navigation-type="${t}"]`,
      mobileNavigationToggle: "[data-mobile-navigation-toggle]",
      mobileNavigationContainer: "[data-mobile-navigation-container]",
      mobileNavigationDrawer: "[data-mobile-navigation-drawer]",
      header: "[data-header]",
      stickySentinelHeader: "[data-sticky-sentinel-header]",
      stickyCollectionHeader: "[data-sticky-element]",
      logoImage: "[data-logo-image]",
      announcementBar: "[data-announcement-bar]",
      mainContent: "[data-main-content]",
    },
    lt = {
      menuNavigationItemIsExpanded: "menu-navigation__item--is-expanded",
      menuDropdownItemIsExpanded: "menu-dropdown__item--is-expanded",
      menuNavigationHidden: "menu-navigation-wrapper--hidden",
      headerWrapperFixed: "header-wrapper--fixed",
      headerWrapperHidden: "header-wrapper--hidden",
      bodyWithStickyHeader: "body-with-sticky-header",
    },
    ut = {
      headerLogo: "data-header-logo",
      headerIcon: "data-header-icon",
      popupOpen: "data-popup-open",
      menuNavigationToggle: "data-mobile-navigation-toggle",
      searchToggle: "data-search-toggle",
    },
    ht = {
      cart: "cart",
      menuNavigation: "menu-navigation",
      search: "search",
    };
  t.register("header", {
    onLoad() {
      (this.elements = this._getElements()),
        a() && this._prepareStickyHeader(),
        this._reloadHeaderPopups(),
        (this.mqlLarge = window.matchMedia(c("large"))),
        (this.mqlSmall = window.matchMedia(c("medium", "max"))),
        (this.drawerMenuIsActive = !this.mqlLarge.matches),
        this.elements.menuNavigation && this._handleMenuNavigationWidth(),
        this._setupEventHandlers();
    },
    _reloadHeaderPopups() {
      window.popups &&
        (!window.popups.find((t) => t.name === ht.menuNavigation) &&
          this.elements.menuNavigation &&
          window.popups.push(new W(ht.menuNavigation)),
        Object.values(ht).forEach((t) => {
          const e = window.popups.find((e) => e.name === t);
          e && e.init();
        }));
    },
    _getElements() {
      return {
        announcementBar: this.container.querySelector(dt.announcementBar),
        cartPriceBubbleContainers: this.container.querySelectorAll(
          dt.cartPriceBubbleContainer
        ),
        desktopNavigation: this.container.querySelector(
          dt.menuNavigationType("desktop")
        ),
        dropdownParents: this.container.querySelectorAll(dt.dropdownParent),
        header: this.container.querySelector(dt.header),
        headerIcons: Array.from(this.container.querySelectorAll(dt.headerIcon)),
        headerLogo: this.container.querySelector(dt.logoImage),
        headerSentinel: document.querySelector(dt.stickySentinelHeader),
        headerWrapper: this.container,
        menuNavigation: this.container.querySelector(dt.menuNavigation),
        menuNavigationItems: this.container.querySelectorAll(
          dt.menuNavigationItem
        ),
        mobileNavigationToggle: this.container.querySelector(
          dt.mobileNavigationToggle
        ),
      };
    },
    _setupEventHandlers() {
      (this.eventHandlers = this._getEventHandlers()),
        a() &&
          (window.addEventListener(
            "scroll",
            this.eventHandlers.toggleHeaderSticky,
            {
              passive: !0,
            }
          ),
          document.addEventListener(
            "productAddedToCart",
            this.eventHandlers.productAddedToCart
          ),
          document.addEventListener(
            "featuredCollectionTabClicked",
            this.eventHandlers.preventHeaderSlideIn
          ),
          document.addEventListener(
            "elementSticky",
            this.eventHandlers.featuredCollectionSticky
          )),
        this.elements.menuNavigation &&
          (this.elements.dropdownParents.forEach((t) =>
            t.addEventListener(
              "click",
              this.eventHandlers.onDropdownParentClick
            )
          ),
          window.addEventListener("resize", this.eventHandlers.onWindowResize),
          this.elements.mobileNavigationToggle.addEventListener(
            "click",
            this.eventHandlers.handleMobileNavigation
          ));
    },
    _getEventHandlers() {
      return {
        handleMultiplePopups: this._handleMultiplePopups.bind(this),
        onBodyClick: this._onBodyClick.bind(this),
        onDrawerNavigationKeyup: this._onDrawerNavigationKeyup.bind(this),
        onDropdownFocusOut: this._onDropdownFocusOut.bind(this),
        onDropdownKeyup: this._onDropdownKeyup.bind(this),
        onDropdownParentClick: this._onDropdownParentClick.bind(this),
        onWindowResize: n(() => this._onWindowResize(), 250),
        handleMobileNavigation: this._handleMobileNavigation.bind(this),
        toggleHeaderSticky: n(() => this._toggleHeaderPosition(), 100),
        featuredCollectionSticky: this._featuredCollectionSticky.bind(this),
        productAddedToCart: this._productAddedToCart.bind(this),
        preventHeaderSlideIn: this._preventHeaderSlideIn.bind(this),
      };
    },
    _onWindowResize() {
      const t = this._getDesktopActiveParentDropdown(),
        e =
          "true" ===
          this.elements.mobileNavigationToggle.getAttribute("aria-expanded");
      this.scrolledPastHeader ||
        (this._handleMenuNavigationWidth(),
        this.drawerMenuIsActive && t
          ? this._closeActiveDropdown()
          : !this.drawerMenuIsActive && t
          ? (this.elements.menuNavigation.style.overflow = "initial")
          : e && !this.drawerMenuIsActive
          ? this._closeMobileNavigation()
          : e && this.drawerMenuIsActive && this._toggleHeaderIcons(!0));
    },
    _handleMenuNavigationWidth() {
      if (!this.mqlLarge.matches) return void (this.drawerMenuIsActive = !0);
      (this.elements.menuNavigation.style.overflow = "hidden"),
        this.elements.menuNavigation.getBoundingClientRect().right >=
        this.elements.menuNavigation
          .querySelector(dt.menuNavigationLastItem)
          .getBoundingClientRect().right
          ? (this.elements.menuNavigation.classList.remove(
              lt.menuNavigationHidden
            ),
            (this.drawerMenuIsActive = !1))
          : (this.elements.menuNavigation.classList.add(
              lt.menuNavigationHidden
            ),
            (this.drawerMenuIsActive = !0));
    },
    _onDropdownFocusOut(t) {
      if ((t.preventDefault(), !t.currentTarget.contains(t.relatedTarget))) {
        const e = t.currentTarget.previousElementSibling;
        this._toggleMenuDropdown(e);
      }
    },
    _closeActiveDropdown() {
      const t = this._getDesktopActiveParentDropdown();
      t && this._animateDropdownClosed(t.nextElementSibling, t, !1);
    },
    _getDesktopActiveParentDropdown() {
      return this.elements.desktopNavigation.querySelector(
        `${dt.dropdownParent}${dt.dropdownParentType(
          "main"
        )}[aria-expanded="true"]`
      );
    },
    _onDropdownParentClick(t) {
      const e = t.currentTarget;
      "main" === e.dataset.dropdownParentType &&
        e.closest(dt.menuNavigationType("desktop")) &&
        (t.stopImmediatePropagation(), this._onBodyClick());
      const n = e.parentElement.querySelectorAll(dt.dropdownMenu);
      this._setupDropdowns(n), this._toggleMenuDropdown(e);
    },
    _setupDropdowns(t) {
      t.forEach((t, e) => {
        t.dataset.maxHeight ||
          (0 === e && t.closest(dt.menuNavigationType("desktop"))
            ? this._setupMainLevelDropdown(t)
            : this._setupChildAndMobileDropdown(t));
      });
    },
    _setupMainLevelDropdown(t) {
      t.style.whiteSpace = "nowrap";
      const { width: width, height: height } = t.getBoundingClientRect();
      (t.dataset.width = `${width}px`),
        (t.style.width = width < 260 ? `${width}px` : "26rem"),
        t.style.removeProperty("white-space"),
        (t.dataset.maxHeight =
          width < 260
            ? `${height}px`
            : `${t.getBoundingClientRect().height}px`),
        (t.style.maxHeight = "0px");
    },
    _setupChildAndMobileDropdown(t) {
      (t.dataset.maxHeight = `${t.getBoundingClientRect().height}px`),
        (t.style.maxHeight = "0px");
    },
    _toggleMenuDropdown(t) {
      const e = "true" === t.getAttribute("aria-expanded"),
        n = t.nextElementSibling;
      e ? this._animateDropdownClosed(n, t) : this._animateDropdownOpen(n, t);
    },
    _animateDropdownClosed(t, e, n = !0) {
      const i = "main" === e.dataset.dropdownParentType;
      i
        ? (e.classList.remove(lt.menuNavigationItemIsExpanded),
          t.closest(dt.menuNavigationType("desktop")) &&
            t.removeEventListener(
              "focusout",
              this.eventHandlers.onDropdownFocusOut
            ))
        : e.classList.remove(lt.menuDropdownItemIsExpanded),
        (t.style.maxHeight = "0px"),
        (t.style.opacity = 0),
        n
          ? s(t).then(() => {
              this._closeDropdown(e, t, i);
            })
          : this._closeDropdown(e, t, i);
    },
    _closeDropdown(t, e, n) {
      t.setAttribute("aria-expanded", "false"),
        n &&
          e.closest(dt.menuNavigationType("desktop")) &&
          (this._getDesktopActiveParentDropdown() ||
            (this.elements.menuNavigation.style.overflow = "hidden"),
          document.body.removeEventListener(
            "click",
            this.eventHandlers.onBodyClick
          ),
          e.removeEventListener("click", this._preventDropdownClick),
          t.parentNode.removeEventListener(
            "keyup",
            this.eventHandlers.onDropdownKeyup
          ));
    },
    _animateDropdownOpen(t, e) {
      const n = "main" === e.dataset.dropdownParentType,
        i = e.closest(dt.menuNavigationType("desktop"));
      n
        ? (i && (this.elements.menuNavigation.style.overflow = "initial"),
          e.classList.add(lt.menuNavigationItemIsExpanded),
          i &&
            t.addEventListener(
              "focusout",
              this.eventHandlers.onDropdownFocusOut
            ))
        : e.classList.add(lt.menuDropdownItemIsExpanded),
        e.setAttribute("aria-expanded", "true"),
        (t.style.maxHeight = `${t.dataset.maxHeight}`),
        (t.style.opacity = 1),
        i &&
          n &&
          s(t).then(() => {
            document.body.addEventListener(
              "click",
              this.eventHandlers.onBodyClick
            ),
              t.addEventListener("click", this._preventDropdownClick),
              e.parentNode.addEventListener(
                "keyup",
                this.eventHandlers.onDropdownKeyup
              );
          });
    },
    _onDropdownKeyup(t) {
      if (t.key.toLowerCase() === D.ESC) {
        const e = t.currentTarget,
          n = e.querySelector(dt.dropdownParentType("main")),
          i = n.nextElementSibling;
        this._animateDropdownClosed(i, n), n.focus();
      }
    },
    _preventDropdownClick(t) {
      t.stopImmediatePropagation();
    },
    _onBodyClick() {
      const t = this._getDesktopActiveParentDropdown();
      if (t) {
        const e = t.nextElementSibling;
        this._animateDropdownClosed(e, t);
      }
    },
    _handleMobileNavigation(t) {
      const e = t.currentTarget;
      "true" === e.getAttribute("aria-expanded")
        ? this._closeMobileNavigation()
        : (this._openMobileNavigation(e),
          this.stickyHeaderTimeout && clearTimeout(this.stickyHeaderTimeout),
          (this.lastScrollDirection = "none"));
    },
    _closeMobileNavigation() {
      this._toggleHeaderIcons(),
        this.elements.headerButtons.length &&
          this.elements.headerButtons.forEach((t) =>
            t.removeEventListener(
              "click",
              this.eventHandlers.handleMultiplePopups
            )
          ),
        document.removeEventListener(
          "keyup",
          this.eventHandlers.onDrawerNavigationKeyup
        ),
        document.removeEventListener("focusin", this._onBodyFocusIn),
        this.elements.drawerNavigationPopup.closePopup(!1);
    },
    _openMobileNavigation(t) {
      (this.elements.drawerNavigationPopup =
        this.elements.drawerNavigationPopup ||
        window.popups.find((t) => t.name === ht.menuNavigation)),
        (this.elements.headerButtons =
          this.elements.headerButtons ||
          this.elements.headerIcons.filter((t) =>
            t.hasAttribute(ut.popupOpen)
          )),
        this._setupMobileNavigationDropdowns(),
        this._setMobileDrawerHeight(),
        this._toggleHeaderIcons(!0),
        this.elements.headerButtons.length &&
          this.elements.headerButtons.forEach((t) =>
            t.addEventListener("click", this.eventHandlers.handleMultiplePopups)
          ),
        document.addEventListener(
          "keyup",
          this.eventHandlers.onDrawerNavigationKeyup
        ),
        document.addEventListener("focusin", this._onBodyFocusIn),
        this.elements.drawerNavigationPopup.openPopup({
          currentTarget: t,
        });
    },
    _onBodyFocusIn(t) {
      const e = t.target;
      (e.hasAttribute(ut.headerIcon) ||
        e.hasAttribute(ut.menuNavigationToggle) ||
        e.hasAttribute(ut.headerLogo)) &&
        t.stopImmediatePropagation();
    },
    _setupMobileNavigationDropdowns() {
      this.elements.mobileNavigation ||
        ((this.elements.mobileNavigation =
          this.elements.headerWrapper.querySelector(
            dt.menuNavigationType("mobile")
          )),
        (this.elements.mobileMenuParents =
          this.elements.mobileNavigation.querySelectorAll(dt.dropdownParent)),
        this.elements.mobileMenuParents.forEach((t) =>
          this._setupDropdowns(
            t.parentElement.querySelectorAll(dt.dropdownMenu)
          )
        ));
    },
    _setMobileDrawerHeight() {
      (this.elements.mobileNavigationContainer =
        this.elements.mobileNavigationContainer ||
        this.elements.headerWrapper.querySelector(
          dt.mobileNavigationContainer
        )),
        (this.elements.mobileNavigationDrawer =
          this.elements.mobileNavigationDrawer ||
          this.elements.headerWrapper.querySelector(dt.mobileNavigationDrawer));
      const t = this.elements.headerWrapper.getBoundingClientRect().height,
        e = window.pageYOffset,
        n = t - e;
      (this.elements.mobileNavigationDrawer.style.top = `${t}px`),
        (this.elements.mobileNavigationContainer.style.height = `calc(100vh - ${n}px)`);
    },
    _toggleHeaderIcons(t = !1) {
      const e = this.mqlSmall.matches && t;
      this.elements.headerIcons.forEach((t) => {
        e ? t.setAttribute("hidden", !0) : t.removeAttribute("hidden");
      });
    },
    _handleMultiplePopups(t) {
      this.elements.popups = this.elements.popups || {};
      const e = t.currentTarget.hasAttribute(ut.searchToggle)
        ? ht.search
        : ht.cart;
      this.elements.popups[e] =
        this.elements.popups[e] || window.popups.find((t) => t.name === e);
      const n = this.elements.popups[e].getElements();
      e === ht.search
        ? this._closeMobileNavigation()
        : s(n.popup).then(() => {
            this._closeMobileNavigation();
          });
    },
    _onDrawerNavigationKeyup(t) {
      t.key.toLowerCase() === D.ESC &&
        (this._toggleHeaderIcons(),
        document.removeEventListener(
          "keyup",
          this.eventHandlers.onDrawerNavigationKeyup
        ));
    },
    _prepareStickyHeader() {
      (this.featuredCollections = {}),
        (this.previousScrollPosition = window.pageYOffset),
        (this.headerWrapperHeight = this.elements.headerWrapper.offsetHeight),
        (this.originalHeaderHeight = this.elements.header.offsetHeight),
        this._setupHeaderObserver(),
        this.headerObserver.observe(this.elements.headerSentinel),
        (this.elements.headerWrapper.style.position = "fixed"),
        (document.querySelector(
          dt.mainContent
        ).style.paddingTop = `${this.headerWrapperHeight}px`);
    },
    _setupHeaderObserver() {
      this.headerObserver = new IntersectionObserver((t) => {
        if (t[0].isIntersecting) {
          if (
            (this._resetSentinel(),
            (this.scrolledPastHeader = !1),
            this._toggleInlineMenuOpacity(),
            void 0 === this.isFixed)
          )
            return;
          requestAnimationFrame(() => {
            this._resetHeader();
          });
        } else
          (this.scrolledPastHeader = !0),
            (this.isFixed = !1),
            this._headerSlideOut(),
            s(this.elements.headerWrapper).then(() => {
              this._toggleInlineMenuOpacity(), (this.drawerMenuIsActive = !0);
            }),
            this.elements.headerWrapper.classList.add(lt.headerWrapperHidden),
            this._moveSentinel();
      });
    },
    _toggleHeaderPosition() {
      if (!this.isHeaderAnimating && !this.doNotSlideHeaderIn) {
        const t = window.pageYOffset,
          e = t < this.previousScrollPosition ? "up" : "down";
        if (
          ((this.previousScrollPosition = t),
          this.scrolledPastHeader && this.lastScrollDirection !== e)
        )
          if (((this.lastScrollDirection = e), "down" === e))
            this.elements.menuNavigation && this._closeActiveDropdown(),
              this.isFixed
                ? requestAnimationFrame(() => {
                    this._headerSlideOut();
                  })
                : (this.elements.headerLogo &&
                    this.elements.headerLogo.style.removeProperty("transition"),
                  requestAnimationFrame(() => {
                    this.elements.headerWrapper.classList.add(
                      lt.headerWrapperHidden
                    );
                  }));
          else if ("up" === e) {
            if ((this._clearStickyHeaderTimeout(), this.isFixed)) return;
            requestAnimationFrame(() => {
              this._headerSlideIn();
            });
          }
      }
    },
    _clearStickyHeaderTimeout() {
      this.stickyHeaderTimeout && clearTimeout(this.stickyHeaderTimeout);
    },
    _productAddedToCart() {
      if (this.scrolledPastHeader) {
        if (!this.isFixed) {
          if (this.isHeaderAnimating)
            return void setTimeout(() => {
              this._headerSlideIn();
            }, 500);
          this._headerSlideIn();
        }
        clearTimeout(this.stickyHeaderTimeout),
          (this.stickyHeaderTimeout = setTimeout(() => {
            this._headerSlideOut();
          }, 5e3));
      }
    },
    _preventHeaderSlideIn() {
      (this.doNotSlideHeaderIn = !0),
        this.isFixed && this._headerSlideOut(),
        (this.lastScrollDirection = null),
        (this.preventHeaderSlideInTimeout = setTimeout(() => {
          (this.doNotSlideHeaderIn = !1),
            (this.previousScrollPosition = window.pageYOffset);
        }));
    },
    _featuredCollectionSticky(t) {
      const {
          stickyElement: stickyElement,
          isSticky: isSticky,
          container: container,
        } = t.detail,
        e = container.dataset.sectionId;
      (this.featuredCollections[e] = this.featuredCollections[e] || {
        stickyElement: stickyElement,
        isSticky: isSticky,
      }),
        (this.featuredCollections[e].isSticky = isSticky),
        this._toggleFeaturedCollectionStyle(this.featuredCollections[e]);
    },
    _resetHeader() {
      this.elements.headerSentinel &&
        ((this.isFixed = !1),
        (this.isHeaderAnimating = !0),
        this._clearStickyHeaderTimeout(),
        this.elements.menuNavigation &&
          (this.elements.headerLogo
            ? s(this.elements.headerLogo).then(() => {
                this._handleMenuNavigationWidth();
              })
            : this._handleMenuNavigationWidth()),
        this._toggleBodyClass(),
        this.elements.announcementBar &&
          (this.elements.announcementBar.style.display = "block"),
        this.elements.headerWrapper.classList.remove(
          lt.headerWrapperFixed,
          lt.headerWrapperHidden
        ),
        this.featuredCollections &&
          (Object.keys(this.featuredCollections).forEach((t) => {
            const e = this.featuredCollections[t];
            (e.stickyElement.style.transform = "translateY(0)"),
              e.stickyElement.style.removeProperty("transition");
          }),
          (this.isHeaderAnimating = !1)));
    },
    _headerSlideIn() {
      (this.isFixed = !0),
        (this.isHeaderAnimating = !0),
        (this.drawerMenuIsActive = !0),
        this._toggleBodyClass(),
        this.elements.announcementBar &&
          (this.elements.announcementBar.style.display = "none"),
        requestAnimationFrame(() => {
          this.elements.headerWrapper.classList.add(lt.headerWrapperFixed),
            this.elements.headerWrapper.classList.remove(
              lt.headerWrapperHidden
            ),
            this._checkForFeaturedCollection();
        }),
        s(this.elements.headerWrapper).then(() => {
          this.elements.headerLogo &&
            (this.elements.headerLogo.style.transition =
              "max-width 0.25s ease-out"),
            (this.isHeaderAnimating = !1);
        });
    },
    _headerSlideOut() {
      (this.isFixed = !1),
        (this.isHeaderAnimating = !0),
        this._toggleBodyClass(),
        this.elements.headerLogo &&
          this.elements.headerLogo.style.removeProperty("transition"),
        this.elements.headerWrapper.classList.add(lt.headerWrapperHidden),
        s(this.elements.headerWrapper).then(() => {
          this.elements.headerWrapper.classList.remove(lt.headerWrapperFixed),
            (this.isHeaderAnimating = !1);
        }),
        this._checkForFeaturedCollection(),
        this._clearStickyHeaderTimeout();
    },
    _moveSentinel() {
      this.elements.headerSentinel.style.transform = `translateY(-${this.originalHeaderHeight}px)`;
    },
    _resetSentinel() {
      this.elements.headerSentinel.style.removeProperty("transform");
    },
    _toggleBodyClass() {
      document.body.classList.toggle(lt.bodyWithStickyHeader, this.isFixed);
    },
    _toggleInlineMenuOpacity() {
      this.elements.menuNavigation &&
        !this.drawerMenuIsActive &&
        this.elements.menuNavigation.classList.toggle(
          lt.menuNavigationHidden,
          this.scrolledPastHeader
        );
    },
    _checkForFeaturedCollection() {
      this.featuredCollections &&
        Object.keys(this.featuredCollections).forEach((t) => {
          const e = this.featuredCollections[t];
          this._toggleFeaturedCollectionStyle(e);
        });
    },
    _toggleFeaturedCollectionStyle(t) {
      this.isFixed && t.isSticky
        ? ((t.stickyElement.style.transition = "transform .25s ease-out"),
          (t.stickyElement.style.transform = `translateY(${this.elements.header.offsetHeight}px)`))
        : ((t.stickyElement.style.transform = "translateY(0)"),
          s(t.stickyElement).then(() => {
            t.stickyElement.style.removeProperty("transition");
          }));
    },
    onUnload() {
      window.removeEventListener(
        "scroll",
        this.eventHandlers.toggleHeaderSticky,
        {
          passive: !0,
        }
      ),
        document.removeEventListener(
          "productAddedToCart",
          this.eventHandlers.productAddedToCart
        ),
        document.removeEventListener(
          "featuredCollectionTabClicked",
          this.eventHandlers.preventHeaderSlideIn
        ),
        document.removeEventListener(
          "elementSticky",
          this.eventHandlers.featuredCollectionSticky
        ),
        this.headerObserver && this.headerObserver.disconnect(),
        this.elements.menuNavigation &&
          (this.elements.dropdownParents.forEach((t) =>
            t.removeEventListener(
              "click",
              this.eventHandlers.onDropdownParentClick
            )
          ),
          window.removeEventListener(
            "resize",
            this.eventHandlers.onWindowResize
          ),
          this.elements.mobileNavigationToggle.removeEventListener(
            "click",
            this.eventHandlers.handleMobileNavigation
          ));
    },
  });
  const mt = {
      mediaArrowPrev: "[data-media-arrow-previous]",
      mediaArrowNext: "[data-media-arrow-next]",
      mediaCurrent: "[data-media-current]",
      mediaImages: "[data-media-image]",
      mediaLiveRegion: "[data-media-liveregion]",
      strip: "[data-media-strip]",
      mediaIndicatorLabel: "[data-media-indicator-label]",
      mediaWrapper: "[data-media-wrapper]",
      mediaStripWrapper: "[data-media-strip-wrapper]",
    },
    pt = {
      isActive: "is-active",
      transitionReady: "transition-ready",
    };
  class ft {
    constructor(t) {
      (this.elements = {
        container: t,
      }),
        (this.navigationOnClick = Boolean(
          this.elements.container.dataset.mediaClickNav
        ));
    }
    init() {
      Object.assign(this.elements, this.getElements()),
        (this.eventHandlers = this.setupEventHandlers()),
        this.bindEvents(),
        (this.state = this.setInitialState()),
        this.setIndicatorLabel(),
        this.hideMedia(),
        this.applyTransformation(),
        window.setTimeout(() => this.enableTransition()),
        this.preloadAdjacentImages();
    }
    getElements() {
      return {
        arrowNext: this.elements.container.querySelector(mt.mediaArrowNext),
        arrowPrev: this.elements.container.querySelector(mt.mediaArrowPrev),
        currentIndex: this.elements.container.querySelector(mt.mediaCurrent),
        images: Array.from(
          this.elements.container.querySelectorAll(mt.mediaImages)
        ),
        liveRegionContent: this.elements.container.querySelector(
          mt.mediaLiveRegion
        ),
        galleryIndicator: this.elements.container.querySelector(
          mt.mediaIndicatorLabel
        ),
        mediaWrapper: this.elements.container.querySelectorAll(mt.mediaWrapper),
        mediaStripWrapper: this.elements.container.querySelector(
          mt.mediaStripWrapper
        ),
      };
    }
    setupEventHandlers() {
      return {
        onArrowClick: this.onArrowClick.bind(this),
        onKeyUp: this.onKeyUp.bind(this),
        onImageClick: this.onImageClick.bind(this),
      };
    }
    bindEvents() {
      [this.elements.arrowNext, this.elements.arrowPrev].forEach((t) => {
        t.addEventListener("click", this.eventHandlers.onArrowClick);
      }),
        this.elements.container.addEventListener(
          "keyup",
          this.eventHandlers.onKeyUp
        ),
        this.navigationOnClick &&
          this.elements.images.forEach((t) => {
            t.addEventListener("click", this.eventHandlers.onImageClick);
          });
    }
    destroy() {
      [this.elements.arrowNext, this.elements.arrowPrev].forEach((t) => {
        t.removeEventListener("click", this.eventHandlers.onArrowClick);
      }),
        this.elements.container.removeEventListener(
          "keyup",
          this.eventHandlers.onKeyUp
        ),
        this.elements.images.forEach((t) => {
          t.removeEventListener("click", this.eventHandlers.onImageClick);
        });
    }
    setInitialState() {
      const t = this.elements.images.find((t) =>
        t.classList.contains(pt.isActive)
      );
      return {
        activeMediaImage: t,
        mediaId: Number(t.dataset.mediaId),
        mediaIndex: Number(t.dataset.mediaIndex),
        activeMediaTotalImages: this.elements.images.length,
        useAriaHidden: !0,
      };
    }
    onArrowClick(t) {
      t.preventDefault(),
        (this.state.isNext = "mediaArrowNext" in t.currentTarget.dataset),
        this.goToAdjacentMedia();
    }
    onKeyUp(t) {
      (t.key.toLowerCase() !== D.LEFT && t.key.toLowerCase() !== D.RIGHT) ||
        (t.preventDefault(),
        (this.state.isNext = t.key.toLowerCase() === D.RIGHT),
        this.goToAdjacentMedia());
    }
    onImageClick(t) {
      const e = t.currentTarget.dataset.mediaIndex,
        n = this.elements.images.find((t) => t.classList.contains(pt.isActive))
          .dataset.mediaIndex;
      (this.state.isNext = e > n), e !== n && this.goToAdjacentMedia();
    }
    goToAdjacentMedia() {
      this.setMediaIndex(),
        this.setActiveMedia("mediaIndex"),
        (this.state.mediaId = Number(
          this.state.activeMediaImage.dataset.mediaId
        )),
        this.renderGallery();
    }
    variantMediaSwitch(t) {
      t !== this.state.mediaId &&
        ((this.state.mediaId = t),
        this.setActiveMedia("mediaId"),
        (this.state.mediaIndex = Number(
          this.state.activeMediaImage.dataset.mediaIndex
        )),
        this.renderGallery());
    }
    cacheElement(t) {
      this.elements[t] =
        this.elements[t] || this.elements.container.querySelector(mt[t]);
    }
    setActiveMedia(t) {
      this.state.activeMediaImage = this.elements.images.find(
        (e) => Number(e.dataset[t]) === this.state[t]
      );
    }
    setMediaIndex() {
      this.state.mediaIndex = this.state.isNext
        ? this.nextImage()
        : this.previousImage();
    }
    nextImage() {
      return this.state.mediaIndex === this.state.activeMediaTotalImages
        ? 1
        : this.state.mediaIndex + 1;
    }
    previousImage() {
      return 1 === this.state.mediaIndex
        ? this.state.activeMediaTotalImages
        : this.state.mediaIndex - 1;
    }
    preloadAdjacentImages() {
      this.elements.images
        .filter((t) =>
          [this.nextImage(), this.previousImage()].includes(
            Number(t.dataset.mediaIndex)
          )
        )
        .forEach((t) => this.loadImage(t));
    }
    applyActiveClass() {
      this.state.activeMediaImage.classList.add(pt.isActive),
        this.loadImage(this.state.activeMediaImage);
    }
    hideMedia() {
      this.state.useAriaHidden &&
        this.elements.images.forEach((t) => {
          const e = t.closest(mt.mediaWrapper),
            n = e.querySelectorAll("button, a");
          if (!t.classList.contains(pt.isActive))
            return (
              t.closest(mt.mediaWrapper).setAttribute("aria-hidden", "true"),
              void n.forEach((t) => t.setAttribute("tabindex", "-1"))
            );
          e.removeAttribute("aria-hidden"),
            n.forEach((t) => t.removeAttribute("tabindex"));
        });
    }
    getIndicatorText() {
      return this.elements.liveRegionContent.dataset.mediaLiveregionMessage
        .replace("[index]", this.state.mediaIndex)
        .replace("[indexTotal]", this.state.activeMediaTotalImages);
    }
    setIndicatorLabel() {
      const t = this.getIndicatorText();
      this.elements.galleryIndicator.setAttribute("aria-label", t);
    }
    updateLiveRegion() {
      const t = this.getIndicatorText();
      this.elements.liveRegionContent.setAttribute("aria-hidden", !1),
        (this.elements.liveRegionContent.textContent = t),
        setTimeout(() => {
          this.elements.liveRegionContent.setAttribute("aria-hidden", !0);
        }, 2e3);
    }
    loadImage(t) {
      t.getAttribute("src") ||
        "IMG" !== t.tagName ||
        t.setAttribute("src", t.dataset.src),
        t.getAttribute("srcset") ||
          "IMG" !== t.tagName ||
          t.setAttribute("srcset", t.dataset.srcset);
    }
    clearActiveClasses() {
      this.elements.images.forEach((t) => t.classList.remove(pt.isActive));
    }
    renderCurrentIndex() {
      this.elements.currentIndex.textContent = this.state.mediaIndex;
    }
    enableTransition() {
      this.cacheElement("strip"),
        this.elements.strip.classList.add(pt.transitionReady);
    }
    applyTransformation() {
      this.cacheElement("strip");
      const t = 100 * (this.state.mediaIndex - 1);
      this.elements.strip.style.transform = `translateX(-${t}%)`;
    }
    resetTransformation() {
      this.cacheElement("strip"),
        this.elements.strip.classList.remove(pt.transitionReady),
        (this.elements.strip.style.transform = `translateX(0)`);
    }
    addAccessibilityAttr() {
      this.elements.container.setAttribute(
        "aria-roledescription",
        theme.strings.mediaCarousel
      ),
        this.elements.container.setAttribute(
          "aria-label",
          this.elements.container.dataset.label
        ),
        this.elements.mediaStripWrapper.setAttribute("aria-live", "polite"),
        this.elements.mediaWrapper.forEach((t) => {
          t.setAttribute("role", "group"),
            t.setAttribute("aria-roledescription", theme.strings.mediaSlide),
            t.setAttribute("aria-label", t.dataset.mediaLabel);
        });
    }
    removeAccessibilityAttr() {
      this.elements.container.removeAttribute("aria-roledescription"),
        this.elements.container.removeAttribute("aria-label"),
        this.elements.mediaWrapper.forEach((t) => {
          t.removeAttribute("aria-roledescription"),
            t.removeAttribute("aria-label"),
            t.removeAttribute("role");
        }),
        this.elements.images.forEach((t) => {
          t.closest(mt.mediaWrapper).removeAttribute("aria-hidden");
        }),
        this.elements.mediaStripWrapper.removeAttribute("aria-live");
    }
    renderGallery() {
      this.clearActiveClasses(),
        this.applyActiveClass(),
        this.hideMedia(),
        this.applyTransformation(),
        this.renderCurrentIndex(),
        this.setIndicatorLabel(),
        this.updateLiveRegion(),
        this.preloadAdjacentImages();
    }
  }
  (I.prototype.add = function (t, e, n) {
    this.entries.push({
      element: t,
      event: e,
      fn: n,
    }),
      t.addEventListener(e, n);
  }),
    (I.prototype.removeAll = function () {
      this.entries = this.entries.filter(function (t) {
        return t.element.removeEventListener(t.event, t.fn), !1;
      });
    });
  var gt = {
    idInput: '[name="id"]',
    optionInput: '[name^="options"]',
    quantityInput: '[name="quantity"]',
    propertyInput: '[name^="properties"]',
  };
  (x.prototype.destroy = function () {
    this._listeners.removeAll();
  }),
    (x.prototype.options = function () {
      return N(this.optionInputs, function (t) {
        var e = /(?:^(options\[))(.*?)(?:\])/;
        return (t.name = e.exec(t.name)[2]), t;
      });
    }),
    (x.prototype.variant = function () {
      return k(this.product, this.options());
    }),
    (x.prototype.properties = function () {
      var t = O(this.propertyInputs, function (t) {
        return /(?:^(properties\[))(.*?)(?:\])/.exec(t)[2];
      });
      return 0 === Object.entries(t).length ? null : t;
    }),
    (x.prototype.quantity = function () {
      return this.quantityInputs[0]
        ? Number.parseInt(this.quantityInputs[0].value, 10)
        : 1;
    }),
    (x.prototype._setIdInputValue = function (t) {
      var e = this.element.querySelector(gt.idInput);
      e ||
        ((e = document.createElement("input")),
        (e.type = "hidden"),
        (e.name = "id"),
        this.element.appendChild(e)),
        (e.value = t.toString());
    }),
    (x.prototype._onSubmit = function (t, e) {
      (e.dataset = this._getProductFormEventData()),
        e.dataset.variant && this._setIdInputValue(e.dataset.variant.id),
        t.onFormSubmit && t.onFormSubmit(e);
    }),
    (x.prototype._onFormEvent = function (t) {
      return void 0 === t
        ? Function.prototype
        : function (e) {
            (e.dataset = this._getProductFormEventData()), t(e);
          }.bind(this);
    }),
    (x.prototype._initInputs = function (t, e) {
      return Array.prototype.slice.call(this.element.querySelectorAll(t)).map(
        function (t) {
          return this._listeners.add(t, "change", this._onFormEvent(e)), t;
        }.bind(this)
      );
    }),
    (x.prototype._getProductFormEventData = function () {
      return {
        options: this.options(),
        variant: this.variant(),
        properties: this.properties(),
        quantity: this.quantity(),
      };
    });
  const yt = {
      drawerContent: "[data-store-availability-drawer-content]",
      drawerOutput: "[data-store-availability-drawer-output]",
      errorTemplate: "[data-store-availability-error-template]",
      mainContent: "[data-store-availability-main-content]",
      drawerProductTitle: "[data-store-availability-drawer-product-title]",
      drawerVariantTitleWrapper:
        "[data-store-availability-drawer-variant-title-wrapper]",
      openDrawer: "[data-store-availability-open-drawer]",
      refreshList: "[data-store-availability-refresh-list]",
    },
    vt = {
      hidden: "hidden",
    };
  class wt {
    constructor(t, e) {
      (this.container = t),
        (this.errorTemplate = t.querySelector(yt.errorTemplate)),
        (this.productTitle = this.container.getAttribute("data-product-title")),
        (this.hasOnlyDefaultVariant =
          "true" ===
          this.container.getAttribute("data-has-only-default-variant")),
        (this.options = {
          variant: null,
          variantLabels: [],
        }),
        Object.assign(this.options, e),
        this._bindEvents();
    }
    hide() {
      this.container.innerHTML = "";
    }
    updateVariant(t) {
      Object.assign(this.options, t);
    }
    updateContent(t, e) {
      const n = `${this.container.getAttribute(
        "data-base-url"
      )}/variants/${t}?section_id=store-availability`;
      (this.variantOptions = e),
        fetch(n)
          .then((t) => {
            return t.text();
          })
          .then((t) => {
            this._render(t);
          })
          .catch(() => {
            this._renderError();
          });
    }
    _bindEvents() {
      this.container.addEventListener(
        "click",
        this._onClickContainer.bind(this)
      );
    }
    _getStorePopup() {
      return window.popups.find((t) => "store-availability" === t.name);
    }
    _onClickContainer(t) {
      const e = t.target.closest(yt.refreshList),
        n = t.target.closest(yt.openDrawer);
      e &&
        this.options.variant.available &&
        this.updateContent(this.options.id, this.options.options);
      const i = this._getStorePopup();
      n &&
        i &&
        i.openPopup({
          currentTarget: n,
        });
    }
    _render(t) {
      const e = new DOMParser(),
        n = e.parseFromString(t, "text/html"),
        i = n.documentElement.querySelector(yt.mainContent);
      if (i) {
        const t = n.documentElement.querySelector(yt.drawerContent),
          e = i.content.firstElementChild.cloneNode(!0);
        (this.container.innerHTML = ""), this.container.appendChild(e);
        this._getStorePopup().elements.popup && this._updateDrawer(t);
      }
    }
    _renderError() {
      const t = this.errorTemplate.content.firstElementChild.cloneNode(!0);
      (this.container.innerHTML = ""), this.container.appendChild(t);
    }
    _hideVariantTitle() {
      this.drawerVariantTitleWrapper.classList.add(vt.hidden);
    }
    _updateDrawer(t) {
      const e = document.createDocumentFragment(),
        n = this._getStorePopup(),
        i = n.elements.popup;
      (this.drawerOutput = i.querySelector(yt.drawerOutput)),
        (this.drawerProductTitle = i.querySelector(yt.drawerProductTitle)),
        (this.drawerVariantTitleWrapper = i.querySelector(
          yt.drawerVariantTitleWrapper
        )),
        this.hasOnlyDefaultVariant && this._hideVariantTitle(),
        (this.drawerProductTitle.textContent = this.productTitle),
        this.options.variantLabels.length > 0 &&
          this.variantOptions.forEach((t, n) => {
            const i = e.appendChild(document.createElement("div")),
              s = i.appendChild(document.createElement("span"));
            (s.textContent = this.options.variantLabels[n]),
              (s.className = "store-availability-variant__label"),
              (i.appendChild(document.createElement("span")).textContent = t);
          }),
        (this.drawerVariantTitleWrapper.innerHTML = ""),
        this.drawerVariantTitleWrapper.appendChild(e),
        (this.drawerOutput.innerHTML = ""),
        this.drawerOutput.appendChild(t);
    }
  }
  const bt = {
      dataQuantitySelectorIncrease: "data-quantity-selector-increase",
    },
    Ct = {
      addToCart: "[data-add-to-cart]",
      addToCartText: "[data-add-to-cart-text]",
      cartCountBubble: "[data-cart-count-bubble]",
      cartCount: "[data-cart-count]",
      cartPriceBubble: "[data-cart-price-bubble]",
      errorMessageWrapper: "[data-error-message-wrapper]",
      errorMessage: "[data-error-message]",
      price: "[data-price]",
      productForm: "[data-product-form]",
      productJSON: "[data-product-json]",
      productMasterSelect: "[data-product-master-select]",
      productPolicies: "[data-product-policies]",
      regularPrice: "[data-regular-price]",
      productSuccessMessage: "[data-product-success-message]",
      productStatus: "[data-product-status]",
      salePrice: "[data-sale-price]",
      unitPrice: "[data-unit-price]",
      unitPriceBaseUnit: "[data-unit-price-base-unit]",
      quantityInput: "[data-quantity-input]",
      quantityInputWrapper: "[data-quantity-input-wrapper]",
      quantitySelectors: "[data-quantity-selector]",
      quantitySelectorIncrease: "[data-quantity-selector-increase]",
      storeAvailability: "[data-store-availability]",
    },
    Et = {
      hidden: "hidden",
      formInputError: "form__input-wrapper--error",
      productOnSale: "price--on-sale",
      productSoldOut: "price--sold-out",
      productUnitAvailable: "price--unit-available",
      productUnavailable: "price--unavailable",
      visuallyHidden: "visually-hidden",
    };
  class St {
    constructor(t) {
      this.elements = {
        container: t,
      };
    }
    init() {
      if (
        ((this.eventHandlers = {}),
        Object.assign(this.elements, this._getElements()),
        this.elements.productForm)
      )
        if (
          ((this.productId = this.elements.productForm.dataset.productId),
          this.elements.productJSON)
        ) {
          const t = JSON.parse(this.elements.productJSON.innerHTML);
          if (
            (this._initProductForm(t),
            this.elements.storeAvailability && this.productForm)
          ) {
            const e = this.productForm.variant(),
              n = t.options.map((t) => t.name);
            (this.storeAvailability = new wt(this.elements.storeAvailability, {
              variant: e,
              variantLabels: n,
            })),
              e && this._updateStoreAvailability(e);
          }
        } else
          this._getProductJSON(this.elements.productForm.dataset.productHandle)
            .then((t) => {
              this._initProductForm(t);
            })
            .catch((t) => {
              throw new Error(t);
            });
    }
    destroy() {
      Boolean(this.elements.container.dataset.showQuantitySelector) &&
        (this.elements.quantitySelectors.forEach((t) => {
          t.removeEventListener(
            "click",
            this.eventHandlers.onQuantitySelectorClick
          );
        }),
        this.hasInstantQuantity &&
          (this.elements.quantityInput.removeEventListener(
            "input",
            this.eventHandlers.onQuantityInputTextChanged
          ),
          this.elements.quantityInput.removeEventListener(
            "removedFromCart",
            this.eventHandlers.onProductRemovedFromCart
          )));
    }
    _hideInstantQuantity() {
      this.hasInstantQuantity &&
        this.elements.quantityInputWrapper &&
        ((this.elements.quantityInput.value = 1),
        this._hideErrorMessage(),
        this.elements.quantityInputWrapper.classList.add(Et.hidden),
        this.elements.addToCart.classList.remove(Et.hidden),
        this.elements.addToCart.focus());
    }
    _initProductForm(t) {
      (this.productForm = new x(this.elements.productForm, t, {
        onOptionChange: this._onFormOptionChange.bind(this),
        onFormSubmit: this._onFormSubmit.bind(this),
        onQuantityChange: this._onQuantityChange.bind(this),
      })),
        this._setupEventListeners();
    }
    _getElements() {
      return {
        addToCart: this.elements.container.querySelector(Ct.addToCart),
        addToCartText: this.elements.container.querySelector(Ct.addToCart),
        cartPriceBubble: document.querySelector(Ct.cartPriceBubble),
        errorMessageWrapper: this.elements.container.querySelector(
          Ct.errorMessageWrapper
        ),
        errorMessageElement: this.elements.container.querySelector(
          Ct.errorMessage
        ),
        masterSelect: this.elements.container.querySelector(
          Ct.productMasterSelect
        ),
        productForm: this.elements.container.querySelector(Ct.productForm),
        productJSON: this.elements.container.querySelector(Ct.productJSON),
        productPolicies: this.elements.container.querySelector(
          Ct.productPolicies
        ),
        productStatus: this.elements.container.querySelector(Ct.productStatus),
        priceContainer: this.elements.container.querySelector(Ct.price),
        regularPrice: this.elements.container.querySelectorAll(Ct.regularPrice),
        salePrice: this.elements.container.querySelector(Ct.salePrice),
        successMessage: this.elements.container.querySelector(
          Ct.productSuccessMessage
        ),
        quantityInputWrapper: this.elements.container.querySelector(
          Ct.quantityInputWrapper
        ),
        quantityInput: this.elements.container.querySelector(Ct.quantityInput),
        quantitySelectors: this.elements.container.querySelectorAll(
          Ct.quantitySelectors
        ),
        quantitySelectorIncrease: this.elements.container.querySelector(
          Ct.quantitySelectorIncrease
        ),
        unitPrice: this.elements.container.querySelector(Ct.unitPrice),
        unitPriceBaseUnit: this.elements.container.querySelector(
          Ct.unitPriceBaseUnit
        ),
        storeAvailability: this.elements.container.querySelector(
          Ct.storeAvailability
        ),
      };
    }
    _getEventHandlers() {
      return {
        onProductRemovedFromCart: this._hideInstantQuantity.bind(this),
        onQuantitySelectorClick: this._onQuantitySelectorClick.bind(this),
        onQuantityInputTextChanged: n(() => {
          this._updateCartQuantity();
        }, 1e3),
      };
    }
    _setupEventListeners() {
      this.elements.container.dataset.showQuantitySelector &&
        ((this.eventHandlers = this._getEventHandlers()),
        (this.hasInstantQuantity = Boolean(
          this.elements.quantityInputWrapper.dataset.quantityInputInstant
        )),
        this.elements.quantitySelectors.forEach((t) => {
          t.addEventListener(
            "click",
            this.eventHandlers.onQuantitySelectorClick
          );
        }),
        this.hasInstantQuantity &&
          (this.elements.quantityInput.addEventListener(
            "input",
            this.eventHandlers.onQuantityInputTextChanged
          ),
          this.elements.quantityInput.addEventListener(
            "removedFromCart",
            this.eventHandlers.onProductRemovedFromCart
          )));
    }
    _getProductJSON(t) {
      const e = "/" === theme.rootUrl ? "" : theme.rootUrl;
      return window.fetch(`${e}/products/${t}.js`).then((t) => {
        return t.json();
      });
    }
    _onFormSubmit(t) {
      t.preventDefault(),
        this.elements.container
          .querySelector(Ct.addToCart)
          .hasAttribute("aria-disabled") ||
          this._quantityIsInvalid() ||
          this._addItemToCart();
    }
    _quantityIsInvalid() {
      return (
        !(
          !this.elements.quantityInput ||
          !(
            parseInt(this.elements.quantityInput.value, 10) <= 0 ||
            "" === this.elements.quantityInput.value
          )
        ) && (this._showErrorMessage(theme.strings.quantityMinimumMessage), !0)
      );
    }
    _showInstantQuantity(t) {
      this.hasInstantQuantity &&
        this.elements.quantityInputWrapper &&
        ((this.elements.quantityInput.dataset.quantityInputKey = t.key),
        (this.elements.quantityInput.value = t.quantity),
        this.elements.addToCart.classList.add(Et.hidden),
        this.elements.quantityInputWrapper.classList.remove(Et.hidden),
        this.elements.quantityInput && this.elements.quantityInput.focus());
    }
    _addItemToCart() {
      this._hideErrorMessage(),
        this._toggleSuccessMessage(!0),
        S(this.elements.productForm)
          .then((t) => {
            this._toggleSuccessMessage(!1, this._getSuccessMessage()),
              this._showInstantQuantity(t),
              window.carts.length || this._onCartUpdated(),
              (this.isUpdatingCart = !1),
              document.dispatchEvent(new CustomEvent("productAddedToCart")),
              window.carts.forEach((t) => {
                t.onCartUpdated(this.productId);
              }),
              theme.cartQuantity.updateQuantityInputElements(t.key, t.quantity);
            const e = this._getQuantityUpdatedText(t.quantity, !0);
            this._updateLiveRegion(e);
          })
          .catch((t) => {
            this._handleProductError(t), (this.isUpdatingCart = !1);
          });
    }
    _getSuccessMessage() {
      const t = this.elements.quantityInput
        ? this.elements.quantityInput.value
        : 1;
      return parseInt(t, 10) > 1
        ? theme.strings.itemAddedToCartMulti
        : theme.strings.itemAddedToCartSingle;
    }
    _toggleSuccessMessage(t, e = "") {
      this.elements.successMessage &&
        ((this.elements.successMessage.textContent = e),
        this.elements.successMessage.classList.toggle(Et.hidden, t));
    }
    _onCartUpdated() {
      C()
        .then((t) => {
          this._updateCartPriceBubble(t.total_price),
            this._updateCartCountBubble(t.item_count),
            theme.cartQuantity.updateLocalCartState(t, this.productId);
        })
        .catch((t) => {
          throw new Error(t);
        });
    }
    _updateCartPriceBubble(t) {
      this.elements.cartPriceBubble &&
        (this.elements.cartPriceBubble.innerText = this._formatMoney(t));
    }
    _updateCartCountBubble(t) {
      (this.cartCountBubbles =
        this.cartCountBubbles || document.querySelectorAll(Ct.cartCountBubble)),
        (this.cartCounts =
          this.cartCounts || document.querySelectorAll(Ct.cartCount)),
        this.cartCounts.forEach((e) => (e.innerText = t > 99 ? "99+" : t)),
        this.cartCountBubbles.forEach((e) =>
          e.classList.toggle(Et.hidden, 0 === t)
        );
    }
    _handleProductError(t) {
      t.json()
        .then((t) => {
          const e = t.description ? t.description : theme.strings.cartError;
          this._showErrorMessage(e);
        })
        .catch((t) => {
          throw t;
        });
    }
    _getQuantityErrorMessage(t) {
      return theme.strings.quantityError
        .replace("[quantity]", t.quantity)
        .replace("[title]", t.title);
    }
    _showErrorMessage(t) {
      this.elements.errorMessageElement &&
        this.elements.errorMessageWrapper &&
        ((this.elements.errorMessageElement.innerHTML = t),
        this.elements.errorMessageWrapper.classList.remove(Et.hidden),
        this.elements.errorMessageWrapper.setAttribute("aria-hidden", !0),
        this.elements.errorMessageWrapper.removeAttribute("aria-hidden"),
        this.elements.quantityInputWrapper &&
          !this.hasInstantQuantity &&
          this.elements.quantityInputWrapper.classList.add(Et.formInputError));
    }
    _hideErrorMessage() {
      this.elements.errorMessageWrapper &&
        (this.elements.errorMessageWrapper.classList.add(Et.hidden),
        this.elements.quantityInputWrapper &&
          !this.hasInstantQuantity &&
          this.elements.quantityInputWrapper.classList.remove(
            Et.formInputError
          ));
    }
    _onFormOptionChange(t) {
      const e = t.dataset.variant;
      this._updateMasterSelect(e),
        this._hideErrorMessage(),
        this._toggleSuccessMessage(!0),
        this._updatePrice(e),
        this._updateProductPolicies(e),
        this._updateAddToCart(e),
        this._updateVariantName(e),
        this._hideInstantQuantity(),
        this._updateStoreAvailability(e);
      const n = this._getVariantUpdatedText(e);
      this._updateLiveRegion(n),
        this._fireEvent("formOptionChanged", {
          variant: e,
        });
    }
    _fireEvent(t, e) {
      this.elements.container.dispatchEvent(
        new window.CustomEvent(t, {
          detail: e,
        })
      );
    }
    _updateVariantName(t) {
      t && t.name && (this.elements.productForm.dataset.variantName = t.name);
    }
    _updateMasterSelect(t) {
      t &&
        this.elements.masterSelect &&
        (this.elements.masterSelect.value = t.id);
    }
    _onQuantityChange() {
      this._hideErrorMessage(), this._toggleSuccessMessage(!0);
    }
    _calculateNewInputQuantity(t, e) {
      const n = this.hasInstantQuantity ? 0 : 1,
        i = e ? t + 1 : t - 1;
      return Math.max(n, i);
    }
    _onQuantitySelectorClick(t) {
      if (!this.isUpdatingCart) {
        this._hideErrorMessage();
        const e = t.currentTarget.hasAttribute(bt.dataQuantitySelectorIncrease),
          n = this.elements.container.querySelector(Ct.quantityInput),
          i = parseInt(n.value, 10),
          s = this._calculateNewInputQuantity(i, e);
        (n.value = s),
          this.hasInstantQuantity &&
            (clearTimeout(this.timeout),
            (this.timeout = setTimeout(() => {
              (this.isUpdatingCart = !0), this._updateCartQuantity();
            }, 500)));
      }
    }
    _updateCartQuantity() {
      const t = this.elements.quantityInput.dataset.quantityInputKey;
      if (t) {
        const [e] = t.split(":"),
          n = parseInt(this.elements.quantityInput.value, 10);
        L(t, {
          quantity: n,
        }).then((i) => {
          (this.isUpdatingCart = !1),
            window.carts.length || this._onCartUpdated(),
            window.carts.forEach((t) => {
              t.onCartUpdated(this.productId);
            }),
            theme.cartQuantity.updateQuantityInputElements(t, n);
          const s = this._getQuantityUpdatedText(n);
          this._updateLiveRegion(s),
            document.dispatchEvent(new CustomEvent("productAddedToCart"));
          const r = i.items.find((e) => e.key === t),
            o = i.items.reduce((t, n) => {
              return n.id === Number(e) ? t + n.quantity : t;
            }, 0);
          n > o &&
            ((this.elements.quantityInput.value = o),
            this.elements.quantityInput.focus(),
            this._showErrorMessage(this._getQuantityErrorMessage(r))),
            n || this._hideInstantQuantity();
        });
      }
    }
    _updatePrice(t) {
      if (this.elements.priceContainer) {
        if (
          (this.elements.priceContainer.classList.remove(
            Et.productUnavailable,
            Et.productOnSale,
            Et.productUnitAvailable,
            Et.productSoldOut
          ),
          this.elements.priceContainer.removeAttribute("aria-hidden"),
          !t)
        )
          return (
            this.elements.priceContainer.classList.add(Et.productUnavailable),
            void this.elements.priceContainer.setAttribute("aria-hidden", !0)
          );
        t.available ||
          this.elements.priceContainer.classList.add(Et.productSoldOut),
          t.compare_at_price > t.price
            ? this._renderOnSalePrice(t)
            : this._renderRegularPrice(t),
          this._updateUnitPrice(t);
      }
    }
    _renderOnSalePrice(t) {
      this.elements.regularPrice.forEach((e) => {
        e.innerHTML = this._formatMoney(t.compare_at_price);
      }),
        this.elements.salePrice &&
          ((this.elements.salePrice.innerHTML = this._formatMoney(t.price)),
          this.elements.priceContainer.classList.add(Et.productOnSale));
    }
    _renderRegularPrice(t) {
      this.elements.regularPrice.forEach((e) => {
        e.innerHTML = this._formatMoney(t.price);
      });
    }
    _updateUnitPrice(t) {
      t.unit_price &&
        this.elements.unitPrice &&
        this.elements.unitPriceBaseUnit &&
        ((this.elements.unitPrice.innerHTML = this._formatMoney(
          t.unit_price,
          theme.moneyFormat
        )),
        (this.elements.unitPriceBaseUnit.innerText = this._getBaseUnit(t)),
        this.elements.priceContainer.classList.add(Et.productUnitAvailable));
    }
    _getBaseUnit(t) {
      return 1 === t.unit_price_measurement.reference_value
        ? t.unit_price_measurement.reference_unit
        : t.unit_price_measurement.reference_value +
            t.unit_price_measurement.reference_unit;
    }
    _updateProductPolicies(t) {
      this.elements.productPolicies &&
        (this.elements.productPolicies.classList.remove(Et.visuallyHidden),
        t || this.elements.productPolicies.classList.add(Et.visuallyHidden));
    }
    _updateAddToCart(t) {
      this.elements.addToCart &&
        this.elements.addToCartText &&
        (t
          ? t.available
            ? (this.elements.addToCart.removeAttribute("aria-disabled"),
              this.elements.addToCart.setAttribute(
                "aria-label",
                theme.strings.addToCart
              ),
              (this.elements.addToCartText.innerText = theme.strings.addToCart))
            : (this.elements.addToCart.setAttribute("aria-disabled", !0),
              this.elements.addToCart.setAttribute(
                "aria-label",
                theme.strings.soldOut
              ),
              (this.elements.addToCartText.innerText = theme.strings.soldOut))
          : (this.elements.addToCart.setAttribute("aria-disabled", !0),
            this.elements.addToCart.setAttribute(
              "aria-label",
              theme.strings.unavailable
            ),
            (this.elements.addToCartText.innerText =
              theme.strings.unavailable)));
    }
    _updateLiveRegion(t) {
      this.elements.productStatus &&
        ((this.elements.productStatus.innerText = t),
        this.elements.productStatus.setAttribute("aria-hidden", !1),
        setTimeout(() => {
          this.elements.productStatus.setAttribute("aria-hidden", !0);
        }, 1e3));
    }
    _formatMoney(t) {
      return U(t, theme.moneyFormat);
    }
    _getQuantityUpdatedText(t, e) {
      let n = theme.strings.productUpdatedOnCart.replace("[quantity]", t);
      return (
        0 === t
          ? (n = theme.strings.productRemovedFromCart)
          : 1 === t && e && (n = theme.strings.productAddedToCart),
        n.replace("[title]", this.elements.productForm.dataset.variantName)
      );
    }
    _getVariantUpdatedText(t) {
      if (!t) return theme.strings.unavailable;
      const e = t.compare_at_price > t.price,
        n = t.available ? "" : theme.strings.soldOut;
      let i = "",
        s = this._formatMoney(t.price),
        r = "",
        o = "",
        a = "",
        c = "";
      return (
        e &&
          ((i = theme.strings.regularPrice),
          (s = this._formatMoney(t.compare_at_price)),
          (r = theme.strings.salePrice),
          (o = this._formatMoney(t.price))),
        t.unit_price &&
          ((a = theme.strings.unitPrice),
          (c = `${this._formatMoney(t.unit_price)} ${
            theme.strings.unitPriceSeparator
          } ${this._getBaseUnit(t)}`)),
        `${n} ${i} ${s} ${r} ${o} ${a} ${c}`
      );
    }
    _updateStoreAvailability(t) {
      this.storeAvailability &&
        (t && t.available
          ? (this.storeAvailability.updateContent(t.id, t.options),
            this.storeAvailability.updateVariant(t))
          : this.storeAvailability.hide());
    }
  }
  const Lt = {
    productForm: "[data-product-form]",
    media: "[data-media]",
    singleMedia: "[data-media-image]",
  };
  class _t {
    constructor(t) {
      (this.container = t),
        this._prepareGallery(),
        this.container.querySelector(Lt.productForm) &&
          (this._setupEventListeners(),
          (this.productForm = new St(this.container)),
          this.productForm.init());
    }
    destroy() {
      this.productForm && this.productForm.destroy(),
        this.container.removeEventListener(
          "formOptionChanged",
          this.eventHandlers.onFormOptionChange
        ),
        Boolean(this.gallery) && this.gallery.destroy();
    }
    _getEventHandlers() {
      return {
        onFormOptionChange: this._onFormOptionChange.bind(this),
      };
    }
    _setupEventListeners() {
      (this.eventHandlers = this._getEventHandlers()),
        this.container.addEventListener(
          "formOptionChanged",
          this.eventHandlers.onFormOptionChange
        );
    }
    _prepareGallery() {
      if (
        ((this.galleryElement = this.container.querySelector(Lt.media)),
        this.galleryElement)
      ) {
        if ("gallery" === this.container.dataset.mediaType)
          return void this._initializeGallery();
        if (
          (this._addGalleryMediaQueryListener(),
          this.galleryMediaQueryListener.matches)
        )
          return (
            this._initializeGallery(), void this.gallery.addAccessibilityAttr()
          );
        this._loadAllGalleryImages();
      }
    }
    _addGalleryMediaQueryListener() {
      (this.galleryMediaQueryListener = window.matchMedia(c("large", "max"))),
        this.galleryMediaQueryListener.addListener((t) => {
          if (t.matches) return void this._switchToGalleryMode();
          this._switchToStackedMode();
        });
    }
    _switchToGalleryMode() {
      const t = this._initializeGallery();
      (this.gallery.state.useAriaHidden = !0),
        this.gallery.hideMedia(),
        this.gallery.addAccessibilityAttr(),
        t || this.gallery.bindEvents();
    }
    _switchToStackedMode() {
      this._loadAllGalleryImages(),
        this.gallery.removeAccessibilityAttr(),
        this.gallery.resetTransformation(),
        (this.gallery.state.useAriaHidden = !1),
        this.gallery.destroy();
    }
    _initializeGallery() {
      return this.gallery
        ? (this.gallery.applyTransformation(),
          window.setTimeout(() => this.gallery.enableTransition()),
          !1)
        : ((this.gallery = new ft(this.galleryElement)),
          this.gallery.init(),
          !0);
    }
    _loadAllGalleryImages() {
      this.container.querySelectorAll(Lt.singleMedia).forEach((t) => {
        t.getAttribute("src") ||
          t.setAttribute("src", t.getAttribute("data-src")),
          t.getAttribute("srcset") ||
            t.setAttribute("srcset", t.getAttribute("data-srcset")),
          (t.outerHTML = t.outerHTML);
      }),
        this.gallery &&
          (this.gallery.elements.images = Array.from(
            this.gallery.elements.container.querySelectorAll(Lt.singleMedia)
          ));
    }
    _onFormOptionChange(t) {
      const e = t.detail.variant;
      if (
        e &&
        e.featured_media &&
        this.gallery &&
        (this.gallery.variantMediaSwitch(e.featured_media.id),
        this.galleryMediaQueryListener)
      ) {
        if (this.galleryMediaQueryListener.matches) return;
        this.gallery.resetTransformation();
      }
    }
  }
  t.register("product", {
    onLoad() {
      this.product = new _t(this.container);
    },
    onUnload() {
      this.product.destroy();
    },
  });
  const Tt = {
      productCollectionTitle: "[data-product-collection-title]",
      productImage: "[data-media-image]",
      productRecommendationsContainer: "[product-recommendations-container]",
      productTemplate: "[data-product-template]",
      productViewCartLink: "[data-product-view-cart-link]",
      productModal: "[data-product-modal]",
    },
    It = {
      hidden: "hidden",
      isOpen: "is-open",
      productModalNoMedia: "product-modal--no-media",
    };
  class kt {
    constructor(t, e, n) {
      (this.elements = {
        productContainer: t,
        productModalContent: e,
      }),
        (this.collectionTitle = n || "");
    }
    init() {
      (this.elements.productModal = document.querySelector(Tt.productModal)),
        this.elements.productModal &&
          (this.eventHandlers = this._getEventHandlers());
    }
    setupProductModal(t) {
      this._getProductModalContent(t)
        .then((t) => {
          (this.elements.productModal.querySelector(
            Tt.productCollectionTitle
          ).textContent = this.collectionTitle),
            this._setupProductModalContent(t);
        })
        .catch((t) => {
          throw new Error(t);
        });
    }
    _getEventHandlers() {
      return {
        hideModalShowCart: this._hideModalShowCart.bind(this),
        hideProductModal: this._hideProductModal.bind(this),
      };
    }
    _setupEventHandlers() {
      this.elements.productContainer.addEventListener(
        "popup_closed",
        this.eventHandlers.hideProductModal
      ),
        (this.elements.viewCart =
          this.elements.productModalContent.querySelector(
            Tt.productViewCartLink
          )),
        this.elements.viewCart &&
          this.elements.viewCart.addEventListener(
            "click",
            this.eventHandlers.hideModalShowCart
          );
    }
    _updateSPRReviews() {
      window.SPR &&
        window.SPR.initDomEls &&
        window.SPR.loadProducts &&
        (window.SPR.initDomEls(), window.SPR.loadProducts());
    }
    _getProductModalContent(t) {
      return fetch(t)
        .then((t) => t.text())
        .then((t) => {
          return new DOMParser().parseFromString(t, "text/html");
        })
        .then((t) => {
          return t;
        })
        .catch((t) => {
          throw new Error(t);
        });
    }
    _setupProductModalContent(t) {
      (this.elements.productModalContent.innerHTML = ""),
        this.elements.productModalContent.scrollTo(0, 0);
      const e = t.querySelector(Tt.productRecommendationsContainer),
        n = this._getProductSection(t);
      this.elements.productModal.classList.toggle(
        It.productModalNoMedia,
        !this._productHasMedia(t)
      ),
        this.elements.productModalContent.appendChild(n),
        e &&
          this._getProductRecommendations(e)
            .then((t) => {
              this.elements.productModalContent.appendChild(t),
                this.productRecommendations.resetSafariImages(),
                (this.productPopup =
                  this.productPopup ||
                  window.popups.find((t) => "product-modal" === t.name)),
                this.productPopup.resetContainerFocus();
            })
            .catch((t) => {
              throw new Error(t);
            }),
        this.elements.productModalContent
          .querySelectorAll(Tt.productImage)
          .forEach((t) => (t.outerHTML = t.outerHTML)),
        this._showProductModal(n),
        this._updateSPRReviews(),
        this._setupEventHandlers();
    }
    _getProductSection(t) {
      return t.querySelector(Tt.productTemplate);
    }
    _getProductRecommendations(t) {
      return (
        (this.productRecommendations = new Ht(t)),
        this.productRecommendations.init(),
        this.productRecommendations.setupAndGetHTML()
      );
    }
    _productHasMedia(t) {
      return t.querySelectorAll(Tt.productImage).length;
    }
    _showProductModal(t) {
      (this.product = new _t(t)),
        (this.productPopup =
          this.productPopup ||
          window.popups.find((t) => "product-modal" === t.name)),
        window.Shopify && Shopify.PaymentButton && Shopify.PaymentButton.init(),
        this.productPopup.elements.stage.classList.contains(It.isOpen) ||
          this.productPopup.openPopup({
            currentTarget: this.elements.productContainer,
          });
    }
    _hideModalShowCart(t) {
      t.preventDefault(),
        (this.cartPopup =
          this.cartPopup || window.popups.find((t) => "cart" === t.name)),
        this.productPopup.closePopup(),
        this.cartPopup.openPopup({
          currentTarget: this.productPopup.elements.triggerNode,
        }),
        this._hideProductModal(),
        this.elements.viewCart &&
          this.elements.viewCart.removeEventListener(
            "click",
            this.eventHandlers.hideModalShowCart
          );
    }
    _hideProductModal() {
      (this.elements.productModalContent.innerHTML = ""),
        this.elements.productModalContent.classList.remove(
          It.productModalContentNoMedia
        ),
        this.product.destroy(),
        this.elements.productContainer.removeEventListener(
          "popup_closed",
          this.eventHandlers.hideProductModal
        );
    }
  }
  const At = {
      productCardLink: "[data-product-card-link]",
      productForm: "[data-product-form]",
      productOption: "[data-product-option]",
      showOptionsButton: "[data-show-options-button]",
    },
    Mt = {
      hidden: "hidden",
      productCardFormExpanded: "product-card--form-expanded",
    };
  class qt {
    constructor(t, e, n) {
      (this.elements = {
        productCard: t,
        productModalContent: e,
      }),
        (this.collectionTitle = n);
    }
    init() {
      Object.assign(this.elements, this._getElements()),
        this._setupEventHandlers(),
        (this.productModal = new kt(
          this.elements.productCard,
          this.elements.productModalContent,
          this.collectionTitle
        )),
        this.productModal.init(),
        this.elements.productForm &&
          ((this.productForm = new St(this.elements.productCard)),
          this.productForm.init());
    }
    _getElements() {
      return {
        productCardLinks: this.elements.productCard.querySelectorAll(
          At.productCardLink
        ),
        productForm: this.elements.productCard.querySelector(At.productForm),
        showOptionsButton: this.elements.productCard.querySelector(
          At.showOptionsButton
        ),
      };
    }
    _getEventHandlers() {
      return {
        onProductLinkClick: this._onProductLinkClick.bind(this),
      };
    }
    _setupEventHandlers() {
      (this.eventHandlers = this._getEventHandlers()),
        this.elements.showOptionsButton &&
          (this.elements.showOptionsButton.addEventListener("click", () => {
            this._toggleShowOptions(!0);
          }),
          this.elements.productCard.addEventListener("mouseleave", (t) => {
            t.relatedTarget && this._toggleShowOptions(!1);
          }),
          this.elements.productCard.addEventListener("focusout", (t) => {
            t.relatedTarget &&
              !this.elements.productCard.contains(t.relatedTarget) &&
              this._toggleShowOptions(!1);
          })),
        this.elements.productCardLinks &&
          this.elements.productModalContent &&
          this.elements.productCardLinks.forEach((t) =>
            t.addEventListener("click", this.eventHandlers.onProductLinkClick)
          );
    }
    _toggleShowOptions(t) {
      if (
        (this.elements.productCard.classList.toggle(
          Mt.productCardFormExpanded,
          t
        ),
        this.elements.showOptionsButton.classList.toggle(Mt.hidden, t),
        t)
      ) {
        const t = this.elements.productForm.querySelector(At.productOption);
        t && t.focus();
      }
    }
    _onProductLinkClick(t) {
      t.preventDefault();
      const e =
        t.currentTarget.href || t.currentTarget.dataset.productCardLinkUrl;
      this.productModal.setupProductModal(e);
    }
  }
  const Pt = {
    productCard: "[data-product-card]",
    productCardImage: "[data-product-card-image]",
    productModalContent: "[data-product-modal-content]",
    productRecommendations: "[data-product-recommendations]",
  };
  class Ht {
    constructor(t, e = !1) {
      (this.elements = {
        container: t,
      }),
        (this.setupRecommendationsOnInit = e),
        (this.recommendationsLoaded = !1),
        (this.isProductModalEnabled = Boolean(
          this.elements.container.dataset.productModal
        )),
        (this.isQuickAddEnabled = Boolean(
          this.elements.container.dataset.quickAdd
        ));
    }
    init() {
      Object.assign(this.elements, this._getElements()),
        this.setupRecommendationsOnInit && this._setupProductRecommendations();
    }
    setupAndGetHTML() {
      return new Promise((t, e) => {
        this._getProductRecommendationsHTML()
          .then((n) => {
            if (
              (this._showProductRecommendations(n, !1),
              this.recommendationsLoaded)
            )
              t(this.elements.container);
            else {
              const t = "Product recommendations are not available";
              e(t);
            }
          })
          .catch((t) => {
            throw new Error(t);
          });
      });
    }
    resetSafariImages() {
      this.elements.container
        .querySelectorAll(Pt.productCardImage)
        .forEach((t) => (t.outerHTML = t.outerHTML));
    }
    _getProductRecommendationsHTML() {
      const t = this.elements.container.dataset.baseUrl,
        e = this.elements.container.dataset.productId,
        n = `${t}?section_id=product-recommendations&product_id=${e}&limit=4`;
      return fetch(n)
        .then((t) => t.text())
        .then((t) => {
          return new DOMParser().parseFromString(t, "text/html");
        })
        .catch((t) => {
          throw new Error(t);
        });
    }
    _showProductRecommendations(t, e = !0) {
      const n = t.querySelector(Pt.productRecommendations);
      n &&
        (this.elements.container.appendChild(n),
        this._setupProductCards(),
        e && this.resetSafariImages(),
        (this.recommendationsLoaded = !0));
    }
    _getElements() {
      return {
        productModalContent: document.querySelector(Pt.productModalContent),
      };
    }
    _setupProductRecommendations() {
      this._getProductRecommendationsHTML().then((t) => {
        this._showProductRecommendations(t);
      });
    }
    _setupProductCards() {
      if (
        (theme.cartQuantity.updateQuantityIndicatorElements(
          !1,
          this.elements.container
        ),
        this.isProductModalEnabled || this.isQuickAddEnabled)
      ) {
        this.elements.container
          .querySelectorAll(Pt.productCard)
          .forEach((t) => {
            new qt(t, this.elements.productModalContent, "").init();
          });
      }
    }
  }
  t.register("product-recommendations", {
    onLoad() {
      (this.productRecommendations = new Ht(this.container, !0)),
        this.productRecommendations.init();
    },
  });
  const xt = {
      stickyElement: "[data-sticky-element]",
      stickySentinelTop: "[data-sticky-sentinel-top]",
      stickySentinelBottom: "[data-sticky-sentinel-bottom]",
    },
    Nt = {
      stickyContainer: "sticky__container",
      stickySentinel: "sticky__sentinel",
      stickySentinelTop: "sticky__sentinel--top",
      stickySentinelBottom: "sticky__sentinel--bottom",
      stickyElement: "sticky__element",
    };
  class Ot {
    constructor(t) {
      this.container = t;
    }
    init() {
      a() &&
        ((this.stickyElement = this.container.querySelector(xt.stickyElement)),
        this.stickyElement &&
          ((this.sticky = !1),
          this._addSentinels(),
          this._observeTopSentinel(),
          this._observeBottomSentinel()));
    }
    destroy() {
      this.topObserver && this.topObserver.disconnect(),
        this.bottomObserver && this.bottomObserver.disconnect();
    }
    isSticky() {
      return this.sticky;
    }
    _fireEvent() {
      document.dispatchEvent(
        new window.CustomEvent("elementSticky", {
          detail: {
            stickyElement: this.stickyElement,
            isSticky: this.sticky,
            container: this.container,
          },
        })
      );
    }
    _addSentinels() {
      const t = document.createElement("div");
      t.classList.add(Nt.stickySentinel, Nt.stickySentinelTop),
        (t.dataset.stickySentinelTop = ""),
        this.container.classList.add(Nt.stickyContainer),
        this.stickyElement.insertAdjacentElement("beforebegin", t);
      const e = document.createElement("div");
      e.classList.add(Nt.stickySentinel, Nt.stickySentinelBottom),
        (e.dataset.stickySentinelBottom = ""),
        this.stickyElement.parentElement.appendChild(e);
    }
    _observeTopSentinel() {
      const t = this.container.querySelector(xt.stickySentinelTop);
      t &&
        ((this.topObserver = new IntersectionObserver((t) => {
          t.forEach((t) => {
            const e = t.boundingClientRect,
              n = t.rootBounds,
              i = e.bottom < n.top,
              s = e.bottom >= n.top && e.bottom < n.bottom;
            i &&
              ((this.sticky = !0),
              this.stickyElement.classList.add(Nt.stickyElement),
              this._fireEvent()),
              s &&
                ((this.sticky = !1),
                this.stickyElement.classList.remove(Nt.stickyElement),
                this._fireEvent());
          });
        })),
        this.topObserver.observe(t));
    }
    _observeBottomSentinel() {
      const t = this.container.querySelector(xt.stickySentinelBottom);
      if (t) {
        let e = 0;
        (this.bottomObserver = new IntersectionObserver((t) => {
          t.forEach((t) => {
            const n = t.boundingClientRect,
              i = t.rootBounds,
              s = t.intersectionRatio,
              r = e > t.boundingClientRect.y;
            e = t.boundingClientRect.y;
            const o = n.bottom > i.top && 1 === s,
              a = n.top < i.top && n.bottom < i.bottom;
            !r &&
              o &&
              ((this.sticky = !0),
              this.stickyElement.classList.add(Nt.stickyElement),
              this._fireEvent()),
              a &&
                ((this.sticky = !1),
                this.stickyElement.classList.remove(Nt.stickyElement),
                this._fireEvent());
          });
        })),
          this.bottomObserver.observe(t);
      }
    }
  }
  const Ft = {
      viewMoreButton: "[data-view-more-button]",
      viewMoreItem: "[data-view-more-item]",
      viewMoreStatus: "[data-view-more-status]",
    },
    Dt = {
      hidden: "hidden",
    },
    Bt = {
      success: "viewmore_loaded",
    };
  class Rt {
    constructor(t) {
      this.container = t;
    }
    init() {
      this.container &&
        ((this.viewMoreButton = this.container.querySelector(
          Ft.viewMoreButton
        )),
        this.viewMoreButton &&
          ((this.maxCount = parseInt(
            this.viewMoreButton.dataset.viewMoreMax,
            10
          )),
          (this.countPerPage = parseInt(
            this.viewMoreButton.dataset.viewMoreStep,
            10
          )),
          (this.currentCount = parseInt(
            this.viewMoreButton.dataset.viewMoreCurrent,
            10
          )),
          (this.isLoading = !1),
          this._setupEventHandlers()));
    }
    _getEventHandlers() {
      return {
        onClickViewMoreHandler: this._onClickViewMoreHandler.bind(this),
      };
    }
    _setupEventHandlers() {
      (this.eventHandlers = this._getEventHandlers()),
        this.viewMoreButton.addEventListener(
          "click",
          this.eventHandlers.onClickViewMoreHandler
        );
    }
    _onClickViewMoreHandler() {
      this._loadItems();
    }
    _getNextPage() {
      const t = Math.floor(this.currentCount / this.countPerPage) + 1;
      return this.viewMoreButton.dataset.viewMoreNext.replace(
        "[pagination]",
        t
      );
    }
    _fireEvent(t, e) {
      this.container.dispatchEvent(
        new window.CustomEvent(t, {
          detail: e,
        })
      );
    }
    _loadItems() {
      if (!(this.isLoading || this.currentCount >= this.maxCount)) {
        const t = this._getNextPage();
        (this.isLoading = !0),
          fetch(t)
            .then((t) => t.text())
            .then((t) => {
              return new DOMParser().parseFromString(t, "text/html");
            })
            .then((t) => {
              const e = [...t.querySelectorAll(Ft.viewMoreItem)];
              this.currentCount < this.countPerPage &&
                e.splice(0, this.currentCount),
                (this.isLoading = !1),
                (this.currentCount += e.length),
                this._updateButton(),
                this._updateLiveRegion(),
                this._fireEvent(Bt.success, {
                  items: e,
                });
            })
            .then(() => {
              this._updateSPRBadges();
            })
            .catch((t) => {
              throw ((this.isLoading = !1), new Error(t));
            });
      }
    }
    _updateSPRBadges() {
      window.SPR &&
        window.SPR.initDomEls &&
        window.SPR.loadBadges &&
        (window.SPR.initDomEls(), window.SPR.loadBadges());
    }
    _updateButton() {
      (this.viewMoreButton.dataset.viewMoreCurrent = this.currentCount),
        this.currentCount >= this.maxCount &&
          this.viewMoreButton.classList.add(Dt.hidden);
    }
    _updateLiveRegion() {
      const t = this.container.querySelector(Ft.viewMoreStatus),
        e = t.dataset.viewMoreStatusMessage
          .replace("[item_count]", this.currentCount)
          .replace("[item_max]", this.maxCount);
      (t.innerText = e),
        t.setAttribute("aria-hidden", !1),
        setTimeout(() => {
          t.setAttribute("aria-hidden", !0);
        }, 1e3);
    }
  }
  const Wt = {
      scrollerContent: "[data-scroller-content]",
      featuredCollectionsTabs: "[data-featured-collections-tab]",
      featuredCollectionsSelectedTab:
        "[data-featured-collections-selected-tab]",
      featuredCollectionsTabsPanel: "[data-featured-collections-tab-panel]",
      featuredCollectionsWrapper: "[data-featured-collections-wrapper]",
      productCard: "[data-product-card]",
      productCardLink: "[data-product-card-link]",
      productModalContent: "[data-product-modal-content]",
      viewMoreContent: "[data-view-more-content]",
    },
    Qt = {
      featuredCollectionsPanelActive: "featured-collections__panel--active",
      featuredCollectionsPanelVisible: "featured-collections__panel--visible",
      featuredCollectionsTabActive: "featured-collections-tab__item--active",
    };
  t.register("featured-collections", {
    onLoad() {
      (this.elements = this._getElements()),
        (this.scroller = new st(this.container)),
        this.scroller.init(),
        (this.stickyNav = new Ot(this.container)),
        this.stickyNav.init(),
        (this.isProductModalEnabled = Boolean(
          this.container.dataset.productModal
        )),
        (this.isQuickAddEnabled = Boolean(this.container.dataset.quickAdd)),
        (this.hasSingleCollection = Boolean(
          this.container.dataset.singleCollection
        )),
        this.isProductModalEnabled &&
          (this.elements.productModalContent = document.querySelector(
            Wt.productModalContent
          )),
        this._setupProductCards(),
        this._setupEventHandlers(),
        theme.cartQuantity &&
          theme.cartQuantity.updateQuantityIndicatorElements(
            !1,
            this.container
          );
    },
    onUnload() {
      this.elements.tabs &&
        (this.stickyNav.destroy(),
        this.scroller.destroy(),
        this.elements.tabs.forEach((t) => {
          t.removeEventListener("click", this.eventHandlers.onClickTabHandler),
            t.removeEventListener(
              "keydown",
              this.eventHandlers.onKeyDownTabHandler
            );
        }));
    },
    onBlockSelect(t) {
      if (!this.hasSingleCollection) {
        const e = this.container.querySelector(
          `[data-featured-collections-block-id="${t}"]`
        );
        if (e) {
          const t = e.dataset.featuredCollectionsTabNumber;
          this.showCollectionPanel(t);
        }
      }
    },
    _getElements() {
      return {
        tabs: this.container.querySelectorAll(Wt.featuredCollectionsTabs),
        tabsPanel: this.container.querySelectorAll(
          Wt.featuredCollectionsTabsPanel
        ),
        tabsPanelWrapper: this.container.querySelector(
          Wt.featuredCollectionsWrapper
        ),
      };
    },
    _getEventHandlers() {
      return {
        onClickTabHandler: this.onClickTabHandler.bind(this),
        onKeyDownTabHandler: this.onKeyDownTabHandler.bind(this),
        onKeyUpTabHandler: this.onKeyUpTabHandler.bind(this),
        onViewMoreLoaded: this.onViewMoreLoaded.bind(this),
      };
    },
    _setupEventHandlers() {
      (this.eventHandlers = this._getEventHandlers()),
        this.elements.tabsPanel.forEach((t) => {
          if (t.dataset.viewMore) {
            new Rt(t).init(),
              t.addEventListener(
                "viewmore_loaded",
                this.eventHandlers.onViewMoreLoaded
              );
          }
        }),
        this.elements.tabs &&
          !this.hasSingleCollection &&
          this.elements.tabs.forEach((t) => {
            t.addEventListener("click", this.eventHandlers.onClickTabHandler),
              t.addEventListener(
                "keydown",
                this.eventHandlers.onKeyDownTabHandler
              ),
              t.addEventListener("keyup", this.eventHandlers.onKeyUpTabHandler);
          });
    },
    _setupProductCards() {
      (this.isProductModalEnabled || this.isQuickAddEnabled) &&
        this.elements.tabsPanel.forEach((t) => {
          const e = t.querySelectorAll(Wt.productCard),
            n = t.dataset.collectionTitle;
          e.forEach((t) => {
            new qt(t, this.elements.productModalContent, n).init();
          });
        });
    },
    onViewMoreLoaded(t) {
      const e = t.detail.items,
        n = t.target,
        i = n.dataset.collectionTitle,
        s = n.querySelector(Wt.viewMoreContent),
        r = [];
      e.forEach((t, e) => {
        const n = t.querySelector(Wt.productCard);
        r.push(n.dataset.productId);
        const o = s.appendChild(t),
          a = o.querySelector(Wt.productCardLink);
        if (
          (a && 0 === e && a.focus(),
          this.isProductModalEnabled || this.isQuickAddEnabled)
        ) {
          new qt(n, this.elements.productModalContent, i).init();
        }
      }),
        theme.cartQuantity.updateQuantityIndicatorElements(
          r,
          this.viewMoreContent,
          !0
        );
    },
    onKeyDownTabHandler(t) {
      [D.HOME, D.END, D.RIGHT, D.LEFT].includes(t.key.toLowerCase()) &&
        t.preventDefault();
    },
    onKeyUpTabHandler(t) {
      const e = t.currentTarget,
        n = this.elements.tabs.length - 1,
        i = Number(e.dataset.featuredCollectionsTabNumber);
      let s = -1;
      switch (t.key.toLowerCase()) {
        case D.HOME:
          s = 0;
          break;
        case D.END:
          s = n;
          break;
        case D.RIGHT:
          s = i === n ? 0 : i + 1;
          break;
        case D.LEFT:
          s = 0 === i ? n : i - 1;
      }
      s !== -1 && i !== s && (t.preventDefault(), this.showCollectionPanel(s));
    },
    onClickTabHandler(t) {
      const e = t.currentTarget.dataset.featuredCollectionsTabNumber;
      this.showCollectionPanel(e);
    },
    showCollectionPanel(t) {
      const e = this.elements.tabs[t],
        n =
          this.elements.tabsPanelWrapper.getBoundingClientRect().top +
          window.pageYOffset -
          105;
      this.stickyNav.isSticky() &&
        (document.dispatchEvent(
          new CustomEvent("featuredCollectionTabClicked")
        ),
        window.scrollTo({
          top: n,
        })),
        this.elements.tabs.forEach((t) => {
          t.classList.remove(Qt.featuredCollectionsTabActive),
            t.setAttribute("aria-selected", !1),
            t.setAttribute("tabindex", -1),
            delete t.dataset.featuredCollectionsSelectedTab,
            t.blur();
        }),
        e.classList.add(Qt.featuredCollectionsTabActive),
        e.setAttribute("aria-selected", !0),
        e.setAttribute("tabindex", 0),
        (e.dataset.featuredCollectionsSelectedTab = !0),
        e.focus(),
        this.scroller.makeElementVisible(e);
      const i = this.elements.tabsPanel[t];
      i &&
        (this.elements.tabsPanel.forEach((t) => {
          t.classList.remove(Qt.featuredCollectionsPanelVisible),
            t.classList.remove(Qt.featuredCollectionsPanelActive);
        }),
        i.classList.add(Qt.featuredCollectionsPanelActive),
        window.requestAnimationFrame(() =>
          i.classList.add(Qt.featuredCollectionsPanelVisible)
        ));
    },
  });
  const Ut = {
    productCard: "[data-product-card]",
    productModalContent: "[data-product-modal-content]",
    dataSlide: "[data-slide]",
  };
  t.register("custom-content", {
    onLoad() {
      this.elements = this._getElements();
      const t = this.container.querySelectorAll(Ut.productCard);
      this.container.dataset.slider && this._prepareGallery(),
        (this.isProductModalEnabled = Boolean(
          this.container.dataset.productModal
        )),
        this.isProductModalEnabled && t.length > 0 && this._setupProductCards();
    },
    onUnload() {
      Boolean(this.gallery) && this.gallery.destroy();
    },
    _getElements() {
      return {
        productModalContent: document.querySelector(Ut.productModalContent),
      };
    },
    _setupProductCards() {
      this.container.querySelectorAll(Ut.productCard).forEach((t) => {
        new qt(t, this.elements.productModalContent).init();
      });
    },
    _prepareGallery() {
      (this.galleryElement = this.container.querySelector(Ut.dataSlide)),
        this.galleryElement &&
          (this._addGalleryMediaQueryListener(),
          this.galleryMediaQueryListener.matches &&
            (this._initializeGallery(), this.gallery.addAccessibilityAttr()));
    },
    _disableGalleryMode() {
      this.gallery.removeAccessibilityAttr(),
        this.gallery.resetTransformation(),
        (this.gallery.state.useAriaHidden = !1),
        this.gallery.destroy();
    },
    _switchToGalleryMode() {
      const t = this._initializeGallery();
      (this.gallery.state.useAriaHidden = !0),
        this.gallery.hideMedia(),
        this.gallery.addAccessibilityAttr(),
        t || this.gallery.bindEvents();
    },
    _addGalleryMediaQueryListener() {
      (this.galleryMediaQueryListener = window.matchMedia(c("medium", "max"))),
        this.galleryMediaQueryListener.addListener((t) => {
          if (t.matches) return void this._switchToGalleryMode();
          this._disableGalleryMode();
        });
    },
    _initializeGallery() {
      return this.gallery
        ? (this.gallery.applyTransformation(),
          window.setTimeout(() => this.gallery.enableTransition()),
          !1)
        : ((this.gallery = new ft(this.galleryElement)),
          this.gallery.init(),
          !0);
    },
  });
  const jt = {
    blogTagFilter: "[data-blog-tag-filter]",
  };
  (() => {
    const t = document.querySelector(jt.blogTagFilter);
    t &&
      (o(t),
      t.addEventListener("change", (t) => {
        location.href = t.target.value;
      }));
  })();
  const Vt = {
      passwordButton: "[data-password-button]",
      passwordInput: "[data-password-input]",
    },
    Kt = {
      error: "data-error",
      templatePassword: "data-template-password",
    };
  (() => {
    function t() {
      window.popups
        .find((t) => "password-modal" === t.name)
        .openPopup({
          currentTarget: document.querySelector(Vt.passwordButton),
        });
    }
    document.body.hasAttribute(Kt.templatePassword) &&
      document.querySelector(Vt.passwordInput).hasAttribute(Kt.error) &&
      window.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          t();
        }, 50);
      });
  })();
  const Gt = {
      addNewAddressToggle: "[data-add-new-address-toggle]",
      addressCountrySelect: "[data-address-country-select]",
      addressFormNew: "[data-address-form-new]",
      cancelEditAddressToggle: "[data-cancel-edit-address-toggle]",
      cancelNewAddressToggle: "[data-cancel-new-address-toggle]",
      customerAddresses: "[data-customer-addresses]",
      deleteAddressButton: "[data-delete-address-button]",
      editAddressToggle: "[data-edit-address-toggle]",
      editAddressId: (t) => `[data-edit-address-id="${t}"]`,
      form: "[data-form]",
    },
    zt = {
      addNewAddressToggle: "data-add-new-address-toggle",
    },
    Jt = {
      hidden: "hidden",
    };
  (() => {
    function t(t, e, n) {
      const i = t.currentTarget;
      "false" === e.getAttribute("aria-expanded")
        ? (n.classList.remove(Jt.hidden), e.setAttribute("aria-expanded", !0))
        : (n.classList.add(Jt.hidden), e.setAttribute("aria-expanded", !1)),
        i.hasAttribute(zt.addNewAddressToggle) || e.focus();
    }
    function e(t, e) {
      const n = t.currentTarget,
        s = n.dataset.addressId,
        r = i.querySelector(Gt.editAddressId(s)),
        o = Array.from(e).find((t) => t.dataset.addressId === s);
      "false" === o.getAttribute("aria-expanded")
        ? (r.classList.remove(Jt.hidden), o.setAttribute("aria-expanded", !0))
        : (r.classList.add(Jt.hidden), o.setAttribute("aria-expanded", !1)),
        n.hasAttribute(zt.editAddressFormToggle) || o.focus();
    }
    function n(t) {
      const e = t.currentTarget,
        n = e.dataset.target,
        i =
          e.dataset.confirmMessage ||
          "Are you sure you wish to delete this address?";
      confirm(i) &&
        Shopify.postLink(n, {
          parameters: {
            _method: "delete",
          },
        });
    }
    const i = document.querySelector(Gt.customerAddresses);
    if (i) {
      const s = i.querySelector(Gt.addressFormNew);
      s &&
        ((function () {
          Shopify &&
            new Shopify.CountryProvinceSelector(
              "AddressCountryNew",
              "AddressProvinceNew",
              {
                hideElement: "AddressProvinceContainerNew",
              }
            ),
            i.querySelectorAll(Gt.addressCountrySelect).forEach((t) => {
              const e = t.dataset.formId,
                n = `AddressCountry_${e}`,
                i = `AddressProvince_${e}`,
                s = `AddressProvinceContainer_${e}`;
              new Shopify.CountryProvinceSelector(n, i, {
                hideElement: s,
              });
            });
        })(),
        (function () {
          const r = i.querySelector(Gt.addNewAddressToggle),
            o = i.querySelector(Gt.cancelNewAddressToggle),
            a = i.querySelectorAll(Gt.editAddressToggle),
            c = i.querySelectorAll(Gt.cancelEditAddressToggle),
            d = i.querySelectorAll(Gt.deleteAddressButton);
          r.addEventListener("click", (e) => t(e, r, s)),
            o.addEventListener("click", (e) => t(e, r, s)),
            a.forEach((t) => t.addEventListener("click", (t) => e(t, a))),
            c.forEach((t) =>
              t.addEventListener("click", () => {
                e(event, a);
              })
            ),
            d.forEach((t) => t.addEventListener("click", n));
        })());
    }
  })();
  const Yt = {
      cancelResetPasswordLink: "[data-cancel-reset-password-link]",
      customerLogin: "[data-customer-login]",
      loginContainer: "[data-login-container]",
      loginHeading: "[data-login-heading]",
      resetPasswordHeading: "[data-reset-password-heading]",
      resetPasswordLink: "[data-reset-password-link]",
      resetPasswordContainer: "[data-reset-password-container]",
      resetPasswordSuccess: "[data-reset-password-success]",
      resetPasswordSuccessMessage: "[data-reset-password-success-message]",
    },
    Xt = {
      hidden: "hidden",
    };
  (() => {
    function t(t, n) {
      const i = e.querySelector(Yt.loginContainer),
        s = e.querySelector(Yt.resetPasswordContainer);
      n
        ? (i.classList.add(Xt.hidden), s.classList.remove(Xt.hidden))
        : (i.classList.remove(Xt.hidden), s.classList.add(Xt.hidden)),
        t.setAttribute("tabindex", "-1"),
        t.focus(),
        t.addEventListener("blur", () => {
          t.removeAttribute("tabindex");
        });
    }
    const e = document.querySelector(Yt.customerLogin);
    e &&
      ((function () {
        if ("#recover" === window.location.hash) {
          const n = e.querySelector(Yt.resetPasswordHeading);
          t(n, !0);
        }
      })(),
      (function () {
        const t = e.querySelector(Yt.resetPasswordSuccess),
          n = e.querySelector(Yt.resetPasswordSuccessMessage);
        t && (n.classList.remove(Xt.hidden), n.focus());
      })(),
      (function () {
        const n = e.querySelector(Yt.resetPasswordLink),
          i = e.querySelector(Yt.cancelResetPasswordLink);
        n.addEventListener("click", (n) => {
          n.preventDefault(), t(e.querySelector(Yt.resetPasswordHeading), !0);
        }),
          i.addEventListener("click", (n) => {
            n.preventDefault(), t(e.querySelector(Yt.loginHeading), !1);
          });
      })());
  })(),
    window.addEventListener("DOMContentLoaded", () => {
      new $(),
        t.load("*"),
        (window.carts = Array.from(
          document.querySelectorAll("[data-cart]"),
          (t) => {
            const e = new K(t);
            return e.init(), e;
          }
        )),
        (window.popups = Array.from(
          document.querySelectorAll("[data-popup]"),
          (t) => {
            const e = new W(t.dataset.popup);
            return e.init(), e;
          }
        )),
        e.accessibleLinks("a[href]:not([aria-describedby]", {
          messages: {
            newWindow: theme.strings.newWindow,
            external: theme.strings.external,
            newWindowExternal: theme.strings.newWindowExternal,
          },
        }),
        (theme.cartQuantity = new J()),
        theme.cartQuantity.updateLocalCartState();
      const n = document.querySelector("[data-cart-template]");
      if (n) {
        const t = new tt(n);
        t.init();
      }
    });
})(Shopify.theme.sections, Shopify.theme.a11y);

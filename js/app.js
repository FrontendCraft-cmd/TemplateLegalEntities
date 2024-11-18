$(document).ready(function () {
  const heightDevice = $(window).height();
  let top = $(window).scrollTop();

  // Fixed header
  function fixedHeader(top) {
    if (top > heightDevice) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  }
  fixedHeader(top);

  // Scrolling
  $(".header-menu__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - headerHeight },
      500,
      function () {}
    );
    e.preventDefault();
  });
  $(".footer-menu__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - headerHeight },
      500,
      function () {}
    );
    e.preventDefault();
  });

  $(".header-menu-mobile__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $("body").removeClass("lock");
    $(".header__burger").removeClass("active");
    $(".header-menu-mobile").removeClass("active");

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - headerHeight },
      500,
      function () {}
    );
    e.preventDefault();
  });

  //Burger menu
  $(".header__burger").click(function (e) {
    $(this).toggleClass("active");
    $(".header-menu-mobile").toggleClass("active");
    $("body").toggleClass("lock");
    e.preventDefault();
  });
  $(".header-menu-mobile").click(function (e) {
    e.stopPropagation();
  });
  $(document).click(function (e) {
    if (
      !$(e.target).closest(".header, .header-menu-mobile").length &&
      $(".header-menu-mobile").hasClass("active")
    ) {
      $(".header__burger").removeClass("active");
      $(".header-menu-mobile").removeClass("active");
      $("body").removeClass("lock");
    }
  });

  // Shows all cards
  function showsAllCards() {
    $(".more-block").each(function () {
      const thisItem = $(this);
      const itemsShow = +thisItem.data("items");
      const cards = thisItem.find(".more-block-item");
      const blockHeight = thisItem[0].scrollHeight;
      const btnMore = thisItem.next().find("a");
      const btnMoreText = btnMore.text();
      const columns = thisItem.css("grid-template-columns").split(" ").length;

      let heightCards = 0;
      let gap = +thisItem.css("gap").replace("px", "");

      if (cards.length > itemsShow) {
        cards.slice(0, itemsShow).each(function () {
          heightCards += $(this).outerHeight(true);
        });
        if (columns == 1) {
          thisItem.css({
            "max-height": heightCards / columns + gap * (itemsShow - 1),
          });
        } else if (itemsShow <= 2) {
          thisItem.css({
            "max-height": heightCards / columns,
          });
        } else {
          thisItem.css({
            "max-height": heightCards / columns + (itemsShow / 2 - 1) * gap,
          });
        }

        btnMore.off("click").on("click", function (e) {
          const newText = "Свернуть";
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).animate(
              {
                opacity: 0,
              },
              300,
              function () {
                $(this).text(btnMoreText);
                $(this).animate(
                  {
                    opacity: 1,
                  },
                  250
                );
              }
            );
            if (columns == 1) {
              thisItem.css({
                "max-height": heightCards / columns + gap * (itemsShow - 1),
              });
            } else if (itemsShow <= 2) {
              thisItem.css({
                "max-height": heightCards / columns,
              });
            } else {
              thisItem.css({
                "max-height": heightCards / columns + (itemsShow / 2 - 1) * gap,
              });
            }
          } else {
            $(this).addClass("active");
            $(this).animate(
              {
                opacity: 0,
              },
              300,
              function () {
                $(this).text(newText);
                $(this).animate(
                  {
                    opacity: 1,
                  },
                  250
                );
              }
            );
            thisItem.animate({
              "max-height": blockHeight,
            });
          }

          e.preventDefault();
        });
      } else {
        btnMore.hide();
      }
    });
  }
  function showsAllCardsReviews() {
    $(".reviews__row").each(function () {
      const thisItem = $(this);
      const itemsShow = +thisItem.data("items");
      const cards = thisItem.find(".more-block-item");
      const btnMoreRow = thisItem.next().find("a");
      const btnMoreText = btnMoreRow.text();
      const columns = thisItem.css("grid-template-columns").split(" ").length;
      const reviewsItem = $(".reviews__item");

      let heightCards = 0;
      let gap = +thisItem.css("gap").replace("px", "");

      function updateMaxHeight() {
        let newHeightCards = 0;
        cards.slice(0, itemsShow).each(function () {
          newHeightCards += $(this).outerHeight(true);
        });
        if (columns == 1) {
          thisItem.css({
            "max-height": newHeightCards / columns + gap * (itemsShow - 1),
          });
        } else if (itemsShow <= 2) {
          thisItem.css({
            "max-height": newHeightCards / columns,
          });
        } else {
          thisItem.css({
            "max-height": newHeightCards / columns + (itemsShow / 2 - 1) * gap,
          });
        }
      }

      if (reviewsItem.length > 0) {
        reviewsItem.each(function () {
          if (!$(this).hasClass("truncated")) {
            $(this).addClass("truncated");
            const currentReview = $(this).find(".reviews__text");
            const btnMore = $(this).find(".reviews__more");
            const btnMoreText = btnMore.text();
            const fullText = currentReview.text();

            let maxLength = 400;
            let truncatedText = fullText;

            if ($(window).width() <= 640) {
              maxLength = 270;
            }

            if (fullText.length > maxLength) {
              truncatedText = fullText.substring(0, maxLength).trim() + "...";
            } else {
              $(this).find(".reviews__more").hide();
            }

            currentReview.text(truncatedText);

            btnMore.off("click").on("click", function (e) {
              $(this).toggleClass("active");
              if ($(this).hasClass("active")) {
                currentReview.text(fullText);
                btnMore.text("Свернуть");
              } else {
                currentReview.text(truncatedText);
                btnMore.text(btnMoreText);
              }
              if (btnMoreRow.hasClass("active")) {
                thisItem.css({
                  "max-height": thisItem[0].scrollHeight,
                });
              } else {
                updateMaxHeight();
              }
              e.preventDefault();
            });
          }
        });
      }

      if (cards.length > itemsShow) {
        cards.slice(0, itemsShow).each(function () {
          heightCards += $(this).outerHeight(true);
        });
        if (columns == 1) {
          thisItem.css({
            "max-height": heightCards / columns + gap * (itemsShow - 1),
          });
        } else if (itemsShow <= 2) {
          thisItem.css({
            "max-height": heightCards / columns,
          });
        } else {
          thisItem.css({
            "max-height": heightCards / columns + (itemsShow / 2 - 1) * gap,
          });
        }

        btnMoreRow.off("click").on("click", function (e) {
          const newText = "Свернуть";
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).animate(
              {
                opacity: 0,
              },
              300,
              function () {
                $(this).text(btnMoreText);
                $(this).animate(
                  {
                    opacity: 1,
                  },
                  250
                );
              }
            );
            updateMaxHeight();
          } else {
            $(this).addClass("active");
            $(this).animate(
              {
                opacity: 0,
              },
              300,
              function () {
                $(this).text(newText);
                $(this).animate(
                  {
                    opacity: 1,
                  },
                  250
                );
              }
            );
            thisItem.animate({
              "max-height": thisItem[0].scrollHeight,
            });
          }

          e.preventDefault();
        });
      } else {
        btnMore.hide();
      }
    });
  }

  showsAllCards();
  showsAllCardsReviews();

  // Stages-work rows
  const stagesWorkList = $(".stages-work__list");
  const stagesWorkItem = $(".stages-work__item");

  let stagesWorkRows = Math.ceil(stagesWorkItem.length / 2);

  stagesWorkItem.eq(stagesWorkRows - 1).addClass("last");

  stagesWorkList.css({
    "grid-template-rows": `repeat(${stagesWorkRows}, 1fr)`,
  });

  // Input
  $(".form-input input").each(function () {
    const thisItem = $(this);
    thisItem.on("focus", function () {
      thisItem.next().hide();
    });
    thisItem.on("blur", function () {
      if (thisItem.val().trim()) {
        thisItem.next().hide();
      } else {
        thisItem.next().show();
      }
    });
  });

  // Spoiler
  $(".faq__header").click(function (event) {
    if ($(".faq").hasClass("one")) {
      $(".faq__header").not($(this)).removeClass("active");
      $(".faq__body").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });

  // Sliders
  $(".partners").slick({
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          variableWidth: true,
        },
      },
    ],
  });

  $(".certificates").slick({
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { variableWidth: true },
      },
    ],
  });

  // Btn-up
  $(".btn-up a").click(function (e) {
    $("html, body").animate({ scrollTop: 0 }, 800);
    e.preventDefault();
  });

  // Modal
  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
  });

  // Map
  ymaps.ready(function () {
    if ($("#map").length > 0) {
      const map = new ymaps.Map("map", {
        center: [45.049940437101334, 38.963571822090046],
        zoom: 18,
      });
      map.behaviors.disable("scrollZoom");
      const myPlacemark = new ymaps.Placemark(
        [45.049940437101334, 38.963571822090046],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "img/contacts/point.svg",
          icon_imagesize: [28, 36],
          iconImageOffset: [-20, -30],
        }
      );
      map.controls.remove("geolocationControl");
      map.controls.remove("searchControl");
      map.controls.remove("trafficControl");
      map.controls.remove("typeSelector");
      map.controls.remove("rulerControl");

      map.geoObjects.add(myPlacemark);
    }
  });

  $(window).scroll(function () {
    top = $(window).scrollTop();
    fixedHeader(top);
  });

  $(window).resize(function () {
    showsAllCards();
    showsAllCardsReviews();
  });
});

// Сalculator
document.addEventListener("DOMContentLoaded", function () {
  const calculator = Vue.createApp({
    data() {
      return {
        steps: 0,
        currentStep: 1,
        elementList: null,
        result: 0,
        stepValues: {},
      };
    },
    mounted() {
      this.elementList = document.querySelectorAll(".calculator-steps__step");
      this.steps = this.elementList.length;
      this.updateActiveStep();
      this.setupChangeListeners();
    },
    computed: {
      isResultActive() {
        return this.currentStep > 1;
      },
      formattedResult() {
        return this.result.toLocaleString("ru-RU");
      },
    },
    methods: {
      // Текущий шаг
      updateActiveStep() {
        this.elementList.forEach((element, index) => {
          if (index === this.currentStep - 1) {
            element.classList.add("active");
          } else {
            element.classList.remove("active");
          }
        });
      },
      // Следующий шаг
      nextStep() {
        const currentStepInputs = this.elementList[
          this.currentStep - 1
        ].querySelectorAll('input[type="radio"], input[type="checkbox"]');

        let isAnyOptionSelected = false;
        currentStepInputs.forEach((input) => {
          if (input.checked) {
            isAnyOptionSelected = true;
          }
        });

        if (!isAnyOptionSelected) {
          this.elementList[this.currentStep - 1]
            .querySelector(".calculator-steps__options")
            .classList.add("error");
          return;
        }
        this.elementList[this.currentStep - 1]
          .querySelector(".calculator-steps__options")
          .classList.remove("error");

        this.addAnswer();

        if (this.currentStep < this.steps) {
          this.currentStep++;
        } else {
          document
            .querySelector(".calculator__content")
            .classList.add("active");
        }
      },
      // Перенос ответов
      addAnswer() {
        const currentStepInputs = this.elementList[
          this.currentStep - 1
        ].querySelectorAll(
          'input[type="radio"]:checked, input[type="checkbox"]:checked'
        );

        if (currentStepInputs.length > 0) {
          const answersList = document.querySelector(
            ".calculator-result__answers ul"
          );
          currentStepInputs.forEach((input) => {
            const answerText = input.nextElementSibling.textContent.trim();
            const newAnswer = document.createElement("li");
            newAnswer.textContent = answerText;
            answersList.appendChild(newAnswer);
            setTimeout(() => newAnswer.classList.add("show"), 30);
          });
        }
      },
      // Проверка кнопок
      setupChangeListeners() {
        this.elementList.forEach((step, index) => {
          const inputs = step.querySelectorAll(
            'input[type="radio"], input[type="checkbox"]'
          );
          inputs.forEach((input) => {
            input.addEventListener("change", (event) => {
              this.handleInputChange(event, index);
              step
                .querySelector(".calculator-steps__options")
                .classList.remove("error");
            });
          });
        });
      },
      // Сложение результата
      handleInputChange(event, stepIndex) {
        const input = event.target;
        const value = parseFloat(input.value);

        if (input.type === "radio") {
          if (this.stepValues[stepIndex] !== undefined) {
            this.smoothUpdateResult(this.result - this.stepValues[stepIndex]);
          }
          this.stepValues[stepIndex] = value;
          this.smoothUpdateResult(this.result + value);
        } else if (input.type === "checkbox") {
          if (input.checked) {
            this.smoothUpdateResult(this.result + value);
          } else {
            this.smoothUpdateResult(this.result - value);
          }
        }
      },
      smoothUpdateResult(newValue) {
        const difference = newValue - this.result;
        const steps = 10;
        const stepValue = difference / steps;

        let currentStep = 0;
        const update = () => {
          if (currentStep < steps) {
            this.result += stepValue;
            currentStep++;
            setTimeout(update, 10);
          } else {
            this.result = newValue;
          }
        };

        update();
      },
      // Рестарт
      restart() {
        this.currentStep = 1;
        this.result = 0;
        this.stepValues = {};

        this.elementList.forEach((element) => {
          element.classList.remove("active");
        });

        const errorElements = document.querySelectorAll(
          ".calculator-steps__options.error"
        );
        errorElements.forEach((errorElement) => {
          errorElement.classList.remove("error");
        });

        const answersList = document.querySelector(
          ".calculator-result__answers ul"
        );
        answersList.innerHTML = "";
        document
          .querySelector(".calculator__content")
          .classList.remove("active");

        const calculatorInputs = document.querySelectorAll(
          '.calculator input[type="radio"], .calculator input[type="checkbox"]'
        );
        calculatorInputs.forEach((input) => {
          input.checked = false;
        });
      },
    },
    watch: {
      currentStep() {
        this.updateActiveStep();
      },
    },
  });

  calculator.mount("#calculator-vue");
});

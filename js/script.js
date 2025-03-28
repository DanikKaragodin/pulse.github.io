// alert(1);
$(function () {
  $(".carousel__inner").slick({
    //dots: true,
    // arrows: false,
    speed: 1000,
    adaptiveHeight: true,
    // mobileFirst: true,
    prevArrow:
      '<button type="button" class="slick-prev" aria-label="Left arrow"><img src="icons/left.svg" alt="leftArrow"></button>',
    nextArrow:
      '<button type="button" class="slick-next" aria-label="Right arrow"><img src="icons/right.svg" alt="rightArrow"></button>',
    // responsive: [
    //     {
    //         breakpoint: 768,
    //         settings: {
    //           dots: true,
    //           arrows: false,
    //         }
    //     },
    // ]
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(linkClass) {
    $(linkClass).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".content-item__preview")
          .eq(i)
          .toggleClass("content-item__preview_active");
        $(".content-item__detail")
          .eq(i)
          .toggleClass("content-item__detail_active");
      });
    });
  }
  toggleSlide(".content-item__link");
  toggleSlide(".content-item__link_back");

  //modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut();
  });
  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".content-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn();
    });
  });
  function validateForm(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Поле имя обязательно",
        phone: "Поле телефон обязательно",
        email: {
          required: "Поле почта обязательно",
          email: "Ваша почта должна быть в формате: name@domain.com",
        },
      },
    });
  }
  validateForm("#consultation-form");
  validateForm("#consultation form");
  validateForm("#order form");

  //mask

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  //email
  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) return;
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").value = "";
      $(".modal").fadeOut();
      $(".overlay, #thanks").fadeIn();
      $("form").trigger("reset");
    });
    return false;
  });

  //smooth scroll

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
  var wow = new WOW();
  wow.init();
});

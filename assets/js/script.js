$(document).ready(function() {
  var home = window.location.protocol + "//" + window.location.host + "/";
  var hash = window.location.hash;

  var sizes = {
    xs: "480",
    sm: "768",
    md: "992",
    lg: "1200"
  };
  if (hash == "") {
  } else {
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - $(".header-wrap").outerHeight()
      },
      2000
    );
  }
  AOS.init({
    offset: 50,
    duration: 500,
    easing: "ease-in-sine",
    delay: 100,
    disable: "moble",
    once: true,
    startEvent: "load"
  });
  fix_header();
  /*main menu effects*/
  var triggerBttn = document.getElementById("trigger-overlay"),
    overlay = document.querySelector("div.overlay"),
    // closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd",
      transition: "transitionend"
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed("transition")],
    support = { transitions: Modernizr.csstransitions };

  function toggleOverlay() {
    console.log("hiddddfasdfsdfdsaf");
    if (classie.has(overlay, "open")) {
      $("body").removeClass("noscroll");
      $(".header-wrap").css({ "z-index": "4" });
      classie.remove(overlay, "open");
      classie.add(overlay, "close");
      classie.remove(triggerBttn, "is-opened-navi");
      var onEndTransitionFn = function(ev) {
        if (support.transitions) {
          if (ev.propertyName !== "visibility") return;
          this.removeEventListener(transEndEventName, onEndTransitionFn);
        }
        classie.remove(overlay, "close");
      };
      if (support.transitions) {
        overlay.addEventListener(transEndEventName, onEndTransitionFn);
      } else {
        onEndTransitionFn();
      }
    } else if (!classie.has(overlay, "close")) {
      $(".header-wrap").css({ "z-index": "1000" });
      classie.add(overlay, "open");
      $("body").addClass("noscroll");
      classie.add(triggerBttn, "is-opened-navi");
    }
  }

  triggerBttn.addEventListener("click", toggleOverlay);
  //single-post blog
  if ($(".single-post .news-box img").length) {
    $(".single-post .news-box img").addClass("img-fluid");
  }
  // closeBttn.addEventListener( 'click', toggleOverlay );
  /*main menu effects - end*/
  ////////sub menu close///////
  $(".sub-menu").on("click", "*", function() {
    toggleOverlay();
    var href = $(this).attr("href");
    var arr = href.split("#");
    var id = "#" + arr[1];
    $("html, body").animate(
      {
        scrollTop: $(id).offset().top
      },
      1000
    );
  });
  //main carousel
  if ($("#myCarousel").length) {
    $("#myCarousel").carousel({
      pause: "hover",
      interval: 20000,
      cycle: true
    });
  }
  //Banner Height
  //    $('#bannersection').css('height', '100vh');
  //Menu Bar

  // Side Nav Bar
  $(".sidenav").on("click", function(e) {
    var sideBtn = $(this);
    // console.log(sideBtn);
    var sideNav = $(this).find(".mySidenav");
    var sideNavBox = $(this).find(".sidenavbox");
    var sideNavWidth = "380px";
    // if not opened yet
    if (sideBtn.hasClass("dd-open") == false) {
      sideBtn.removeClass("dd-close");
      sideBtn.addClass("dd-open");
      if (sideBtn.hasClass("right")) {
        sideBtn.css("margin-right", sideNavWidth);
        sideNav.css("width", sideNavWidth);
        //sidenavbox.css('width','1000px');
        //$('#sidenavright .sidenavbox').fadeIn('slow');
      } else {
        sideBtn.css("margin-left", sideNavWidth);
        sideNav.css("width", sideNavWidth);
        //sidenavbox.css('width','1000px');
        $(".sidenav.right").css("z-index", "0");
        //$('#sidenav .sidenavbox').fadeIn('slow');
      }
      if ($(window).width() >= sizes.md) {
        sideNavBox.fadeIn("slow");
      }
    } else {
      sideBtn.removeClass("dd-open");
      sideBtn.addClass("dd-close");
      if (sideBtn.hasClass("right")) {
        sideBtn.css("margin-right", "0");
        sideNav.css("width", "0");
        //sidenavbox.css('width', '0');
        $("#sidenavright .sidenavbox").fadeOut("slow");
      } else {
        sideBtn.css("margin-left", "0");
        sideNav.css("width", "0");
        //sidenavbox.css('width', '0');
        $(".sidenav.right").css("z-index", "5");
        $("#sidenav .sidenavbox").fadeOut("slow");
      }
    }
  });

  // Side Nav Menu Click
  $(".sidenav a.service").on("mouseover", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this)
      .siblings()
      .removeClass("active");
    $sideNavBox = $(this)
      .parent()
      .parent()
      .next(".sidenavbox")
      .find(".wrapper");
    $sideNavBox.hide();
    $(this).addClass("active");

    $currentService = $(this);

    var activeBlock = $currentService.data("slug");
    $(activeBlock).fadeIn();
  });
  ////type it ////
  new TypeIt("#type", {
    speed: 100,
    autoStart: false
  })
    .type("Design")
    .pause(1000)
    .delete()
    .type("Development")
    .pause(1000)
    .delete()
    .type("Digital Marketing")
    .pause(1000)
    .delete()
    .break()
    .options({ speed: 30 })
    .type("Design, Development & Digital Marketing");

  var $container = $(".webdesignContainer");
  if ($container.length > 0) {
    $container.imagesLoaded().progress(function() {
      $container.isotope({
        masonry: {
          columnWidth: ".col-xl-3"
        }
      });
    });
  }

  //========================
  // Loader
  //========================
  //     $(window).load(function () {
  //         if ($(".loaderWrap").length > 0)
  //         {
  //             $(".loaderWrap").delay(100).fadeOut("slow");
  //             // $("#logo").delay(1000).fadeIn("fast");
  //             $("#logo").delay(300).fadeIn("fast", function () {
  //                 $("#circle").delay(200).fadeIn("fast", function () {
  //                     $("#title, #intro").delay(200).fadeIn("slow", function () {
  //                     });
  //                 });
  //             });
  //         }
  //     });
  // our work filter select changes
  //    $('#dd_category').on('change', function () {
  //        $(this).parents('form').submit();
  //    });
  $("#dd_industry").on("change", function() {
    window.location = $("#dd_industry").val();
  });
  $("#dd_selected_category").on("change", function() {
    window.location = $("#dd_selected_category").val();
  });
  $("#dd_tax_industry").on("change", function() {
    if ($("#dd_tax_industry").val() == "all") {
      window.location =
        window.location.protocol + "//" + window.location.host + "/our-work";
    } else {
      window.location =
        window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        $("#dd_tax_industry").val();
    }
  });
  ///////////// pagination li //////////////
  $("ul.pagination a").wrap("<li></li>");
  $("ul.pagination span").wrap("<li></li>");

  //////////down arrow click///////////////////
  $("#Aboutus").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#Aboutusdd").offset().top - $(".header-wrap").height()
      },
      1000
    );
  });

  $(".screen-frame,.screen-frame > .active").mouseover(function() {
    var screenshoot =
      $(this)
        .find("#screenshot")
        .height() - $(this).height();
    $(this)
      .find("#screenshot")
      .css("transform", "matrix(1,0,0,1,0,-" + screenshoot + ")");
  });
  $(".screen-frame,.screen-frame > .active").mouseout(function() {
    $(this)
      .find("#screenshot")
      .css("transform", "matrix(1,0,0,1,0,0");
  });
  $(".screen-tablet,.screen-tablet > .active").mouseover(function() {
    var screenshoot =
      $(this)
        .find("#screenshot")
        .height() - $(this).height();
    $(this)
      .find("#screenshot")
      .css("transform", "matrix(1,0,0,1,0,-" + screenshoot + ")");
  });
  $(".screen-tablet,.screen-tablet > .active").mouseout(function() {
    $(this)
      .find("#screenshot")
      .css("transform", "matrix(1,0,0,1,0,0");
  });
  ///process bar function///////////////////
  function animateProgressBar(el, width) {
    el.animate(
      { width: width },
      {
        duration: 2000,
        step: function(now, fx) {
          if (fx.prop == "width") {
            el.html(el.data("name") + ": " + Math.round(now * 100) / 100 + "%");
          }
        }
      }
    );
  }
  ///fade in ///
  $("#Aboutusdd, #ddservices").waypoint(
    function(direction) {
      var $item = $(this.element);
      $item.addClass("animated");
      var animation = $item.attr("data-animation");
      $item.addClass(animation);
      $item.addClass("visible");
    },
    {
      offset: "80%"
    }
  );
  $("#ddskills").waypoint(
    function(direction) {
      $(".skillprogress").each(function() {
        animateProgressBar($(this).find("div"), $(this).data("width"));
      });
    },
    {
      offset: "100%"
    }
  );
  /////for not home page /////////

  if (location != home) {
    $("#sidenav > span").css("background", "#641c55");
    $("#sidenavright > span").css("background", "#641c55");
  }
  if (location == home) {
    ////for only home, if the page is re-loaded from the height which is bigger that half screen

    if ($(window).scrollTop() > screen.height / 2) {
      $("#sidenav > span, #sidenavright > span").css("background", "#641c55");
    } else if ($(window).scrollTop() < screen.height / 2) {
      $("#sidenav > span, #sidenavright > span").css(
        "background",
        "transparent"
      );
    }
  }
  $(document).ajaxStart(function() {
    if ($("#loadmore-wrap").length > 0) {
      $("#loadmore-wrap").show();
    }
  });
  $(document).ajaxComplete(function() {
    if ($("#loadmore-wrap").length > 0) {
      $("#loadmore-wrap").hide();
    }
  });

  var control = [];

  $(window).scroll(function() {
    fix_header();
    if (location == home) {
      ////for only home
      if ($(window).scrollTop() > screen.height / 2) {
        $("#sidenav > span, #sidenavright > span").css("background", "#641c55");
      } else if ($(window).scrollTop() < screen.height / 2) {
        $("#sidenav > span, #sidenavright > span").css(
          "background",
          "transparent"
        );
      }
    }

    if ($(".portfolio-page").length > 0) {
      if (
        $(window).scrollTop() >=
        $(document).height() - 50 - $(window).height()
      ) {
        var webdesignContainer = $(".webdesignContainer");
        var $cta_btn = $("#loadmore");
        var totalpages = parseInt($cta_btn.attr("data-total"));
        var xhr;
        var pageno = parseInt($cta_btn.attr("data-pagenum"));
        var categoryid = parseInt($cta_btn.attr("data-categoryid"));

        if (pageno <= totalpages && $.inArray(pageno, control) < 0) {
          control.push(pageno);
          var data = {
            is_ajax: "yes",
            category: categoryid
          };

          xhr = $.ajax({
            type: "POST",
            url: $("#loadmore").attr("data-nextpage_url"),
            dataType: "json",
            data: data,
            success: function(data) {
              if (data !== null) {
                if (webdesignContainer.length > 0) {
                  var $items = $(data.result.content);
                  webdesignContainer.isotope().append($items);
                  webdesignContainer.isotope("appended", $items);
                  webdesignContainer.imagesLoaded().progress(function() {
                    webdesignContainer.isotope("layout");
                  });
                } else {
                  $("#tobefilled").append(data.result.content);
                }

                if (data.result.has_more_data) {
                  $("#loadmore").attr("data-pagenum", data.result.pagenum);
                  $("#loadmore").attr(
                    "data-nextpage_url",
                    data.result.next_link
                  );
                }
              }
            }
          });
          return false;
        } else {
          $("#loadmore-wrap").hide();
          //  xhr.abort();
          //                }
        }
      }

      $(".screen-frame,.screen-frame > .active").mouseover(function() {
        var screenshoot =
          $(this)
            .find("#screenshot")
            .height() - $(this).height();
        $(this)
          .find("#screenshot")
          .css("transform", "matrix(1,0,0,1,0,-" + screenshoot + ")");
      });
      $(".screen-frame,.screen-frame > .active").mouseout(function() {
        $(this)
          .find("#screenshot")
          .css("transform", "matrix(1,0,0,1,0,0");
      });

      $(".screen-tablet,.screen-tablet > .active").mouseover(function() {
        var screenshoot =
          $(this)
            .find("#screenshot")
            .height() - $(this).height();
        $(this)
          .find("#screenshot")
          .css("transform", "matrix(1,0,0,1,0,-" + screenshoot + ")");
      });
      $(".screen-tablet,.screen-tablet > .active").mouseout(function() {
        $(this)
          .find("#screenshot")
          .css("transform", "matrix(1,0,0,1,0,0");
      });
    }
    ///for count ///////////////////
    if ($("#digital-dots-work").length > 0) {
      var a = 0;
      var oTop = $("#digital-dots-work").offset().top - $(window).innerHeight();
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter-value").each(function() {
          var $this = $(this),
            countTo = $this.attr("data-count");
          $({
            countNum: $this.text()
          }).animate(
            {
              countNum: countTo
            },
            {
              duration: 2000,
              easing: "swing",
              step: function() {
                $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                $this.text(this.countNum);
              }
            }
          );
        });
        a = 0;
      }
    }
  });
  function fix_header() {
    var header = $(".header-wrap");
    var limit = 50;
    var $logo = $("#logo");
    if (location == home) {
      ////for only home
      limit = screen.height / 2;
      var src = $("#logo").attr("src");
      var alt = $("#logo").attr("data-alt_logo");
    }
    if ($(window).scrollTop() > limit) {
      if (!header.hasClass("sticky")) {
        header.addClass("sticky");
        //if home page, switch the logo
        if (location == home) {
          $logo.attr("src", alt);
          $logo.attr("data-alt_logo", src);
        }
      }
    } else {
      if (header.hasClass("sticky")) {
        header.removeClass("sticky");
        //if home page, switch the logo
        if (location == home) {
          $logo.attr("src", alt);
          $logo.attr("data-alt_logo", src);
        }
      }
    }
  }
  // laptop inner change
  //var sizes = 992;
  $(window).resize(function() {
    var portCarousel = $("#portCarousel");
    if ($(window).width() < sizes.md) {
      $(".sidenav .sidenavbox").hide();
      portCarousel.find(".img-wrap div:first-child").addClass("active");
    } else {
      $(".sidenav.dd-open .sidenavbox").fadeIn("slow");
      portCarousel
        .find(".img-wrap")
        .children()
        .removeClass("active");
    }
  });
});

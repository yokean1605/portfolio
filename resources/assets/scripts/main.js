$(window).on('load', function () {
    $("#preloader").delay(350).fadeOut('slow');
    // Because only Chrome supports offset-path, feGaussianBlur for now
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
        document.getElementsByClassName('infinityChrome')[0].style.display = "none";
        document.getElementsByClassName('infinity')[0].style.display = "block";
    }
});

$(function () {
    "use strict";

    /**
     * scrollspy
     */

    $("body").scrollspy({ target: ".scrollspy" });


    /**
     * add class nav-link class to main menu
     */
    $('.vertical-menu li a').addClass('nav-link');

    /**
     * Parallax layers
     */
    if ($('.parallax').length > 0) {
        var scene = $('.parallax').get(0);
        var parallax = new Parallax(scene, {
            relativeInput: true,
        });
    }

    /**
     * morphect
     */
    $(".js-rotating").Morphext({
        animation: "animate fadeInLeft",
        separator: ",", // Overrides default ","
        speed: 3500, // Overrides default 2000
    });

    /**
     * Spacer with Data Attribute
     */
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
        var size = list[i].getAttribute('data-height');
        list[i].style.height = "" + size + "px";
    }

    /**
     * one page scroll jquey
     */
    $('a[href^="#"]:not([href="#"]').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 500, 'easeInOutQuad');
        event.preventDefault();
    });

    /**
     * progress bar with Waypoints js
     */
    if ($('.skill-item').length > 0) {
        var waypoint = new Waypoint({
            element: document.getElementsByClassName('skill-item'),
            handler: function (direction) {

                $('.progress-bar').each(function () {
                    var bar_value = $(this).attr('aria-valuenow') + '%';
                    $(this).animate({ width: bar_value }, { easing: 'linear' });
                });

                this.destroy()
            },
            offset: '90%'
        });
    }

    // Background color with data attribut
    var list = document.getElementsByClassName('data-background');

    for (var i = 0; i < list.length; i++) {
        var color = list[i].getAttribute('data-color');
        list[i].style.backgroundColor = "" + color + "";
    }

    // wow js
    setTimeout(function () { new WOW().init(); }, 0);

    var dynamicDelay = [
        200,
        400,
        600,
        800,
        1000,
        1200,
        1400,
        1600,
        1800,
        2000
    ];
    var fallbackValue = "200ms";

    $(".blog-item.wow").each(function (index) {
        $(this).attr("data-wow-delay", typeof dynamicDelay[index] === 'undefined' ? fallbackValue : dynamicDelay[index] + "ms");
    });

    /**
     * return to top
     */
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 350) {
            $('#return-to-top').css('right', '15px');
        } else {
            $('#return-to-top').css('right', '-40px');
        }
    });
    $('#return-to-top').on('click', function (e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: 0
        }, 400);
    });

    /**
     * jquery couunter up
     */
    $(".count").counterUp({
        delay: 10,
        time: 2000
    });

});
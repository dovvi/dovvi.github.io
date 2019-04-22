// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

$("[data-phone-validate]").each(function() {
    var mask = $(this).attr('data-phone-validate');
    $(this).mask(mask);
});

var $menu = $('.menu');
var $headerMenu = $('.menu-cont .menu');

$(window).on('scroll', function () {
    var top = $(this).scrollTop();

    if(top > 125) {
        $headerMenu.addClass('fixed');
    } else {
        $headerMenu.removeClass('fixed');
    }
});

$menu.find('a').on('click', function(e) {
    e.preventDefault();

    var id = $(this).attr('href');
    var topOffset = $(id).offset().top;
    $('body').animate({
        scrollTop: topOffset
    }, 500);
});

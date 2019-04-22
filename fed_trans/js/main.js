$(document).on('ready', function() {
    var $btn = $('.section-delivery-trans .item__button .btn');
    $btn.on('mouseover', function() {
        $(this).closest('.item').addClass('hovered');
    }).on('mouseleave', function() {
        $(this).closest('.item').removeClass('hovered');
    });


    var $miniSlideNav = $('.slide-images-navigation');
    $miniSlideNav.find('span').on('click', function() {
        var src = $(this).attr('data-src');
        $(this).closest('.slide-images').find('.slide-image img').attr('src', src);
    });

    var slider = {
        index: 0,
        showed: 4,
        length: $('.work-slider .slide').length,
        left: function() {
            var width = $('.work-slider .slide').outerWidth(true);
            if(slider.index === 0) {
                slider.index = slider.length - slider.showed - 1;
            } else {
                slider.index -= 1;
            }

            $('.work-slider-inner').stop().animate({
                marginLeft: - width * slider.index
            });
        },
        right: function() {
            var width = $('.work-slider .slide').outerWidth(true);
            if(slider.index === slider.length - slider.showed - 1) {
                slider.index = 0;
            } else {
                slider.index += 1;
            }

            $('.work-slider-inner').stop().animate({
                marginLeft: - width * slider.index
            });
        }
    };
    $('.work-slider-arrow--left').on('click', function () {
        slider.left();
        restartSlider();
    });
    $('.work-slider-arrow--right').on('click', function() {
        slider.right();
        restartSlider();
    });

    var runSlider = function() {
        return setInterval(function () {
            slider.right();
        }, 5000);
    };
    var restartSlider = function () {
        clearInterval(indervalId);
        indervalId = runSlider();
    };
    var indervalId = runSlider();





    $('[data-modal]').on('click', function() {
        var id = $(this).attr('data-modal');
        var $modal = $(id);
        
        $modal.fadeIn();
        $modal.find('.modal-bg, .modal-close').on('click', function() {
            $modal.fadeOut();
        });
    });


    $('.order-button').on('click', function () {
        var $cont = $(this).closest('.order-form');
        var $modal = $cont.closest('.modal');
        var $success = $cont.find('.order-success');
        var $name = $cont.find('.order-name');
        var $telephone = $cont.find('.order-telephone');
        var name = $name.val();
        var telephone = $telephone.val();
        var obj = {
            name: name,
            telephone: telephone
        };

        if(name !== '' && telephone !== '') {
            $name.removeClass('error');
            $telephone.removeClass('error');

            $.ajax({
                type: "POST",
                url: 'actions.php?do=order',
                data: obj,
                success: function(data) {
                    $name.val('');
                    $telephone.val('');
                    $success.fadeIn();
                    setTimeout(function () {
                        $success.fadeOut();
                        $modal.fadeOut();
                    }, 3000);
                }
            });
        } else {
            $name.addClass('error');
            $telephone.addClass('error');

            if(name !== '') { $name.removeClass('error'); }
            if(telephone !== '') { $telephone.removeClass('error'); }
        }
    });


    $('.consultation-button').on('click', function () {
        var $cont = $(this).closest('.consultation-form');
        var $success = $cont.find('.consultation-success');
        var $telephone = $cont.find('.consultation-telephone');
        var $telephoneCont = $cont.find('.consultation-telephone-container');
        var telephone = $telephone.val();
        var obj = {
            telephone: telephone
        };

        if(telephone !== '') {
            $telephoneCont.removeClass('error');

            $.ajax({
                type: "POST",
                url: 'actions.php?do=consultation',
                data: obj,
                success: function(data) {
                    $telephone.val('');
                    $success.fadeIn();
                    setTimeout(function () {
                        $success.fadeOut();
                    }, 3000);
                }
            });
        } else {
            $telephoneCont.addClass('error');

            if(telephone !== '') { $telephoneCont.removeClass('error'); }
        }
    });


    $('.price-button').on('click', function () {
        var $cont = $(this).closest('.price-form');
        var $modal = $cont.closest('.modal');
        var $success = $cont.find('.price-success');
        var $name = $cont.find('.price-name');
        var $telephone = $cont.find('.price-telephone');
        var $email = $cont.find('.price-email');
        var name = $name.val();
        var telephone = $telephone.val();
        var email = $email.val();
        var obj = {
            name: name,
            telephone: telephone,
            email: email
        };

        if(name !== '' && telephone !== '' && validateEmail(email)) {
            $name.removeClass('error');
            $telephone.removeClass('error');
            $email.removeClass('error');

            $.ajax({
                type: "POST",
                url: 'actions.php?do=price',
                data: obj,
                success: function(data) {
                    $name.val('');
                    $telephone.val('');
                    $email.val('');
                    $success.fadeIn();
                    setTimeout(function () {
                        $success.fadeOut();
                        $modal.fadeOut();
                    }, 3000);
                }
            });
        } else {
            $name.addClass('error');
            $telephone.addClass('error');
            $email.addClass('error');

            if(name !== '') { $name.removeClass('error'); }
            if(telephone !== '') { $telephone.removeClass('error'); }
            if(validateEmail(email)) { $email.removeClass('error'); }
        }
    });

});



function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
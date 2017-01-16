$(function () {

    //Number animation
    $('.number__number').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 1200,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now)+'%');
            }
        });
    });

    //Menu logic


    $('.mnu__burger').on('click',function () {
        if($(this).hasClass('burger--active')){
            $(this).removeClass('burger--active');
            $('.mnu').animate({opacity: 0},function () {
                $(this).css('display', '');
            });
        }else {
            $(this).addClass('burger--active');
            $('.mnu').animate({opacity: 1}).show();
            $('body').css({'overflow': 'hidden'})
        }
    })
});
$(function () {

    $('.district').on('click', function () {
        var self = $(this);
        $('.map').css({'transform':'translateY(-900px)'}).animate({opacity: 0});
        $('.map-text').html('Вы выбрали '+ self.data('district-name') +'!');
        // alert(self.data('district-name'));
    });

    $('.close-btn').on('click', function () {
        $('.map').css({'transform':'translateY(0)'}).animate({opacity: 1});
    })
});
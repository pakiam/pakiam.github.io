
//Функция сравнивает текущий URL с атрибутом href пунктов меню, и делает соответствующий пункт меню активным
function activeMenu() {

    $('.aside-mnu_item-link').removeClass('aside-mnu_item-link--active');
    var url=window.location.hash.substr(1); //убирает # из ссылки
    $('.aside-mnu_item-link').filter(function () { //сравнивает
        return $(this).attr('href')==url;
    }).addClass('aside-mnu_item-link--active');
    document.title=$('.aside-mnu_item-link--active').html(); // устанавливает заголовок документа по имени пункта меню

}

$(document).ready(function () {
    // при загрузке страницы/обновлении открывает страницу, соответсвующую URL
    var newHash='';
    var $mainContent=$('.main');
    loadpage(window.location.hash);
    function loadpage(hash){
        newHash=hash.substr(1);
        if (hash=='#' || hash==''){
            $mainContent.load('main.html')
        }else {
            $mainContent.load(newHash);
        }
        activeMenu()
    }

    //при клике на пункт меню изменяет URL траницы
    $('.aside-mnu').delegate('a', 'click', function() {
        window.location.hash = $(this).attr('href');
        return false;
    });
    activeMenu();

    //слушает изменение URL страницы
    $(window).on('hashchange',function () {
        var hash=window.location.hash;
        //если вернулись на главную
        if (hash=='#' || hash==''){
                $mainContent.load('main.html');
            } else {
                //иначе грузим файл по хэшу в URL
            newHash = window.location.hash.substr(1);
            $mainContent.load(newHash);
        }
        activeMenu();
    });


});
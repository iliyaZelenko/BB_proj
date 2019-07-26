let $btn = document.querySelector('.menu-button');
let $menu = document.querySelector('nav#navigation');
let $anchors = document.querySelectorAll('.navigation__links a');
let $overlay = document.querySelector('.overlay');

$($btn).on('click', function () {
    $($menu).hasClass('opened') ? $($menu).removeClass('opened') : $($menu).addClass('opened');
    // $($menu).hasClass('opened') ? $($overlay).fadeIn() : $($overlay).fadeOut();
});
$($anchors).on('click', function () {
    // $($overlay).fadeOut();
    $($menu).removeClass('opened');
});
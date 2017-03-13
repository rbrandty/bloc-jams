var animatePoints = function() {
<<<<<<< HEAD
    var revealPoint = function() {
        // #7
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
=======
   var revealPoint = function() {
         // #7
         $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });

 $.each($('.point'), revealPoint);
    }

 $(window).load(function () {
     if ($(window).height() > 950) {
         animatePoints();
>>>>>>> merge
    }

    $.each($('.point'), revealPoint);

<<<<<<< HEAD
    $(window).load(function() {
        if ($(window).height() > 950) {
            animatePoints();
=======
   $(window).scroll(function(event) {
       if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
>>>>>>> merge
        }

        var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

        $(window).scroll (function (event) {
            if ($(window).scrollTop() >= scrollDistance) {
                animatePoints();
            }
        });
    });
<<<<<<< HEAD
=======
 });
>>>>>>> merge
};
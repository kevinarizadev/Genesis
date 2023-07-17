
$( window ).on( 'load', function(){
    $('.modal-trigger').leanModal();
    $('.scrollspy').scrollSpy();
    /** page load animation */
    var p_l_c = $('.page-loader-container');
    if( p_l_c.length > 0 ) {
        setTimeout( function() {
            p_l_c.addClass('closed');
            setTimeout(function(){
                $('.dizzy-gillespie').remove();
            }, 200 );
            setTimeout(function(){
                p_l_c.remove();
            }, 500 );
        }, 400 );
    }
});
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var floating = $("html body").hasClass("floating-header");

    if (scroll >= 1 && !floating) {
        $(".wrapper.vertical-sidebar .side-nav").addClass("topScroll");

    } else{
        $(".wrapper.vertical-sidebar .side-nav").removeClass("topScroll");

    }
});

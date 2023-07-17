$(document).ready(function(){
    $('.scrollspy').scrollSpy();
    $('.icon-set').on('click','.icon',function(){
        $('#iconModalLabel').text('zdmi-'+$(this).data('name'));
        var zmdi='zmdi-'+$(this).data('name');
        $('#icon-sizes').html(
            '<i class="zmdi zmdi-hc-5x '+zmdi+'\"></i>&nbsp;&nbsp;'+
            '<span class="hidden-xs">'+
            '<i class="zmdi zmdi-hc-4x '+zmdi+'\"></i>&nbsp;&nbsp;'+
            '<span class="hidden-sm">'+
            '<i class="zmdi zmdi-hc-3x '+zmdi+'\"></i>&nbsp;&nbsp;'+
            '</span>'+
            '<i class="zmdi zmdi-hc-2x '+zmdi+'\"></i>&nbsp;&nbsp;'+
            '</span>'+
            '<i class="zmdi '+zmdi+'\"></i>&nbsp;'
        );
        $('#icon-code').html(
            '<p><i class="zmdi '+zmdi+'\"></i> · <span class="unicode">Unicode: '+$(this).data('code')+'</span></p>'+
            '<p class="category">Category: '+$(this).closest('.icon-set').find('.page-header').text() +'</p>'
        );
        $('.modal-body').find('.source').html(
            '&lt;i class="zmdi '+zmdi+'"&gt;&lt;/i&gt;'
        );
    });
    $('.modal-trigger').leanModal();

    var sidenav = $('.bs-docs-sidebar');
    if(sidenav.length !=0)
         sidenav.pushpin({ top: $('.icons-container .row').offset().top });

    //smooth scroll top
    $("a[href='#top']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });



});
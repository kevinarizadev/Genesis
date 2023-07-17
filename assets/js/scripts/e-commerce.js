(function ($) {
    $(document).ready(function(){

        $('.slider1').slider();
        $('.carousel').maraCarousel({
            time_constant: 150,
            padding: 150
        });
        var count =0;
        $('.product-panel-trigger').on('click', function(){
            if(count == 0) {
                autoplay(1);
                count++;
            }
        });
        function autoplay(start) {
            if(start != null) {
                $('.carousel').maraCarousel('next',[$('.carousel')[0].children.length]);
                autoplay(null);
            }else {
                setInterval(function() {$('.carousel').maraCarousel('next')}, 6000);
            }
        }

        var product_table = $('#products-table');
        if( product_table.length > 0 ) {
            product_table.DataTable({
                "dom": 't<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>><"clear">',
                "pagingType": "simple",
                "aLengthMenu": [[10, 20, 30, 50, 100, -1], [10, 20, 30, 50, 100, "All"]],
                "pageLength": 10,
                //"scrollY": "600px",
                //"scrollCollapse": true,
                //responsive: true,
                "language":{
                    "lengthMenu": "Show _MENU_ products per page",
                    "info": "Showing page _PAGE_ of _PAGES_"
                }
                //"columns": [
                //    { "width": "5%" },
                //    { "width": "8%" },
                //    { "width": "13%" },
                //    null,
                //    { "width": "13%" },
                //    { "width": "13%" },
                //    { "width": "13%" },
                //    { "width": "8%" }
                //]
            });
            var oTable = product_table.DataTable();
            $('#search-product').keyup(function(){
                oTable.search($(this).val()).draw();
            });
            $('.product-count span:last').html(''+oTable.rows().count()+'');
            $('.edit-product').on('click',function(){
                $('#product-list').fadeOut('slow',function(){

                    $('#product-details').fadeIn('slow',function(){

                    });

                });
            });
        }


        var order_table =$('#orders-table');
        if( order_table.length > 0){
            order_table.DataTable({
                "dom": 't<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>><"clear">',
                "pagingType": "simple",
                "aLengthMenu": [[10, 20, 30, 50, 100, -1], [10, 20, 30, 50, 100, "All"]],
                "pageLength": 10,
                //"scrollY": "600px",

                //"scrollCollapse": true,
                //responsive: true,

                "language":{
                    "lengthMenu": "Show _MENU_ orders per page",
                    "info": "Showing page _PAGE_ of _PAGES_"
                }

                //"columns": [
                //    { "width": "5%" },
                //    { "width": "8%" },
                //    { "width": "13%" },
                //    null,
                //    { "width": "8%%" },
                //    { "width": "13%" },
                //    { "width": "13%" },
                //    { "width": "13%" },
                //    { "width": "8%" }
                //]
            });
            var orTable = order_table.DataTable();
            $('#search-order').keyup(function(){
                orTable.search($(this).val()).draw();
            });
            $('.order-count span:last').html(''+orTable.rows().count()+'');
        }

        function resize () {
            if($('.code1').length && $('.example1').length) {
                $('.code1').height($('.example1').height());
                $('.code1 pre').height($('.example1 img').height());
            }
            if($('.code2').length && $('.example2').length) {
                $('.code2').height($('.example2').height());
                $('.code2 pre').height($('.example2 img').height());
            }
            if($('.code1').length && $('.charts').length) {
                $('.code1').height($('.charts').height());
                $('.code1 pre').height($('.charts').height());
            }
            if($('.code1').length && $('.mgrid > figure > img').length) {
                $('.code1').height($('.mgrid > figure > img').height());
                $('.code1 pre').height($('.mgrid > figure > img').height());
            }
            if($('.code1').length && $('.table-height').length) {
                $('.code1').height($('.table-height').height());
                $('.code1 pre').height($('.table-height').height());
            }
            if($('.code1').length && $('.charts').length) {
                $('.code1').height($('.charts').height());
                $('.code1 pre').height($('.charts').height());
            }
            if($('.code1').length && $('.grid-h').length) {
                $('.code1').height($('.grid-h').height());
                $('.code1 pre').height($('.grid-h').height());
            }
        }
        window.onload = window.onresize = function() {
            resize();
        }

    });
}( jQuery ));

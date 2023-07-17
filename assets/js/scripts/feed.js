$( window ).on( 'load', function(e){
   /** initialize images*/

    var source = jQuery('.feed-item');
    $.each(source,function(i,a){
        $(a).css('background-image', 'url('+ $(a).attr('href') +')');
    });

    /** feed reply action */
    function replySystem(replyFeed) {

        if ( replyFeed.length > 0 ) {
             replyFeed.one('submit',function(e){
                e.preventDefault();
                var $this = $(this),
                    $textarea = $this.find('textarea'),
                    weekday = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                    now = new Date(),
                    dateString = now.getHours() + ':' + now.getMinutes()+" "+ weekday[now.getDay()] +" "+now.getDate(),
                    $replyTemplate = $( $('#reply-template').text().replace(/\{time}/g, dateString ).replace(/\{replyText}/g, $textarea.val() ) );
                renderFeedAction($this,$replyTemplate,false);
            });
        }
    }

    $('.feed-page').on('click','.wall-feed .feed-reply-action button[type="submit"]',function(e){
        replySystem($(this).closest('.feed-reply-action'));
    });

    /** new feed action*/

    var new_feed_action = $( '.new-feed-action' );
    if ( new_feed_action.length > 0 ) {
        new_feed_action.on( 'submit', function( e ) {
            e.preventDefault();
            var $this = $( this ),
                $textarea = $this.find('textarea'),
                monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                now = new Date(),
                dateString = now.getDate() + ' ' + monthNames[ now.getMonth() ] + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes(),
                $newFeedTemplate = $( $('#new-feed-template').text().replace(/\{time}/g, dateString ).replace(/\{replyText}/g, $textarea.val() ) );
            renderFeedAction($this,$newFeedTemplate,true);
        });
    }

    function renderFeedAction(element,template,$new){
        var $imageInput = element.find('.reply-images')[0],
            $replyImageTemplate = $('#reply-image-template')
            ;

        function renderFeed( replyImages ) {
            replyImages = replyImages || '';
            template.find('.reply-post-images').html( replyImages );
            if($new){
                template.insertAfter( element.closest('.new-feed-input'));
            }else{
                template.insertBefore( element.closest('.feed-input'));
            }
            template.fadeIn();
            element[0].reset();
        }
        if ( $imageInput.files.length > 0 ) {
            var images = '',
                eligibleImages = [],
                processedEligibleImages = 0,
                id = Math.random().toString(16).slice(2),
                readerOnload = function( evt ) {
                    processedEligibleImages++;
                    images += $replyImageTemplate.text().replace(/\{id\}/g, id).replace(/\{imageData\}/g, evt.target.result);
                    if ( processedEligibleImages == eligibleImages.length ) {
                        renderFeed( images );
                    }
                };
            $.each($imageInput.files, function( k, file ){
                if ( ["image/jpeg","image/jpg","image/png","image/gif"].indexOf( file.type ) != -1 ) {
                    eligibleImages.push(file);
                }
            });
            if ( eligibleImages.length > 0 ) {
                $.each(eligibleImages, function( k, file ){
                    var reader = new FileReader();
                    reader.onload = readerOnload;
                    reader.readAsDataURL( file );
                });
            } else {
                renderFeed();
            }
        } else {
            renderFeed();
        }
    }


//            var $this = $( this ),
//                $textarea = $this.find('textarea'),
//                $imageInput = $this.find('.reply-images')[0],
//                monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
//                now = new Date(),
//                dateString = now.getDate() + ' ' + monthNames[ now.getMonth() ] + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes(),
//                $replyTemplate = $( $('#reply-template').text().replace('{time}', dateString ).replace('{replyText}', $textarea.val() ) ),
//                $replyImageTemplate = $('#reply-image-template')
//                ;
//
//            function renderReply( replyImages ) {
//                replyImages = replyImages || '';
//                $replyTemplate.find('.reply-post-images').html( replyImages );
//                console.log([$replyTemplate]);
//                $replyTemplate.insertBefore( $this.closest('.feed-input'));
//                $replyTemplate.fadeIn();
//                $this[0].reset();
//            }
//            if ( $imageInput.files.length > 0 ) {
//                var images = '',
//                    eligibleImages = [],
//                    processedEligibleImages = 0,
//                    id = Math.random().toString(16).slice(2),
//                    readerOnload = function( evt ) {
//                        processedEligibleImages++;
//                        images += $replyImageTemplate.text().replace(/\{id\}/g, id).replace(/\{imageData\}/g, evt.target.result);
//                        if ( processedEligibleImages == eligibleImages.length ) {
//                            renderReply( images );
//                        }
//                    };
//                $.each($imageInput.files, function( k, file ){
//                    if ( ["image/jpeg","image/jpg","image/png","image/gif"].indexOf( file.type ) != -1 ) {
//                        eligibleImages.push(file);
//                    }
//                });
//                if ( eligibleImages.length > 0 ) {
//                    $.each(eligibleImages, function( k, file ){
//                        var reader = new FileReader();
//                        reader.onload = readerOnload;
//                        reader.readAsDataURL( file );
//                    });
//                } else {
//                    renderReply();
//                }
//            } else {
//                renderReply();
//            }
//
//            console.log({
//                $textarea: $textarea,
//                $imageInput: $imageInput,
//                $replyTemplate: $replyTemplate,
//                $replyImageTemplate: $replyImageTemplate
//            });

});
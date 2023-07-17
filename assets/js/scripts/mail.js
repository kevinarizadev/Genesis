$(document).ready(function(){
    (function($) {
        if ( $('#checkMailPage').val() == "mailPage" ) {
            $('.collection li').on('click', function () {
                $('.collection li').removeClass('active-item');
                if ( !($(this).parent().parent().hasClass('messageBox')) ) {
                    $(this).addClass('active-item');
                    if ( $(this).attr('data-group') != undefined ) {
                        if ( $(this).attr('data-group') == 'first' ) {
                            $('.first_2_2,.first_3_2').removeClass('hiddendiv');
                            $('.second_2_2,.second_3_2,.user_first_2_2,.user_first_3_2,.user_second_2_2,.user_second_3_2').addClass('hiddendiv');
                        } else if ( $(this).attr('data-group') == 'second' ) {
                            $('.first_2_2,.first_3_2,.user_first_2_2,.user_first_3_2,.user_second_2_2,.user_second_3_2').addClass('hiddendiv');
                            $('.second_3_2,.second_2_2').removeClass('hiddendiv');
                        }
                    }

                    if ( $(this).attr('data-user') != undefined ) {
                        if ( $(this).hasClass('unread') ) {
                            var count = $(".countEmails");
                            if ( count.html() > 0 ) {
                                count.html(count.html() - 1);
                            }
                            $(this).removeClass('unread');
                        }
                        if ( $(this).attr('data-user') == 'first' ) {
                            $('.first_2_2,.first_3_2,.second_2_2,.second_3_2,.user_second_2_2,.user_second_3_2').addClass('hiddendiv');
                            $('.user_first_2_2,.user_first_3_2').removeClass('hiddendiv');
                        } else if ( $(this).attr('data-user') == 'second' ) {
                            $('.first_2_2,.first_3_2,.second_2_2,.second_3_2,.user_first_2_2,.user_first_3_2').addClass('hiddendiv');
                            $('.user_second_2_2,.user_second_3_2').removeClass('hiddendiv');
                        }
                    }
                }
            });
        }

        $('.tabInbox').on('click', function () {
            $(this).addClass('grey lighten-3');
            $('.tabImportant_3_1,.tabSend_3_1,.tabDelete_3_1').addClass('hiddendiv');
            $('.tabInbox_3_1').removeClass('hiddendiv');
            $('.tabImportant,.tabSend,.tabDelete').removeClass('grey lighten-3');
        });
        $('.tabImportant').on('click', function () {
            $(this).addClass('grey lighten-3');
            $('.tabInbox_3_1,.tabSend_3_1,.tabDelete_3_1').addClass('hiddendiv').removeClass('pink');
            $('.tabImportant_3_1').removeClass('hiddendiv');
            $('.tabInbox,.tabSend,.tabDelete').removeClass('grey lighten-3');
        });
        $('.tabSend').on('click', function () {
            $(this).addClass('grey lighten-3');
            $('.tabImportant_3_1,.tabInbox_3_1,.tabDelete_3_1').addClass('hiddendiv').removeClass('pink');
            $('.tabSend_3_1').removeClass('hiddendiv');
            $('.tabInbox,.tabImportant,.tabDelete').removeClass('grey lighten-3');
        });
        $('.tabDelete').on('click', function () {
            $(this).addClass('grey lighten-3');
            $('.tabImportant_3_1,.tabInbox_3_1,.tabSend_3_1').addClass('hiddendiv').removeClass('pink');
            $('.tabDelete_3_1').removeClass('hiddendiv');
            $('.tabInbox,.tabImportant,.tabSend').removeClass('grey lighten-3');
        });


        var onModalHide = function() {
            $('.modal-participants').addClass('hiddendiv').html('Participants: @Me');
            $('.first-one-johanna,.second-one-jane,.third-one-katia').addClass('hiddendiv');
            $('#autocompleteState').val('');
        };

        $(".compose-modal").on('click', function () {
            $('#compose-modal').openModal({
                complete : onModalHide
            });
        });

        var stateData = [
            {
                value: "Johanna Doe"
            },
            {
                value: "Jane Doe"
            },
            {
                value: "Katia Herbert"
            }
        ];

        $('#autocompleteState').data('array', stateData);

        var input_selector = '.navbar-custom-search input[type=text]';

        /*************************************************
         * THIS IS AN EXAMPLE Auto complete plugin       *
         *************************************************/
        $(input_selector).each(function() {
            var $input = $(this);

            if ($input.hasClass('autocomplete')) {
                var $array = $input.data('array'),
                    $inputDiv = $input.closest('.input-field'); // Div to append on
                if ($array !== '') {
                    var $html = '<ul class="autocomplete-content hide">';
                    for (var i = 0; i < $array.length; i++) {
                        // If path and class aren't empty add image to auto complete else create normal element
                        if ($array[i]['path'] !== '' && $array[i]['path'] !== undefined && $array[i]['path'] !== null && $array[i]['class'] !== undefined && $array[i]['class'] !== '') {
                            $html += '<li class="autocomplete-option"><img src="' + $array[i]['path'] + '" class="' + $array[i]['class'] + '"><span>' + $array[i]['value'] + '</span></li>';
                        } else {
                            $html += '<li class="autocomplete-option waves-effect"><span>' + $array[i]['value'] + '</span></li>';
                        }
                    }
                    $html += '</ul>';
                    $inputDiv.append($html);
                    function highlight(string) {
                        $('.autocomplete-content li').each(function() {
                            var matchStart = $(this).text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
                                matchEnd = matchStart + string.length - 1,
                                beforeMatch = $(this).text().slice(0, matchStart),
                                matchText = $(this).text().slice(matchStart, matchEnd + 1),
                                afterMatch = $(this).text().slice(matchEnd + 1);
                            $(this).html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
                        });
                    }

                    $(document).on('keyup', $input, function() {
                        var $val = $input.val().trim(),
                            $select = $('.autocomplete-content');
                        // Check if the input isn't empty
                        $select.css('width', $input.width());

                        if ($val != '') {
                            $select.children('li').addClass('hide');
                            $select.children('li').filter(function() {
                                $select.removeClass('hide'); // Show results

                                // If text needs to highlighted
                                if ($input.hasClass('highlight-matching')) {
                                    highlight($val);
                                }
                                var check = true;
                                for (var i in $val) {
                                    if ($val[i].toLowerCase() !== $(this).text().toLowerCase()[i])
                                        check = false;
                                };
                                return check ? $(this).text().toLowerCase().indexOf($val.toLowerCase()) !== -1 : false;
                            }).removeClass('hide');
                        } else {
                            $select.children('li').addClass('hide');
                        }
                    });

                    $('.autocomplete-option').click(function() {
                        var string = $(".modal-participants").text();
                        var concat;
                        if ( string.indexOf('Participants') > -1 ) {
                            concat = '';
                        } else {
                            concat = "Participants: @Me";
                        }
                        if ( string.indexOf($(this).text().trim()) > -1 ) {
                            if ( $(this).text().trim() == "Johanna Doe" ) {
                                $('.first-one-johanna').removeClass('hiddendiv');
                                $('.second-one-jane,.third-one-katia').addClass('hiddendiv');
                            } else if ( $(this).text().trim() == "Jane Doe" ) {
                                $('.second-one-jane').removeClass('hiddendiv');
                                $('.first-one-johanna,.third-one-katia').addClass('hiddendiv');
                            } else {
                                $('.third-one-katia').removeClass('hiddendiv');
                                $('.first-one-johanna,.second-one-jane').addClass('hiddendiv');
                            }
                            $('.autocomplete-option').addClass('hide');
                            $('#autocompleteState').val('');
                        } else {
                            if ( $(this).text().trim() == "Johanna Doe" ) {
                                $('.first-one-johanna').removeClass('hiddendiv');
                                $('.second-one-jane,.third-one-katia').addClass('hiddendiv');
                            } else if ( $(this).text().trim() == "Jane Doe" ) {
                                $('.second-one-jane').removeClass('hiddendiv');
                                $('.first-one-johanna,.third-one-katia').addClass('hiddendiv');
                            } else {
                                $('.third-one-katia').removeClass('hiddendiv');
                                $('.first-one-johanna,.second-one-jane').addClass('hiddendiv');
                            }
                            $(".modal-participants").removeClass("hiddendiv").append(concat + ', @'+$(this).text().trim()+" ");
                            $('#autocompleteState').val('');
                            $('.autocomplete-option').addClass('hide');
                        }

                    });
                } else {
                    return false;
                }
            }
        });
    })(jQuery);
});
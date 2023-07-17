/** theme settings configurator */
var ThemeSettings = {
    init: function()
    {
        this.defineUI();
        this.restoreCookieSettings();
        this.bindUIEvents();
        if ( this.hash.indexOf( 'disable-iframe' )  == -1 ) {
            this.loadIframe();
        } else {
            this.window.hide();
        }
    },
    defineUI: function()
    {
        $.extend( this, {
            constants: {
                LTR: 'ltr',
                RTL: 'rtl'
            },
            hash: window.location.hash.replace( '#', '' ),
            htmlDOM: $('html'),
            bodyDOM: $('body'),
            window: $('#theme-settings'),
            openButton: $('#open-theme-settings'),
            closeButton: $('#close-theme-settings'),
            headerToggle: $('#header-toggle'),
            fullWidthRadio: $('#full-width-layout'),
            boxedRadio: $('#boxed-layout'),
            verticalRadio: $('#vertical-navigation'),
            horizontalRadio: $('#horizontal-navigation'),
            pinkScheme: $('#pink-scheme'),
            darkScheme: $('#dark-scheme'),
            blueScheme: $('#blue-scheme'),
            cyanScheme: $('#cyan-scheme'),
            greenScheme: $('#green-scheme'),
            purpleScheme: $('#purple-scheme'),
            yellowScheme: $('#yellow-scheme'),
            desktopDevice: $('#desktop-device'),
            smartPortraitLarge: $('#smart-portrait-large'),
            smartLandscapeLarge: $('#smart-landscape-large'),
            smartPortraitSmall: $('#smart-portrait-small'),
            smartLandscapeSmall: $('#smart-landscape-small'),
            fullPage: $('#full-page'),
            iframe: null,
            readingDirectionToggle: $('#reading-direction-toggle')
        });
    },
    setCookie: function ( name, value, days )
    {
        if (days) {
            var date = new Date(), expires;
            date.setTime(date.getTime()+(days*24*60*60*1000));
            /** @namespace date.toGMTString */
            expires = "; expires="+date.toGMTString();
        } else expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },
    getCookie: function ( name )
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    changeFloatingHeaderState: function( isFloating )
    {
        if ( isFloating ) {
            this.setCookie( 'floating-header', true );
            this.bodyDOM.addClass('floating-header');
            this.headerToggle.attr( 'checked', 'checked' );
        } else {
            this.setCookie( 'floating-header', false );
            this.bodyDOM.removeClass('floating-header');
            this.headerToggle.removeAttr( 'checked' );
        }
        this.refreshIframe();
    },
    changeLayoutMode: function( mode )
    {
        if ( mode == 'boxed' ) {
            this.setCookie( 'layout-mode', 'boxed' );
            this.bodyDOM.addClass('boxed-layout');
            this.boxedRadio.attr( 'checked', 'checked' );
        } else {
            this.setCookie( 'layout-mode', 'full' );
            this.bodyDOM.removeClass('boxed-layout');
            this.fullWidthRadio.attr( 'checked', 'checked' );
        }
        this.fixedTabMailbox( mode );
    },
    changeNavigationStyle: function ( style )
    {
        if ( style == 'horizontal' ) {
            this.setCookie( 'navigation-style', 'horizontal' );
            this.bodyDOM.addClass('horizontal-navigation');
            this.horizontalRadio.attr( 'checked', 'checked' );
            $('div[data-template="templates/navigation/sidebar.html"]').attr('data-template','templates/navigation/topbar.html').load('templates/navigation/topbar.html');
        } else {
            this.setCookie( 'navigation-style', 'vertical' );
            this.bodyDOM.removeClass( 'horizontal-navigation' );
            this.verticalRadio.attr( 'checked', 'checked' );
            $('div[data-template="templates/navigation/topbar.html"]').attr('data-template','templates/navigation/sidebar.html').load('templates/navigation/sidebar.html');
        }
        this.changeAngularNavigationStyle( style );
        this.refreshIframe();
    },
    changeAngularNavigationStyle: function( style )
    {
        if( typeof angular != 'undefined' ) {
            var $body = angular.element(document.body);
            var $rootScope = $body.injector().get('$rootScope');
            $rootScope.$apply(function () {
                $rootScope.navigationStyle = style;
            });
        }
    },
    changeReadingDirection: function( direction )
    {
        if ( direction == this.constants.RTL ) {
            this.setCookie( 'reading-direction', this.constants.RTL );
            this.htmlDOM.attr('lang', 'ar').attr('dir', this.constants.RTL );
            this.readingDirectionToggle.attr('checked','checked');
        } else { // it's LTR
            this.setCookie( 'reading-direction', this.constants.LTR );
            this.htmlDOM.attr('lang', 'en').attr('dir', this.constants.LTR );
            this.readingDirectionToggle.removeAttr('checked');
        }

        typeof ol == "function" ? ol() : null;
    },
    changeColorScheme: function( scheme )
    {
        var scheme_classes = 'blue-scheme cyan-scheme green-scheme purple-scheme yellow-scheme dark-scheme';
        this.pinkScheme.removeClass('active');
        this.blueScheme.removeClass('active');
        this.cyanScheme.removeClass('active');
        this.greenScheme.removeClass('active');
        this.purpleScheme.removeClass('active');
        this.yellowScheme.removeClass('active');
        this.darkScheme.removeClass('active');
        if ( scheme == 'dark' ) {
            this.darkScheme.addClass('active');
        } else if ( scheme == 'blue' ) {
            this.blueScheme.addClass('active');
        } else if ( scheme == 'cyan' ) {
            this.cyanScheme.addClass('active');
        } else if ( scheme == 'green' ) {
            this.greenScheme.addClass('active');
        } else if ( scheme == 'purple' ) {
            this.purpleScheme.addClass('active');
        } else if ( scheme == 'yellow' ) {
            this.yellowScheme.addClass('active');
        } else { // it's the default scheme
            this.pinkScheme.addClass('active');
            scheme = 'pink';
        }
        this.setCookie( 'color-scheme', scheme );
        this.bodyDOM.removeClass( scheme_classes );
        scheme != 'pink' ? this.bodyDOM.addClass( scheme + '-scheme' ) : null;
        this.bodyDOM.trigger('classChange');
        this.refreshIframe();
    },
    restoreCookieSettings: function()
    {
        this.changeReadingDirection( this.getCookie( 'reading-direction' ) );
        this.getCookie( 'floating-header' ) == 'true' ? this.changeFloatingHeaderState( true ) : null;
        this.getCookie( 'layout-mode' ) == 'boxed' ? this.changeLayoutMode( 'boxed' ) : null;
        this.getCookie( 'navigation-style' ) == 'horizontal' ? this.changeNavigationStyle( 'horizontal') : null;
        if ( [ 'theme-style-dark', 'theme-style-blue', 'theme-style-cyan', 'theme-style-green', 'theme-style-purple', 'theme-style-yellow', 'theme-style-pink' ].indexOf( this.hash ) > -1 ) {
            this.changeColorScheme( this.hash.replace( 'theme-style-', '' ) );
        } else if ( typeof this.getCookie( 'color-scheme' ) != 'undefined' ) {
            this.changeColorScheme( this.getCookie( 'color-scheme' ) );
        }
    },
    bindUIEvents: function()
    {
        var _this = this;
        _this.openButton.on('click', function( e ){
            parseInt( _this.openButton.css('opacity') ) > 0 ? _this.window.addClass('open') : e.stopPropagation();
        });
        _this.closeButton.on('click', function() {
            _this.window.removeClass('open');
        });
        _this.headerToggle.on('change', function() {
            _this.headerToggle.is(':checked') ? _this.changeFloatingHeaderState( true ) : _this.changeFloatingHeaderState( false );
        });
        _this.boxedRadio.on( 'click', function(){
            _this.changeLayoutMode( 'boxed' );
        });
        _this.fullWidthRadio.on( 'click', function(){
            _this.changeLayoutMode( 'full' );
        });
        _this.verticalRadio.on( 'click', function(){
            _this.changeNavigationStyle( 'vertical' );
        });
        _this.horizontalRadio.on( 'click', function() {
            _this.changeNavigationStyle( 'horizontal' );
        });
        _this.pinkScheme.on('click', function(){
            _this.changeColorScheme('pink');
        });
        _this.darkScheme.on('click', function(){
            _this.changeColorScheme('dark');
        });
        _this.blueScheme.on('click', function(){
            _this.changeColorScheme('blue');
        });
        _this.cyanScheme.on('click', function(){
            _this.changeColorScheme('cyan');
        });
        _this.greenScheme.on('click', function(){
            _this.changeColorScheme('green');
        });
        _this.purpleScheme.on('click', function(){
            _this.changeColorScheme('purple');
        });
        _this.yellowScheme.on('click', function(){
            _this.changeColorScheme('yellow');
        });
        _this.desktopDevice.on('click', function(){
            _this.changeDevice('desktop');
        });
        _this.smartPortraitLarge.on('click', function(){
            _this.changeDevice('spl');
        });
        _this.smartLandscapeLarge.on('click', function(){
            _this.changeDevice('sll');
        });
        _this.smartPortraitSmall.on('click', function(){
            _this.changeDevice('sps');
        });
        _this.smartLandscapeSmall.on('click', function(){
            _this.changeDevice('sls');
        });
        _this.readingDirectionToggle.on('change', function() {
            _this.changeReadingDirection( _this.readingDirectionToggle.is(':checked') ? _this.constants.RTL : _this.constants.LTR );
        });
    },
    fixedTabMailbox: function ( mode )
    {
        if ( mode == 'boxed' ) {
            $('.part2_1_1 ul li').addClass('fixed-mailbox-tab');
        } else {
            $('.part2_1_1 ul li').removeClass('fixed-mailbox-tab');
        }
    },
   loadIframe: function(){
       // this.iframe = document.createElement("IFRAME");
        //this.iframe.setAttribute("src", window.location.href + '#disable-iframe');
        //this.iframe.setAttribute("frameBorder", '0');
        //this.iframe.id = "mara-iframe";
        //this.iframe.style.display = "none";
        //document.body.appendChild(this.iframe);
        //this.iframe = $('#mara-iframe');
    },
    /**
     * smartPortraitLarge(tablet)  : width: 1024px; ( spl )
     * smartLandscapeLarge(tablet) : width: 768px;  ( sll )
     * smartPortraitSmall          : width: 480px;  ( sps )
     * smartLandscapeSmall         : width: 330px;  ( sls )
     */
    changeDevice: function ( device )
    {
        this.smartLandscapeSmall.removeClass('active-device');
        this.desktopDevice.removeClass('active-device');
        this.smartPortraitLarge.removeClass('active-device');
        this.smartLandscapeLarge.removeClass('active-device');
        this.smartPortraitSmall.removeClass('active-device');
        if ( device == "desktop" ) {
            this.desktopDevice.addClass('active-device');
            this.fullPage.show();
            this.setCookie('device-preview', 'full');
            this.iframe.attr('style', 'display: none');
        } else {
            if ( device == "spl" ) {
                this.smartPortraitLarge.addClass('active-device');
                this.showIframe("width: 768px;");
            } else if ( device == "sll" ) {
                this.smartLandscapeLarge.addClass('active-device');
                this.showIframe("width: 1024px;");
            } else if ( device == "sps" ) {
                this.smartPortraitSmall.addClass('active-device');
                this.showIframe("width: 330px;");
            } else if ( device == "sls" ) {
                this.smartLandscapeSmall.addClass('active-device');
                this.showIframe("width: 480px;");
            }
            this.setCookie('device-preview', 'device');
        }
    },
    showIframe: function ( width )
    {
        var style = 'height: '+$(window).height()+'px;display: block;margin: 0 auto;';
        this.fullPage.hide();
        this.iframe.attr('style', style + width);
        this.iframe.show();
    },
    refreshIframe: function ()
    {
        if ( this.iframe != null ) {
            this.iframe[0].contentDocument.location.reload(true);
        }
    }
};

$( window ).on( 'load', function(){
    if( window.disableThemeSettings !== true ) {
        $('body').append(
            $('<div/>').load( ( typeof angular != 'undefined' ? '../' : '' ) + 'templates/themeSettings.html', function(){
                ThemeSettings.init();
            })
        );
    } else if ( window.showRTL === true ) {
        ThemeSettings.defineUI();
        ThemeSettings.changeReadingDirection( ThemeSettings.getCookie( 'reading-direction' ) );
    }
});
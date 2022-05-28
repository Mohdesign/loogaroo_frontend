import Head from "next/head"
import Nav from "/components/Nav"
import Footer from "/components/Footer"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Script from 'next/script'
 
export default function Layout({ children, title, description, keywords}) {
    const router = useRouter();

    // This is from custom.js file
    useEffect(() => {
        /** GENERALS */
        /** ===================== */

        var win = $(window);

        // viewport dimensions
        var ww = win.width();
        var wh = win.height();

        $(document).ready(function() {

            // load functions
            imageBG();
            grid();

        });

        win.on('load', function() {

            setTimeout(function() {
                $('#preloader').addClass('hide');
            }, 1000);

            // load functions
            grid();

        });

        win.on('resize', function() {

            // viewport dimensions
            ww = win.width();
            wh = win.height();

            // load functions
            grid();
            

        });



        /** SHOW/HIDE HEADER */
        /** ===================== */

        function show_hide_header() {

            var last_scroll = 0;

            win.on('scroll', function() {
                if (!$('#about').hasClass('visible')) {
                    var scroll = $(this).scrollTop();

                    if (scroll > last_scroll) {
                        $('#main-header').addClass('hide');
                    } else {
                        $('#main-header').removeClass('hide');
                    }

                    last_scroll = scroll;
                }
            });

        }



        /** BACKGROUND IMAGES */
        /** ===================== */

        function imageBG() {

            $('.imageBG').each(function() {
                var image = $(this).data('img');

                $(this).css({
                    backgroundImage: 'url(' + image + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                });
            });

        }


        /** GRID */
        /** ===================== */

        function grid() {

            var container = $('.grid');

            for (var i = 0; i < container.length; i++) {
                var active_container = $(container[i]);
                var container_width = active_container.width();

                var items = active_container.find('.entry');

                var cols = parseInt(active_container.data('cols'), 5);
                var margin = parseInt(active_container.data('margin'), 5);
                var height = parseFloat(active_container.data('height'));
                var double_height = parseFloat(active_container.data('double-height'));

                if (!margin) margin = 0;
                if (!double_height) double_height = 2;

                // set margins to the container
                active_container.css('margin', -Math.floor(margin / 2) + 'px');

                if (ww >= 1000) {
                    if (!cols) cols = 3;
                } else if (ww >= 700) {
                    if (cols !== 1) cols = 2;
                } else {
                    cols = 1;
                }

                var items_width = Math.floor((container_width / cols) - margin);
                var items_height = Math.floor(items_width * height);
                var items_double_height = items_height * double_height;
                var items_margin = Math.floor(margin / 2);

                items.each(function() {
                    $(this).css('width', items_width + 'px');
                    $(this).css('height', items_height + 'px');
                    $(this).css('margin', items_margin + 'px');

                    if (!height) $(this).css('height', 'auto');
                    if ($(this).hasClass('w2') && ww >= 500) $(this).css('width', (items_width * 2) + (items_margin * 2) + 'px');  /* Add w2 or h2 to the portfolio item for varoius layout sizes */
                    if ($(this).hasClass('h2') && ww >= 500) $(this).css('height', items_double_height + (items_margin * 2) + 'px');
                });

                // isotope
                active_container.isotope({
                    itemSelector: '.entry',
                    transitionDuration: '.2s',
                    hiddenStyle: {
                        opacity: 0
                    },
                    visibleStyle: {
                        opacity: 1
                    },
                    masonry: {
                        columnWidth: items_width + margin
                        
                    }
                });

                $('#filters li a').on('click', function(e) {
                    e.preventDefault();

                    var filter = $(this).attr('href');

                    $('#filters li a').removeClass('active');
                    $(this).addClass('active');

                    active_container.isotope({
                        filter: filter
                    });
                });
            };

        }

        //smoth scroll when click on .navbar-nav li a
        $('a.nav-link.js-scroll-trigger').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });

        // Iframely plugin
        // npm install iframely --save
        document.querySelectorAll( 'oembed[url]' ).forEach( element => {
            iframely.load( element, element.attributes.url.value );
        } );
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Websolutions.ca" />
            <meta name="theme-color" content="white" />
            <meta name="theme-color" content="black" />

            <title>{title}</title>
            {/* favicon */}
            <link rel="shortcut icon" href="/images/favicon/favicon.ico" type="image/x-icon" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
            {/* iOS support */}
            <link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-icon-180x180.png" />
            {/* Android support */}
            <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-192x192.png" />
            <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-144x144.png" />
            <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-96x96.png" />
            <link rel="apple-touch-icon-precomposed" href="/images/favicon/images/android-icon-72x72.png" />
            <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-48x48.png" />
            <link rel="apple-touch-icon-precomposed" href="/images/favicon/android-icon-36x36.png" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script> 
            
        </Head>
                    
                    
        {/* Iframely to view the youtube video on frontend */}
        <Script charset="utf-8" src="//cdn.iframe.ly/embed.js?api_key=f198f0e44812b2d884c41d"></Script>
        <Nav />

        {/* //use of router 
        {router.pathname === '/' ? <div className="container-fluid">{children}</div> : <div className="container">{children}</div>}
        */}
        <div className="front-end main-container container">
            {children}
            <Footer />
        </div> 
  

</>
    
    )
}

{/* default roots for <Head></Head> */}
Layout.defaultProps = {
    title: "Websolutions.ca",
    description: "Loogaroo Animation &amp; Games is a Canadian production company that provides 2D animation services for the web, television, feature film &amp; games.",
    keywords: "new brunswick animation, full animation productions, Canadian Animation Studios, maritimes animation studio, animation, tax credit on animation, animation, video, games, flash games, flash animation, flash, animation, studios, canada, games, service work, full production, tax credit animation incentive"
}
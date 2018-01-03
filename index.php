<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="Ashif Qureshi">
    <link rel="icon" href="images/favicon.ico">
    <title>Samrruddhi</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/>
    <!--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>-->
    <!--<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>-->
    <!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>-->
    <!--<script src="http://malsup.github.com/jquery.cycle2.js"></script>-->
    <!--<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
    <script src="js/socialbars.js"></script>-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <!--<link href='https://fonts.googleapis.com/css?family=Quattrocento+Sans' rel='stylesheet' type='text/css'>-->
    <!--<link href='https://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>-->
    <link href='https://fonts.googleapis.com/css?family=Ruluko' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/styleA.css">
    <link rel="stylesheet" href="css/cycle.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.cycle.js"></script>
    <link type="text/css" rel="stylesheet"
          href="http://fonts.googleapis.com/css?family=PT+Sans:400,700&subset=latin-ext">
    <!--<script src="js/jquery.ticker.js"></script>
    <link rel="stylesheet" href="css/ticker.css">-->
    <script src="js/jquery.modern.ticker.js"></script>
    <link rel="stylesheet" href="css/modern.ticker.new.css">
    <!--<style>
        .cycle-slideshow {
            width: 100%;
        }


    </style>-->
    <!-- get jQuery from the google apis -->
    <!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.js"></script>-->
    <!-- CSS STYLE-->
    <!--<link rel="stylesheet" type="text/css" href="css/stylee.css" media="screen"/>-->
    <!-- SLIDER REVOLUTION 4.x SCRIPTS  -->
    <!--<script type="text/javascript" src="js/jquery.themepunch.tools.min.js"></script>
    <script type="text/javascript" src="js/jquery.themepunch.revolution.min.js"></script>-->
    <!-- SLIDER REVOLUTION 4.x CSS SETTINGS -->
    <!--<link rel="stylesheet" type="text/css" href="rs-plugin/css/settings.css" media="screen"/>-->
    <script src="https://maps.googleapis.com/maps/api/js"></script>
    <script type="text/javascript">
        function initialize() {
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                /*center:new google.maps.LatLng(12.925959, 77.633590),*/
                center:new google.maps.LatLng(12.925959, 77.633590),
                zoom:14/*,
                mapTypeId:google.maps.MapTypeId.ROADMAP*/
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            var marker = new google.maps.Marker({map:map, position:new google.maps.LatLng(12.925959, 77.633590)});
            var infoWindow = new google.maps.InfoWindow({content:"<b>Samrruddhi Healing Center & Institute for Drugless</b>" +
                "<br/># 15, 80 Feet Road,1st Floor,  Koramangala 1st Block<br/> Bangalore-560034" });
            google.maps.event.addListener(marker, "click", function () {
                infoWindow.open(map, marker);
            });
            infoWindow.open(map, marker);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    </script>

</head>
<body class="bodybg">
<?php
include('header.html');
include('menu.html');
include('home.php');

include('contact.html');
include('footer.html');
?>

<script type="text/javascript">
    $('body').prepend('<a href="#" class="back-to-top">Back to Top</a>');
    var amountScrolled = 180;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('slow');
            if (!$(".second_bar").is(':visible')) {
                $(".second_bar").slideDown(1000);
            }
            if (!$(".ext_link").is(':visible')) {
                $(".ext_link").slideDown(1000);
            }
        } else {
            $('a.back-to-top').fadeOut('slow');
            $(".second_bar").slideUp('slow');
            $(".ext_link").slideUp('slow');
        }
    });
    $(document).ready(function () {
        $('.cycle-slideshow-1').cycle({
            fx:'all',
            prev:'.cycle-prev',
            next:'.cycle-next',
            pager:'.cycle-pager'
        });

        $('.service_slide').cycle({
            fx:'scrollHorz',
            prev:'.cycle-prev',
            next:'.cycle-next',
            timeout:4000
        });
        $('.slider').hover(
            function () {
                $('.cycle_control').fadeIn();
            },
            function () {
                $('.cycle_control').fadeOut();
            }
        );
        $('.service_slider').hover(
            function () {
                $('.cycle_control').fadeIn();
            },
            function () {
                $('.cycle_control').fadeOut();
            }
        );

        $("#ticker").modernTicker({effect:"scroll", scrollType:"continuous", scrollStart:"inside", scrollInterval:20, transitionTime:500, autoplay:true});
        $("#bn1").breakingNews({
            effect:"slide-v",
            autoplay:true,
            timer:3000,
            color:"samrruddhi",
            border:true
        });
    });
</script>
</body>
</html>



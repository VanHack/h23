<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Home24 Frontend Challenge</title>

        <!-- Fonts -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

        <!-- Styles -->
        <link href="/css/app.css" rel="stylesheet">

        <link rel="icon" href="/templates/tiaki.org/wp-content/themes/imagely-ansel/images/favicon.ico" />

        <!-- Scripts -->
        <script>
        </script>
    </head>

    <body>
        <div id="root" v-cloak>
            <div class="body body-background">
                <div class="container-fluid">
                    <div class="body body-haze">
                        <div class="row">
                            <div class="col-12">
                                <nav-bar></nav-bar>
                            </div>
                        </div>

                        <div class="row page-contents">
                            <div class="col-12">
                                <router-view></router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script>
        <script src="/js/app.js"></script>
        <script src="http://localhost:35729/livereload.js"></script>
    </body>
</html>

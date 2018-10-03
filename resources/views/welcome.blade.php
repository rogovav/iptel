<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Телефонный справочник МГУ им. Н.П. Огарёва</title>
</head>
<body>
<div id="searchbg">
    <div class="row">
        <div>
            <ul id="title">
            </ul>
        </div>
    </div>
</div>
<div class="container-fluid">
    <nav class="navbar header-top fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand">
            <img src="{{ asset("images/ver_logo.png") }}" height="56px" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav ml-md-auto d-md-flex">
                <li class="nav-item">
                    <a class="nav-link" id="ShowMenu" href="#searchbg"><i class="fas fa-search"></i> Поиск по оглавлению</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="row">
        <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 wrap-table-div card">
            <div class="card-body">
                <div class="search-area col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <input type="text" name="search" id="live-search"
                           onkeyup="LiveSearch(this.value)" placeholder="Поиск">
                </div>
                <div class="table-responsive">
                    <table class="table" id="phones">
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<footer id="footer" style="background-color: black;">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                <div class="thumbnail">
                    <a href="http://mrsu.ru/" target="_blank">
                        <figure style="max-width: 300px !important; margin-left: auto; margin-right: auto;"><img
                                class="ministr-logo" src="images/logo.png" alt=""></figure>
                    </a>
                    <a href="http://minsvyaz.ru/ru/" target="_blank">
                        <figure style="max-width: 300px !important; margin-left: auto; margin-right: auto;"><img
                                class="ministr-logo" src="images/mks_logo_shield.png" alt=""></figure>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6 col-6">
                <div class="thumbnail">
                    <a href="https://rkn.gov.ru/" target="_blank">
                        <figure style="max-width: 300px !important; margin-left: auto; margin-right: auto;"><img
                                class="ministr-logo" src="images/rkn.png" alt=""></figure>
                    </a>
                    <a href="http://xn--80abucjiibhv9a.xn--p1ai/" target="_blank">
                        <figure style="max-width: 300px !important; margin-left: auto; margin-right: auto;"><img
                                class="ministr-logo" src="images/logo.minobr.png" alt=""></figure>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                <div class="thumbnail">
                    <p><i class="fab fa-internet-explorer"></i><a href="https://ci.mrsu.ru"> ci.mrsu.ru</a></p>
                    <p><i class="fa fa-phone"></i><a href="tel:+78342777250"> +7 (8342) 777-250</a></p>
                    <p><i class="fa fa-envelope"></i><a href="mailto:ic@mrsu.ru"> ic@mrsu.ru</a></p>
                    <p><i class="fab fa-vk"></i><a href="https://vk.com/cimrsu"> vk.com/cimrsu</a></p>
                    <p><i class="fa fa-map-marker"></i>
                        <a href="https://yandex.ru/maps/-/CBeXVMq0KD" lang="ru"> 430005, г. Саранск, ул. Большевистская,
                            д. 68/1</a>
                    </p>
                </div>
            </div>
        </div>

        <div class="clear"></div>
    </div>
    <div class="footer2">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 panel">
                    <div class="panel-body1">
                        <p class="simplenav">
                            <a href="https://ci.mrsu.ru/price">
                                <span lang="ru">Доступ в Интернет</span>
                            </a> | <a href="http://bgbilling.mrsu.ru:8080/bgbilling/webexecuter">
                                <span lang="ru">Личный кабинет</span>
                            </a> | <a href="http://ci.mrsu.ru/sp">SpeedTest</a>
                        </p>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 panel">
                    <div class="panel-body">
                        <p class="text_right">
                            Copyright &copy; 2018. Made by Center Internet
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>
<script
    src="http://code.jquery.com/jquery-3.3.1.js"
    integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
<script src="{{ asset('js/app.js') }}"></script>

</html>

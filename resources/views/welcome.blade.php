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
    <link rel="shortcut icon" href="{{ asset('images/phone25.png') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Телефонный справочник МГУ им. Н.П. Огарёва</title>
</head>
<body>
<div style="overflow-x:hidden">
    <div id="searchbg">
        <div class="row">
            <div>
                <ul id="title">
                </ul>
            </div>
        </div>
    </div>

    <div id="searchbg1">
        <ul>
            <li><a href="tel:01">01</a> или <a href="tel:112">112</a> – единая служба спасения</li>
            <li><a href="tel:02">02</a> – полиция</li>
            <li><a href="tel:03">03</a> – скорая помощь</li>
            <li><a href="tel:04">04</a> – аварийная газовая служба</li>
        </ul>
    </div>

    <div id="searchbg2">
        <ul>
            <li>Дежурный по университету:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li><a href="tel:29-06-30">29-06-30</a></li>
                    <li><a href="tel:24-45-18">24-45-18</a></li>
                    <li><a href="tel:29-05-98">29-05-98</a></li>
                </ul>
            </li>
            <li>Главный инженер:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li><a href="tel:22-29-33">22-29-33</a></li>
                    <li>IP 1393</li>
                </ul>
            </li>
            <li>Начальник управления безопасности:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li><a href="tel:47-86-36">47-86-36</a></li>
                    <li><a href="tel:+79272767191">+7 927 276 71 91</a></li>
                </ul>
            </li>
            <li>Начальник отдела охраны и безопасности:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li><a href="tel:24-25-60">24-25-60</a></li>
                    <li><a href="tel:+79279702223">+7 927 970 22 23</a></li>
                </ul>
            </li>
            <li>Контрольно-пропускные пункты автотранспорта:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li>КПП № 1 ул. Полежаева <a href="tel:29-08-97">29-08-97</a></li>
                    <li>КПП № 2 ул. Большевистская <a href="tel:29-08-52">29-08-52</a></li>
                </ul>
            </li>
            <li>Диспетчерская гаража:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li><a href="tel:47-31-99">47-31-99</a></li>
                </ul>
            </li>
            <li>Справочная АТС:</li>
            <li style="list-style-type: none;">
                <ul>
                    <li><a href="tel:24-37-32">24-37-32</a></li>
                    <li><a href="tel:29-06-99">29-06-99</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="container-fluid my-row hidden-row">
        <div class="row">
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 wrap-table-div">
                <div class="card-body my-card-body">
                    <div class="table-responsive">
                        <table class="table table-hidden table-bordered">
                            <thead>
                            <th>ФИО</th>
                            <th>Должность</th>
                            <th>Внешний номер</th>
                            <th>Внутренний номер</th>
                            <th>Email</th>
                            <th>Место</th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <nav class="navbar header-top fixed-top navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <a class="navbar-brand">
                <img src="{{ asset("images/ver_logo.png") }}" height="56px" alt="">
            </a>
            <a class="float-right" id="ShowMenu1" href="#searchbg1">
                Телефоны экстренных служб
            </a>
            <a class="float-right" id="ShowMenu2" href="#searchbg2">
                Дежурные службы университета
            </a>
            <a class="float-right" id="ShowMenu" href="#searchbg"><i
                    class="fas fa-search fa-2x"></i></a>
        </nav>
        <div class="banner"></div>
        <div class="row">
            <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 wrap-table-div card">
                <div class="card-body">
                    <div class="search-area col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <input type="text" name="search" id="live-search"
                               onkeyup="LiveSearch(this.value)" placeholder="Поиск">
                    </div>
                    <div class="table-responsive">
                        <table class="table table-fixed table-bordered" id="phones">
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
</div>
</body>
<script
    src="https://code.jquery.com/jquery-3.3.1.js"
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

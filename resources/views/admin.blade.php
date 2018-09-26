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
    <title>IpTel</title>
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
        <a class="navbar-brand">Телефонный справочник</a>
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
                <li class="nav-item">
                    <a class="nav-link" href=""><i class="fas fa-users-cog"></i> Админ-панель</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href=""
                       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="fas fa-key"></i> Logout</a>
                </li>
                <form id="logout-form" action="" method="POST" style="display: none;">
                    @csrf
                </form>
            </ul>
        </div>
    </nav>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 admin-card">
            <div class="card admin-card-header">
                <h4>Клиенты</h4>
                <div class="card-body row">
                    <div id="accordion2" class="col-md-8">

                    </div>
                    <div class="col-md-4">
                        <form class="admin-form" action="javascript:void(null);"
                              onsubmit="sendPhoneForm()" id="phoneForm">
                            @csrf
                            <div class="form-group">
                                <input name="fio" type="text" class="form-control" placeholder="ФИО">
                            </div>
                            <div class="form-group">
                                <select class="form-control" name="group_id" id="group-select2">
                                    <option value="">Группа</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input name="position" type="text" class="form-control" placeholder="Должность">
                            </div>
                            <div class="form-row form-group">
                                <div class="col">
                                    <select id="country" class="form-control">
                                        <option value="ru"><img src="">Саранск +7 (8342)</option>
                                        <option value="ua">Рузаевка +7 (83451)</option>
                                        <option value="by">Ковылкино +7 (83453)</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <input id="phone" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <input name="ip_phone" type="text" class="form-control" placeholder="Внутренний номер" maxlength="4">
                            </div>

                            <div class="form-row form-group">
                                <div class="col">
                                    <select class="form-control" name="building_id" id="building">
                                        <option value="" selected>Здание</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <input name="room" type="text" class="form-control" placeholder="кабинет/этаж">
                                </div>
                                <div class="col">
                                    <select class="form-control" name="room_type" id="">
                                        <option value="1">кабинет</option>
                                        <option value="2">этаж</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group"><input type="submit" class="form-control"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 admin-card">
            <div class="card admin-card-header">
                <h4>Группы</h4>
                <div class="card-body row">
                    <div id="accordion3" class="col-md-6">

                    </div>
                    <div class="col-md-6">
                        <form class="admin-form" method="POST" action="javascript:void(null);"
                              onsubmit="sendGroupForm()" id="groupForm">
                            @csrf
                            <div class="form-group">
                                <select class="form-control" name="parent_id" id="group-select">
                                    <option value="" selected>Родительский элемент</option>
                                </select>
                            </div>
                            <div class="form-group"><input name="name" type="text" class="form-control"
                                                           placeholder="Название группы"></div>
                            <div class="form-group">
                                <select class="form-control" name="priority" id="">
                                    <option selected disabled>Приоритет</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div class="form-group"><input type="submit" class="form-control"></div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 admin-card">
            <div class="card admin-card-header">
                <h4>Здания</h4>
                <div class="card-body row">
                    <div id="accordion1" class="col-md-6">
                    </div>
                    <div class="col-md-6">
                        <form class="admin-form" action="javascript:void(null);" onsubmit="sendBuildingForm()" id="buildingForm">
                            @csrf
                            <div class="form-group">
                                <input name="name" type="text" class="form-control" placeholder="Название">
                            </div>
                            <div class="form-group">
                                <input name="address" type="text" class="form-control" placeholder="Адрес">
                            </div>
                            <div class="form-group"><input type="submit" class="form-control"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
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
<script src="{{ asset("js/maskedInput.js") }}"></script>
<script src="{{ asset('js/app.js') }}"></script>
<script>
    $('.collapse').collapse('toggle');
</script>
<script>
    $(function () {
        function maskPhone() {
            var country = $('#country option:selected').val();
            switch (country) {
                case "ru":
                    $("#phone").mask("+7(8342) 99-99-99");
                    break;
                case "ua":
                    $("#phone").mask("+7(83451) 9-99-99");
                    break;
                case "by":
                    $("#phone").mask("+7(83453) 9-99-99");
                    break;
            }
        }

        maskPhone();
        $('#country').change(function () {
            maskPhone();
        })
    });
</script>
</html>

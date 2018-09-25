<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script>window.Laravel = {csrfToken: '{{ csrf_token() }}'}</script>
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
<div class="container-fluid" id="app">
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
        <clients></clients>
    </div>
    <div class="row">
        <groups></groups>
        <buildings></buildings>
    </div>
</div>
</body>

<script src="{{ asset("js/app.js") }}"></script>
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
<script src="{{ asset('js/scripts.js') }}"></script>
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

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
        <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 wrap-table-div card">
            <div class="card-body">
                <div class="search-area col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <input type="text" name="search" id="live-search"
                           onkeyup="LiveSearch(this.value)" placeholder="Поиск">
                </div>
                <table class="table" id="phones">
                    <thead>
                    <th width="30%">ФИО</th>
                    <th width="20%">Должность</th>
                    <th width="20%">Внешний</th>
                    <th width="10%">IP</th>
                    <th width="30%">Адрес</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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
<script src="{{ asset('js/app.js') }}"></script>
</html>

$(document).ready(function () {
    $.getJSON("/phones/all", function (data) {
        let tbl_body = "<thead>\n" +
            "                        <th width=\"30%\">ФИО</th>\n" +
            "                        <th width=\"20%\">Должность</th>\n" +
            "                        <th width=\"20%\">Внешний</th>\n" +
            "                        <th width=\"10%\">IP</th>\n" +
            "                        <th width=\"30%\">Адрес</th>\n" +
            "                        </thead>";
        let ul_body = "";
        let i = 0;
        let j = 0;
        let z = 0;
        $.each(data["data"], function () {
            $.each(this, function (k, v) {// all data
                tbl_body += "<tbody class='search-body'><tr class='group' id='group_" + i + "'><td colspan='5'><h3>" + k + "</h3></td></tr>";
                ul_body += "<li class='group' onclick='hideBg()'><a class='bglink' href='#group_" + i + "'>" + k + "</a></li><ul>";
                ++i;
                $.each(v, function (k, v) { // company
                    if (v["name"]) {
                        tbl_body += InsertValue(v);
                    }
                    else {
                        $.each(v, function (k, v) { //company sub_company
                            tbl_body += "<tr class='company' id='company_" + j + "'><td colspan='5'><h4>" + k + "</h4></td>></tr>";
                            ul_body += "<li class='company' onclick='hideBg()'><a class='bglink' href='#company_" + j + "'>" + k + "</a></li><ul>";
                            ++j;
                            $.each(v, function (k, v) { //sub_company object
                                if (v["name"]) {
                                    tbl_body += InsertValue(v);
                                }
                                else {
                                    $.each(v, function (k, v) { //object element
                                        tbl_body += "<tr class='sub_company' id='sub_company_" + z + "'><td colspan='5'><h5>" + k + "</h5></td>></tr>";
                                        ul_body += "<li class='sub_company' onclick='hideBg()'><a class='bglink' href='#sub_company_" + z + "'>" + k + "</a></li>";
                                        z++;
                                        $.each(v, function (k, v) { //sub_company object
                                            tbl_body += InsertValue(v);
                                        });
                                    });
                                }
                            });

                            ul_body += "</ul>";
                        });
                    }
                });
                ul_body += "</ul>";
                tbl_body += "</tbody>";
            });
        });
        $("#phones").html(tbl_body);
        $("#title").html(ul_body);
    });

    /**
     * @return {string}
     */
    function InsertValue(v) {
        return "<tr class='tr-rendered'>" + "<td>" + v["name"] + "</td>" + "<td>" + v["position"] +
            "</td>" + "<td>" + v["phone"] + "</td>" + "<td>" + v["ip_phone"] +
            "</td>" + "<td>" + v["address"] + "</td>" + "</tr>";
    }


    $('a#ShowMenu').click(function () {
        $('#searchbg').slideToggle("slow");
    });
});

$(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $("#searchbg"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.slideUp("slow");
        ; // скрываем его
    }
});

function sendGroupForm() {
    let data = $("#groupForm");
    $.ajax({
        type: 'POST',
        url: "/api/group/add",
        data: data.serialize(),
        success: function (newdata) {
            data[0].reset();
            getGroups();
        },
        error: function (xhr, str) {
            console.log('Возникла ошибка: ' + xhr.responseCode);
        }
    })

}

function sendBuildingForm() {
    let data = $("#buildingForm");
    console.log(data);
    $.ajax({
        type: 'POST',
        url: "/api/building/add",
        data: data.serialize(),
        success: function (newdata) {
            data[0].reset();
            getBuildings();

        },
        error: function (xhr, str) {
            console.log('Возникла ошибка: ' + xhr.responseCode);
        }
    })

}

function sendPhoneForm() {
    let data = $("#phoneForm");
    let buildings = $("#building");
    buildings
    $.ajax({
        type: 'POST',
        url: "/api/phone/add",
        data: data.serialize(),
        success: function (newdata) {
            data[0].reset();
            getPhones();
        },
        error: function (xhr, str) {
            console.log('Возникла ошибка: ' + xhr.responseCode);
        }
    })

}


function getPhones() {
    $.getJSON("/phones", function (data) {
        $("#accordion2").empty();
        $.each(data, function (k, v) {
            $("#accordion2").append("<div class=\"building-header\" id=\"phone-header-" + v.id + "\">\n" +
                "                            <div class=\"card-header\" id=\"uheading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#ucollapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"ucollapse" + v.id + "\">\n" +
                v.fio +
                "                                    </button>\n" +
                "<a href='/api/phone/delete/" + v.id + "' data-id='" + v.id + "' data-name='phone' class='delete-link' data-method='delete'>&#10006;</a>" +
                "<a href='/phone/" + v.id + "' data-id='" + v.id + "'data-name='phone' class='edit-link' data-method='edit'>&#10000;</a>" +

                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"ucollapse" + v.id + "\" class=\"collapse\" aria-labelledby=\"uheading" + v.id + "\"\n" +
                "                                 data-parent=\"#accordion2\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Группа: </b></span>" + v.group + "</li>\n" +
                "                                        <li><span><b>Должность: </b></span>" + v.position + "</li>\n" +
                "                                        <li><span><b>Номер телефона: </b></span>" + v.phone + "</li>\n" +
                "                                        <li><span><b>Внутренний номер: </b></span>" + v.ip_phone + "</li>\n" +
                "                                        <li><span><b>Почта: </b></span>" + v.email + "</li>\n" +
                "                                        <li><span><b>Здание: </b></span>" + v.building + "</li>\n" +
                "                                        <li><span><b>Кабинет: </b></span>" + v.address + "</li>\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>")
        })
    });

}

function getBuildings() {
    $.getJSON("/buildings", function (data) {
        let buildings = $("#building");
        buildings.empty();
        buildings.append($("<option></option>")
            .attr("value", '')
            .text('Здание'));
        $("#accordion1").empty();
        $.each(data, function (k, v) {
            $("#accordion1").append("<div class=\"building-header\" id=\"building-header-" + v.id + "\">\n" +
                "                            <div class=\"card-header\" id=\"heading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"collapse" + v.id + "\">\n" +
                v.name +
                "                                    </button>\n" +
                "<a href='/api/building/delete/" + v.id + "' data-id='" + v.id + "' data-name='building' class='delete-link' data-method='delete'>&#10006;</a>" +
                "<a href='/building/" + v.id + "' data-id='" + v.id + "'data-name='building' class='edit-link' data-method='edit'>&#10000;</a>" +
                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"collapse" + v.id + "\" class=\"collapse\" aria-labelledby=\"heading" + v.id + "\"\n" +
                "                                 data-parent=\"#accordion1\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Адрес: </b></span>" + v.address + "</li>\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>"),
                buildings.append($("<option>", {
                    value: v.id,
                    text: v.name,
                    class: "building-header-" + v.id
                }))
        })
    });

}

function getGroups() {
    $.getJSON("/groups", function (data) {
        let groups = $("#group-select, #group-select2");
        $("#accordion3").empty();
        groups.empty();
        groups.append($("<option></option>")
            .attr("value", '')
            .text('Родительский элемент'));
        $.each(data, function (k, v) {
            $("#accordion3").append("<div class=\"building-header\" id=\"group-header-" + v.id + "\">\n" +
                "                            <div class=\"card-header\" id=\"heading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"collapse" + v.id + "\">\n" +
                v.name +
                "                                    </button>\n" +
                "<a href='/api/group/delete/" + v.id + "' data-id='" + v.id + "' data-name='group' class='delete-link' data-method='delete'>&#10006;</a>" +
                "<a href='/group/" + v.id + "' data-id='" + v.id + "'data-name='group' class='edit-link' data-method='edit'>&#10000;</a>" +

                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"collapse" + v.id + "\" class=\"collapse\" aria-labelledby=\"heading" + v.id + "\"\n" +
                "                                 data-parent=\"#accordion3\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Email: </b></span>" + v.email + "</li>\n" +
                "                                        <li>" + v.phone + "</li>\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>"),

                groups.append($("<option></option>")
                    .attr("value", v.id)
                    .text(v.name));
        })
    });
}

function setBuildingForm() {
    $(".form-building-rendered").empty();
    $(".form-building-rendered").append("<form class=\"admin-form\" action=\"javascript:void(null);\" onsubmit=\"sendBuildingForm()\"\n" +
        "                              id=\"buildingForm\">\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <input type=\"text\" name=\"id\" class=\"form-control\" readonly>\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <input required name=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Название\">\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <input required name=\"address\" type=\"text\" class=\"form-control\" placeholder=\"Адрес\">\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\"><input type=\"submit\" class=\"form-control\"></div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <button type=\"button\" class=\"form-control clear-button\" onclick='setBuildingForm()'>\n" +
        "                                    Очистить форму\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "\n" +
        "                        </form>")
    getBuildings();
}

async function setGroupForm() {
    $(".form-group-rendered").empty();
    $(".form-group-rendered").append("                        <form class=\"admin-form\" method=\"POST\" action=\"javascript:void(null);\"\n" +
        "                              onsubmit=\"sendGroupForm()\" id=\"groupForm\">\n" +
        "                            <div class=\"form-group\"><input name=\"id\" type=\"text\" class=\"form-control\" readonly></div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <select class=\"form-control\" name=\"parent_id\" id=\"group-select\">\n" +
        "                                </select>\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\"><input required name=\"name\" type=\"text\" class=\"form-control\"\n" +
        "                                                           placeholder=\"Название группы\"></div>\n" +
        "<div class='form-group'><button type='button' class='form-control clear-button btn' onclick='AddEmail()'>Добавить email</button></div>" +
        "                            <div class=\"email-rendered\">\n" +
        "                            </div>\n" +
        "<div class='form-group'><button type='button' class='form-control clear-button btn' onclick='AddFax()'>Добавить номер</button></div>" +
        "                            <div class=\"fax-rendered\"></div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <select required class=\"form-control\" name=\"priority\" id=\"priority-selected\">\n" +
        "                                    <option value=\"1\">Очень высокий</option>\n" +
        "                                    <option value=\"2\">Высокий</option>\n" +
        "                                    <option value=\"3\" selected>Средний</option>\n" +
        "                                    <option value=\"4\">Низкий</option>\n" +
        "                                    <option value=\"5\">Очень низкий</option>\n" +
        "                                </select>\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\"><input type=\"submit\" class=\"form-control\"></div>\n" +
        "                            <div class=\"form-group\"><button type=\"button\" class=\"form-control\" onclick='setGroupForm()'>Очистить форму</button></div>\n" +
        "                        </form>"
    )
    getGroups();
}

async function setPhoneForm() {
    $(".form-phone-rendered").empty();
    $(".form-phone-rendered").append("<form class=\"admin-form\" action=\"javascript:void(null);\"\n" +
        "                              onsubmit=\"sendPhoneForm()\" id=\"phoneForm\">\n" +
        "                            <div class=\"form-group\"><input name=\"id\" type=\"text\" class=\"form-control\" readonly></div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <input required name=\"fio\" type=\"text\" class=\"form-control\" placeholder=\"ФИО\">\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <select required class=\"form-control\" name=\"group_id\" id=\"group-select2\">\n" +
        "                                </select>\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\">\n" +
        "                                <input required name=\"position\" type=\"text\" class=\"form-control\"\n" +
        "                                       placeholder=\"Должность\">\n" +
        "                            </div>\n" +
        "                               <div class='form-group'> <input name=\"email\" type=\"text\" class=\"form-control\"\n" +
        "                                       placeholder=\"Email\"></div>\n" +
        "                            </div>\n" +
        "                            <div class=\"phones-rendered\">\n" +
        "<div class='form-group'><button type=\"button\" class=\"form-control btn clear-button\" onclick=\"AddNumber()\">Добавить номер</button></div>\n" +
        "                            </div>\n" +
        "                            <div class=\"ip_phones-rendered\">\n" +
        "                            <div class='form-group'><button type=\"button\" class=\"form-control btn clear-button\" onclick=\"AddIpNumber()\">Добавить IP номер\n" +
        "                                        </button></div>\n" +
        "                            </div>\n" +
        "\n" +
        "                            <div class=\"form-row form-group\">\n" +
        "                                <div class=\"col\">\n" +
        "                                    <select required class=\"form-control\" name=\"building_id\" id=\"building\">\n" +
        "                                        <option value=\"\" selected>Здание</option>\n" +
        "                                    </select>\n" +
        "                                </div>\n" +
        "                                <div class=\"col\">\n" +
        "                                    <input required name=\"room\" type=\"text\" class=\"form-control\"\n" +
        "                                           placeholder=\"кабинет/этаж\">\n" +
        "                                </div>\n" +
        "                                <div class=\"col\">\n" +
        "                                    <select required class=\"form-control\" name=\"room_type\" id=\"\">\n" +
        "                                        <option value=\"кабинет\">кабинет</option>\n" +
        "                                        <option value=\"этаж\">этаж</option>\n" +
        "                                    </select>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"form-group\"><input type=\"submit\" class=\"form-control\"></div>\n" +
        "                            <div class=\"form-group\"><button type=\"button\" class=\"form-control\" onclick='setPhoneForm()'>Очистить форму</button></div>\n" +

        "                        </form>");
    getPhones();
    getBuildings();
    getGroups();
}

getGroups();
getBuildings();
getPhones();
setGroupForm();
setBuildingForm();
setPhoneForm();

$(document).on('click', 'a.delete-link', function (e) {
    e.preventDefault();
    let agree;
    var $this = $(this);
    let id = $(this).attr("data-id");
    let name = $(this).attr("data-name");
    let groups = $("#group-select, #group-select2");
    let message = $(this).closest('.mb-0').children()[0].innerHTML;
    agree = confirm("Удалить" + message);
    if (agree) {
        $.post({
            type: $this.data('method'),
            url: $this.attr('href')
        }).done(function (data) {
            if (name == "group") {
                $("#accordion3, #accordion2").empty();
                groups.empty();
                getGroups();
                getPhones();
            }
            else if (name == "building") {
                $("#accordion1, #accordion2").empty();
                getPhones();
                getBuildings();
            }

            else if (name == "phone") {
                $("#accordion2").empty();
                getPhones();
            }

            $("#" + name + "-header-" + id).remove();
            $("." + name + "-header-" + id).remove();
        });
    }
})

function LiveSearch(val) {
    $(".tr-rendered").each(function () {
        if ($(this).text().indexOf(val)) {
            $(this).hide();
        }
        else {
            $(".search-body").children(".group").hide();
            $(".search-body").children(".company").hide();
            $(this).closest(".search-body").children(".group").show();
            $(this).show();
        }

        if (val == '') {
            $(this).show();
            $(".group").show();
            $(".company").show();
            $(".search-body").show();
        }
    })
}


function hideBg() {
    $("#searchbg").slideToggle()
}

function AddNumber(type = "", number = "") {
    $(".phones-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <select required name='ip_city' id=\"country\" class=\"form-control country\">\n" +
        "                                            <option value=\"ru\">Саранск +7(8342)</option>\n" +
        "                                            <option value=\"ua\">Рузаевка +7(83451)</option>\n" +
        "                                            <option value=\"by\">Ковылкино +7(83453)</option>\n" +
        "                                        </select>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col numbers\">\n" +
        "                                        <input required id=\"phone\" name=\"phone[]\" type=\"text\" class=\"form-control phone-input\" value='" + number + "'>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить номер</button>\n" +
        "                                    </div>\n" +
        "                                </div>"
    )
    if (type) {
        $("select[name=ip_city] option[value=" + type + "]").prop('selected', true);
    }
}

function AddFax(type = "", fax = "") {
    $(".fax-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <select required id=\"country\" class=\"form-control faxes\">\n" +
        (type == "Телефон" ?
            "                                            <option value=\"Телефон\" selected>Телефон</option>\n" +
            "                                            <option value=\"Факс\">Факс</option>\n" :
            "                                            <option value=\"Телефон\">Телефон</option>\n" +
            "                                            <option value=\"Факс\" selected>Факс</option>\n") +
        "                                        </select>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col numbers need\">\n" +
        "                                        <input required name=\"phone[]\" type=\"text\" class=\"form-control phone-input fax\" value='" + fax + "'>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить номер</button>\n" +
        "                                    </div>\n" +
        "                                </div>"
    )
}

function AddIpNumber(ip = "") {
    $(".ip_phones-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col-8\">\n" +
        "                                        <input required name=\"ip_phone[]\" type=\"text\" class=\"form-control\"\n" +
        "                                               placeholder=\"Внутренний номер\" maxlength=\"4\" value='" + ip + "'>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-4\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить номер\n" +
        "                                        </button>\n" +
        "                                    </div>\n" +
        "                                </div>")
}

function AddEmail(email = "") {
    $(".email-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col-8\">\n" +
        "                                        <input required name=\"email[]\" type=\"text\" class=\"form-control\"\n" +
        "                                               placeholder=\"Email\" value='" + email + "'>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-4\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить email\n" +
        "                                        </button>\n" +
        "                                    </div>\n" +
        "                                </div>")
}

$(document).on('click', '.faxes', function (e) {
    let $this = $(this);
    let tel = $(this).closest(".form-row").children(".need").children("input");
})


$(document).on('blur', 'input.fax', function (e) {
    let $this = $(this);
    let tel = $(this).closest(".form-row").children(0).children(".faxes").val();
    if (~$(this).val().indexOf("Телефон") || ~$(this).val().indexOf("Факс")) {
        $(this).val($(this).val())
    }
    else {
        $(this).val(tel + ": " + $(this).val())
    }
})


$(document).on('change', 'select.country', function (e) {
    var $this = $(this);
    let tel = $(this).closest(".form-row").children(".numbers").children();
    switch ($(this).val()) {
        case "ru":
            tel.mask("+7(8342) 99-99-99");
            break;
        case "ua":
            tel.mask("+7(83451) 9-99-99");
            break;
        case "by":
            tel.mask("+7(83453) 9-99-99");
            break;
    }
})


function setMask() {
    var country = $(".country").each(function () {
        let tel = $(this).closest(".form-row").children(".numbers").children(0);
        console.log($(this).val());
        switch ($(this).val()) {
            case "ru":
                tel.mask("+7(8342) 99-99-99");
                break;
            case "ua":
                tel.mask("+7(83451) 9-99-99");
                break;
            case "by":
                tel.mask("+7(83453) 9-99-99");
                break;
        }
    })
}

$(document).on('click', '.btn-delete-number', function (e) {
    $(this).closest(".form-row").remove();
})


//edit-link

$(document).on('click', '.edit-link', function (e) {
        e.preventDefault();
        let link = $(this).attr("href");
        let form_name = $(this).attr("data-name");
        let form = form_name + "Form"
        //$(".form-group-rendered")
        if (form_name == "building") {
            $.getJSON(link, function (data) {
                $.each(data, function (k, v) {
                    $("#" + form).find("input[name='" + k + "']").val(v);
                })
            })
        }

        if (form_name == "phone") {
            setPhoneForm().then(function () {
                    $.getJSON(link, function (data) {
                        $.each(data, function (k, v) {
                            if (k == "group_id") {
                                $("#group-select2 option[value=" + v + "]").prop('selected', true);
                            }

                            else if (k == "building_id") {
                                $("select[name=building_id] option[value=" + v + "]").prop('selected', true);
                            }

                            else if (k == "room_type") {
                                $("select[name=room_type] option[value=" + v + "]").prop('selected', true);
                            }

                            else if (k == "ip_phone") {
                                let mass = v.split(",");
                                for (let i = 0; i < mass.length; ++i) {
                                    AddIpNumber(mass[i]);

                                }
                            }
                            else if (k == "phone") {
                                let mass = v.split(",");
                                let tel_val = "";
                                for (let i = 0; i < mass.length; ++i) {
                                    if (mass[i].split(" ")[0].trim() == "+7(8342)") {
                                        tel_val = "ru";
                                    }
                                    else if (mass[i].split(" ")[0].trim() == "+7(83453)") {
                                        tel_val = "by";
                                    }
                                    else if (mass[i].split(" ")[0].trim() == "+7(83451)") {
                                        tel_val = "ua";
                                    }

                                    console.log(mass[i]);
                                    AddNumber(tel_val, mass[i].split(" ")[1])
                                }

                            }

                            else {
                                $("#" + form).find("input[name='" + k + "']").val(v);
                            }

                        })
                    })
                }
            )

        }

        if (form_name == "group") {
            setGroupForm().then(function () {
                $.getJSON(link, function (data) {
                    $.each(data, function (k, v) {
                        if (k == "email") {
                            let mass = v.split(",");
                            for (let i = 0; i < mass.length; ++i) {
                                AddEmail(mass[i]);
                            }
                        }

                        else if (k == "parent_id") {
                            $("#group-select option[value=" + v + "]").prop('selected', true);
                        }
                        else if (k == "phone") {
                            let mass = v.split(",");
                            for (let i = 0; i < mass.length; ++i) {
                                AddFax(mass[i].split(",")[0].trim().split(":")[0], mass[i].split(",")[0].trim());
                            }
                        }

                        else if (k == "priority") {
                            $("select[name=priority] option[value=" + v + "]").prop('selected', true);
                        }
                        else {
                            $("#" + form).find("input[name='" + k + "']").val(v)
                        }

                    })

                })
            })
        }

    }
)



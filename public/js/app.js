$(document).ready(function () {

    async function InitTable() {
        $.getJSON("/phones/all", function (data) {
            let tbl_body = "<thead class='main-thead'>\n" +
                "                        <th width=\"20%\">ФИО</th>\n" +
                "                        <th width=\"20%\">Должность</th>\n" +
                "                        <th width=\"15%\">Внешний номер</th>\n" +
                "                        <th width=\"15%\">Внутренний номер</th>\n" +
                "                        <th width=\"10%\">Email</th>\n" +
                "                        <th width=\"20%\">Место</th>\n" +
                "                        </thead>";
            let ul_body = "";
            let i = 0;
            let j = 0;
            let z = 0;
            $.each(data["data"], function () {
                $.each(this, function (k, v) {// all data
                    tbl_body += "<tbody class='search-body'><tr class='group' id='group_" + i + "'><td colspan='6'><h3>" + k + "</h3></td></tr>";
                    ul_body += "<li class='group' onclick='hideBg()'><a class='bglink_li' href='#group_" + i + "'>" + k + "</a></li><ul>";
                    ++i;
                    $.each(v, function (k, v) { // company
                        if (v["name"]) {
                            tbl_body += InsertValue(v);
                        }
                        else {
                            $.each(v, function (k, v) { //company sub_company
                                tbl_body += "<tr class='company' id='company_" + j + "'><td colspan='6'><h4>" + k + "</h4></td>></tr>";
                                ul_body += "<li class='company' onclick='hideBg()'><a class='bglink_li' href='#company_" + j + "'>" + k + "</a></li><ul>";
                                ++j;
                                $.each(v, function (k, v) { //sub_company object
                                    if (v["name"]) {
                                        tbl_body += InsertValue(v);
                                    }
                                    else {
                                        $.each(v, function (k, v) { //object element
                                            tbl_body += "<tr class='sub_company' id='sub_company_" + z + "'><td colspan='6'><h5>" + k + "</h5></td>></tr>";
                                            ul_body += "<li class='sub_company' onclick='hideBg()'><a class='bglink_li' href='#sub_company_" + z + "'>" + k + "</a></li>";
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
            $(".table-button").each(function () {
                console.log($(this));
                $(this).popover();
            })
        });

        /**
         * @return {string}
         */
        function InsertValue(v) {
            MassPhone = v["phone"];
            MassMail = v["email"];
            if (v["phone"].indexOf(",") > -1) {
                MassPhone = v["phone"].split(",");
                for (let i = 0; i < MassPhone.length; ++i) {
                    let lastMass = MassPhone[i];
                    MassPhone[i] = MassPhone[i].replace(/\s/g, '');
                    MassPhone[i] = MassPhone[i].replace("-", "");
                    MassPhone[i] = MassPhone[i].replace("-", "");
                    MassPhone[i] = MassPhone[i].replace("(", "");
                    MassPhone[i] = MassPhone[i].replace(")", "");
                    MassPhone[i] = "<a href='tel:" + MassPhone[i] + "'>" + lastMass + "<a><br>";
                }

            }
            else {
                MassPhone = "<a href='tel:" + MassPhone + "'>" + MassPhone + "<a> ";
            }
            if (v["email"].indexOf(",") > -1) {
                MassMail = v["email"].split(",");
                for (let i = 0; i < MassMail.length; ++i) {
                    MassMail[i] = "<a href='mailto:" + MassMail[i] + "'>" + MassMail[i] + "<a><br>";
                }

            }
            else {
                MassMail = "<a href='mailto:" + MassMail + "'>" + MassMail + "<a>";
            }

            MassPhone = MassPhone.toString().replace(',','');
            MassMail = MassMail.toString().replace(',','');

            let data_content = "<ul class='rendered-ul'>" +
                "<li> Внешний номер: <br>" + MassPhone + "</li>" +
                "<li> Внутренний номер: " + v["ip_phone"] + "</li>" +
                "<li> Email: " + MassMail + "</li>" +
                "<li> Место: " + v["building"] + "</li>" +
                "<li> Адрес: " + v["address"] + "</li>" +
                "</ul>"
            console.log(data_content)
            return "<tr class='tr-rendered'>" + "<td><button type='button' class='btn btn-link table-button hidden-btn-link' data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-content=\"" + data_content + "\" data-html='true'> " + v["name"] + "</button></td>" + "<td>" + v["position"] +
                "</td>" + "<td>" + MassPhone + "</td>" + "<td>" + v["ip_phone"] + "<td>" + MassMail +
                "</td>" + "<td><button type='button' class='btn btn-link table-button' data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"" + v["address"] + "\">" + v["building"] + "</button></td>" + "</tr>";
        }
    }

    InitTable().then(function () {

    });


    $('a#ShowMenu').click(function () {
        if ($('#searchbg').is(':visible')) {
            $('#searchbg').slideUp("slow");
        }
        else {
            $('#searchbg').slideDown("slow");
        }

    });
});


// $(document).on('click', 'button.table-button', function (e) {
//     let $this = $(this);
//     $(this).popover();
// });

$(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $("#searchbg"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.slideUp("slow");
        ; // скрываем его
    }
    else {
        div.slideDown("slow");
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
            setPhoneForm();
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
                "                                        <li><span><b>Место: </b></span>" + v.building + "</li>\n" +
                "                                        <li><span><b>Адрес: </b></span>" + v.address + "</li>\n" +
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
        "                            <div class=\"form-group\"><input type=\"submit\" class=\"form-control\" ></div>\n" +
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
        "                                            <option value=\"ru\" " + (type == "ru" ? "selected" : "") + ">Саранск +7(8342)</option>\n" +
        "                                            <option value=\"ua\" " + (type == "ua" ? "selected" : "") + ">Рузаевка +7(83451)</option>\n" +
        "                                            <option value=\"by\" " + (type == "by" ? "selected" : "") + ">Ковылкино +7(83453)</option>\n" +
        "                                        </select>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col numbers\">\n" +
        "                                        <input required name=\"phone[]\" type=\"text\" class=\"form-control phone-input\" value='" + number + "'>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить номер</button>\n" +
        "                                    </div>\n" +
        "                                </div>"
    )
    setMask();

}

function AddFax(type = "", fax = "") {
    $(".fax-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <select required name='faxes_name' class=\"form-control faxes\">\n" +
        "                                            <option value=\"Телефон\" " + (type == "Телефон" ? "selected" : "") + ">Телефон</option>\n" +
        "                                            <option value=\"Факс\" " + (type == "Факс" ? "selected" : "") + ">Факс</option>\n" +
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
    setMaskFax();
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

function setMaskFax() {
    var country = $(".faxes").each(function () {
        var $this = $(this);
        let tel = $(this).closest(".form-row").children(".numbers").children();
        switch ($(this).val()) {
            case "Телефон":
                tel.mask("Телефон: Z", {
                    translation: {
                        'Z': {
                            pattern: /[+0-9]/, recursive: true
                        }
                    }
                });
                break;
            case "Факс":
                tel.mask("Факс: 00-00-00");
                break;
        }
    })
}

$(document).on('change', 'select.faxes', function (e) {
    var $this = $(this);
    let tel = $(this).closest(".form-row").children(".numbers").children();
    switch ($(this).val()) {
        case "Телефон":
            tel.mask("Телефон: 00-00-00");
            break;
        case "Факс":
            tel.mask("Факс: 00-00-00");
            break;
    }
})

$(document).on('change', 'select.country', function (e) {
    var $this = $(this);
    let tel = $(this).closest(".form-row").children(".numbers").children();
    switch ($(this).val()) {
        case "ru":
            tel.mask("+7(8342) 00-00-00", {
                placeholder: "+7(8342) __-__-__"
            });
            break;
        case "ua":
            tel.mask("+7(83451) 0-00-00", {
                placeholder: "+7(83451) _-__-__"
            });
            break;
        case "by":
            tel.mask("+7(83453) 0-00-00", {
                placeholder: "+7(83453) _-__-__"
            });
            break;
    }
})


function setMask() {
    var country = $(".country").each(function () {
        let tel = $(this).closest(".form-row").children(".numbers").children(0);
        switch ($(this).val()) {
            case "ru":
                tel.mask("+7(8342) 00-00-00", {
                    placeholder: "+7(8342) __-__-__"
                });
                break;
            case "ua":
                tel.mask("+7(83451) 0-00-00", {
                    placeholder: "+7(83451) _-__-__"
                });
                break;
            case "by":
                tel.mask("+7(83453) 0-00-00", {
                    placeholder: "+7(83453) _-__-__"
                });
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
                                    if (mass[i].trim().split(" ")[0] == "+7(8342)") {
                                        tel_val = "ru";
                                    }
                                    else if (mass[i].trim().split(" ")[0] == "+7(83453)") {
                                        tel_val = "by";
                                    }
                                    else if (mass[i].trim().split(" ")[0] == "+7(83451)") {
                                        tel_val = "ua";
                                    }

                                    console.log(mass[i].trim());
                                    AddNumber(tel_val, mass[i].trim());
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

$(window).scroll(function () {
    if ($(window).scrollTop() > $(".main-thead").offset().top) {
        console.log(">");
        $(".my-row").addClass('show-row');
        $(".my-row").removeClass('hidden-row');
    }
    else {
        $(".my-row").removeClass('show-row');
        $(".my-row").addClass('hidden-row');
    }
})

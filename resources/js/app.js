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
    let groups = $("#group-select, #group-select2");
    $.ajax({
        type: 'POST',
        url: "/group/add",
        data: data.serialize(),
        success: function (newdata) {
            data[0].reset();
            newdata = JSON.parse(newdata);
            $("#accordion3").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\">\n" +
                newdata["name"] +
                "                                    </button>\n" +
                "<a href='/api/group/delete/" + newdata["id"] + "' data-id='" + newdata["id"] + "' data-name='group' class='delete-link' data-method='delete'>&#10006;</a>" +

                "                                </h5>\n" +
                "                            </div>\n" +
                "                        </div>"),
                groups.append($("<option></option>")
                    .attr("value", newdata["id"])
                    .text(newdata["name"]));
        },
        error: function (xhr, str) {
            console.log('Возникла ошибка: ' + xhr.responseCode);
        }
    })

}

function sendBuildingForm() {
    let data = $("#buildingForm");
    let buildings = $("#building");
    $.ajax({
        type: 'POST',
        url: "/building/add",
        data: data.serialize(),
        success: function (newdata) {
            data[0].reset();
            newdata = JSON.parse(newdata);
            $("#accordion1").append("<div class=\"building-header\"id=\"building-header-" + newdata["id"] + "\">\n" +
                "                            <div class=\"card-header\" id=\"heading" + newdata["id"] + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + newdata["id"] + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"collapse" + newdata["id"] + "\">\n" +
                newdata["name"] +
                "                                    </button>\n" +
                "<a href='/api/building/delete/" + newdata["id"] + "' data-id='" + newdata["id"] + "'data-name='building' class='delete-link' data-method='delete'>&#10006;</a>" +

                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"collapse" + newdata["id"] + "\" class=\"collapse\" aria-labelledby=\"heading" + newdata["id"] + "\"\n" +
                "                                 data-parent=\"#accordion1\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Адрес: </b></span>" + newdata["address"] + "</li>\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>"),
                buildings.append($("<option>", {
                    value: newdata["id"],
                    text: newdata["name"],
                    class: "building-header-" + newdata["id"]
                }))
        },
        error: function (xhr, str) {
            console.log('Возникла ошибка: ' + xhr.responseCode);
        }
    })

}

function sendPhoneForm() {
    let data = $("#phoneForm");
    let buildings = $("#building");
    $.ajax({
        type: 'POST',
        url: "/phone/add",
        data: data.serialize(),
        success: function (newdata) {
            data[0].reset();
            newdata = JSON.parse(newdata)[0];
            $("#accordion2").append("<div class=\"building-header\" id=\"phone-header-" + newdata["id"] + "\">\n" +
                "                            <div class=\"card-header\" id=\"uheading" + newdata["id"] + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#ucollapse" + newdata["id"] + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"ucollapse" + newdata["id"] + "\">\n" +
                newdata["fio"] +
                "                                    </button>\n" +
                "<a href='/api/phone/delete/" + newdata["id"] + "' data-id='" + newdata["id"] + "'data-name='phone' class='delete-link' data-method='delete'>&#10006;</a>" +
                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"ucollapse" + newdata["id"] + "\" class=\"collapse\" aria-labelledby=\"uheading" + newdata["id"] + "\"\n" +
                "                                 data-parent=\"#accordion2\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Группа: </b></span>" + newdata["group"] + "</li>\n" +
                "                                        <li><span><b>Должность: </b></span>" + newdata["position"] + "</li>\n" +
                "                                        <li><span><b>Номер телефона: </b></span>" + newdata["phone"] + "</li>\n" +
                "                                        <li><span><b>Внутренний номер: </b></span>" + newdata["ip_phone"] + "</li>\n" +
                "                                        <li><span><b>Здание: </b></span>" + newdata["building"] + "</li>\n" +
                "                                        <li><span><b>Кабинет: </b></span>" + newdata["address"] + "</li>\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>")
        },
        error: function (xhr, str) {
            console.log('Возникла ошибка: ' + xhr.responseCode);
        }
    })

}


function getPhones() {
    $.getJSON("/phones", function (data) {
        $.each(data, function (k, v) {
            $("#accordion2").append("<div class=\"building-header\" id=\"phone-header-" + v.id + "\">\n" +
                "                            <div class=\"card-header\" id=\"uheading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#ucollapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"ucollapse" + v.id + "\">\n" +
                v.fio +
                "                                    </button>\n" +
                "<a href='/api/phone/delete/" + v.id + "' data-id='" + v.id + "' data-name='phone' class='delete-link' data-method='delete'>&#10006;</a>" +
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
        $.each(data, function (k, v) {
            $("#accordion1").append("<div class=\"building-header\" id=\"building-header-" + v.id + "\">\n" +
                "                            <div class=\"card-header\" id=\"heading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"collapse" + v.id + "\">\n" +
                v.name +
                "                                    </button>\n" +
                "<a href='/api/building/delete/" + v.id + "' data-id='" + v.id + "' data-name='building' class='delete-link' data-method='delete'>&#10006;</a>" +
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
        groups.append($("<option></option>")
            .attr("value", '')
            .text('Родительский элемент'));
        $.each(data, function (k, v) {
            $("#accordion3").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\">\n" +
                v.name +
                "                                    </button>\n" +
                "<a href='/api/group/delete/" + v.id + "' data-id='" + v.id + "' data-name='group' class='delete-link' data-method='delete'>&#10006;</a>" +

                "                                </h5>\n" +
                "                            </div>\n" +
                "                        </div>"),

                groups.append($("<option></option>")
                    .attr("value", v.id)
                    .text(v.name));
        })
    });
}

getGroups();
getBuildings();
getPhones();


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
    console.log("clicked");
    $("#searchbg").slideToggle()
}

function AddNumber(e) {
    $(".phones-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <select required id=\"country\" class=\"form-control country\">\n" +
        "                                            <option value=\"ru\"><img src=\"\">Саранск +7 (8342)</option>\n" +
        "                                            <option value=\"ua\">Рузаевка +7 (83451)</option>\n" +
        "                                            <option value=\"by\">Ковылкино +7 (83453)</option>\n" +
        "                                        </select>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col numbers\">\n" +
        "                                        <input required id=\"phone\" name=\"phone[]\" type=\"text\" class=\"form-control phone-input\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить номер</button>\n" +
        "                                    </div>\n" +
        "                                </div>"
    )
    setMask();
}

function AddIpNumber(e) {
    $(".ip_phones-rendered").append("<div class=\"form-row form-group\">\n" +
        "                                    <div class=\"col-8\">\n" +
        "                                        <input required name=\"ip_phone[]\" type=\"text\" class=\"form-control\"\n" +
        "                                               placeholder=\"Внутренний номер\" maxlength=\"4\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"col-4\">\n" +
        "                                        <button type=\"button\" class=\"btn btn-delete-number\">Удалить номер\n" +
        "                                        </button>\n" +
        "                                    </div>\n" +
        "                                </div>")
}


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
}

setMask();

$(document).on('click', '.btn-delete-number', function (e) {
    $(this).closest(".form-row").remove();
})




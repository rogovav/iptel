$(document).ready(function () {
    $.getJSON("/test.json", function (data) {
        let tbl_body = "";
        let ul_body = "";
        $.each(data["data"], function () {
            $.each(this, function (k, v) {// all data
                tbl_body += "<tr class='group'><td colspan='5'><h3>" + k + "</h3></td>></tr>";
                ul_body += "<li>" + k + "</li><ul>";
                $.each(v, function (k, v) { // company
                    if (v["name"]) {
                        tbl_body += InsertValue(v);
                    }
                    else {
                        $.each(v, function (k, v) { //company sub_company
                            tbl_body += "<tr class='company'><td colspan='5'><h4>" + k + "</h4></td>></tr>";
                            ul_body += "<li>" + k + "</li><ul>";
                            $.each(v, function (k, v) { //sub_company object
                                if (v["name"]) {
                                    tbl_body += InsertValue(v);
                                }
                                else {
                                    $.each(v, function (k, v) { //object element
                                        tbl_body += "<tr class='sub_company'><td colspan='5'><h5>" + k + "</h5></td>></tr>";
                                        ul_body += "<li>" + k + "</li>";
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
            });
        });
        $("#phones tbody").html(tbl_body);
        $("#title").html(ul_body);
    });

    /**
     * @return {string}
     */
    function InsertValue(v) {
        return "<tr>" + "<td>" + v["name"] + "</td>" + "<td>" + v["position"] +
            "</td>" + "<td>" + v["phone"] + "</td>" + "<td>" + v["ip_phone"] +
            "</td>" + "<td>" + v["address"] + "</td>" + "</tr>";
    }


    function LiveSearch(val) {
        let table = $("#phones");
        let rows = table[0].rows;
        for (let i = 1; i < rows.length; i += 1) {
            if (rows[i].innerHTML.includes(val)) {
                rows[i].style.display = 'table-row';
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }


    $('a#ShowMenu').click(function () {
        $('#searchbg').toggle("slow");
    });

    $.getJSON("/phones", function (data) {
        $.each(data, function (k, v) {
            $("#accordion2").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\" id=\"uheading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#ucollapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"ucollapse" + v.id + "\">\n" +
                v.fio +
                "                                    </button>\n" +
                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"ucollapse" + v.id + "\" class=\"collapse\" aria-labelledby=\"uheading" + v.id + "\"\n" +
                "                                 data-parent=\"#accordion2\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Группа: </b></span>" + v.group_id + "</li>\n" +
                "                                        <li><span><b>Должность: </b></span>" + v.position + "</li>\n" +
                "                                        <li><span><b>Номер телефона: </b></span>" + v.phone + "</li>\n" +
                "                                        <li><span><b>Внутренний номер: </b></span>" + v.ip_phone + "</li>\n" +
                "                                        <li><span><b>Здание: </b></span>" + v.building_id + "</li>\n" +
                "                                        <li><span><b>Кабинет: </b></span>" + v.room_type + "</li>\n" +
                "                                        <li><span><b>Этаж: </b></span>" + v.room + "</li>\n" +
                "                                    </ul>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>")
        })
    });

    $.getJSON("/buildings", function (data) {
        let buildings = $("#building");
        $.each(data, function (k, v) {
            $("#accordion1").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\" id=\"heading" + v.id + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + v.id + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"collapse" + v.id + "\">\n" +
                v.name +
                "                                    </button>\n" +
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
                    text: v.name
                }))
        })
    });

    $.getJSON("/groups", function (data) {
        let groups = $("#group-select, #group-select2");
        $.each(data, function (k, v) {
            $("#accordion3").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\">\n" +
                v.name +
                "                                    </button>\n" +
                "                                </h5>\n" +
                "                            </div>\n" +
                "                        </div>"),

                groups.append($("<option></option>")
                    .attr("value", v.value)
                    .text(v.name));
        })
    });
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
            $("#accordion1").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\" id=\"heading" + newdata["id"] + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse" + newdata["id"] + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"collapse" + newdata["id"] + "\">\n" +
                newdata["name"] +
                "                                    </button>\n" +
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
                    text: newdata["name"]
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
            newdata = JSON.parse(newdata);
            console.log(newdata);
            $("#accordion2").append("<div class=\"building-header\">\n" +
                "                            <div class=\"card-header\" id=\"uheading" + newdata["id"] + "\">\n" +
                "                                <h5 class=\"mb-0\">\n" +
                "                                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#ucollapse" + newdata["id"] + "\"\n" +
                "                                            aria-expanded=\"false\" aria-controls=\"ucollapse" + newdata["id"] + "\">\n" +
                newdata["fio"] +
                "                                    </button>\n" +
                "                                </h5>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div id=\"ucollapse" + newdata["id"] + "\" class=\"collapse\" aria-labelledby=\"uheading" + newdata["id"] + "\"\n" +
                "                                 data-parent=\"#accordion2\">\n" +
                "                                <div class=\"card-body building-body\">\n" +
                "                                    <ul>\n" +
                "                                        <li><span><b>Группа: </b></span>" + newdata["group_id"] + "</li>\n" +
                "                                        <li><span><b>Должность: </b></span>" + newdata["position"] + "</li>\n" +
                "                                        <li><span><b>Номер телефона: </b></span>" + newdata["phone"] + "</li>\n" +
                "                                        <li><span><b>Внутренний номер: </b></span>" + newdata["ip_phone"] + "</li>\n" +
                "                                        <li><span><b>Здание: </b></span>" + newdata["building_id"] + "</li>\n" +
                "                                        <li><span><b>Кабинет: </b></span>" + newdata["room_type"] + "</li>\n" +
                "                                        <li><span><b>Этаж: </b></span>" + newdata["room"] + "</li>\n" +
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

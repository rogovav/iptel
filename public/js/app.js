$(document).ready(function () {
    $.getJSON("/test.json", function (data) {
        var tbl_body = "";
        var odd_even = false;
        var tbl_row = "";
        var ul_body = "";
        $.each(data["data"], function () {
            $.each(this, function (k, v) {// all data
                tbl_body += "<tr class='group'><td colspan='5'><h3>" + k + "</h3></td>></tr>";
                ul_body += "<li>" + k + "</li><ul>"
                $.each(v, function (k, v) { // company
                    if (v["name"]) {
                        tbl_body += InsertValue(v);
                    }
                    else {
                        $.each(v, function (k, v) { //company sub_company
                            tbl_body += "<tr class='company'><td colspan='5'><h4>" + k + "</h4></td>></tr>";
                            ul_body += "<li>" + k + "</li><ul>"
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

    function InsertValue(v) {
        let row = "";
        row += "<tr>" + "<td>" + v["name"] + "</td>" + "<td>" + v["position"] +
            "</td>" + "<td>" + v["phone"] + "</td>" + "<td>" + v["ip_phone"] +
            "</td>" + "<td>" + v["address"] + "</td>" + "</tr>";
        return row;
    }


    $.getJSON("/groups.json", function (data) {
        for (let i = 0; i < data.length; ++i) {
            Recoursive(data[i]);

        }
    })

    $.getJSON("/buildings.json", function (data) {
        let buildings = $("#building");
        $.each(data, function (k,v) {
            buildings.append($("<option>", {
                text: v.name
            }))
        })
    })


    function Recoursive(v) {
        if (v.child) {
            PrintOption(v);
            Recoursive(v.child);
        }
        else {
            PrintOption(v);
        }

    }

    function PrintOption(v) {
        let select = $("#group-select, #group-select2");
        if (v.length) {
            for (let i = 0; i < v.length; ++i) {
                select.append($("<option>", {
                    text: " \u25BA ".repeat(v[i].level) + v[i].name
                }))
                if (v[i].child.length) {
                    PrintOption(v[i].child);
                }
            }
        }
        else {
            select.append($("<option>", {
                text: " \u25BA ".repeat(v.level) + v.name
            }))
        }
    }

})

function LiveSearch(val) {
    let table = $("#phones");
    var rows = table[0].rows;
    for (var i = 1; i < rows.length; i += 1) {
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
//

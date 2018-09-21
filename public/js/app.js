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

    $.getJSON("/buildings", function (data) {
        let buildings = $("#building");
        $.each(data, function (k,v) {
            buildings.append($("<option>", {
                value: v.id,
                text: v.name
            }))
        })
    });

    $.getJSON("/groups", function (data) {
        for (let i = 0; i < data.length; ++i) {
            Recoursive(data[i]);
        }
    });

    function Recoursive(v, level = 0) {
        if (v.level === level) {
            if (v.child.length > 0) {
                PrintOption(v);
                for (let i = 0; i < v.child.length; i++) {
                    Recoursive(v.child[i], level + 1);
                }
            } else {
                PrintOption(v);
            }
        }
    }

    function PrintOption(v) {
        let select = $("#group-select, #group-select2");
        select.append($("<option>", {
            text: " \u25BA ".repeat(v.level) + v.name
        }));
    }

});

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
//

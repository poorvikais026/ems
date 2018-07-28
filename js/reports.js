$(function () {
    var dept_c_tsal = dept_count_tsal_info();
    var dept_c_qual = dept_qual_count_info();
    var qual_c = emp_quali_count();
    console.log(qual_c);
    showDeptCountTsalTable();
    showDeptCountQualTable();

    function showDeptCountTsalTable() {
        var headings = ["Dname", "Count", "Totalsal"];
        var data = ""
        data += "<table class='table table-striped table.responsive'>";
        data += "<thead><tr class='bg-dark text-white'>";
        for (var i = 0; i < headings.length; i++) {
            data += "<th>" + headings[i] + "</th>";
        }

        data += "</tr></thead>";
        for (var i = 0; i < dept_c_tsal.length; i++) {
            var dept = dept_c_tsal[i];
            data += "<tr>";
            data += "<td>" + dept.dname + "</td>";
            data += "<td>" + dept.count + "</td>";
            data += "<td>" + dept.tsal + "</td>";
        }
        data += "</table>";
        $("#deptsctable").html(data);
    }


    function showDeptCountQualTable() {


        var headings = ["Dname", "Qualification", "Count"];
        var data = ""
        data += "<table class='table table-striped table.responsive'>";
        data += "<thead><tr class='bg-dark text-white'>";
        for (var i = 0; i < headings.length; i++) {
            data += "<th>" + headings[i] + "</th>";
        }

        data += "</tr></thead>";
        for (var i = 0; i < dept_c_qual.length; i++) {
            var dept = dept_c_qual[i];
            data += "<tr>";
            data += "<td>" + dept.dname + "</td>";
            data += "<td>" + dept.qual + "</td>";
            data += "<td>" + dept.count + "</td>";
        }
        data += "</table>";
        $("#deptqctable").html(data);
    }

    initialize();

    function initialize() {
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {
            'packages': ['corechart']
        });

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawColumnChart);
        google.charts.setOnLoadCallback(drawPiChart);
    }

    function drawPiChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Qualification');
        data.addColumn('number', 'Total');
        rows = [];
        for (var i = 0; i < qual_c.length; i++) {
            var ele = qual_c[i];
            rows.push([ele.qual, ele.count])
        }
        data.addRows(rows);

        // Set chart options
        var options = {
            'title': 'Qualification and Count Details',
            'width': 400,
            'height': 300,
            'is3D':true,
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('deptempcountchart'));
        chart.draw(data, options);
    }


    function drawColumnChart() {
        var data = new google.visualization.DataTable();
        data.addColumn({
            type: 'string',
            id: 'year'
        });
        data.addColumn({
            type: 'number',
            id: 'tsal'
        });
        var rows = [];
        for (var i = 0; i < dept_c_tsal.length; i++) {
            var elem = dept_c_tsal[i];
            rows.push([elem.dname, parseInt(elem.tsal)])
        }
        data.addRows(rows);
        
        var options = {
            title: 'Department salary'
        };



        var chart = new google.visualization.ColumnChart(document.getElementById('deptsalarychart'));
        chart.draw(data, options);

    }

});

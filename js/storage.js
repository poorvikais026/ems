if (localStorage.getItem("employees") == null) {
    localStorage.setItem("employees", JSON.stringify([]));
}

function addEmployee(employee) {
    var employees = getEmployeesFromLocalStorage();
    employees.push(employee);
    updateLocalStorageData(employees);
    return getEmployeesFromLocalStorage();
}

function getEmployee(empno) {
    var employees = getAllEmployees();
    var index = getIndexOfEmployee(employees, empno);
    return employees[index];
}

function updateEmployeeDetails(employee) {
    var employees = getAllEmployees();
    var index = getIndexOfEmployee(employees, employee.empno);
    employees.splice(index, 1, employee);
    updateLocalStorageData(employees);
    return getAllEmployees();

}

function getAllEmployees() {
    return getEmployeesFromLocalStorage();
}

function deleteEmployee(empno) {
    var employees = getEmployeesFromLocalStorage();
    var index = getIndexOfEmployee(employees, empno);
    employees.splice(index, 1);
    updateLocalStorageData(employees);
    return getAllEmployees();
}

function getIndexOfEmployee(employees, empno) {

    for (var i = 0; i < employees.length; i++) {
        var emp = employees[i];
        if (emp.empno == empno)
            return i;
    }
    return -1;
}




 function searchAndGetEmployee(searchData, dname) {



     if (searchData == '' && dname == '') {
         return getEmployeesFromLocalStorage();
     } else if (dname == '') {
         return searchEmployeeByName(searchData);
     } else if (searchData == '') {
         return searchEmployeeByDname(dname);
     } else {
         return searchEmployeeByNameAndDname_fun(searchData, dname);
     }
 }

 function searchEmployeeByName(searchData) {
     var employee = getEmployeesFromLocalStorage();
     var temarr = [];
     for (var i = 0; i < employee.length; i++) {
         if (employee[i].name.indexOf(searchData) != -1) {
             temarr.push(employee[i]);
         }
     }
     return temarr;
 }


 function searchEmployeeByDname(dname) {
     var employee = getEmployeesFromLocalStorage();
     var temarr = [];
     for (var i = 0; i < employee.length; i++) {
         if (dname == employee[i].dept) {
             temarr.push(employee[i]);
         }
     }
     return temarr;
 }



 function searchEmployeeByNameAndDname_fun(searchData, dname) {
     var employee = getEmployeesFromLocalStorage();
     var temarr = [];
     for (var i = 0; i < employee.length; i++) {
         if (dname == employee[i].dept && employee[i].name.indexOf(searchData) != -1) {
             temarr.push(employee[i]);
         }
     }
     return temarr;
 }





function getEmployeeCountData() {

}

function getEmployeeCountChartData() {

}


function dept_count_tsal_info() {
    var employees = getEmployeesFromLocalStorage();
    dept_t_sal = {};

    employees.forEach(emp => {
        var t_s_c = dept_t_sal[emp.dept];
        if (t_s_c) {
            dept_t_sal[emp.dept] = {
                "dname": emp.dept,
                "count": t_s_c.count + 1,
                "tsal": parseInt(t_s_c.tsal) + parseInt(emp.salary)
            };
        } else {
            dept_t_sal[emp.dept] = {
                "dname": emp.dept,
                "count": 1,
                "tsal": emp.salary
            };
        }


    });
    var dept_count_tsal = [];
    for (key in dept_t_sal) {
        var value = dept_t_sal[key];
        dept_count_tsal.push(value);
    }
    return dept_count_tsal;
}


function dept_qual_count_info() {
    var employees = getEmployeesFromLocalStorage();
    var dept_emp = {};
    employees.forEach(emp => {
        dept = dept_emp[emp.dept];
        dept_emp[emp.dept] = dept ?
            dept.add(emp) : new Set().add(emp);
    })
    emp_qual_count = [];

    for (key in dept_emp) {
        dept_set = dept_emp[key];
        var dept_qual_count = {}
        for (var dept of dept_set) {
            count = dept_qual_count[dept.qualification]
            dept_qual_count[dept.qualification] = count ? count + 1 : 1
        }
        for (k in dept_qual_count) {
            var count = dept_qual_count[k];
            emp_qual_count.push({
                "dname": key,
                "qual": k,
                "count": count
            })
        }
    }
    return emp_qual_count;
}


function emp_quali_count() {
    var employees = getEmployeesFromLocalStorage();
    var qual_count = {};
    employees.forEach(emp => {
        var count = qual_count[emp.qualification]
        qual_count[emp.qualification] = count ? count + 1 : 1
    })
    var qual_count_list = [];
    for (qual in qual_count) {
        var count = qual_count[qual];
        qual_count_list.push({
            "qual": qual,
            "count": count
        });
    }
    
    return qual_count_list;
}









function getEmployeesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("employees"));
}

function updateLocalStorageData(employees) {
    localStorage.setItem("employees", JSON.stringify(employees));
}

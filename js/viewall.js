 $(function () {

     showTable(getAllEmployees());

     function showTable(employees) {

         var headerNames = ["Empno", "Name", "Email", "Mobile", "Qualification", "Designation", "Dept", "Salary", "Edit", "Delete"]
         var data = "";
         data += "<table class='emptable display responsive nowrap' id='emptable'>"
         data += "<thead>";
         data += "<tr>";
         headerNames.forEach(name => {
             data += "<th>" + name + "</th>";
         })
         data += "</tr>";
         data += "</thead>";
         for (var i = 0; i < employees.length; i++) {
             var emp = employees[i];
             data += "<tr>";
             data += "<td>" + emp.empno + "</td>";
             data += "<td>" + emp.name + "</td>";
             data += "<td>" + emp.email + "</td>";
             data += "<td>" + emp.mobile + "</td>";
             data += "<td>" + emp.qualification + "</td>";
             data += "<td>" + emp.designation + "</td>";
             data += "<td>" + emp.dept + "</td>";
             data += "<td>" + emp.salary + "</td>";
             data += "<td><div class='editEmp' id='" + emp.empno + "'><i class='fas fa-edit'></i></td>";
             data += "<td><div class='delEmp' id='" + emp.empno + "'><i class='fas fa-trash-alt'></i></div>" + "</td>";
             data += "</tr>";
         }
         data += "</table>";
         $("#showcontent").html(data);


         $('#emptable').dataTable({
             destory: true,
             responsive: true,
             columnDefs: [
                 {
                     responsivePriority: 1,
                     targets: -2
                 },
                 {
                     responsivePriority: 2,
                     targets: -1
                 }
    ]
         });
     }

     $(document).on('click', '.editEmp', function () {
         var empno = $(this).attr('id');
         var emp = getEmployee(empno);
         $("#addbtn").click();
         $("#empno").attr('readonly', 'readonly');
         $("#empno").val(emp.empno);
         $("#name").val(emp.name);
         $("#mobile").val(emp.mobile);
         $("#email").val(emp.email);
         $("#qualification").val(emp.qualification);
         $("#dept").val(emp.dept);
         $("#designation").val(emp.designation);
         $("#salary").val(emp.salary);

         $('.btnaddemployee').css('display', 'none')
         $('.updateemployee').css('display', 'block')

     });

     $(document).on('click', '.updateemployee', function () {
         updateEmployee();
     });


     $(document).on('click', '.delEmp', function () {
         var empno = $(this).attr('id');
         bootbox.confirm({
             message: "Are u sure deleted of empno : " + empno + " ?",
             buttons: {
                 confirm: {
                     label: 'Yes',
                     className: 'btn-success'
                 },
                 cancel: {
                     label: 'No',
                     className: 'btn-danger'
                 }
             },
             callback: function (result) {
                 if (result) {
                     var employees = deleteEmployee(empno);
                     showTable(employees);
                 }
             }
         });

     });

     function updateEmployee() {
         if (validateForm()) {
             var employee = readFormData();
             console.log(employee);
             var employees = updateEmployeeDetails(employee);
             resetFormData();
             showTable(employees);
             $('.updateemployee').attr('data-dismiss', 'modal');
             $('.btnaddemployee').attr('data-dismiss', 'modal');
         }
     }

     $(".btnaddemployee").click(function () {
         if (validateForm()) {
             var employee = readFormData();
             var employees = addEmployee(employee);
             resetFormData();
             showTable(employees);
             $('.btnaddemployee').attr('data-dismiss', 'modal');
         }
     });

     $(".close").click(function () {
         resetFormData();

     });
     $(".btnclose").click(function () {
         resetFormData();
     })

     function validateForm() {
         var isValid = $("#addempform").validate({
             rules: {
                 empno: {
                     required: true,
                    

                 },
                 name: {
                     required: true,

                 },
                 mobile: {
                     required: true,
                     minlength: 10,
                     maxlength: 10,
                 },
                 email: {
                     required: true,
                     email: true,
                 },
                 qualification: {
                     required: true,
                 },
                 designation: {
                     required: true,
                 },
                 dept: {
                     required: true,
                 },
                 salary: {
                     required: true,
                     min: 1,
                 },



             },
             messages: {
                 empno: {
                     required: "Emno can't be empty",
                    

                 },
                 name: {
                     required: "Name can't be empty",

                 },
                 mobile: {
                     required: "Mobile can't be empty",
                     minlength: "Mobile field should have atleast 10 characters",
                     maxlength: "Mobile field should have maximum of 10 characters",

                 },
                 email: {
                     required: "Email can't be empty",
                     email: "Enter a valid email"
                 },
                 qualification: {
                     required: "Qualification can't be empty",
                 },
                 designation: {
                     required: "Designation can't be empty",
                 },
                 dept: {
                     required: "Department can't be empty",
                 },
                 salary: {
                     required: "Salary can't be empty",
                     min: "Salary can't be negattive",
                 },




             }
         }).form();
         return isValid;
     }

     function resetFormData() {

         $('#addempform').find('input:text').val('');
         $("#addempform").find("#salary").val('');
         $('#addempform').find('select').val('');
         $("label.error").hide();
         $(".error").removeClass("error");
         $('.btnaddemployee').css('display', 'block')
         $('.updateemployee').css('display', 'none')
         $("#empno").attr('readonly', false);

     }

     function readFormData() {
         var empno = $("#empno").val();
         var name = $("#name").val();
         var mobile = $("#mobile").val();
         var email = $("#email").val();
         var qualification = $("#qualification").val();
         var dept = $("#dept").val();
         var designation = $("#designation").val();
         var salary = $("#salary").val();

         var employee = {
             "empno": empno,
             "name": name,
             "mobile": mobile,
             "email": email,
             "qualification": qualification,
             "dept": dept,
             "designation": designation,
             "salary": salary
         }
         return employee;
     }

 $("#btn").click(function () {
         var searchData = $("#searchtext").val();
         var dname = $("#dropdown").val();
         var employees = searchAndGetEmployee(searchData, dname) ;
         showTable(employees);
     });



 });

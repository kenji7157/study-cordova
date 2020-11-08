// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // add two local variables ::Module 8: Using Handlebars Templates (step-2_1)
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var service = new EmployeeService();
    service.initialize().done(function () {
        console.log("Service initialized");
        // call renderHomeView() ::Module 7: Setting Up a Single-Page Application
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // delete keyup event ::Module 7: Setting Up a Single-Page Application
    // $('.search-key').on('keyup', findByName);
    $('.help-btn').on('click', function () {
        alert("Employee Directory v3.4");
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        // modify findByName ::Module 8: Using Handlebars Templates (step-2_3)
        // service.findByName($('.search-key').val()).done(function (employees) {
        //     var l = employees.length;
        //     var e;
        //     $('.employee-list').empty();
        //     for (var i = 0; i < l; i++) {
        //         e = employees[i];
        //         $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
        //     }
        // });
        service.findByName($('.search-key').val()).done(function (employees) {
            $('.content').html(employeeListTpl(employees));
        });
    }

    // define renderHomeView() ::Module 7: Setting Up a Single-Page Application
    function renderHomeView() {
        // modify renderHomeView ::Module 8: Using Handlebars Templates (step-2_2)
        // var html =
        //     "<h1>Directory</h1>" +
        //     "<input class='search-key' type='search' placeholder='Enter name'/>" +
        //     "<ul class='employee-list'></ul>";
        // $('body').html(html);
        $('body').html(homeTpl());
        $('.search-key').on('keyup', findByName);
    }

    // override window.alert() Module 5: Using Native Notification 
    document.addEventListener('deviceready', function () {
        // add ::Module 8: Using Handlebars Templates (step-3_2)
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();
        // register FastClick  Module 6: Avoiding the 300ms Click Delay
        FastClick.attach(document.body);
        // コルドバプラグインが追加されて,navigator.notificationが参照できる場合
        //  -> コルドバでビルドされている場合はwindow.alertをオーバーライドする 
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "WorkshopTEST", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);
}());
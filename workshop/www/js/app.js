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
// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    $('.search-key').on('keyup', findByName);
    $('.help-btn').on('click', function() {
        alert("Employee Directory v3.4");
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }

    // override window.alert() Module 5: Using Native Notification 
    document.addEventListener('deviceready', function () {        
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
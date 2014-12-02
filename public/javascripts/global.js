// DOM Ready =============================================================
$(document).ready(function() {

    $('button.ping').on('click', pingAllMinion);

});

function pingAllMinion() {
    console.log("haklugfskrh");
    $.ajax({
        url: '/salt/ping',
        type: 'GET',
        success: function(msg) {
            $('#master-output').html(msg);
        }
    }).done(
        function(data) {
            console.log("done");
        }
    );
};
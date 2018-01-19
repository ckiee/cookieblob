var socket = io();
function onready() {
    var gCE = document.querySelector(".guildCount");
    socket.on("guild count", function(count) {
        gCE.innerHTML = count;
    });
}
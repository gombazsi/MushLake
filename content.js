const segments = [{
    name: "3d logo animations",
    content: {
        path: "logo animations",
        assets:[
            {
                name: "dark sky 3.mp4",
                id: "video-logo-dark-sky-3"
            },
            {
                name: "planet 2.mp4",
                id: "video-logo-planet-2"
            }
        ]
    }
}]

function openModal(src){
    var modalPlayer = videojs("video-player-modal");
    modalPlayer.src({type: 'video/mp4', src: src});
    modalPlayer.fill();
    
    const modal = document.getElementById("player-modal");
    modal.classList.add("modal-open");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("modal-open");
}

function enableVjsFill(){
    var player = videojs(segments[0].content.assets[0].id);
    player.fill(true);
    var player = videojs(segments[0].content.assets[1].id);
    player.fill(true);
    
    var modalPlayer = videojs("video-player-modal");
    modalPlayer.fill(true);
}
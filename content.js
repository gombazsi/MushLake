const segments = [{
    name: "3d logo animations",
    content: {
        path: "logo animations",
        assets:[
            {
                name: "dark sky 3.mp4",
                id: "video-logo-dark-sky-3"
            }
        ]
    }
}]

function enableVjsFill(){
    var player = videojs(segments[0].content.assets[0].id);
    player.fill(true);
}
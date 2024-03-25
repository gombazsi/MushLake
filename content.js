const segments = [
    {
        name: "3d logo animations",
        content: {
            assets:[
                {
                    name: "dark sky 3.mp4",
                    id: "video-logo-dark-sky-3",
                },
                {
                    name: "planet 2.mp4",
                    id: "video-logo-planet-2"
                },
                {
                    name: "planet 3.mp4",
                    id: "video-logo-planet-3"
                }
            ]
        }
    },
    {
        name: "Live visuals all night"
    },
    {
        name: "Custom VJ loops"
    },
    {
        name: "Audioreactive effects"
    },
    {
        name: "Promo videos"
    }
]

// Function to create segments dynamically
function createSegments() {
    const segmentsContainer = document.getElementById("segments-container");

    segments.forEach(segment => {
        // Create HTML for the segment
        const segmentHTML = `
            <div class="segment">
                <h2>${segment.name}</h2>
                <div class="container">
                    ${segment.content ? segment.content.assets.map(asset => `
                        <div class="content" onclick="openModal('assets/content/${asset.name}')">
                            <video class="video-js vjs-fill vjs-auto-height" id="${asset.id}" data-setup="{}" loop="true" autoplay="true" muted>
                                <source src="assets/preview/${asset.name}" type="video/mp4" />
                            </video>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `;
        
        // Append the segment HTML to the container
        segmentsContainer.innerHTML += segmentHTML;
    });
}

// Call the function to create segments when the page loads
window.onload = createSegments;


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
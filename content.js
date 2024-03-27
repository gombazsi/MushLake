const segments = [
    {
        name: "3d logo animations",
        id: "3d-logo-animations",
        content: {
            assets:[
                {
                    name: "dark sky 3"
                },
                {
                    name: "planet 2"
                },
                {
                    name: "planet 3"
                },
                {
                    name: "cv 3"
                },
                {
                    name: "castle 2"
                },
                {
                    name: "cv 2"
                },
                {
                    name: "red sky 2"
                },
                {
                    name: "red sky 3 shatter"
                },
                {
                    name: "red sky 1"
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

const assets = [];
const assetsDir = "assets/content";
var openSrc;

// Function to create segments dynamically
function createSegments() {
    const segmentsContainer = document.getElementById("segments-container");

    segments.forEach((segment, index) => {
        // Create HTML for the segment
        const segmentHTML = `
            <div class="accordion-item segment">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                        ${segment.name}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#segments-container">
                    <div class="accordion-body">
                        <div class="container">
                            ${segment.content ? segment.content.assets.map(asset => `
                                <div class="content" onclick="openModal('${assetsDir}/${asset.name}.mp4')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00ff00" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
                                        <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                                    </svg>
                                    <img class="preview-image" src="assets/preview/${asset.name}.jpg"/>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                </div>
            </div>`;

            // Append the segment HTML to the container
            segmentsContainer.innerHTML += segmentHTML;

            if (segment.content && segment.content.assets) {
                segment.content.assets.forEach(asset => {
                    assets.push(asset.name);
                });
            }
    });
}

function openModal(src){
    var modalPlayer = videojs("video-player-modal");
    modalPlayer.src({type: 'video/mp4', src: src});
    modalPlayer.fill();
    
    const modal = document.getElementById("player-modal");
    modal.classList.add("modal-open");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("modal-open");

    openSrc = src;
    addSwipeHandler();
}

function modalNext(){
    const currentIdx = assets.findIndex(a => assetsDir+'/'+a+".mp4" === openSrc);
    const nextIndex = assets.length == currentIdx + 1 ? 0 : currentIdx + 1;
    console.log(assets, openSrc)
    openModal(assetsDir+"/"+assets[nextIndex]+".mp4");
}

function modalPrev(){
    const currentIdx = assets.findIndex(a => assetsDir+'/'+a+".mp4" === openSrc);
    const prevIndex = currentIdx == 0 ? assets.length - 1 : currentIdx - 1;
    openModal(assetsDir+"/"+assets[prevIndex]+".mp4");
}

function closeModal(){
    const modal = document.getElementById("player-modal");
    modal.classList.remove("modal-open");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("modal-open");
}

function addSwipeHandler() {
    var swipeContainer = document.getElementById('player-modal');
    var hammer = new Hammer(swipeContainer);

    // Define swipe event handling
    hammer.on('swipeleft', function() {
        modalPrev();
    });

    hammer.on('swiperight', function() {
        modalNext();
    });
}

function enableVjsFill(){    
    var modalPlayer = videojs("video-player-modal");
    modalPlayer.fill(true);
}

function onInit(){
    createSegments();
    enableVjsFill();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}
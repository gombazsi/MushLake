const assets = [];
const assetsDir = "assets/content";
var openSrc;

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
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventMobileScroll, { passive: false });
}

function preventMobileScroll(event) {
    event.preventDefault();
}

function modalNext(){
    const currentIdx = assets.findIndex(a => `${assetsDir}/${a}.mp4` === openSrc);
    const nextIndex = assets.length == currentIdx + 1 ? 0 : currentIdx + 1;
    openModal(assetsDir+"/"+assets[nextIndex]+".mp4");
}

function modalPrev(){
    const currentIdx = assets.findIndex(a => `${assetsDir}/${a}.mp4` === openSrc);
    const prevIndex = currentIdx == 0 ? assets.length - 1 : currentIdx - 1;
    openModal(assetsDir+"/"+assets[prevIndex]+".mp4");
}

function closeModal(){
    const modal = document.getElementById("player-modal");
    modal.classList.remove("modal-open");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("modal-open");

    document.body.style.overflow = 'auto';
    document.removeEventListener('touchmove', preventMobileScroll);

    var modalPlayer = videojs("video-player-modal");
    modalPlayer.pause();
}

var canSwipe = true;

function addSwipeHandler() {
    var swipeContainer = document.getElementById('player-modal');
    var hammer = new Hammer(swipeContainer);

    hammer.on('swipeleft', function() {
        if(canSwipe){     
            modalNext();
            resetSwipeDebounce();
        }
    });

    hammer.on('swiperight', function() {
        if(canSwipe){             
            modalPrev();
            resetSwipeDebounce();
        }
    });
}

function resetSwipeDebounce(){    
    canSwipe = false;
    const debounceMs = 300;

    setTimeout(function() {
        canSwipe = true;
    }, debounceMs)
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

function openInsta(user){
    window.open("https://www.instagram.com/"+user, "_blank");
}

function scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
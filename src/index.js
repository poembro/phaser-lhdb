import PreloadScene from './scenes/preloadScene.js'

import MainScene from './scenes/mainScene.js'
import EndScene from './scenes/endScene.js'

const gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    transparent: false,
    parent: "myGame",
    scale: {
        parent: 'myGame',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    scene: [PreloadScene, MainScene, EndScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 600}
        }
    },
    loader: {
        baseURL: "/",
        path: "assets/images"
    }
}

const kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
};
let img = new Image();
img.onload = () => {
    let result = (img.width > 0) && (img.height > 0);
    window.imageSuffix = result ? "webp" : "png"
    new Phaser.Game(gameConfig)
};

img.onerror = () => {
    window.imageSuffix = "png"
    new Phaser.Game(gameConfig)
};
img.src = "data:image/webp;base64," + kTestImages["lossy"];
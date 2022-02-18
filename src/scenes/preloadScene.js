import initModel from '../game/initModel.js'
/**
 * 加载场景
 */
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({key: "PreloadScene"});
    }

    preload() { 
        new initModel().init(this) 
 
        this.percentText = this.add.text(640, 370, "0%", { fontSize: "16px", color: "#FFFFFF", align: 'center' }).setOrigin(0.5, 0.5);
        this.assetText = this.add.text(640, 450, "", {fontSize: "16px", color: "#FFFFFF", align: 'center'}).setOrigin(0.5, 0.5)
        

        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0xFFFFFF, 1);
        this.progressBox.fillRect(530, 400, 200, 30);

        this.progressBar = this.add.graphics();

        this.load.on('progress', value => {
            //this.progressBar.clear()
            this.progressBar.fillStyle(0xfcbb20, value)
            this.progressBar.fillRect(535, 405, 190 * value, 20)
            this.percentText.setText(parseInt(value * 100) + '%')    // 100%
             
            if (value === 1) {  
                // 添加到场景中的每个对象 都来自于Phaser.GameObjects.GameObject 类 而Phaser.GameObjects.Text扩展基GameObject类
                //setInteractive方法 不带参数的文本对象上调用该方法 它将使文本的矩形边界具有交互性
                this.startGame = this.add.text(640, 500, "开始游戏33", {fontSize: "16px", color: "#FFFFFF", align: 'center'}).setOrigin(0.5, 0.5).setInteractive()
                //pointerout-与pointerover相反。当光标离开游戏对象区域时触发
                //pointerdown -单击或触摸游戏对象时触发，实际上是按下鼠标按钮或手指触摸时触发。
                //pointerup-与pointerdown相反。当释放鼠标按钮或从游戏对象上抬起手指时，它将触发。
                this.startGame.once('pointerdown', function () {
                 /*
                    var vid = this.add.video(this.sys.canvas.width/2, 300, 'wormhole'); 
                    vid.play(false);
                    // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
                    vid.setPaused(false);
                    */

 
                    this.scene.transition({
                        target: 'MainScene',
                        remove: true,
                        duration: 1000,
                        moveBelow: true,
                        ease: "easeOut",
                        onUpdate: this.transitionOut
                    })  

                }, this)

                this.percentText.destroy()
                this.progressBar.destroy()
                this.progressBox.destroy()
            }
 
        })

        this.load.on('fileprogress', file => {
            this.assetText.setText('Loading asset: ' + file.key, {
                fontSize: "16px",
                color: "#FFFFFF",
                align: 'center'
            })
        })
    }

    create() {
        this.preloader = this.add.tileSprite(this.sys.canvas.width/2,this.sys.canvas.height/2, this.sys.canvas.width, this.sys.canvas.height, "preloader");
        this.container = this.add.container(0, 0, [this.preloader, this.percentText, this.assetText, this.progressBar, this.progressBox, this.startGame]);
    }

    transitionOut(progress) {
        //this.container.setVisible(false) 
        //return
        this.container.setY(-1800 * progress);
    }
}
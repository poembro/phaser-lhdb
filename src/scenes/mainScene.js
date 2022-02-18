/**
 * 主场景
 */ 
import netModel from '../game/netModel.js'
import logicModel from '../game/logicModel.js'
 
export default class MainScene extends Phaser.Scene {
    constructor() {
        super({key: "MainScene"});
    }

    preload() { 
        this.netModel = new netModel().init(this) 
        this.logicModel = new logicModel().init(this) 
        
        this.enterDiv = null //开始按钮句柄
        this.unEnterDiv  = null //置灰按钮句柄

        this.autoEnterDiv = null
        this.unAutoEnterDiv = null

        this.settingDiv = null
        this.helpDiv = null
        this.outloginDiv = null
        
        //设置背景
        this.add.tileSprite(this.sys.canvas.width/2,this.sys.canvas.height/2, 1280, 720, "background_img");
        //向某位置加1个图片  setOrigin表示设置原点 图片从该点展开
        // this.add.image("xx曾经load过的图xx").setOrigin(0,0) 
        
        this.anims.create({
            key: 'explode1',
            frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
            frameRate: 30,
            repeat: 0
        })

        //背景音乐
        //this.load.audio('background_music', [
        //    'audio/background_music.mp3'
        //])
        
        //this.load.audio('burst_music', [
        //    'audio/burst_music.mp3'
        //])
     
    }

    create() {
        var self = this
        //if (this.cache.audio.has('background_music')) {
        //   this.background_music = this.sound.add('background_music').play({loop: true}) 
        //}
        
        var logicObj = this.logicModel.run(this)
        
        //开始游戏按钮
        this.enterDiv = self.add.image(965, 515, 'queding')
            .setOrigin(0, 0) //设置图片位置是否中间开始
            .setAlpha(1)
            .setInteractive({useHandCursor: true}) 
            .on('pointerdown', function () {
                console.log("+++++++开始游戏按钮+++++++")
                let show = self.netModel.run(logicObj)
                logicObj.run(show.id, show.gem, parseInt(show.steam_coins))
            }, self)

        this.autoEnterDiv = self.add.image(965, 595, 'tuoguan')
            .setOrigin(0, 0) //设置图片位置是否中间开始
            .setAlpha(1)
            .setInteractive({useHandCursor: true}) 
            .on('pointerdown', function(){
                logicObj.autoRun(self) 
            }, self)
        
        /*      
        //设置按钮      
        self.settingDiv =  self.add.image(917, 16, 'shezhi')
            .setOrigin(0, 0) //设置图片位置是否中间开始
            .setAlpha(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', function () {
                alert("1")
            }, self)
            */
       
        //帮助按钮   
        self.helpDiv = self.add.image(1045, 20, 'bangzhu')
            .setOrigin(0, 0) //设置图片位置是否中间开始
            .setAlpha(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', function () {
                logicObj.help(self) 
            }, self)
 
        //退出按钮
        self.outloginDiv =  self.add.image(1160, 20, 'tuichu')
            .setOrigin(0, 0) //设置图片位置是否中间开始
            .setAlpha(1)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', function () {
                //if (this.background_music) this.background_music.stop() 
                //this.scene.start('EndScene', "is login out?") 
                
                logicObj.notic("是否退出？", function(flag){ 
                    console.log(333)
                    if (flag) {  
                        window.history.go(-1);  
                        console.log(444)
                    }
                })

            }, self)
    }

    update() {
        
    }
}








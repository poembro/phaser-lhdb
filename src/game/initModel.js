export default class initModel {
 
    
    init (self) {
        self.load.image('preloader', 'preloader.png')
        self.load.image('background_img', 'background.png')
        
        self.load.spritesheet({key:"people",url:'block/people.png',frameConfig:{frameWidth: 360,frameHeight: 593, startFrame: 0, endFrame: 32}}) //ren
        
        self.load.spritesheet({key:"11",url:'block/baiyu.png',frameConfig:{frameWidth: 100,frameHeight: 100, startFrame: 0, endFrame: 63}}) //白玉
        self.load.spritesheet({key:"12",url:'block/biyu.png',frameConfig:{frameWidth: 100,frameHeight: 100, startFrame: 0, endFrame: 63}}) //碧玉
        self.load.spritesheet({key:"13",url:'block/moyu.png',frameConfig:{frameWidth: 100,frameHeight: 100, startFrame: 0, endFrame: 63}}) //墨玉
        self.load.spritesheet({key:"14",url:'block/manao.png',frameConfig:{frameWidth: 100,frameHeight: 100, startFrame: 0, endFrame: 63}}) //玛瑙
        self.load.spritesheet({key:"15",url:'block/hupo.png',frameConfig:{frameWidth: 100,frameHeight: 100, startFrame: 0, endFrame: 63}}) //琥珀
 
        self.load.spritesheet({key:'boom', url:'block/explosion.png', frameConfig:{ frameWidth: 64, frameHeight: 64, endFrame: 23 }})//爆炸
        
        self.load.image('16', 'jinzuan.png');           //金砖
        self.load.image('26', 'jinzuan.png');           //金砖
        self.load.image('36', 'jinzuan.png');           //金砖

        self.load.image('currentGameScoreBackground', 'currentGameScoreBackground.png'); //得分背景

        self.load.image('jia', 'jia.png');              //加号
        self.load.image('jian', 'jian.png');            //减号
        self.load.image('queding', 'queding.png');      //确定 
        self.load.image('tuoguan', 'tuoguan.png');      //托管 

        self.load.image('bangzhu', 'bangzhu.png'); 
        self.load.image('help_desc', 'help_desc.png');
        self.load.image('help_desc2', 'help_desc2.png');
        //self.load.image('shezhi', 'shezhi.png');        //设置
        self.load.image('tuichu', 'tuichu.png');        //退出

        self.load.image('hqueding', 'hqueding.png');    //点击灰色确定按钮触发的事件 
        //self.load.image('cz', 'cwall.png');             //闯关的砖头
        //self.load.image('xz', 'xwall.png');       
        //self.load.image('lz', 'lz.png');
        self.load.image('01', '01.png');
        //self.load.image('02', '02.png');
        //self.load.image('03', '03.png');
        self.load.image('qtg', 'qtg.png');

        self.load.image('notic', 'notic.png');
        self.load.image('enterNotic', 'enterNotic.png');
        self.load.image('unEnterNotic', 'unEnterNotic.png');


        //self.load.video('wormhole', 'audio/wormhole.mp4', 'loadeddata', false, true);
        return this
    }

    run () {
        //console.log(2222)
    }
}
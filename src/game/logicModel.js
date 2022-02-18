export default class logicModel {

    init (self) { 
        return this
    }

    getQueryString (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    
    run (self) {
        var double = this.getQueryString('level')
        if (double) {
            double = parseInt(double)
        }else{
            double = 1
        }

        var steam_coins = this.getQueryString('coins')
        if (steam_coins) {
            steam_coins = parseInt(steam_coins)
        }else{
            steam_coins = 0
        }
        
        return logic.init(self, double, steam_coins) 
    }
}

//只处理游戏逻辑，与动画    金币等逻辑不管
var logic = {
    is_runing:false,
    history:{id : 0, footer:[], top:[], addscore:0, basescore:0},
    game : null,
    level : 1,
    tmpTopSprite : [],
    tmpFooterSprite : [],
    gem : [], 
    autoEnterFlag : false, //托管标识
    doubleSubClick: function(game){
        if (this.is_runing) {
            console.log("正在运行中")
            return
        }

        if(this.double == 0){
            this.double = 5;
            this.score = 1;
        } else if(this.double == 1){
            this.double = 0;
            this.score = 0;
        } else{
            this.double--;
        }
        this.dianshu(game);
    },
    doubleAddClick: function(game){
        if (this.is_runing) {
            console.log("正在运行中")
            return
        }
        if(this.double == 0) {
            this.double = 1;
            this.score = 1;
        } else if(this.double == 5){
            this.double = 0;
            this.score = 0;
        } else{
            this.double++;
        }
        this.dianshu(game);
    }, 
    scoreSubClick: function(game) {
        if (this.is_runing) {
            console.log("正在运行中")
            return
        }
        if(this.score == 1){
            //this.double = 0;
            this.score--;
        } else if(this.score == 0){
            this.score = 20;
            //this.double = 1;
        } else{
            this.score--;
        }
        this.dianshu(game);
    },
    scoreAddClick: function(game){
        if (this.is_runing) {
            console.log("正在运行中")
            return
        }
        if(this.score == 0){
            //this.double = 1;
            this.score = 1;
        } else if(this.score == 20){
            //this.double = 0;
            this.score = 0;
        } else{
            this.score++;
        }
        this.dianshu(game);
    },
    doubleText: null, //加倍
    scoreText : null, //分数
    golds :[], //金钻倍数图片 
    goldsText :[],//金钻倍数文字 x 100

    totalGameScoreText: null, //总游戏点数
    currentGameScoreText: null, //当次游戏点数
    
    //对于投注封装的一个函数
    dianshu: function(game) {
        //是否是再次进入游戏 
        //for(var i = 0; i < 5; i++){
            //if(this.golds[i] != null){
                //this.golds[i].destroy()
            //}
            //this.goldsText[0].text = ''
        //}
        //根据传过来的参数创建新的对象
        //for(var i = 0; i < this.double; i++){
            //this.golds[i] = game.add.sprite(270, 135+55*i, '16')
            this.goldsText[0].text = this.score * this.double * 10
        //}
        this.doubleText.text = this.double;
        this.scoreText.text = this.score * this.double * 10
    },
    downLevel :[], //下面砖块
    rightLevel :[], //下面砖块
    leftLevel :[], //下面砖块
    double: 0, //加倍
    score : 0, //分数
    init : function(game, double, steam_coins) {
        var self = this
        this.game = game 
        this.score = 0 
        this.double = double
        //加注按钮 
        game.add.image(968, 437, 'jian').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ this.scoreSubClick(game) }, this) 
        game.add.image(1150, 437, 'jia').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ this.scoreAddClick(game) }, this)

        //为单注点数文本信息赋初始值
        //for(var i = 0; i < 5; i++){
        this.goldsText[0] = game.add.text(1075, 355+55*0, '0', {fontSize: '20px', fill: '#FFFFFF', fontFamily: 'Arial', color: '#FFFFFF', align: 'center'}).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true})
        //}
   
        //倍数 (不显示 )
        this.doubleText = game.add.text(1025, 310, '0', { fontSize: '20px', fill: '#D2691E', fontFamily: 'Arial', color: '#D2691E', align: 'center'}).setOrigin(0, 0).setAlpha(0).setInteractive({useHandCursor:true}) 
        //点数
        this.scoreText = game.add.text(1075, 448, '0', {fontSize: '20px', fill: '#FFFFFF',fontFamily: 'Arial',  color: '#FFFFFF',  align: 'center'}).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true}) 

        //总分值
        this.totalGameScoreText = game.add.text(150, 80, steam_coins, { fontSize: '20px', fill: '#FFFFFF', fontFamily: 'Arial',  color: '#FFFFFF',  align: 'center'}).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true}) 
        //当前分值
        this.currentGameScoreText = game.add.text(220, 570, '0', {fontSize: '20px', fill: '#FFFFFF',fontFamily: 'Arial', color: '#FFFFFF', align: 'center'}).setOrigin(0, 0).setAlpha(0.01).setInteractive({useHandCursor:true}) 
        

        var tmp = game.add.sprite(200, 300, 'people')
        game.anims.create({
            key: 'people',
            frameRate: 8,
            repeat: -1, //循环播放动画
            frames: game.anims.generateFrameNumbers('people',{ start: 0, end: 32 })
        })
        tmp.play('people')
 
        return this 
    }, 
    noticSprite :null,
    textNoticSprite :null,
    enterNoticSprite :null,
    unEnterNoticSprite :null,
    notic: function( text, fun) {
        var self = this 
        var game = self.game
        self.noticSprite = game.add.image(408, 237, 'notic').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ }, this).setDepth(1)
        
        self.textNoticSprite = game.add.text(550, 350, text, {
            fontSize: '20px', fill: '#FFFFFF', fontFamily: 'Arial',  
            color: '#FFFFFF', align: 'center'
        }).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true}).setDepth(1)
        
        self.enterNoticSprite = game.add.image(440, 450, 'enterNotic').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ 
            //console.log(111)  
            self.closeNotic()
            fun(true)
        }, this).setDepth(1)

        self.unEnterNoticSprite = game.add.image(628, 450, 'unEnterNotic').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ 
            self.closeNotic()
            //console.log(222) 
            fun(false)
        }, this).setDepth(1)
    }, 
    closeNotic:function(){
        var self = this 
        if (self.noticSprite) {
            self.noticSprite.destroy()
        }
        if (self.textNoticSprite) {
            self.textNoticSprite.destroy()
        }
        if (self.enterNoticSprite) {
            self.enterNoticSprite.destroy()
        } 
        if (self.unEnterNoticSprite) {
            self.unEnterNoticSprite.destroy()
        }
    },
    helpSprite :null,
    help2Sprite :null,
    closeHelpSprite :null, 
    pageHelpSprite:null,
    help:function(game){
        var self = this 
        self.helpSprite = game.add.image(220, 100, 'help_desc').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ }, this).setDepth(1)
        self.help2Sprite = game.add.image(220, 100, 'help_desc2').setOrigin(0, 0).setAlpha(0).setInteractive({ useHandCursor: true }).on('pointerdown', function(){ }, this).setDepth(1)
        
        self.closeHelpSprite = game.add.text(900, 115, '         ', {
            fontSize: '20px', fill: '#FFFFFF',
            fontFamily: 'Arial', 
            color: '#FFFFFF', 
            align: 'center'
        }).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true}).on('pointerdown', function(){ 
            self.helpSprite.destroy()
            self.help2Sprite.destroy()
            self.pageHelpSprite.destroy()
            self.closeHelpSprite.destroy()
        }, this).setDepth(1)

        self.pageHelpSprite = game.add.text(540, 555, '                    ', {
            fontSize: '20px', fill: '#FFFFFF',
            fontFamily: 'Arial', 
            color: '#FFFFFF', 
            align: 'center'
        }).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true}).on('pointerdown', function(){ 
            if (self.helpSprite.alpha == 1) {
                self.helpSprite.setAlpha(0)
            }else {
                self.helpSprite.setAlpha(1)
            }
            if (self.help2Sprite.alpha == 1) {
                self.help2Sprite.setAlpha(0)
            }else {
                self.help2Sprite.setAlpha(1)
            }
        }, this).setDepth(1)
    },

    initScore: function(game, totalGameScore) { 
        if (this.double < 1) {
            alert("请选择注数")
            return false
        }
        if (this.score < 1) {
            this.notic("请选择攻击点数!", function(flag){ if (flag) { console.log("退出操作") }})
            return false
        }

        //花钱才能开局 
        /*
        var t = this.totalGameScoreText.text
        t = parseInt(t)
        if (t < 10 * (this.score * this.double)) {
            alert("金币不够了")
            return false
        } */
        if (totalGameScore < 10 * (this.score * this.double)) {
            this.notic("币不够了!", function(flag){ if (flag) { console.log("退出操作") }})
            return false
        }
        
        this.totalGameScoreText.text = totalGameScore - 10 * (this.score * this.double)

        //重置当前场次的得分情况
        this.currentGameScoreText.text = "0"
        
        //清理上一把的残局
        this.cleanGameScene(game)

        //清理上一把得分情况
        this.cleanScore() 
        return true
    },
    run : function(id, arr, totalGameScore){
        var self = this 
        var game = this.game 
        
        if (this.is_runing) {
            //console.log("正在运行中")
            return
        }
        
        //先打扫战场，初始化中奖分数
        var flag = this.initScore(game, totalGameScore) 
        if (!flag) { 
            //console.log("初始化 失败")
            return
        }
        this.is_runing = true  //运行过程中不得 去服务端拿下一局的数据

        var level = 1
        this.level = level

        this.tmpTopSprite = [] //用来接收顶部宝石的sprite对象
        this.tmpFooterSprite = []  //用来接收底部宝石的sprite对象
        this.tmpBurstSprite = []  //用来接收爆炸的sprite对象

        this.gem = arr.footer
        this.topGemPadding = arr.top.reverse()

        //收集历史
        this.history.footer = JSON.stringify(arr.footer) 
        this.history.id = id
 
        //用来接收底部宝石的sprite对象 
        for (var i = 0; i < level+3; i++) {
            this.tmpFooterSprite[i] = []
        }
    
        //初始化 顶部一排宝石块
        this.initTopGem(game) 
        //初始化 底部4*4宝石
        this.initFooterGem(game)
        game.enterDiv.setVisible(false) //隐藏确定按钮 
 
        // 遮挡开始按钮 
        if (game.unEnterDiv) { 
            game.unEnterDiv.setVisible(true)
        } else { 
            game.unEnterDiv = game.add.image(965, 515, 'hqueding').setOrigin(0, 0).setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function () { console.log("暂时不能点击") }, game)
        } 
        
        game.time.addEvent({ delay: 2000, callback: function() { this.is_gold_exists(game);  }, callbackScope: this })
        game.time.addEvent({ delay: 3000, callback: function() { this.is_success_exists(game); }, callbackScope: this })
    }, 
    
    autoRun: function(game) {
        var self = this
        self.autoEnterFlag = true 
        //1. 一但点击托管  则将其销毁托管
        game.autoEnterDiv.setVisible(false) 

        //2. 显示取消托管
        if (game.unAutoEnterDiv) { 
            game.unAutoEnterDiv.setVisible(true)
        } else {
            game.unAutoEnterDiv = game.add.image(965, 595, 'qtg').setOrigin(0, 0) 
            .setAlpha(1).setInteractive({ useHandCursor: true }).on('pointerdown', function () {
               console.log("暂时不能点击") 
               self.unAutoRun(game)
           }, game) 
        }
    
    },
    unAutoRun: function(game){
        var self = this
        self.autoEnterFlag = false 
        game.unAutoEnterDiv.setVisible(false) 

        if (game.autoEnterDiv) {
            game.autoEnterDiv.setVisible(true)
        } else {
            game.autoEnterDiv = game.add.image(965, 595, 'tuoguan')
            .setOrigin(0, 0) //设置图片位置是否中间开始
            .setAlpha(1)
            .setInteractive({useHandCursor: true}) 
            .on('pointerdown', function () {
                self.autoRun(game) 
              }, self)
        }
     

        if (game.unEnterDiv) {
            game.unEnterDiv.setVisible(false) 
        }
         //开始游戏按钮
        if (game.enterDiv) {
            game.enterDiv.setVisible(true)
        }
    }, 
    
    cleanGameScene : function(game) { 
        //console.log(this.tmpTopSprite) 
        //console.log(this.tmpFooterSprite)
        var len = this.tmpFooterSprite.length ? this.tmpFooterSprite.length : 0;
       
        if (len > 0) {
            for(var i = 0; i < len; i++){
                for(var j = 0; j < len; j++){
                    if (!this.tmpFooterSprite[i][j]) {
                        continue
                    }

                    var tmp = this.tmpFooterSprite[i][j] 
                    //爆炸动画
                    this._handle_burst_animation(tmp.x, tmp.y)

                    tmp.setVisible(false)
                    tmp.setActive(false) 
                }
            }
        }

        len = this.tmpTopSprite.length ? this.tmpTopSprite.length : 0;
        if (len > 0) {
            for(var i = 0; i < len; i++){
                if (!this.tmpTopSprite[i]) {
                    continue
                }  
                var tmp = this.tmpTopSprite[i]
                //爆炸动画
                this._handle_burst_animation(tmp.x, tmp.y) 
                tmp.setVisible(false)
                tmp.setActive(false) 
            }
        }

        console.log(this.tmpBurstSprite)
        
        //let arr = this.gemPoolGroup.getChildren()
        //console.log(arr.length)
        //arr.forEach(element => {
            //element.destroy()
        //    this.gemPoolGroup.killAndHide(element)
        //}); 
    },
    
    position: {
        1: {
            top:[{x:470,y:60}, {x:583,y:60}, {x:696,y:60}, {x:809,y:60}],
            footer:[
                [{x:470,y:650}, {x:583,y:650}, {x:696,y:650}, {x:809,y:650}],
                [{x:470,y:550}, {x:583,y:550}, {x:696,y:550}, {x:809,y:550}],
                [{x:470,y:450}, {x:583,y:450}, {x:696,y:450}, {x:809,y:450}],
                [{x:470,y:350}, {x:583,y:350}, {x:696,y:350}, {x:809,y:350}],
            ]
        },
        2: {
            top:[{x:505,y:50}, {x:570,y:50}, {x:635,y:50}, {x:700,y:50}],
            footer:[
                [{x:505,y:470}, {x:570,y:470}, {x:635,y:470}, {x:700,y:470}],
                [{x:505,y:410}, {x:570,y:410}, {x:635,y:410}, {x:700,y:410}],
                [{x:505,y:350}, {x:570,y:350}, {x:635,y:350}, {x:700,y:350}],
                [{x:505,y:290}, {x:570,y:290}, {x:635,y:290}, {x:700,y:290}],
            ]
        },
        3: {
            top:[{x:505,y:50}, {x:570,y:50}, {x:635,y:50}, {x:700,y:50}],
            footer:[
                [{x:505,y:470}, {x:570,y:470}, {x:635,y:470}, {x:700,y:470}],
                [{x:505,y:410}, {x:570,y:410}, {x:635,y:410}, {x:700,y:410}],
                [{x:505,y:350}, {x:570,y:350}, {x:635,y:350}, {x:700,y:350}],
                [{x:505,y:290}, {x:570,y:290}, {x:635,y:290}, {x:700,y:290}],
            ]
        },
    },
    
    initTopGem : function(game) {
        var level = this.level
        var gem = this.gem
        var position = this.position[level]['top'] 
        var tmp = null
        var key
        for (var i = 0; i < level+3; i++) {
            if (level == 1) { 
                key = level+''+gem[level+3][i]
                if (!this.tmpTopSprite[i]) {
                    this.tmpTopSprite[i] = game.add.sprite(position[i].x, position[i].y, key) 
                } 
                tmp = this.tmpTopSprite[i]
                tmp.setX(position[i].x)
                tmp.setY(position[i].y)
                tmp.setVisible(true)
                tmp.setActive(true)
             
                this.slideHandle(game, tmp, i * 100 + 300, tmp.x, position[i].x, 0, position[i].y) 
                // 自身旋转动画
                tmp.valgem = gem[level+3][i]
                this.tmpTopSprite[i] = tmp
                /*
                game.anims.create({
                    key: key,
                    frameRate: 11,
                    repeat: 1, //循环播放动画
                    frames: game.anims.generateFrameNumbers(key, { start: 0, end: 63 })
                })
                tmp.play(key) 
                 */
            }
        }
    },
    
    initFooterGem : function(game){
        var gem = this.gem
        var level = this.level
        var position = this.position[level]['footer']
        var tmp = null
        var key
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                key = level+''+gem[i][j]
                if (level == 1) {
                    if (!this.tmpFooterSprite[i][j]) {
                        this.tmpFooterSprite[i][j] = game.add.sprite(position[i][j].x, position[i][j].y, key) 
                    }
                    tmp = this.tmpFooterSprite[i][j]
                    tmp.setX(position[i][j].x)
                    tmp.setY(position[i][j].y)
                    tmp.setVisible(true)
                    tmp.setActive(true)
                    this.slideHandle(game, tmp, (i+1)*(j+1) * 100, tmp.x, position[i][j].x, 0, position[i][j].y)
                }
 
                tmp.valgem = gem[i][j] //给某对象标记1个value值上去
                this.tmpFooterSprite[i][j] = tmp

                if (gem[i][j] == 6) continue
                /*
                game.anims.create({
                    key: key,
                    frameRate: 7,
                    repeat: -1, //循环播放动画
                    frames: game.anims.generateFrameNumbers(key, { start: 0, end: 63 }) 
                })
                tmp.play(key)
                */
            }
        }
        return true 
    },
    tmpBurstSprite : [],
    // 爆炸动画
    _handle_burst_animation: function(x, y) {
        var tmp = null

        if (this.tmpBurstSprite[x] && this.tmpBurstSprite[x][y]) {
            tmp = this.tmpBurstSprite[x][y]
            tmp.setX(x)
            tmp.setY(y)
            tmp.setVisible(true)
            tmp.setActive(true)
        } else {
            tmp = this.game.add.sprite(x, y, 'boom')
            if (!this.tmpBurstSprite[x]) {
                this.tmpBurstSprite[x] = []
            }
            this.tmpBurstSprite[x][y] = tmp
        }
        tmp.play('explode1')
    },
    //判断是否有金钻 
    is_gold_exists : function (game) {
        var level = parseInt(this.level)
        //console.log("---11111111111-> 判断是否有金钻后  gem     level:" + level) 
        //console.log(JSON.stringify(gem)) 
        for(var i = 0; i < level+3; i++){ // 行 
            for(var j = 0; j < level+3; j++){ //列
                if(this.gem[i][j] === 6) {
                    //销毁金钻
                    var tmp = this.tmpFooterSprite[i][j] 
                    /**
                    game.anims.create({
                        key: 'explode2',
                        frames: game.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
                        frameRate: 50,
                        repeat: 0
                    });
                    game.add.sprite(tmp.x, tmp.y, 'boom').play('explode2'); 
                     */ 
                    //爆炸动画
                    this._handle_burst_animation(tmp.x, tmp.y)

                    tmp.setVisible(false)
                    tmp.setActive(false) 

                    //上方宝石下落
                    for (var t = i+1; t < level+3; t++) { //i + 1 表示金钻上面1行
                        var tmp = this.tmpFooterSprite[t][j]
                        this.slideHandle(game, tmp, 400, tmp.x, tmp.x, tmp.y, tmp.y+100)
                        //console.log(gem[t][j], "给" , gem[t-1][j]) 
                        
                        this.gem[t-1][j] = this.gem[t][j]  //金钻上面一行的某位置 值赋值给 下面一行的某位置
                        //console.log("金钻上面一行的x位置t:" + t + "   j:" + j + "-->gem[t][j]=" + gem[t][j] + " 而金钻位置gem[t-1][j]=" + gem[t-1][j]  )
                        this.tmpFooterSprite[t-1][j] = tmp
                    }
    
                    if (level == 1) {
                        var tmp = this.tmpTopSprite[j] 
                        this.slideHandle(game, tmp, 400, tmp.x, tmp.x, tmp.y, 350) 
 
                        //console.log(gem[level+3][j], "---给---", gem[level+2][j]) 
                        this.gem[level+2][j] = this.gem[level+3][j] 
                        this.tmpFooterSprite[level+2][j] = this.tmpTopSprite[j]
                        
                        this.gem[level+3][j] = 0 
                        this._topGemPadding(game,j) 
                    }
                }
            }
        }
        //console.log(JSON.stringify(gem)) 
        //console.log("---11111111-> 判断是否有金钻后  gem   22222") 
    },
    topGemPadding : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    //顶部宝石的填充 (和初始化的逻辑有点像 注意优化)
    _topGemPadding : function(game, j) {
        var level = this.level 
        var position = this.position[level]['top']
        if (this.gem[level+3][j] != 0) return
         
        var a = this.topGemPadding.pop() // Math.round(Math.random()*4+1);
        
        //收集历史
        this.history.top.push(a)
        var key = level+''+a
        var tmp
        //console.log("---第" +j+ "列   顶部加载的颜色---> " + key)
        //console.log(j)
        //console.log(a)
        if (level == 1) {
            tmp = game.add.sprite(position[j].x, position[j].y, key)  
            this.slideHandle(game, tmp, 300, tmp.x, position[j].x, 0, position[j].y) 
            this.gem[level+3][j] = parseInt(a) 

            tmp.valgem = a
            //this.tmpTopSprite[j].destroy()
            this.tmpTopSprite[j] = tmp

           //循环播放动画
           /*
            game.anims.create({
                key: key,
                frameRate: 9,
                repeat: -1, 
                frames: game.anims.generateFrameNumbers(key,{ start: 0, end: 63 }) 
            })
            tmp.play(key)
            */
        } 
        return  
    },

    is_success_exists: function(game) {
        //判断是否有同样颜色的钻石匹配上
        //二维数组中找相邻颜色一致的色块思路
        //1.遍历这个二维数组，  
        //2.再将每个元素值, 递归遍历, 拿到的上下左右位置值一一对比。 
        //3.一旦value值相等 将其写入队列，
        //4.最后直接看这个队列有多少个元素,即表示相邻的色块有多少个
        var self = this
        var level = this.level 
        var objList = function (){
            this.list = []
        }
        this.checkOutList = [] 
        //console.log( JSON.stringify(this.gem ))
        for (var i = 0; i < level+3; i++) { 
            for (var j = 0; j < level+3; j++) {
                var checkInList = new objList()
                this._check_success(this.gem, i, j, checkInList, this.gem[i][j]) 
                if (checkInList.list.length > level + 2) {
                    this.checkOutList.push(checkInList.list)
                } 
            }
        }
        
        if (this.checkOutList.length <= 0) {
            //console.log("没有爆炸的钻石 1.准备下一把")
            this.is_runing = false
            //1.准备结算分数 每炸1次就要加一次分数
            var s  = this.addScore()
            this.history.addscore = s
            this.history.basescore = this.score * this.double * 10 //每把消耗
            this.history.footer = JSON.parse(this.history.footer)
            var gamedata = JSON.stringify(this.history)
            //console.log(gamedata)
            game.netModel.history(gamedata)
            
            this.history.basescore = 0
            this.history.footer = []
            this.history.top = []
            this.history.addscore = 0
            this.history.id = 0

            //1.自动进入下一把
            if (this.autoEnterFlag) { 
                game.time.addEvent({ delay: 500, callback: function() {
                    var show = game.netModel.run(self)
                    self.run(show.id, show.gem, parseInt(show.steam_coins))
                }, callbackScope: this }) 
                return
            }
    
            //2.准备下一把 按钮的点击  
            game.enterDiv.setVisible(true)
            game.unEnterDiv.setVisible(false)
            return
        }
        
        this._handle_burst(game)
        
        //去处理填充 继续下落钻石
        //1.添补顶部钻石 
        //2.销毁底部、掉落动画并添补
        //console.log("有爆炸的钻石   去处理填充 继续下落钻石 和结算") 
        game.time.addEvent({ delay: 400, callback: function() { this._success_after_footer_gem_padding(game) }, callbackScope: this }); 
        game.time.addEvent({ delay: 700, callback: function() { this._success_after_top_gem_padding(game) }, callbackScope: this }); 
    },

    _check_success:function(gem, i, j, checkInList, num){
        var level = this.level 
        if (gem[i][j] == num) {
            if(checkInList.list.indexOf(i+''+j) == -1){
                checkInList.list.push(i+''+j)
            }
        }
        var left = checkInList.list.indexOf(i+''+(j-1))
        var right = checkInList.list.indexOf(i+''+(j+1))
        var down = checkInList.list.indexOf((i-1)+''+j)
        var up = checkInList.list.indexOf((i+1)+''+j)
        //左
        if (j > 0 && gem[i][j-1] == num && left == -1 ) {
            this._check_success(gem, i, j-1, checkInList, num); 
        }
        //右
        if (j + 1 <= level + 2 && gem[i][j+1] == num && right == -1) {
            this._check_success(gem, i, j+1, checkInList, num); 
        }
        //下
        if (i > 0 && gem[i-1][j] == num && down == -1) {
            this._check_success(gem, i-1, j, checkInList, num); 
        }
        //上
        if (i+1 <= level+2 && gem[i+1][j] == num & up == -1) {
            this._check_success(gem, i+1, j, checkInList, num); 
        }
        return ; 
    },
    _find_color_len:function(list, num){
        var gem = this.gem 
        var total = 0
        var len = list.length
        for(var i = 0; i < len; i++){
            var a = list[i][0] 
            var b = parseInt(a.substring(0, 1));  
            var c = parseInt(a.substring(1, 2));  
            
            if (gem[b][c] == num) {
                total++
            }
        }
        return total
    },

    score_rule: {
        1: {
            1:{ 4:2,5:4,6:5,7:8,8:10,9:20,10:30,11:50,12:100,13:200,14:400,15:600,16:1600}, // 级别为1的时候, 1号(白玉),炸了4个得2分
            2:{ 4:4,5:5,6:10,7:20,8:30,9:50,10:100,11:250,12:500,13:750,14:800,15:1600,16:3200}, // 级别为1的时候, 2号(蓝玉),炸了4个得4分
            3:{ 4:5,5:10,6:20,7:40,8:80,9:160,10:500,11:1000,12:2000,13:5000,14:6000,15:12000,16:24000}, // 级别为1的时候, 3号(墨玉),炸了4个得4分
            4:{ 4:10,5:30,6:50,7:60,8:100,9:750,10:1000,11:10000,12:20000,13:50000,14:60000,15:120000,16:240000}, // 级别为1的时候, 4号(翡翠玉),炸了4个得4分
            5:{ 4:20,5:50,6:100,7:500,8:1000,9:2000,10:5000,11:20000,12:50000,13:60000,14:120000,15:240000,16:480000}, // 级别为1的时候, 5号(红玉),炸了4个得4分
        },  
    },
    _handle_score: function(level, color, len) {
        if (this.score_rule[level] && this.score_rule[level][color] &&  this.score_rule[level][color][len]) {
            return this.score_rule[level][color][len]
        }
        return 0
    },

    //处理爆炸
    _handle_burst:function(game) {
        var gem = this.gem
        var level = this.level 
        var list = this.checkOutList
 
        var obj = []
        var gemColor = []
        //准备去算分
        var listLen = list.length
        for (var i = 0; i < listLen; i++) {
            var a = list[i][0]  // "01"
            var b = parseInt(a.substring(0, 1)); // "0"
            var c = parseInt(a.substring(1, 2)); // "1"

            if (!gemColor.includes(gem[b][c])) {
                gemColor.push(gem[b][c])
                
                var len = this._find_color_len(list, gem[b][c]) 
                var score = this._handle_score(level, gem[b][c], len) 
                console.log("+++++++改过分数 规则后+++++" , score)
                obj.push({color:gem[b][c],len:len,score:score})
            }
        }
        //console.log(gemColor) 
        //console.log(obj) 
        this.scoreHandle(game, obj)

        this.checkOutList = []
        
         
        //console.log("--------当前砖石精灵坐标---------")
        //console.log(this.tmpFooterSprite) 
        //console.log("--------消除动画---------")
        //console.log(JSON.stringify(list)) 

        //消除动画部分
        var flag = false 
        for (var i = 0; i < listLen; i++) {
            for(var j = 0; j < list[i].length; j++){
                var a = list[i][j];
                var x = parseInt(a.substring(0, 1));
                var y = parseInt(a.substring(1, 2));
                
                
                var tmp =  this.tmpFooterSprite[x][y] 
                //爆炸动画
                this._handle_burst_animation(tmp.x, tmp.y)
                //console.log("--------消除 --------->" + tmp.valgem)
                //tmp.destroy() 
                tmp.setVisible(false)
                tmp.setActive(false) 

                this.gem[x][y] = 0; //已经爆炸的位置 置零

                flag = true 
            }
        }
        if (flag) {
            //game.sound.add('burst_music', { loop: false,volume: 1 }).play()
        }

    },

    //补上爆炸后的宝石，下落动画，及顶部填充
    _success_after_top_gem_padding: function(game) {
        var level = this.level  
        var b = 0;
        for(var i = 0; i < level+3; i++){ // 行 
            for(var j = 0; j < level+3; j++){  //列
                if (this.gem[i][j] == 0) {
                    var a = level+2 - i; 

                    if(level == 1) {
                        var tmp = this.tmpTopSprite[j]
                        this.slideHandle(game, tmp, 200+100*b, tmp.x, tmp.x, tmp.y, 350+a*100) 
                        
                        this.gem[i][j] = this.gem[level+3][j]
                        this.tmpFooterSprite[i][j] = tmp
                            
                        this.gem[level+3][j] = 0
                        //this.tmpTopSprite[j].destroy()
                        //按理说存在一种可能就是 这里值给了但是 图不对 TODO   start
                        this._topGemPadding(game, j) 
                        //console.log("--------添补后的情况--------") 
                        //console.log(JSON.stringify(this.gem))
                    }
                    b++;
                }
            }
        }
        
        game.time.addEvent({ delay: 4000, callback: function() { 
            //console.log("------>  is_success_exists(game) ") 
            //console.log(JSON.stringify(this.gem)) 
            this.is_success_exists(game)
        }, callbackScope: this }); 
    }, 

    //处理相同颜色的钻石 爆炸 及填充
    _success_after_footer_gem_padding:function(game){
        var level = this.level  
        for(var i = 0; i < level+3; i++){
            for (var j = 0; j < level+3; j++){
                if (this.gem[i][j] != 0) { //等于0的表示都已经被炸了 
                    continue
                }

                for(var t = i+1; t < level+3; t++){ 
                    if (this.gem[t][j] == 0) {  //i表示列 每列的上一行 的j位置 被炸的不考虑下落动画
                        continue
                    }

                    for(var k = i; k < t; k++){ 
                        if (this.gem[k][j] != 0){ //已经被炸不处理 
                            continue
                        } 
                        //没有被炸的 需要开始下落
                        //console.log(JSON.stringify(this.gem))
                        var a = t-k; 
                        var tmp = this.tmpFooterSprite[t][j] 
                        this.slideHandle(game, tmp, 400, tmp.x, tmp.x, tmp.y, tmp.y+100*a) 
                        
                        //console.log(this.gem[t][j])
                        //console.log("##给##")
                        //console.log(this.gem[k][j])

                        this.gem[k][j] = this.gem[t][j]
                        this.tmpFooterSprite[k][j] = tmp
                        this.gem[t][j] = 0; 
                        break; 
                    }
                }  
            }
        } 
        //console.log("--------爆炸之后的情况--------")
        //console.log(JSON.stringify(this.gem))
    },
    
    gemSuccessOne : [],
    gemSuccessTwo : [],
    gemSuccessThree : [],


    addScore : function(){
        var t = this.currentGameScoreText.text 
        t = parseInt(t)
        if (t <= 0) {
            return 0
        }
         
        var t2 = this.totalGameScoreText.text
        this.totalGameScoreText.text = parseInt(t2) + t
   
        this.currentGameScoreText.text = 0 
        return t
    },

    cleanScore : function(){
        for(var i = 0; i < 5; i++){
            if (this.gemSuccessOne[i]) {
                this.gemSuccessOne[i].destroy();
            }
            if (this.gemSuccessTwo[i]) {
                this.gemSuccessTwo[i].destroy();
            }
            if (this.gemSuccessThree[i]) {
                this.gemSuccessThree[i].destroy();
            }
        }
    },

    //记分   参数表示 炸4个时候每个宝石多少分  炸5个时候多少分
    scoreHandle : function (game, obj) {
        var level = this.level
        this.cleanScore()
        
        var total = 0
        var score = 0
        for (var i = 0; i < obj.length; i++) {
            score = (this.double * this.score * obj[i]['score'])
            this.gemSuccessOne[i] = game.add.sprite(980, 120+80*i, level+''+ obj[i]['color'])
            this.gemSuccessTwo[i] = game.add.text(1040, 120+60*i, '×'+ obj[i]['len'] +'  获得', {
                fontSize: '14px', fontFamily: 'Arial', color: '#FFFFFF', align: 'center'
            }).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true})

            this.gemSuccessThree[i] = game.add.text(1160, 120+60*i, score , {
                fontSize: '14px', fontFamily: 'Arial', color: '#FFFFFF', align: 'center' 
            }).setOrigin(0, 0).setAlpha(1).setInteractive({useHandCursor:true})

            total += score 
        }
        //console.log("---total--->" + total)

        var t = this.currentGameScoreText.text 
        t = parseInt(t)
        this.currentGameScoreText.text = total + t

        this.scoreBackground(t)
     
        return
    },
    scoreBgSprite: null,
    scoreBackground:function(num){
        var self = this
        var game = this.game
        //得分动画 
        if (!this.scoreBgSprite) {
            this.scoreBgSprite = game.add.sprite(-305, 570, "currentGameScoreBackground")
        }
        this.scoreBgSprite.setVisible(true)
        this.scoreBgSprite.setActive(true) 

        this.slideHandle(game, this.scoreBgSprite, 800, -305, 153, 570, 570, false, function() {
            //console.log("开始隐藏")
            self.currentGameScoreText.setAlpha(1).setDepth(1)

            game.time.addEvent({ delay: 1500, callback: function() {
                self.currentGameScoreText.setAlpha(0).setDepth(0) 
                self.slideHandle(game, self.scoreBgSprite, 1200, 153, -305, 570, 570, false, function(){ 
                    self.scoreBgSprite.setVisible(false)
                    self.scoreBgSprite.setActive(false)
                })
              }, callbackScope: this })
        })
    },


    slideHandle : function(game, spriteObj,durationTime, startX, endX, startY, endY, ease, callback) {
        return game.add.tween({
            targets: [spriteObj],
            ease: ease ? ease : 'Linear', //缓动功能。如果未设置，则默认为Phaser.Easing.Default，默认为Phaser.Easing.Linear.None，但可以覆盖
            duration: durationTime, //动画过程耗时
            delay: 0, //多久后开始动画
            //loop:1,  // 循环执行，-1 无限，5 5次
            x: {
               getStart: () => startX,
               getEnd: () => endX,
            },
            y: {
               getStart: () => startY,
               getEnd: () => endY,
            },
            alpha: {
               getStart: () => 0,
               getEnd: () => 1
            },
             onComplete: () => {
                 if (callback) callback()
                //console.log(callback)
            }
        })
    }
}

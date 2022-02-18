//创建game对象
var config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720, 
    parent    : 'appmain',
    title     : 'hello app main'
};
var game = new Phaser.Game(config);

//设置全局变量
game._URL = 'http://localhost:8080/'
game._USER_ID = 0;


//创建一个结点类
function Point(){
    //横坐标
    var x;
    //纵坐标
    var y;
    //上一级的横坐标
    var parentX;
    //上一级的纵坐标
    var parentY;
    this.getX = function(){
        return x;
    }
    this.setX = function(x){
        this.x = x;
    }
    this.getY = function(){
        return y;
    }
    this.setY = function(y){
        this.y = y;
    }
    this.getParentX = function(){
        return parentX;
    }
    this.setParentX = function(parentX){
        this.parentX = parentX;
    }
    this.getParentY = function(){
        return parentY;
    }
    this.setParentY = function(parentY){
        this.parentY = parentY;
    }
    this.toString = function(){
        return "Point [x=" + x + ", y=" + y + ", parentX=" + parentX + ", parentY=" + parentY + "]";
    }
}

//创建一个字典类
function Dictionary(){
    this.dataStore = [];
    //添加元素
    this.add = function(key, value){
        this.dataStore[key] = value;
    }
    //查找元素
    this.find = function(key){
        return this.dataStore[key];
    }
    //删除元素
    this.remove = function(key){
        if(this.dataStore[key]){
            delete this.dataStore[key];
        }
        else{
            return 'Not Found';
        }
    }
    //字典中元素的个数
    this.count = function(){
        var n = 0;
        for(var key in this.dataStore){
            ++n;
        }
        return n;
    }
    //显示字典元素
    this.showAll = function(){
        for(var key in this.dataStore){
            console.log(key + '->' + this.dataStore[key]);
        }
    }
    //清空字典
    this.clear = function(){
        for(var key in this.dataStore){
            delete this.dataStore[key];
        }
    }

}

 
 














//是否是再次进入游戏
var isRin = 0;
//注数
var zhushu = 0;
//注数对象，kill用的
var zhu = new Array(5);
//注数的文本信息
var zhushuText;
//单注点数
var dzds = 0;
//左侧单注点数文本信息
var dzdsText = new Array(5);
//右侧单注点数的文本信息
var danzhudianshuText;
//关卡数
var level = 1;
//墙数
//var wall = 15;
//钻头出现的概率,Math.random()生成的随机数范围在[0,1)之间
var ariseProbability = 0.8;
//宝石矩阵
var gem;
//预留的宝石
//var rGem;
//判断一局游戏是否完成,若没完成，按确定键将不会下落宝石
var isOneOver = 1;
//用来接收宝石的sprite对象
var bs;
//用来接收预留宝石的sprite对象
var rbs;
//确定按钮被点击的标志
//var queding = 0;
//确定按钮对象
var qd;
//灰色确定按钮对象
var hqd;
//时间对象
//var now;
//有金钻的标志
//var jz = 0;
//一场游戏结束的标志
//var oneover = 0; 
//右边墙的对象集合
var yzhuan = new Array(15);
//右边墙的个数
var ywall = 15;
//左边墙的对象集合
var zzhuan = new Array(15);
//左边墙的个数
var zwall = 15;
//下边墙的对象集合
var xzhuan = new Array(15);
//下边墙的个数
var xwall = 15;
//本场游戏点数
var bdianshu = 0;
//总游戏点数
var zdianshu = 200000;
//需要清空的标志
var qingkong = 0;
//右侧中奖信息
var zjxx1 = new Array(5);
var zjxx2 = new Array(5);
var zjxx3 = new Array(5);
//关卡改变的标志
var change = 0;
//右边的墙是否消除完毕
//var yw = 0;
//左边的墙是否消除完毕
//var zw = 0;
//总游戏点数的文本信息
var zdstext;
//本场游戏点数的文本信息
var bdstext;
//帮助按钮
var bz1;
var bz2;
var bz3;
var bz4;
var bz5;
var bz6;
//帮助中的关闭按钮
var gb;
//帮助中的上一页和下一页
var syy;
var xyy;
//累计奖的文本信息
var ljtext;
//关数的图片
var gpicture;
//托管按钮对象
var tg;
//取消托管按钮对象
var qtg;
//托管按钮被点击
var tgsign = 0;
//刚开始游戏的标志
var oneSign = 1;

//游戏场景
glb.scene.play = {

    //创建相应界面
    create: function(){
        this.add.sprite(0, 0, 'bg');
        this.add.button(917, 16, 'shezhi', this.shezhiClick, this);
        this.add.button(1015, 16, 'bangzhu', this.bangzhuClick, this);
        this.add.button(1110, 16, 'tuichu', this.tuichuClick, this);
        
        
        this.add.button(920, 300, 'jian', this.jian1Click, this);
        this.add.button(1098, 300, 'jia', this.jia1Click, this);
        this.add.button(920, 382, 'jian', this.jian2Click, this);
        this.add.button(1098, 382, 'jia', this.jia2Click, this);
        qd = this.add.button(940, 450, 'queding', this.quedingClick, this);
        tg = this.add.button(940, 508, 'tuoguan', this.tuoguanClick, this);
        zhushuText = this.add.text(1025, 310, '0', { fontSize: '32px', fill: '#D2691E' });
        danzhudianshuText = this.add.text(1025, 393, '0', { fontSize: '32px', fill: '#D2691E' });
        //为单注点数文本信息赋初始值
        for(var i = 0; i < 5; i++){
            dzdsText[i] = this.add.text(220, 115+55*i, '', { fontSize: '32px', fill: '#000000' });
        }
        //添加下方的砖块
        for(var i = 0; i < 15; i++){
            xzhuan[i] = this.add.sprite(375+30.4*i, 529, 'xz');
        }
        //添加右侧的砖块
        for(var i = 0; i < 15; i++){
            yzhuan[i] = this.add.sprite(783, 497-32*i, 'cz');
        }
        //yzhuan[0] = this.add.sprite(783, 497-32, 'cz');
        //添加左侧砖块
        for(var i = 0; i < 15; i++){
            zzhuan[i] = this.add.sprite(375, 497-32*i, 'cz');
        }
        //添加右侧中奖信息的文本
        for(var i = 0; i < 5; i++){
            zjxx2[i] = this.add.text(980, 80+36*i, '', { fontSize: '10px', fill: '#000000' });
            zjxx3[i] = this.add.text(1100, 80+36*i, '', { fontSize: '10px', fill: '#000000' });
        }
        zdstext = this.add.text(218, 452, zdianshu, { fontSize: '10px', fill: '#D26900' });
        bdstext = this.add.text(220, 519, '0', { fontSize: '10px', fill: '#D26900' });
        ljtext = this.add.text(218, 61, zdianshu+'', { fontSize: '10px', fill: '#D26900' });
        gpicture = this.add.sprite(578, 16, '01');
    },

    //游戏的循环
    /*
    update: function(){
        now = game.time.now;
        //金钻的消除,定时的思想
        if(queding == 1&& now-bs.now>4000&& now-bs.now<5000){
            //console.log(gem);
            this.hasJZ(bs, rbs);
            this.zj();
        }
    },
    */

    shezhiClick: function(){

    },

    bangzhuClick: function(){
        bz1 = this.add.sprite(300, 100, 'bz1');
        //bz1.scalescale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy1Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy1Click, this);
    },

    syy1Click: function(){
        //xyy.kill();
    },

    xyy1Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz1.kill();
        bz2 = this.add.sprite(300, 100, 'bz2');
        //bz2.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy2Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy2Click, this);
    },

    syy2Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz2.kill();
        bz1 = this.add.sprite(300, 100, 'bz1');
        //bz1.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy1Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy1Click, this);
    },

    xyy2Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz2.kill();
        bz3 = this.add.sprite(300, 100, 'bz3');
        //bz3.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy3Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy3Click, this);
    },

    syy3Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz3.kill();
        bz2 = this.add.sprite(300, 100, 'bz2');
        //bz2.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy2Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy2Click, this);
    },

    xyy3Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz3.kill();
        bz4 = this.add.sprite(300, 100, 'bz4');
        //bz4.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy4Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy4Click, this);
    },

    syy4Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz4.kill();
        bz3 = this.add.sprite(300, 100, 'bz3');
        //bz3.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy3Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy3Click, this);
    },

    xyy4Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz4.kill();
        bz5 = this.add.sprite(300, 100, 'bz5');
        //bz5.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy5Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy5Click, this);
    },

    syy5Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz5.kill();
        bz4 = this.add.sprite(300, 100, 'bz4');
        //bz4.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy4Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy4Click, this);
    },

    xyy5Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz5.kill();
        bz6 = this.add.sprite(300, 100, 'bz6');
        //bz6.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy6Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy6Click, this);
    },

    syy6Click: function(){
        xyy.kill();
        syy.kill();
        gb.kill();
        bz6.kill();
        bz5 = this.add.sprite(300, 100, 'bz5');
        //bz5.scale.setTo(0.5, 0.5);
        gb = this.add.button(852, 100, 'gb', this.gbClick, this);
        syy = this.add.button(450, 445, 'syy', this.syy5Click, this);
        xyy = this.add.button(640, 445, 'xyy', this.xyy5Click, this);
    },

    xyy6Click: function(){

    },

    gbClick: function(){
        gb.kill();
        syy.kill();
        xyy.kill();
        if(bz1 != null){
            bz1.kill();
        }
        if(bz2 != null){
            bz2.kill();
        }
        if(bz3 != null){
            bz3.kill();
        }
        if(bz4 != null){
            bz4.kill();
        }
        if(bz5 != null){
            bz5.kill();
        }
        if(bz6 != null){
            bz6.kill();
        }
    },

    tuichuClick: function(){
        zhushu = 0;
        dzds = 0;
        isRin = 1;
        this.scene.start('menu');
        //var tcyx = this.add.sprite(600, 300, 'tcyx');
        //tcyx.anchor.set(0.5);
        //this.scene.start('menu');
        // console.log(zhushu);
        // console.log(dzds);
        // console.log(isRin);
    },
 

    jian1Click: function(){
        if(zhushu == 0){
            zhushu = 5;
            dzds = 1;
        }
        else if(zhushu == 1){
            zhushu = 0;
            dzds = 0;
        }
        else{
            zhushu--;
        }
        this.dianshu();
    },

    jia1Click: function(){
        if(zhushu == 0){
            zhushu = 1;
            dzds = 1;
        }
        else if(zhushu == 5){
            zhushu = 0;
            dzds = 0;
        }
        else{
            zhushu++;
        }
        this.dianshu();
    },

    jian2Click: function(){
        if(dzds == 1){
            zhushu = 0;
            dzds--;
        }
        else if(dzds == 0){
            dzds = 20;
            zhushu = 1;
        }
        else{
            dzds--;
        }
        this.dianshu();
    },

    jia2Click: function(){
        if(dzds == 0){
            zhushu = 1;
            dzds = 1;
        }
        else if(dzds == 20){
            zhushu = 0;
            dzds = 0;
        }
        else{
            dzds++;
        }
        this.dianshu();
    },

    //对于投注封装的一个函数
    dianshu: function(){
        //先把所有对象还原
        if(isRin == 0){
            for(var i = 0; i < 5; i++){
                if(zhu[i] != null){
                zhu[i].kill();
                }
                dzdsText[i].text = '';
            }
        }
        else{
            isRin = 0;
            for(var i = 0; i < 5; i++){
                zhu[i] = null;
            }
        }
        //根据传过来的参数创建新的对象
        for(var i = 0; i < zhushu; i++){
            zhu[i] = this.add.sprite(270, 115+55*i, 'jinzuan');
            dzdsText[i].text = 10*dzds;
        }
        zhushuText.text = zhushu;
        danzhudianshuText.text = dzds*10;
    },

    //点击确定按钮触发的事件
    quedingClick: function(){
        if(ywall == 0 && zwall == 15){
            level++;
            ywall--;
            yw = 1;
            change = 1;
            gpicture.kill();
            gpicture = this.add.sprite(578, 16, '02');
        }
        else if(zwall == 0 && xwall == 15){
            level++;
            zwall--;
            zw = 1;
            change = 1;
            gpicture.kill();
            gpicture = this.add.sprite(578, 16, '03');
        }
        //console.log(qingkong);
        if(zhushu != 0){
            if(qingkong == 1){
                this.qk();
            }
            if(oneSign == 1){
                this.zy();
                oneSign = 0;
            }
            else if(oneSign == 0){
                game.time.events.add(600, this.zy, this);
            }
        }
    },

    //从quedingClick函数中分离出来的函数
    zy: function(){
        this.touzhu();
        //用来接收宝石的sprite对象
        bs = new Array(level+3);
        for(var i = 0; i < level+3; i++){
            bs[i] = new Array(level+3);
        }
        //用来接收预留宝石的sprite对象
        rbs = new Array(level+3);
        //填充gem宝石矩阵
        this.createGem();
        //填充rGem宝石矩阵
        //this.getReserved();
        //gem宝石矩阵下落
        this.fall();
        //rGem宝石矩阵下落
        this.rfall();
        //bs.now = game.time.now;
        //bs[0][0] = bs[1][0];
        //bs[1][0].kill();
        //console.log(bs[1][0].y);
        //console.log(bs[0][0].y);
        qd.kill();
        hqd = this.add.button(940, 450, 'hqueding', this.hquedingClick, this);
        game.time.events.add(4000, this.hasJZ, this);
        game.time.events.add(6000, this.zj, this);
        //queding = 1;
    },

    //点击灰色确定按钮触发的事件
    hquedingClick: function(){

    },

    //点击托管触发的事件
    tuoguanClick: function(){
        tg.kill();
        qtg = this.add.button(940, 508, 'qtg', this.qxtuoguanClick, this);
        tgsign = 1;
        this.quedingClick();
    },

    //点击取消托管按钮触发的事件
    qxtuoguanClick: function(){
        tgsign = 0;
        qtg.kill();
        tg = this.add.button(940, 508, 'tuoguan', this.tuoguanClick, this);
    },

    //生成宝石矩阵的函数
    //1表示白宝石，2表示白钻石，3表示红宝石，4表示琥珀，5绿宝石
    createGem: function(){
        //创建一个线性表
        var list = new buckets.LinkedList();
        //像线性表中添加宝石
        this.addweight(list, 1, 30);
        this.addweight(list, 2, 25);
        this.addweight(list, 3, 20);
        this.addweight(list, 4, 15);
        this.addweight(list, 5, 10);
        //打乱矩阵顺序
        this.shuffle(list);

        
        //产生宝石二维矩阵并对gem进行填充
        gem = new Array(level+3);
        //console.log(gem);
        //console.log("-------------");
        for(var i = 0; i < level+4; i++){
            gem[i] = new Array(level+3);
            for(var j = 0; j < level+3; j++){
                gem[i][j] = list.elementAtIndex(Math.round(Math.random()*(list.size()-1)));
                //console.log(gem);
                //console.log("-----------");
            }
        }
        var ran = Math.random();
        //判断是否产生钻头,矩阵中数字0表示钻头
        if(ran < ariseProbability){
            var x = Math.round(Math.random()*(level+2));
            var y = Math.round(Math.random()*(level+2));
            gem[x][y] = 6;
            //jz = 1;
        }
        //console.log(gem);
        
    },

    /*
    //填充rGem矩阵
    getReserved: function(){
        var list = new buckets.LinkedList();
        this.addweight(list, 1, 30);
        this.addweight(list, 2, 25);
        this.addweight(list, 3, 20);
        this.addweight(list, 4, 15);
        this.addweight(list, 5, 10);
        this.shuffle(list);
        rGem = new Array(level+3);
        for(var i = 0; i < level+3; i++){
            rGem[i] = list.elementAtIndex(Math.round(Math.random()*list.size()));
        }
    },
    */

    //向数组中重复添加值
    addweight: function(weight, value, count){
        for(var i = 0; i < count; i++){
            weight.add(value);
        }
    },

    //随机打乱线性表排列的函数,随机洗牌算法
    shuffle: function(weight){
        var temp1;
        var temp2;
        var len = weight.size();
        for(var i = len-1;i > 0; i--){
            var ind = Math.round(Math.random()*i);
            //返回指定位置的元素
            temp1 = weight.elementAtIndex(ind);
            temp2 = weight.elementAtIndex(i);
            //交换两个元素的位置
            weight.add(temp2, ind);
            weight.add(temp1, i);
        }
    },

    /*
    //生成预留
    getReserved: function(){
        var list = new buckets.LinkedList();
        this.addweight(list, 1, 40);
        this.addweight(list, 2, 40);
        this.addweight(list, 3, 30);
        this.addweight(list, 4, 30);
        this.addweight(list, 5, 20);
        this.shuffle(list);
        rGem = new Array(level+3);
        for(var i = 0; i < level+3; i++){
            rGem[i] = list.elementAtIndex(Math.round(Math.random()*list.size()));
        }
        //console.log(rGem);

    },
    */

    //下落,下落时使用tween动画，from函数可以实现
    fall: function(){
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                this.location(i, j);    
            }
        }
        //bs.now = new Date().getTime();     
    },
    
    //判断下落位置
    location: function(i, j){
        if(level == 1){
            if(i == 0&& j == 0){
                bs[i][j] = this.add.sprite(470, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            
            else if(i == 0&& j == 1){
                bs[i][j] = this.add.sprite(535, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            
            else if(i == 0&& j == 2){
                bs[i][j] = this.add.sprite(600, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            
            else if(i == 0&& j == 3){
                bs[i][j] = this.add.sprite(665, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 0){
                bs[i][j] = this.add.sprite(470, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 1){
                bs[i][j] = this.add.sprite(535, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 2){
                bs[i][j] = this.add.sprite(600, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 3){
                bs[i][j] = this.add.sprite(665, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 0){
                bs[i][j] = this.add.sprite(470, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 900, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 1){
                bs[i][j] = this.add.sprite(535, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 2){
                bs[i][j] = this.add.sprite(600, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 3){
                bs[i][j] = this.add.sprite(665, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 0){
                bs[i][j] = this.add.sprite(470, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 1){
                bs[i][j] = this.add.sprite(535, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 2){
                bs[i][j] = this.add.sprite(600, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 3){
                bs[i][j] = this.add.sprite(665, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
        }
        else if(level == 2){
            if(i == 0&& j == 0){
                bs[i][j] = this.add.sprite(470, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 1){
                bs[i][j] = this.add.sprite(535, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 2){
                bs[i][j] = this.add.sprite(600, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 3){
                bs[i][j] = this.add.sprite(665, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 4){
                bs[i][j] = this.add.sprite(730, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 0){
                bs[i][j] = this.add.sprite(470, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 1){
                bs[i][j] = this.add.sprite(535, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 2){
                bs[i][j] = this.add.sprite(600, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 900, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 3){
                bs[i][j] = this.add.sprite(665, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 4){
                bs[i][j] = this.add.sprite(730, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 0){
                bs[i][j] = this.add.sprite(470, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 1){
                bs[i][j] = this.add.sprite(535, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 2){
                bs[i][j] = this.add.sprite(600, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 3){
                bs[i][j] = this.add.sprite(665, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 4){
                bs[i][j] = this.add.sprite(730, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 0){
                bs[i][j] = this.add.sprite(470, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 1){
                bs[i][j] = this.add.sprite(535, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 2){
                bs[i][j] = this.add.sprite(600, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1800, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 3){
                bs[i][j] = this.add.sprite(665, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1700, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 4){
                bs[i][j] = this.add.sprite(730, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1900, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 0){
                bs[i][j] = this.add.sprite(470, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 1){
                bs[i][j] = this.add.sprite(535, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 2){
                bs[i][j] = this.add.sprite(600, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 3){
                bs[i][j] = this.add.sprite(665, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 4){
                bs[i][j] = this.add.sprite(730, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
        }
        else if(level == 3){
            if(i == 0&& j == 0){
                bs[i][j] = this.add.sprite(405, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 1){
                bs[i][j] = this.add.sprite(470, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 2){
                bs[i][j] = this.add.sprite(535, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 3){
                bs[i][j] = this.add.sprite(600, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 4){
                bs[i][j] = this.add.sprite(665, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 0&& j == 5){
                bs[i][j] = this.add.sprite(730, 470, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 0){       
                bs[i][j] = this.add.sprite(405, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 700, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 1){
                bs[i][j] = this.add.sprite(470, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 2){
                bs[i][j] = this.add.sprite(535, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 3){
                bs[i][j] = this.add.sprite(600, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 900, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 4){
                bs[i][j] = this.add.sprite(665, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 1&& j == 5){
                bs[i][j] = this.add.sprite(730, 410, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 0){
                bs[i][j] = this.add.sprite(405, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 1){
                bs[i][j] = this.add.sprite(470, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 2){
                bs[i][j] = this.add.sprite(535, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 3){
                bs[i][j] = this.add.sprite(600, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 4){
                bs[i][j] = this.add.sprite(665, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1800, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 2&& j == 5){
                bs[i][j] = this.add.sprite(730, 350, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1700, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 0){
                bs[i][j] = this.add.sprite(405, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 1){
                bs[i][j] = this.add.sprite(470, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 2){
                bs[i][j] = this.add.sprite(535, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 1900, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 3){
                bs[i][j] = this.add.sprite(600, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 4){
                bs[i][j] = this.add.sprite(665, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 3&& j == 5){
                bs[i][j] = this.add.sprite(730, 290, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 0){
                bs[i][j] = this.add.sprite(405, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 1){
                bs[i][j] = this.add.sprite(470, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 2){
                bs[i][j] = this.add.sprite(535, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2700, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 3){
                bs[i][j] = this.add.sprite(600, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2800, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 4){
                bs[i][j] = this.add.sprite(665, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 2900, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 4&& j == 5){
                bs[i][j] = this.add.sprite(730, 230, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 5&& j == 0){
                bs[i][j] = this.add.sprite(405, 170, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3100, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 5&& j == 1){
                bs[i][j] = this.add.sprite(470, 170, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3300, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 5&& j == 2){
                bs[i][j] = this.add.sprite(535, 170, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3200, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 5&& j == 3){
                bs[i][j] = this.add.sprite(600, 170, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3400, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 5&& j == 4){
                bs[i][j] = this.add.sprite(665, 170, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3500, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }
            else if(i == 5&& j == 5){
                bs[i][j] = this.add.sprite(730, 170, level+''+gem[i][j]);
                var tween = this.add.tween(bs[i][j]);
                tween.from({y:0}, 3600, Phaser.Easing.Linear.None, true, 0, 0, false);
                bs[i][j].animations.add(level+''+gem[i][j]);
                bs[i][j].animations.play(level+''+gem[i][j], 5, true);
            }

        }
    },

    //判断是否有金钻
    hasJZ: function(){
        //console.log(rbs.now);
        //console.log(bs.now);
        //console.log(gem);
        //console.log("-----------------");
        //console.log(gem);
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                if(gem[i][j] == 6){
                    //销毁金钻
                    bs[i][j].kill();
                    //上方宝石下落
                    for(var t = i+1; t < level+3; t++){
                        var tween = this.add.tween(bs[t][j]);
                        var sY = bs[t][j].y;
                        tween.to({y:sY+60}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[t-1][j] = gem[t][j];
                        bs[t-1][j] = bs[t][j];
                        //console.log(sY);
                    }
                    if(level == 1){
                        var tween = this.add.tween(rbs[j]);
                        tween.to({y:290}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[level+2][j] = gem[level+3][j];
                        bs[level+2][j] = rbs[j];
                        this.rfill(j);
                        ywall--;
                        yzhuan[ywall].kill();
                        //console.log(bs[level+2][j].x);
                        //console.log(rbs[j].x);
                    }
                    else if(level == 2){
                        var tween = this.add.tween(rbs[j]);
                        tween.to({y:230}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[level+2][j] = gem[level+3][j];
                        bs[level+2][j] = rbs[j];
                        this.rfill(j);
                        zwall--;
                        zzhuan[zwall].kill();
                    }
                    else if(level == 3){
                        var tween = this.add.tween(rbs[j]);
                        tween.to({y:170}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[level+2][j] = gem[level+3][j];
                        bs[level+2][j] = rbs[j];
                        this.rfill(j);
                        xwall--;
                        console.log(xwall);
                        xzhuan[xwall].kill();
                    }
                }
            }
        }
        //console.log(gem);
    },

    //预留宝石矩阵出现在游戏中
    rfall: function(){
        for(var i = 0; i < level+3; i++){
            this.rlocation(i);
        }
    },

    //预留宝石矩阵的位置
    rlocation: function(i){
        if(level == 1){
            if(i == 0){
                rbs[i] = this.add.sprite(470, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 1){
                rbs[i] = this.add.sprite(535, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 2){
                rbs[i] = this.add.sprite(600, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 3){
                rbs[i] = this.add.sprite(665, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
        }
        else if(level == 2){
            if(i == 0){
                rbs[i] = this.add.sprite(470, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 1){
                rbs[i] = this.add.sprite(535, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 2){
                rbs[i] = this.add.sprite(600, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 3){
                rbs[i] = this.add.sprite(665, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 4){
                rbs[i] = this.add.sprite(730, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
        }
        else if(level == 3){
            if(i == 0){
                rbs[i] = this.add.sprite(405, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 1){
                rbs[i] = this.add.sprite(470, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 2){
                rbs[i] = this.add.sprite(535, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 3){
                rbs[i] = this.add.sprite(600, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 4){
                rbs[i] = this.add.sprite(665, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
            else if(i == 5){
                rbs[i] = this.add.sprite(730, 50, level+''+gem[level+3][i]);
                rbs[i].animations.add(level+''+gem[level+3][i]);
                rbs[i].animations.play(level+''+gem[level+3][i], 5, true);
            }
        }
    },

    //上方预留宝石的填充
    rfill: function(i){
        var a = Math.round(Math.random()*4+1);
        gem[level+3][i] = a;
        if(level == 1){
            if(i == 0){
                rbs[i] = this.add.sprite(470, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 1){
                rbs[i] = this.add.sprite(535, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 2){
                rbs[i] = this.add.sprite(600, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 3){
                rbs[i] = this.add.sprite(665, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
        }
        else if(level == 2){
            if(i == 0){
                rbs[i] = this.add.sprite(470, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 1){
                rbs[i] = this.add.sprite(535, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 2){
                rbs[i] = this.add.sprite(600, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 3){
                rbs[i] = this.add.sprite(665, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 4){
                rbs[i] = this.add.sprite(730, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
        }
        else if(level == 3){
            if(i == 0){
                rbs[i] = this.add.sprite(405, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 1){
                rbs[i] = this.add.sprite(470, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 2){
                rbs[i] = this.add.sprite(535, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 3){
                rbs[i] = this.add.sprite(600, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 4){
                rbs[i] = this.add.sprite(665, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
            else if(i == 5){
                rbs[i] = this.add.sprite(730, 50, level+''+a);
                rbs[i].animations.add(level+''+a);
                rbs[i].animations.play(level+''+a, 5, true);
            }
        }
    },

    //判断是否中奖的函数
    zj: function(){
        var myList = new buckets.LinkedList();
        //console.log(gem);
        //debugger;
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                //创建一个队列
                var list = new buckets.LinkedList();
                //创建一个字典
                //var point = new Dictionary();
                //进行递归判断
                if ( gem[i] && gem[i][j]) 
                this.getEliminate(gem, i, j, i, j, list, gem[i][j]);
                //console.log(list.toArray());
                //判断是否相连到指定个数
                if(list.size() > level+2){
                    myList.add(list);
                }
                /*
                console.log("+++++++++++");
                console.log(list.toArray());
                console.log("-----------");
                console.log(gem);
                */
               //console.log('+++++++++++');
               //console.log(list.size());
               //console.log(list.toArray());
            }
        }
        //console.log("----------------------");
        //console.log(myList.toArray());
        //console.log(gem);
        //debugger;
        //console.log(myList);
        if(myList.isEmpty()){
        	if(zwall == 0){
        		this.scene.start('over');
        	}
            if(tgsign == 1){
                qingkong = 1;
                game.time.events.add(200, this.quedingClick, this);
            }
            else{
                //this.qk();
                qingkong = 1;
                hqd.kill();
                qd = this.add.button(940, 450, 'queding', this.quedingClick, this);
            }
        }
        else{
            if(zwall == 0){
                this.scene.start('over');
            }
            else{
                this.deal(myList);
                game.time.events.add(200, this.tianbu, this);
                game.time.events.add(400, this.htianbu, this);
            }
        }
        //this.tianbu();
        //this.deal(myList);
        //console.log(gem);
    },

    //对中奖宝石进行处理
    deal: function(list){
        // console.log("------------------");
        // for(var i = 0; i < list.size(); i++){
        //     console.log(list.elementAtIndex(i).toArray());
        // }
        var array1 = new buckets.LinkedList();
        var array2 = new buckets.LinkedList();
        for(var i = 0; i < list.size(); i++){
            var a = list.elementAtIndex(i).elementAtIndex(0);
            var b = parseInt(a.substring(0, 1));
            var c = parseInt(a.substring(1, 2));
            array1.add(gem[b][c]);
            array2.add(list.elementAtIndex(i).size());
        }
        for(var i = 0; i < list.size(); i++){
            for(var j = 0; j < list.elementAtIndex(i).size(); j++){
                var a = list.elementAtIndex(i).elementAtIndex(j);
                var x = parseInt(a.substring(0, 1));
                var y = parseInt(a.substring(1, 2));
                gem[x][y] = 0;
                bs[x][y].kill();
            }
        }
        if(level == 1){
            for(var i = 0; i < list.size(); i++){
                if(array1.elementAtIndex(i) == 1){
                    if(array2.elementAtIndex(i) == 4){
                        this.js(2, array1, array2);
                        this.zjzhu(2);
                    }
                    else if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*4;
                        this.js(4, array1, array2);
                        this.zjzhu(4);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*8;
                        this.js(8, array1, array2);
                        this.zjzhu(8);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*200;
                        this.js(200, array1, array2);
                        this.zjzhu(200);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*400;
                        this.js(400, array1, array2);
                        this.zjzhu(400);
                    }
                }
                else if(array1.elementAtIndex(i) == 2){
                    if(array2.elementAtIndex(i) == 4){
                        //bdianshu = bdianshu + zhushu*dzds*4;
                        this.js(4, array1, array2);
                        this.zjzhu(4);
                    }
                    else if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*250;
                        this.js(250, array1, array2);
                        this.zjzhu(250);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*750;
                        this.js(750, array1, array2);
                        this.zjzhu(750);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*800;
                        this.js(800, array1, array2);
                        this.zjzhu(800);
                    }
                }
                else if(array1.elementAtIndex(i) == 3){
                    if(array2.elementAtIndex(i) == 4){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*40;
                        this.js(40, array1, array2);
                        this.zjzhu(40);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*80;
                        this.js(80, array1, array2);
                        this.zjzhu(80);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*160;
                        this.js(160, array1, array2);
                        this.zjzhu(160);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*2000;
                        this.js(2000, array1, array2);
                        this.zjzhu(2000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*5000;
                        this.js(5000, array1, array2);
                        this.zjzhu(5000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*6000;
                        this.js(6000, array1, array2);
                        this.zjzhu(6000);
                    }
                }
                else if(array1.elementAtIndex(i) == 4){
                    if(array2.elementAtIndex(i) == 4){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*60;
                        this.js(60, array1, array2);
                        this.zjzhu(60);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*750;
                        this.js(750, array1, array2);
                        this.zjzhu(750);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*10000;
                        this.js(10000, array1, array2);
                        this.zjzhu(10000);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*20000;
                        this.js(20000, array1, array2);
                        this.zjzhu(20000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*50000;
                        this.js(50000, array1, array2);
                        this.zjzhu(50000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*60000;
                        this.js(60000, array1, array2);
                        this.zjzhu(60000);
                    }
                }
                else if(array1.elementAtIndex(i) == 5){
                    if(array2.elementAtIndex(i) == 4){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*2000;
                        this.js(2000, array1, array2);
                        this.zjzhu(2000);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*5000;
                        this.js(5000, array1, array2);
                        this.zjzhu(5000);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*20000;
                        this.js(20000, array1, array2);
                        this.zjzhu(20000);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*50000;
                        this.js(50000, array1, array2);
                        this.zjzhu(50000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*60000;
                        this.js(60000, array1, array2);
                        this.zjzhu(60000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*80000;
                        this.js(80000, array1, array2);
                        this.zjzhu(80000);
                    }
                }
            }
        }
        else if(level == 2){
            for(var i = 0; i < list.size(); i++){
                if(array1.elementAtIndex(i) == 1){
                    if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*2;
                        this.js(2, array1, array2);
                        this.zjzhu(2);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*4;
                        this.js(4, array1, array2);
                        this.zjzhu(4);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*8;
                        this.js(8, array1, array2);
                        this.zjzhu(8);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*200;
                        this.js(200, array1, array2);
                        this.zjzhu(200);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*450;
                        this.js(450, array1, array2);
                        this.zjzhu(450);
                    }
                }
                else if(array1.elementAtIndex(i) == 2){
                    if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*4;
                        this.js(4, array1, array2);
                        this.zjzhu(4);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*250;
                        this.js(250, array1, array2);
                        this.zjzhu(250);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*750;
                        this.js(750, array1, array2);
                        this.zjzhu(750);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                }
                else if(array1.elementAtIndex(i) == 3){
                    if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*40;
                        this.js(40, array1, array2);
                        this.zjzhu(40);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*80;
                        this.js(80, array1, array2);
                        this.zjzhu(80);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*160;
                        this.js(160, array1, array2);
                        this.zjzhu(160);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*2000;
                        this.js(2000, array1, array2);
                        this.zjzhu(2000);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*5000;
                        this.js(5000, array1, array2);
                        this.zjzhu(5000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*7000;
                        this.js(7000, array1, array2);
                        this.zjzhu(7000);
                    }
                }
                else if(array1.elementAtIndex(i) == 4){
                    if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*60;
                        this.js(60, array1, array2);
                        this.zjzhu(60);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*750;
                        this.js(750, array1, array2);
                        this.zjzhu(750);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*10000;
                        this.js(10000, array1, array2);
                        this.zjzhu(10000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*20000;
                        this.js(20000, array1, array2);
                        this.zjzhu(20000);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*50000;
                        this.js(50000, array1, array2);
                        this.zjzhu(50000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*70000;
                        this.js(70000, array1, array2);
                        this.zjzhu(70000);
                    }
                }
                else if(array1.elementAtIndex(i) == 5){
                    if(array2.elementAtIndex(i) == 5){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*2000;
                        this.js(2000, array1, array2);
                        this.zjzhu(2000);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*5000;
                        this.js(5000, array1, array2);
                        this.zjzhu(5000);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*20000;
                        this.js(20000, array1, array2);
                        this.zjzhu(20000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*50000;
                        this.js(50000, array1, array2);
                        this.zjzhu(50000);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*80000;
                        this.js(80000, array1, array2);
                        this.zjzhu(80000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*100000;
                        this.js(100000, array1, array2);
                        this.zjzhu(100000);
                    }
                }
            }
        }
        else if(level == 3){
            for(var i = 0; i < list.size(); i++){
                if(array1.elementAtIndex(i) == 1){
                    if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*2;
                        this.js(2, array1, array2);
                        this.zjzhu(2);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*4;
                        this.js(4, array1, array2);
                        this.zjzhu(4);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*8;
                        this.js(8, array1, array2);
                        this.zjzhu(8);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 15){
                        //bdianshu = bdianshu + zhushu*dzds*200;
                        this.js(200, array1, array2);
                        this.zjzhu(200);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                }
                else if(array1.elementAtIndex(i) == 2){
                    if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*4;
                        this.js(4, array1, array2);
                        this.zjzhu(4);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*250;
                        this.js(250, array1, array2);
                        this.zjzhu(250);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 15){
                        //bdianshu = bdianshu + zhushu*dzds*750;
                        this.js(750, array1, array2);
                        this.zjzhu(750);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*1200;
                        this.js(1200, array1, array2);
                        this.zjzhu(1200);
                    }
                }
                else if(array1.elementAtIndex(i) == 3){
                    if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*5;
                        this.js(5, array1, array2);
                        this.zjzhu(5);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*40;
                        this.js(40, array1, array2);
                        this.zjzhu(40);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*80;
                        this.js(80, array1, array2);
                        this.zjzhu(80);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*160;
                        this.js(160, array1, array2);
                        this.zjzhu(160);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*2000;
                        this.js(2000, array1, array2);
                        this.zjzhu(2000);
                    }
                    else if(array2.elementAtIndex(i) == 15){
                        //bdianshu = bdianshu + zhushu*dzds*5000;
                        this.js(5000, array1, array2);
                        this.zjzhu(5000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*8000;
                        this.js(8000, array1, array2);
                        this.zjzhu(8000);
                    }
                }
                else if(array1.elementAtIndex(i) == 4){
                    if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*10;
                        this.js(10, array1, array2);
                        this.zjzhu(10);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*30;
                        this.js(30, array1, array2);
                        this.zjzhu(30);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*60;
                        this.js(60, array1, array2);
                        this.zjzhu(60);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*750;
                        this.js(750, array1, array2);
                        this.zjzhu(750);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*10000;
                        this.js(10000, array1, array2);
                        this.zjzhu(10000);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*20000;
                        this.js(20000, array1, array2);
                        this.zjzhu(20000);
                    }
                    else if(array2.elementAtIndex(i) == 15){
                        //bdianshu = bdianshu + zhushu*dzds*50000;
                        this.js(50000, array1, array2);
                        this.zjzhu(50000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*80000;
                        this.js(80000, array1, array2);
                        this.zjzhu(80000);
                    }
                }
                else if(array1.elementAtIndex(i) == 5){
                    if(array2.elementAtIndex(i) == 6){
                        //bdianshu = bdianshu + zhushu*dzds*20;
                        this.js(20, array1, array2);
                        this.zjzhu(20);
                    }
                    else if(array2.elementAtIndex(i) == 7){
                        //bdianshu = bdianshu + zhushu*dzds*50;
                        this.js(50, array1, array2);
                        this.zjzhu(50);
                    }
                    else if(array2.elementAtIndex(i) == 8){
                        //bdianshu = bdianshu + zhushu*dzds*100;
                        this.js(100, array1, array2);
                        this.zjzhu(100);
                    }
                    else if(array2.elementAtIndex(i) == 9){
                        //bdianshu = bdianshu + zhushu*dzds*500;
                        this.js(500, array1, array2);
                        this.zjzhu(500);
                    }
                    else if(array2.elementAtIndex(i) == 10){
                        //bdianshu = bdianshu + zhushu*dzds*1000;
                        this.js(1000, array1, array2);
                        this.zjzhu(1000);
                    }
                    else if(array2.elementAtIndex(i) == 11){
                        //bdianshu = bdianshu + zhushu*dzds*2000;
                        this.js(2000, array1, array2);
                        this.zjzhu(2000);
                    }
                    else if(array2.elementAtIndex(i) == 12){
                        //bdianshu = bdianshu + zhushu*dzds*5000;
                        this.js(5000, array1, array2);
                        this.zjzhu(5000);
                    }
                    else if(array2.elementAtIndex(i) == 13){
                        //bdianshu = bdianshu + zhushu*dzds*20000;
                        this.js(20000, array1, array2);
                        this.zjzhu(20000);
                    }
                    else if(array2.elementAtIndex(i) == 14){
                        //bdianshu = bdianshu + zhushu*dzds*50000;
                        this.js(50000, array1, array2);
                        this.zjzhu(50000);
                    }
                    else if(array2.elementAtIndex(i) == 15){
                        //bdianshu = bdianshu + zhushu*dzds*100000;
                        this.js(100000, array1, array2);
                        this.zjzhu(100000);
                    }
                    else{
                        //bdianshu = bdianshu + zhushu*dzds*100000;
                        this.js(100000, array1, array2);
                        this.zjzhu(100000);
                    }
                }
            }
        }
        //console.log(gem);
    },

    //递归
    getEliminate: function(a, i, j, top_i, top_j, list, num){
        if(a[i][j] == num){
            if(!this.istrue(list, i+''+j)){
                list.add(i+''+j);
                //this.putPointMap(point, i, j, top_i, top_j);
            }
        }
        //左
        if(j > 0 &&a[i][j-1] == num &&!this.istrue(list, i+''+(j-1))){
           this.getEliminate(a, i, j-1, i, j, list, num); 
        }
        //右
        if(j+1 <= level+2 &&a[i][j+1] == num &&!this.istrue(list, i+''+(j+1))){
            this.getEliminate(a, i, j+1, i, j, list, num); 
         }
         //下
         if(i > 0 &&a[i-1][j] == num &&!this.istrue(list, (i-1)+''+j)){
            this.getEliminate(a, i-1, j, i, j, list, num); 
         }
         //上
         if(i+1 <= level+2 &&a[i+1][j] == num &&!this.istrue(list, (i+1)+''+j)){
            this.getEliminate(a, i+1, j, i, j, list, num); 
         }
        return;
            // var nowPoint = point.find(i+''+j);
            // if(nowPoint.getX() == nowPoint.getParentX() &&nowPoint.getY() == nowPoint.getParentY()){
            //     return;    
            // }
            // else{
            //     var topPoint = point.find(nowPoint.getParentX()+''+nowPoint.getParentY());
            //     this.getEliminate(a, topPoint.getX(), topPoint.getY(), topPoint.getParentX(), topPoint.parentY(), list, point, num);
            // }
    },

    istrue: function(list, str){
        if(list.contains(str)){
            return true;
        }
        else{
            return false;
        }
    },

 

    //中奖后的矩阵预填补
    tianbu: function(){
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                if(gem[i][j] == 0){
                    for(var t = i+1; t < level+3; t++){
                        // if(gem[t][j] != 0 && t < level+3){
                        //     var tween = this.add.tween(bs[t][j]);
                        //     var sY = bs[t][j].y;
                        //     tween.to({y:sY+25}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                        //     gem[t-1][j] = gem[t][j];
                        //     bs[t-1][j] = bs[t][j];
                        // }
                        // else if(gem[t][j] != 0){

                        // }
                        if(gem[t][j] != 0){
                            for(var k = i; k < t; k++){
                                if(gem[k][j] == 0){
                                    var a = t-k;
                                    //console.log(t+'  '+j+'  '+k+'  '+a);
                                    var tween = this.add.tween(bs[t][j]);
                                    var sY = bs[t][j].y;
                                    tween.to({y:(sY+60*a)}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
                                    gem[k][j] = gem[t][j];
                                    bs[k][j] = bs[t][j];
                                    gem[t][j] = 0;
                                    //bs[t][j].kill(); 
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        /*
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                console.log(bs[i][j].x + ' ' + bs[i][j].y);
            }
        }
        */
        //console.log(gem);
    },

    //预留宝石的下降
    htianbu: function(){
        var b = 0;
        for(var i = 0; i < level+3; i++){
            for(var j = 0; j < level+3; j++){
                if(gem[i][j] == 0){
                    var a = level+2-i;
                    if(level == 1){
                        var tween = this.add.tween(rbs[j]);
                        tween.to({y:(290+a*60)}, 200+50*b, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[i][j] = gem[level+3][j];
                        bs[i][j] = rbs[j];
                        this.rfill(j);
                        //console.log(bs[level+2][j].x);
                        //console.log(rbs[j].x);
                    }
                    else if(level == 2){
                        var tween = this.add.tween(rbs[j]);
                        tween.to({y:(230+a*60)}, 200+50*b, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[i][j] = gem[level+3][j];
                        bs[i][j] = rbs[j];
                        this.rfill(j);
                    }
                    else if(level == 3){
                        var tween = this.add.tween(rbs[j]);
                        tween.to({y:(170+a*60)}, 200+50*b, Phaser.Easing.Linear.None, true, 0, 0, false);
                        gem[i][j] = gem[level+3][j];
                        bs[j][j] = rbs[j];
                        this.rfill(j);
                    }
                    b++;
                }
            }
        }
        //console.log(gem);
        game.time.events.add(1000, this.zj, this);
    },

    //矩阵的清空
    qk: function(){
        //console.log(gem);
        //console.log(bs);
        //gem = null;
        /*
        if(change == 0){
            for(var i = 0; i < level+3; i++){
                for(var j = 0; j < level+3; j++){
                    //console.log(bs[i][j].x + ' ' + bs[i][j].y);
                    //bs[i][j].kill();
                    this.xy();
                }
            }
            for(var i = 0; i < level+3; i++){
                rbs[i].kill();
            }
        }
        else if(change == 1){
            for(var i = 0; i < level+2; i++){
                for(var j = 0; j < level+2; j++){
                    //bs[i][j].kill();
                    this.xy();
                }
            }
            for(var i = 0; i < level+2; i++){
                rbs[i].kill();
            }
            change = 0;
        }
        */
        //this.xy();
        this.xs();
        for(var i = 0; i < rbs.length; i++){
            rbs[i].kill();
        }
        bs = null;
        gem = null;
        //console.log(gem);
        //console.log(bs);
    },

    /*
    xy: function(){
        var len = bs.length;
        for(var i = 0; i < len; i++){
            for(var j = 0; j < len; j++){
                var tween = this.add.tween(bs[i][j]);
                tween.to({y:700}, 100+i*1000+j*200, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
        }
    },
    */

    xs: function(){
        var len = bs.length;
        for(var i = 0; i < len; i++){
            for(var j = 0; j < len; j++){
                var mx = bs[i][j].x;
                var my = bs[i][j].y;
                var tween = this.add.tween(bs[i][j]);
                if(j < len/2){
                    tween.to({x:mx-200-80*i, y:my-200-60*j}, 100+200*i+40*j, Phaser.Easing.Linear.None, true, 0, 0, false);
                    tween.to({x:0, y:700}, 100+200*i+40*j, Phaser.Easing.Linear.None, true, 0, 0, false);
                }
                else if(j >= len/2){
                    tween.to({x:mx+200+80*(i-1), y:my-200+60*(j-1)}, 100+100*i+20*j, Phaser.Easing.Linear.None, true, 0, 0, false);
                    tween.to({x:1000, y:700}, 100+200*i+40*j, Phaser.Easing.Linear.None, true, 0, 0, false);
                }
            }
        }
    },

    //中奖信息的清除
    qc: function(){
        for(var i = 0; i < 5; i++){
            if(zjxx1[i] != null){
                zjxx1[i].kill();
            }
            zjxx2[i].text = '';
            zjxx3[i].text = '';
        }
    },

    //单局游戏的结算
    js: function(k, array1, array2){
        //bdianshu = bdianshu + zhushu*dzds*i;
        this.qc();
        //console.log("-----------------");
        for(var i = 0; i < zhushu; i++){
            zjxx1[i] = this.add.sprite(920, 70+36*i, level+''+array1.elementAtIndex(0));
            zjxx1[i].scale.setTo(0.7, 0.7);
            zjxx2[i].text = '×'+array2.elementAtIndex(0)+'  获得';
            zjxx3[i].text = dzds*k + '';
            //console.log(array1.elementAtIndex(i));
        }
    },

    touzhu: function(){
        if(zdianshu - zhushu*dzds*10 >= 0){
            zdianshu = zdianshu - zhushu*dzds*10;
            zdstext.text = zdianshu + '';
            ljtext.text = zdianshu + '';
        }
        else{
            alert('游戏点数不够');
        }
        if(bdianshu - zhushu*dzds*10 >= 0){
            bdianshu = bdianshu - zhushu*dzds*10;
            bdstext.text = bdianshu + '';
        }
        else{
            bdstext.text = '0';
        }
    },

    //中奖得到注数
    zjzhu: function(num){
        zdianshu = zdianshu + num;
        zdstext.text = zdianshu + '';
        bdianshu = bdianshu + num;
        bdstext.text = bdianshu + '';
        ljtext.text = zdianshu + '';
        //console.log(bdianshu);
    }
    
};

//结算页面
var jsk;
//关闭按钮
var gb;
//总得分文本
var ztext;
//本局得分文本
var btext;
//返回按钮
var fh;

//结束场景
glb.scene.over = {
    create: function(){
        //alert('游戏结束');
        this.add.sprite(0, 0, 'over');
        this.add.text(444, 575, '1倍', { fontSize: '10px', fill: '#D26900' });
        this.add.text(595, 575, '1倍', { fontSize: '10px', fill: '#D26900' });
        this.add.text(750, 575, '2倍', { fontSize: '10px', fill: '#D26900' });
        this.add.text(900, 575, '2倍', { fontSize: '10px', fill: '#D26900' });
        this.add.text(1050, 575, '3倍', { fontSize: '10px', fill: '#D26900' });
        zdstext = this.add.text(225, 455, zdianshu, { fontSize: '10px', fill: '#D26900' });
        var a = bdianshu + '';
        bdstext = this.add.text(230, 522, a, { fontSize: '10px', fill: '#D26900' });
        var lz = this.add.sprite(725, 0, 'lz');
        //var r = 1;
        var r = Math.round(Math.random());
        ljtext = this.add.text(218, 54, zdianshu, { fontSize: '10px', fill: '#D26900' });
        if(r == 0){
            var tween = this.add.tween(lz);
            tween.to({y:180}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            //tween.to({x:650, y:260}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            // tween.to({x:576, y:337}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            // tween.to({x:576, y:337}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.to({x:500, y:410}, 1200, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.to({x:570, y:475}, 400, Phaser.Easing.Linear.None, true, 0, 0, false);
            zdianshu = bdianshu+zdianshu;
            bdianshu = 2*bdianshu;
            zdstext.text = '';
            bdstext.text = '';
            ljtext.text = '';
            zdstext = this.add.text(225, 458, zdianshu, { fontSize: '10px', fill: '#D26900' });
            var a = bdianshu + '';
            bdstext = this.add.text(230, 525, a, { fontSize: '10px', fill: '#D26900' });
            ljtext = this.add.text(218, 54, zdianshu, { fontSize: '10px', fill: '#D26900' });
        }
        else if(r == 1){
            var tween = this.add.tween(lz);
            tween.to({y:180}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            //tween.to({x:650, y:260}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            // tween.to({x:576, y:337}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            // tween.to({x:576, y:337}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.to({x:875, y:337}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.to({x:725, y:475}, 800, Phaser.Easing.Linear.None, true, 0, 0, false);
            zdianshu = 2*bdianshu+zdianshu;
            bdianshu = 3*bdianshu;
            zdstext.text = '';
            bdstext.text = '';
            ljtext.text = '';
            zdstext = this.add.text(225, 458, zdianshu, { fontSize: '10px', fill: '#D26900' });
            var a = bdianshu + '';
            bdstext = this.add.text(230, 525, a, { fontSize: '10px', fill: '#D26900' });
            ljtext = this.add.text(218, 54, zdianshu, { fontSize: '10px', fill: '#D26900' });
        }
        game.time.events.add(3000, this.zh, this);
        //game.time.events.add(6000, this.jieshu, this);
    },

    zh: function(){
        jsk = this.add.sprite(360, 110, 'js');
        jsk.alpha = 0.95;
        gb = this.add.button(724, 106, 'gb', this.gbClick, this);
        //var gb = this.add.sprite(724, 106, 'gb');
        gb.scale.setTo(1.45, 1.45);
        gb.alpha = 0.95;
        fh = this.add.button(253, 332, 'fh', this.fhClick, this);
        fh.alpha = 0.95;
        var a = zdianshu;
        var b = bdianshu;
        ztext = this.add.text(530, 210, a, { fontSize: '32px', fill: '#D2691E' });
        btext = this.add.text(550, 290, b+'', { fontSize: '32px', fill: '#D2691E' });
        //jsk.scale.setTo(0.5, 0.5);
    },

    gbClick: function(){
        gb.kill();
        fh.kill();
        ztext.text = '';
        btext.text = '';
        jsk.kill();
    },

    fhClick: function(){
        rbs = null;
        gem = null;
        bs = null;
        //是否是再次进入游戏
        isRin = 0;
        //注数
        zhushu = 0;
        //注数对象，kill用的
        zhu = new Array(5);
        //单注点数
        dzds = 0;
        //左侧单注点数文本信息
        dzdsText = new Array(5);
        //关卡数
        level = 1;
        //墙数
        //var wall = 15;
        //钻头出现的概率,Math.random()生成的随机数范围在[0,1)之间
        ariseProbability = 0.8;
        //预留的宝石
        //var rGem;
        //判断一局游戏是否完成,若没完成，按确定键将不会下落宝石
        isOneOver = 1;
        //确定按钮被点击的标志
        //var queding = 0;
        //时间对象
        //var now;
        //有金钻的标志
        //var jz = 0;
        //一场游戏结束的标志
        //var oneover = 0; 
        //右边墙的对象集合
        var yzhuan = new Array(15);
        //右边墙的个数
        var ywall = 15;
        //左边墙的对象集合
        var zzhuan = new Array(15);
        //左边墙的个数
        var zwall = 15;
        //下边墙的对象集合
        var xzhuan = new Array(15);
        //下边墙的个数
        var xwall = 15;
        //本场游戏点数
        var bdianshu = 0;
        //总游戏点数
        var zdianshu = 200000;
        //需要清空的标志
        var qingkong = 0;
        //右侧中奖信息
        var zjxx1 = new Array(5);
        var zjxx2 = new Array(5);
        var zjxx3 = new Array(5);
        //关卡改变的标志
        var change = 0;
        //右边的墙是否消除完毕
        //var yw = 0;
        //左边的墙是否消除完毕
        //var zw = 0;
        //累计奖的文本信息
        //托管按钮被点击
        var tgsign = 0;
        //刚开始游戏的标志
        var oneSign = 1;
        this.scene.start('menu');
    },

    jieshu: function(){
        this.scene.start('menu');
    }
};


var scenes = [];
scenes.push(glb.scene.boot);
scenes.push(glb.scene.load);
scenes.push(glb.scene.menu);
scenes.push(glb.scene.play);
scenes.push(glb.scene.over);


game.scene.add('boot', game.states.boot);
game.scene.add('load', game.states.load);
game.scene.add('menu', game.states.menu);
game.scene.add('play', game.states.play);
game.scene.add('over', game.states.over);
game.scene.start('boot');




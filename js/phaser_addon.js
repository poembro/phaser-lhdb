// add a button to a scene
// similar to buttons in Phaser v2
Phaser.Scene.prototype.addButton = function(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
{
		// add a button
		var btn = this.add.sprite(x, y, key, outFrame).setInteractive();
		btn.on('pointerover', function (ptr, x, y) { this.setFrame(overFrame) } );
		btn.on('pointerout',  function (ptr)       { this.setFrame(outFrame) } );
		btn.on('pointerdown', function (ptr)       { this.setScale(0.9, 0.9) } );
		console.log(x, y, key)
		console.log(callback)
		if (typeof func == 'function')
		    btn.on('pointerup', callback(callbackContext));
		
		return btn;
};


(function(window, undefined) {   
	var glb = {};

	//场景
	glb.scene = {
		boot : function() {
			this.load.setPath('assets/');
			this.load.image('preloader', 'preloader.png'); 
		},
		load : function(){
			this.load.setBaseURL('./');
			var preloader = this.add.sprite(0, 0, 'preloader');
			//preloader.anchor.set(0.5);
			//preloader.scale.setTo(2, 2);
			this.load.image('bg', 'assets/bg.png');
			this.load.spritesheet('11', 'assets/baiyu.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('12', 'assets/biyu.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('13', 'assets/moyu.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('14', 'assets/manao.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('15', 'assets/hupo.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('21', 'assets/zml.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('22', 'assets/mys.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('23', 'assets/zsj.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('24', 'assets/fc.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('25', 'assets/zz.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('31', 'assets/hbs.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('32', 'assets/lbs.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('33', 'assets/huangbs.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('34', 'assets/lanbs.png', { frameWidth: 55, frameHeight: 55 });
			this.load.spritesheet('35', 'assets/zs.png', { frameWidth: 55, frameHeight: 55 });
			//this.load.image('lzs', 'assets/lzs.png');
			//this.load.image('startbutton', 'assets/startbutton.png');
			this.load.image('bangzhu', 'assets/bangzhu.png');
			this.load.image('jia', 'assets/jia.png');
			this.load.image('jian', 'assets/jian.png');
			this.load.image('queding', 'assets/queding.png');
			this.load.image('shezhi', 'assets/shezhi.png');
			this.load.image('tuichu', 'assets/tuichu.png');
			this.load.image('tuoguan', 'assets/tuoguan.png');
			this.load.image('jinzuan', 'assets/jinzuan.png');
			this.load.image('16', 'assets/jinzuan.png');
			this.load.image('26', 'assets/jinzuan.png');
			this.load.image('36', 'assets/jinzuan.png');
			this.load.image('tcyx', 'assets/tuichuyouxi.png');
			this.load.image('menu', 'assets/menu.png');
			this.load.image('hqueding', 'assets/hqueding.png');
			this.load.image('cz', 'assets/cwall.png');
			this.load.image('xz', 'assets/xwall.png');
			this.load.image('bz1', 'assets/bz1.png');
			this.load.image('gb', 'assets/gb.png');
			this.load.image('syy', 'assets/syy.png');
			this.load.image('xyy', 'assets/xyy.png');
			this.load.image('bz2', 'assets/bz2.png');
			this.load.image('bz3', 'assets/bz3.png');
			this.load.image('over', 'assets/over.png');
			this.load.image('lz', 'assets/lz.png');
			this.load.image('bz4', 'assets/bz4.png');
			this.load.image('bz5', 'assets/bz5.png');
			this.load.image('bz6', 'assets/bz6.png');
			this.load.image('01', 'assets/01.png');
			this.load.image('02', 'assets/02.png');
			this.load.image('03', 'assets/03.png');
			this.load.image('qtg', 'assets/qtg.png');
			this.load.image('yhdl', 'assets/yhdl.png');
			this.load.image('ph', 'assets/ph.png');
			this.load.image('qd', 'assets/qd.png');
			this.load.image('yh', 'assets/yh.png');
			this.load.image('yk', 'assets/yk.png');
			this.load.image('js', 'assets/js.png');
			this.load.image('fh', 'assets/fh.png');
		},
		menu : function(){ 
			//this.add.sprite(0, 0, 'bg');
			this.add.sprite(0, 0, 'menu'); 
			//this.add.button(game.width/2-100, game.height/2+100, 'startbutton', this.startClick, this);
			this.addButton(0, 125, 'yhdl', glb.menu.yhdlClick, this);
			this.addButton(70, 0, 'qd', glb.menu.qdClick, this);
			this.addButton(0, 40, 'yh', glb.menu.yhClick, this);
			this.addButton(0, 50, 'ph', glb.menu.phClick, this);
			this.addButton(0, 0, 'yk', glb.menu.ykClick, this);
			//yhdl.scale.setTo(2, 2);
		} 
	}

	//菜单逻辑
	glb.menu = {
		//点击用户登陆按钮
		yhdlClick: function(){
			this.scene.start('play');
		},

		//点击游客模式按钮
		ykClick: function(){
			this.scene.start('play');
		},

	
		//点击签到领奖按钮
		qdClick: function(){ 
		},

		//点击兑换点数按钮
		yhClick: function(){ 
		},

		//点击排行榜按钮
		phClick: function(){ 
		},

		startClick: function(){
			this.scene.start('play');
		}
	}

	window.glb = glb
})(window);
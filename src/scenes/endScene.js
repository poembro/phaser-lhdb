/**
 * 结束场景
 */
export default class EndScene extends Phaser.Scene {
    constructor() {
        super({key: "EndScene"});
    }

    create(score) {
        const gameOver = this.add.text(800 / 2, 100, `GAME OVER`, {
            color: '#ffff00',
            fontFamily: 'Tahoma',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5);

 
        this.add.text(800 / 2, 200, `SCORE: ${score}`, {
            color: '#ffffff',
            fontFamily: 'Tahoma',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5);

        this.loginOut = this.add.text(800 / 2, 300, 'login out', {
            color: '#ffffff',
            fontFamily: 'Tahoma',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true})
            .on('pointerup', () => { 
                this.scene.stop();
                location.reload()
            }, this)
            .on('pointerover', () => {
                this.loginOut.alpha = 0.5
            },)
            .on('pointerout', () => {
                this.loginOut.alpha = 1
            })


        this.restart = this.add.text(800 / 2, 400, 'restart', {
            color: '#ffffff',
            fontFamily: 'Tahoma',
            fontSize: 40,
            resolution: 2
        }).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true})
            .on('pointerup', () => { 
                this.scene.start('MainScene')
            }, this)
            .on('pointerover', () => {
                this.restart.alpha = 0.5
            },)
            .on('pointerout', () => {
                this.restart.alpha = 1
            });

        this.tweens.add({
            targets: gameOver,
            y: {
                from: 0,
                to: 100
            },
            ease: 'Bounce.easeOut',
            duration: 1000,
            repeat: 0,
            yoyo: false
        });
    }
}
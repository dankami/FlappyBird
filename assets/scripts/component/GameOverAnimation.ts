// GameOverAnimation.ts
import { _decorator, Component, Node, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverAnimation')
export class GameOverAnimation extends Component {
    @property({ type: Label })
    public scoreLabel: Label = null!;

    @property({ type: Label })
    public highScoreLabel: Label = null!;

    @property
    public animationDuration: number = 1;

    private isAnimating: boolean = false;

    start() {}

    show(score: number, highScore: number) {
        if (this.scoreLabel) {
            this.scoreLabel.string = 'Score: ' + score.toString();
        }

        if (this.highScoreLabel) {
            this.highScoreLabel.string = 'High Score: ' + highScore.toString();
        }

        this.isAnimating = true;
        this.animate();
    }

    animate() {
        // 实现游戏结束动画效果
        // 可以添加淡入淡出、缩放等动画效果
        this.node.setScale(new Vec3(0.8, 0.8, 1));

        // 使用 Cocos Creator 的动画系统或自定义动画
        setTimeout(() => {
            this.node.setScale(new Vec3(1, 1, 1));
            this.isAnimating = false;
        }, 500);
    }
}

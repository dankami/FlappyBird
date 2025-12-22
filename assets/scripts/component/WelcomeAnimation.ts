// WelcomeAnimation.ts
import { _decorator, Component, Node, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WelcomeAnimation')
export class WelcomeAnimation extends Component {
    @property({ type: Label })
    public titleLabel: Label = null!;

    @property({ type: Label })
    public instructionLabel: Label = null!;

    @property
    public animationDuration: number = 1;

    private isAnimating: boolean = false;

    start() {}

    show() {
        if (this.titleLabel) {
            this.titleLabel.string = 'Flappy Bird';
        }

        if (this.instructionLabel) {
            this.instructionLabel.string = 'Tap to fly!';
        }

        this.isAnimating = true;
        this.animate();
    }

    animate() {
        // 实现欢迎动画效果
        this.node.setScale(new Vec3(0.8, 0.8, 1));

        // 使用 Cocos Creator 的动画系统或自定义动画
        setTimeout(() => {
            this.node.setScale(new Vec3(1, 1, 1));
            this.isAnimating = false;
        }, 500);
    }
}

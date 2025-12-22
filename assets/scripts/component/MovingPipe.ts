// MovingPipe.ts
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovingPipe')
export class MovingPipe extends Component {
    @property
    public moveSpeed: number = 2;

    @property
    public gapHeight: number = 150;

    @property
    public topOffset: number = 0;

    private topPipe: Node = null!;
    private bottomPipe: Node = null!;

    start() {
        this.topPipe = this.node.children[0]; // 上管道
        this.bottomPipe = this.node.children[1]; // 下管道

        // 设置管道间隙
        const gapY = this.gapHeight / 2;
        this.topPipe.setPosition(new Vec3(0, gapY + this.topOffset, 0));
        this.bottomPipe.setPosition(new Vec3(0, -gapY + this.topOffset, 0));
    }

    update(deltaTime: number) {
        // 移动管道
        const currentPosition = this.node.position;
        this.node.setPosition(new Vec3(currentPosition.x - this.moveSpeed, currentPosition.y, currentPosition.z));
    }

    getBounds(): { x: number; y: number; width: number; height: number } {
        const position = this.node.position;
        const scale = this.node.scale;
        const width = 60 * scale.x; // 管道宽度
        const height = 800 * scale.y; // 管道总高度

        return {
            x: position.x - width / 2,
            y: position.y - height / 2,
            width: width,
            height: height,
        };
    }
}

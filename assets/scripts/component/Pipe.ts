// Pipe.ts
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {
    @property
    public moveSpeed: number = 100;

    @property
    public gapHeight: number = 150;

    @property
    public topOffset: number = 0;

    private topPipe: Node = null!;
    private bottomPipe: Node = null!;

    start() {
        this.topPipe = this.node.children[0]; // 假设第一个子节点是上管道
        this.bottomPipe = this.node.children[1]; // 假设第二个子节点是下管道

        // 设置管道间隙
        const gapY = this.gapHeight / 2;
        this.topPipe.setPosition(new Vec3(0, gapY + this.topOffset, 0));
        this.bottomPipe.setPosition(new Vec3(0, -gapY + this.topOffset, 0));
    }

    update(deltaTime: number) {
        // 管道移动逻辑由主游戏控制
    }

    getBounds(): { x: number; y: number; width: number; height: number } {
        const position = this.node.position;
        const scale = this.node.scale;
        const width = 60 * scale.x; // 假设管道宽度为60
        const height = 800 * scale.y; // 假设管道总高度为800

        return {
            x: position.x - width / 2,
            y: position.y - height / 2,
            width: width,
            height: height,
        };
    }
}

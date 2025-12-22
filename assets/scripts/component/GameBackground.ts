// GameBackground.ts
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameBackground')
export class GameBackground extends Component {
    @property
    public scrollSpeed: number = 1;

    private backgroundOffset: number = 0;

    start() {
        this.backgroundOffset = 0;
    }

    update(deltaTime: number) {
        // 背景滚动逻辑
        this.backgroundOffset += this.scrollSpeed * deltaTime;

        // 更新背景位置
        const position = this.node.position;
        this.node.setPosition(new Vec3(position.x, position.y, position.z + this.backgroundOffset));

        // 重置背景位置（循环滚动）
        if (this.backgroundOffset > 1000) {
            this.backgroundOffset = 0;
        }
    }
}

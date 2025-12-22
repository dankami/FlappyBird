// GameForeground.ts
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameForeground')
export class GameForeground extends Component {
    @property
    public scrollSpeed: number = 2;

    private foregroundOffset: number = 0;

    start() {
        this.foregroundOffset = 0;
    }

    update(deltaTime: number) {
        // 前景滚动逻辑
        this.foregroundOffset += this.scrollSpeed * deltaTime;

        // 更新前景位置
        const position = this.node.position;
        this.node.setPosition(new Vec3(position.x, position.y, position.z + this.foregroundOffset));

        // 重置前景位置（循环滚动）
        if (this.foregroundOffset > 1000) {
            this.foregroundOffset = 0;
        }
    }
}

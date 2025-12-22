// Cloud.ts
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cloud')
export class Cloud extends Component {
    @property
    public moveSpeed: number = 1;

    start() {}

    update(deltaTime: number) {
        // 云朵移动逻辑
        const currentPosition = this.node.position;
        this.node.setPosition(new Vec3(currentPosition.x - this.moveSpeed, currentPosition.y, currentPosition.z));

        // 当云朵移出屏幕左侧时，重新定位到右侧
        if (this.node.position.x < -400) {
            this.node.setPosition(new Vec3(400, Math.random() * 100 - 50, 0));
        }
    }
}

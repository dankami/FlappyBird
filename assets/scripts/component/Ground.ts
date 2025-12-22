// Ground.ts
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    @property
    public moveSpeed: number = 100;

    start() {}

    update(deltaTime: number) {
        // 地面移动逻辑可以在这里实现
        // 或者在 MyCanvas 中统一处理
    }
}

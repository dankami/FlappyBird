// Bird.ts
import { _decorator, Component, Node, Vec3, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property
    public jumpForce: number = 300;

    @property
    public gravity: number = 1000;

    private velocity: number = 0;
    private isJumping: boolean = false;

    start() {
        this.velocity = 0;
        this.isJumping = false;
    }

    update(deltaTime: number) {
        // 应用重力
        this.velocity -= this.gravity * deltaTime;

        // 更新位置
        const currentPosition = this.node.position;
        this.node.setPosition(new Vec3(currentPosition.x, currentPosition.y + this.velocity * deltaTime, currentPosition.z));

        // 限制垂直速度（防止下落过快）
        if (this.velocity < -500) {
            this.velocity = -500;
        }
    }

    jump() {
        if (!this.isJumping) {
            this.velocity = this.jumpForce;
            this.isJumping = true;
        }
    }

    getBounds(): { x: number; y: number; width: number; height: number } {
        const position = this.node.position;
        const scale = this.node.scale;
        const width = 60 * scale.x; // 假设原始宽度为60
        const height = 40 * scale.y; // 假设原始高度为40

        return {
            x: position.x - width / 2,
            y: position.y - height / 2,
            width: width,
            height: height,
        };
    }
}

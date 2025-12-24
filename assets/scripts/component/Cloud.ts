import { _decorator, Component, Sprite, SpriteFrame, Node, Vec3 } from 'cc';
import { Constant } from '../util/Constant';
import { Bird } from './Bird';

const { ccclass, property } = _decorator;

@ccclass('Cloud')
export class Cloud extends Component {
    private speed: number; // 速度
    private x: number; // 坐标
    private y: number;
    private originalY: number; // 保持原始Y位置用于上下浮动
    private floatOffset: number = 0; // 浮动偏移量
    private floatSpeed: number = 0.02; // 浮动速度
    private floatAmplitude: number = 5; // 浮动幅度

    private img: SpriteFrame;

    private scaleImageWidth: number;
    private scaleImageHeight: number;

    // 初始化方法替代构造函数
    async init(img: SpriteFrame, x: number, y: number) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.speed = Constant.GAME_SPEED * 2; // 云朵的速度

        // 云朵图片缩放的比例 1.0~2.0
        const scale = 1 + Math.random(); // Math.random()返回0.0~1.0的随机值
        // 缩放云朵图片
        this.scaleImageWidth = Math.floor(scale * img.width);
        this.scaleImageHeight = Math.floor(scale * img.height); // 修正：这里应该是img.height

        // 设置节点位置和精灵
        this.node.setPosition(new Vec3(this.x, this.y, 0));

        // 创建精灵组件
        const sprite = this.node.addComponent(Sprite);
        sprite.spriteFrame = this.img;

        // 设置节点大小
        this.node.setScale(this.scaleImageWidth / img.width, this.scaleImageHeight / img.height, 1);
    }

    update(deltaTime: number) {
        // 更新位置
        let speed = this.speed;
        // 需要通过其他方式访问bird的isDead方法
        if (this._bird && this._bird.isDead()) speed = 1;
        this.x -= speed; // 移除deltaTime，因为speed已经是每帧移动的像素

        // 添加上下浮动效果
        this.floatOffset += this.floatSpeed;
        this.y = this.originalY + Math.sin(this.floatOffset) * this.floatAmplitude;

        // 更新节点位置
        this.node.setPosition(new Vec3(this.x, this.y, 0));
    }

    // 新增方法来处理bird对象
    public updateWithBird(deltaTime: number, bird: Bird) {
        this._bird = bird;
        // 更新位置
        let speed = this.speed;
        if (bird.isDead()) speed = 1;
        this.x -= speed; // 移除deltaTime，因为speed已经是每帧移动的像素

        // 添加上下浮动效果
        this.floatOffset += this.floatSpeed;
        this.y = this.originalY + Math.sin(this.floatOffset) * this.floatAmplitude;

        // 更新节点位置
        this.node.setPosition(new Vec3(this.x, this.y, 0));
    }

    private _bird: Bird | null = null;

    /**
     * 判断云朵是否飞出屏幕
     *
     * @returns 飞出则返回true，否则返回false
     */
    isOutFrame(): boolean {
        return this.x < -1 * this.scaleImageWidth;
    }

    getX(): number {
        return this.x;
    }
}

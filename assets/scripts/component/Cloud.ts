import { Constant } from '../util/Constant';
import { Bird } from './Bird';

/**
 * 云朵类，实现云朵的绘制和运动逻辑
 */
export class Cloud {
    private readonly speed: number; // 速度
    private x: number; // 坐标
    private readonly y: number;

    private readonly img: HTMLImageElement;

    private readonly scaleImageWidth: number;
    private readonly scaleImageHeight: number;

    // 构造器
    constructor(img: HTMLImageElement, x: number, y: number) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.speed = Constant.GAME_SPEED * 2; // 云朵的速度
        // 云朵图片缩放的比例 1.0~2.0
        const scale = 1 + Math.random(); // Math.random()返回0.0~1.0的随机值
        // 缩放云朵图片
        this.scaleImageWidth = Math.floor(scale * img.width);
        this.scaleImageHeight = Math.floor(scale * img.width);
    }

    // 绘制方法
    draw(g: CanvasRenderingContext2D, bird: Bird) {
        let speed = this.speed;
        if (bird.isDead()) speed = 1;
        this.x -= speed;
        g.drawImage(this.img, this.x, this.y, this.scaleImageWidth, this.scaleImageHeight);
    }

    /**
     * 判断云朵是否飞出屏幕
     *
     * @returns 飞出则返回true，否则返回false
     */
    isOutFrame(): boolean {
        return this.x < -1 * this.scaleImageWidth;
    }
}

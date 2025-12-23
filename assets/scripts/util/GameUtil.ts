import { resources, SpriteFrame } from 'cc';

export class GameUtil {
    private constructor() {} // 私有化构造函数，防止实例化

    /**
     * 加载图片资源
     * @param imgPath 图片路径
     * @returns SpriteFrame 或 null
     */
    public static async loadBufferedImage(imgPath: string): Promise<SpriteFrame | null> {
        return new Promise((resolve) => {
            // 使用 Cocos Creator 的资源加载系统
            resources.load(imgPath, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.error(`Failed to load image: ${imgPath}`, err);
                    resolve(null);
                } else {
                    resolve(spriteFrame);
                }
            });
        });
    }

    /**
     * 判断概率事件是否发生
     * @param numerator 分子
     * @param denominator 分母
     * @returns 是否发生
     */
    public static isInProbability(numerator: number, denominator: number): boolean {
        if (numerator <= 0 || denominator <= 0) {
            throw new Error('传入了非法的参数');
        }
        if (numerator >= denominator) {
            return true;
        }
        return this.getRandomNumber(1, denominator + 1) <= numerator;
    }

    /**
     * 获取指定范围内的随机整数
     * @param min 最小值（包含）
     * @param max 最大值（不包含）
     * @returns 随机数
     */
    public static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 获取字符串宽度（基于 canvas 测量）
     * @param font 字体配置
     * @param str 字符串
     * @returns 宽度（像素）
     */
    public static getStringWidth(font: { family: string; style: string; size: number }, str: string): number {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 0;
        ctx.font = `${font.style} ${font.size}px ${font.family}`;
        return ctx.measureText(str).width;
    }

    /**
     * 获取字符串高度（基于 canvas 测量）
     * @param font 字体配置
     * @param str 字符串
     * @returns 高度（像素）
     */
    public static getStringHeight(font: { family: string; style: string; size: number }, str: string): number {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 0;
        ctx.font = `${font.style} ${font.size}px ${font.family}`;
        const metrics = ctx.measureText(str);
        return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    }

    /**
     * 绘制图片到画布
     * @param image 图片资源
     * @param x X坐标
     * @param y Y坐标
     * @param g CanvasRenderingContext2D
     */
    public static drawImage(image: SpriteFrame, x: number, y: number, g: CanvasRenderingContext2D): void {
        // 在Cocos Creator中，绘制由引擎处理，不需要手动实现
        // 这个方法保留是为了兼容现有代码
    }


     // 游戏状态常量
    static GAME_READY = 0; // 游戏未开始
    static GAME_START = 1; // 游戏开始
    static STATE_OVER = 2; // 游戏结束

    static gameState: number = this.GAME_READY;
    public static setGameState(gameState: number) {
        this.gameState = gameState;
    }

    // 获取当前游戏状态
    public static getGameState(): number {
        return this.gameState;
    }
}
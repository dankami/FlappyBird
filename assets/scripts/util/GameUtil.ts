// GameUtil.ts
// 游戏通用工具方法
export class GameUtil {
    // 判断两个矩形是否碰撞
    public static isCollision(
        rect1: { x: number; y: number; width: number; height: number },
        rect2: { x: number; y: number; width: number; height: number }
    ): boolean {
        return !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
    }

    // 随机生成一个指定范围内的数字
    public static random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    // 获取当前时间戳
    public static getCurrentTimestamp(): number {
        return Date.now();
    }

    // 延迟执行函数
    public static delay(callback: () => void, delay: number): void {
        setTimeout(callback, delay);
    }

    // 创建随机颜色
    public static getRandomColor(): string {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
}

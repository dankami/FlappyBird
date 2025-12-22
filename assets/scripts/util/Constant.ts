// Constant.ts
// 定义游戏常量
export class Constant {
    // 游戏尺寸
    public static readonly GAME_WIDTH: number = 480;
    public static readonly GAME_HEIGHT: number = 800;

    // 小鸟属性
    public static readonly BIRD_WIDTH: number = 60;
    public static readonly BIRD_HEIGHT: number = 40;
    public static readonly BIRD_JUMP_FORCE: number = 300;
    public static readonly BIRD_GRAVITY: number = 1000;

    // 管道属性
    public static readonly PIPE_WIDTH: number = 60;
    public static readonly PIPE_HEIGHT: number = 800;
    public static readonly PIPE_GAP_HEIGHT: number = 150;
    public static readonly PIPE_MOVE_SPEED: number = 2;
    public static readonly PIPE_SPAWN_INTERVAL: number = 2;

    // 云朵属性
    public static readonly CLOUD_WIDTH: number = 100;
    public static readonly CLOUD_HEIGHT: number = 50;
    public static readonly CLOUD_MOVE_SPEED: number = 1;

    // 地面属性
    public static readonly GROUND_HEIGHT: number = 100;
    public static readonly GROUND_MOVE_SPEED: number = 2;

    // 其他常量
    public static readonly MAX_PIPE_POOL_SIZE: number = 10;
    public static readonly GAME_OVER_ANIMATION_DURATION: number = 1;
}

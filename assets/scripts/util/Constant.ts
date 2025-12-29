export class Constant {
    // 窗口尺寸
    public static readonly FRAME_WIDTH: number = 420;
    public static readonly FRAME_HEIGHT: number = 640;

    // 游戏标题
    public static readonly GAME_TITLE: string = 'Flappy Bird written by Kingyu';

    // 窗口位置
    public static readonly FRAME_X: number = 600;
    public static readonly FRAME_Y: number = 100;

    // 图像资源路径
    public static readonly BG_IMG_PATH: string = 'resources/img/background.png'; // 背景图片

    // 小鸟图片
    public static readonly BIRDS_IMG_PATH: string[][] = [
        [
            'resources/img/0.png',
            'resources/img/1.png',
            'resources/img/2.png',
            'resources/img/3.png',
            'resources/img/4.png',
            'resources/img/5.png',
            'resources/img/6.png',
            'resources/img/7.png',
        ],
        [
            'resources/img/up.png',
            'resources/img/up.png',
            'resources/img/up.png',
            'resources/img/up.png',
            'resources/img/up.png',
            'resources/img/up.png',
            'resources/img/up.png',
            'resources/img/up.png',
        ],
        [
            'resources/img/down_0.png',
            'resources/img/down_1.png',
            'resources/img/down_2.png',
            'resources/img/down_3.png',
            'resources/img/down_4.png',
            'resources/img/down_5.png',
            'resources/img/down_6.png',
            'resources/img/down_7.png',
        ],
        [
            'resources/img/dead.png',
            'resources/img/dead.png',
            'resources/img/dead.png',
            'resources/img/dead.png',
            'resources/img/dead.png',
            'resources/img/dead.png',
            'resources/img/dead.png',
            'resources/img/dead.png',
        ],
    ];

    // 云朵图片
    public static readonly CLOUDS_IMG_PATH: string[] = [
        'resources/img/cloud_0.png',
        'resources/img/cloud_1.png',
    ];

    // 水管图片
    public static readonly PIPE_IMG_PATH: string[] = [
        'resources/img/pipe.png',
        'resources/img/pipe_top.png',
        'resources/img/pipe_bottom.png',
    ];

    public static readonly TITLE_IMG_PATH: string = 'resources/img/title.png';
    public static readonly NOTICE_IMG_PATH: string = 'resources/img/start.png';
    public static readonly SCORE_IMG_PATH: string = 'resources/img/score.png';
    public static readonly OVER_IMG_PATH: string = 'resources/img/over.png';
    public static readonly AGAIN_IMG_PATH: string = 'resources/img/again.png';

    public static readonly SCORE_FILE_PATH: string = 'resources/score'; // 分数文件路径

    // 游戏速度（水管及背景层的移动速度）
    public static readonly GAME_SPEED: number = 4;

    // 游戏背景色（使用 RGB 表示）
    public static readonly BG_COLOR: { r: number; g: number; b: number } = {
        r: 0x4b,
        g: 0xc4,
        b: 0xcf,
    };

    // 游戏刷新率
    public static readonly FPS: number = 1000 / 30;

    // 标题栏高度
    public static readonly TOP_BAR_HEIGHT: number = 20;

    // 地面高度
    public static readonly GROUND_HEIGHT: number = 35;

    // 上方管道加长
    public static readonly TOP_PIPE_LENGTHENING: number = 100;

    // 云朵生成的概率，单位为百分比
    public static readonly CLOUD_BORN_PERCENT: number = 6;

    // 云朵图片的个数
    public static readonly CLOUD_IMAGE_COUNT: number = 2;

    // 云朵的最大数量
    public static readonly MAX_CLOUD_COUNT: number = 7;

    // 字体配置
    public static readonly CURRENT_SCORE_FONT: { family: string; style: string; size: number } = {
        family: '华文琥珀',
        style: 'bold',
        size: 32,
    };

    public static readonly SCORE_FONT: { family: string; style: string; size: number } = {
        family: '华文琥珀',
        style: 'bold',
        size: 24,
    };

    public static readonly VERTICAL_INTERVAL: number = Math.floor(Constant.FRAME_HEIGHT / 5);
    public static readonly HORIZONTAL_INTERVAL: number = Math.floor(Constant.FRAME_HEIGHT / 4);
    public static readonly MIN_HEIGHT: number = Math.floor(Constant.FRAME_HEIGHT / 8);
    public static readonly MAX_HEIGHT: number = Math.floor((Constant.FRAME_HEIGHT / 8) * 5);
}

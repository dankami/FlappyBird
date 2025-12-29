export class Constant {
    // 窗口尺寸
    public static readonly FRAME_WIDTH: number = 420;
    public static readonly FRAME_HEIGHT: number = 640;

    // 游戏标题
    public static readonly GAME_TITLE: string = 'Flappy Bird written by Kingyu';

    // 窗口位置
    public static readonly FRAME_X: number = 600;
    public static readonly FRAME_Y: number = 100;

    public static readonly BG_IMG_PATH: string = 'img/background/spriteFrame'; // 背景图片

    // 小鸟图片
    public static readonly BIRDS_IMG_PATH: string[][] = [
        [
            'img/0/spriteFrame',
            'img/1/spriteFrame',
            'img/2/spriteFrame',
            'img/3/spriteFrame',
            'img/4/spriteFrame',
            'img/5/spriteFrame',
            'img/6/spriteFrame',
            'img/7/spriteFrame',
        ],
        [
            'img/up/spriteFrame',
            'img/up/spriteFrame',
            'img/up/spriteFrame',
            'img/up/spriteFrame',
            'img/up/spriteFrame',
            'img/up/spriteFrame',
            'img/up/spriteFrame',
            'img/up/spriteFrame',
        ],
        [
            'img/down_0/spriteFrame',
            'img/down_1/spriteFrame',
            'img/down_2/spriteFrame',
            'img/down_3/spriteFrame',
            'img/down_4/spriteFrame',
            'img/down_5/spriteFrame',
            'img/down_6/spriteFrame',
            'img/down_7/spriteFrame',
        ],
        [
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
            'img/dead/spriteFrame',
        ],
    ];

    // 云朵图片
    public static readonly CLOUDS_IMG_PATH: string[] = ['img/cloud_0/spriteFrame', 'img/cloud_1/spriteFrame'];

    // 水管图片
    public static readonly PIPE_IMG_PATH: string[] = [
        'img/pipe/spriteFrame',
        'img/pipe_top/spriteFrame',
        'img/pipe_bottom/spriteFrame',
    ];

    public static readonly TITLE_IMG_PATH: string = 'img/title/spriteFrame';
    public static readonly NOTICE_IMG_PATH: string = 'img/start/spriteFrame';
    public static readonly SCORE_IMG_PATH: string = 'img/score/spriteFrame';
    public static readonly OVER_IMG_PATH: string = 'img/over/spriteFrame';
    public static readonly AGAIN_IMG_PATH: string = 'img/again/spriteFrame';

    public static readonly SCORE_FILE_PATH: string = 'score';

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

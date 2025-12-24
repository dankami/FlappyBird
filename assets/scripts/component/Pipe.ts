import { _decorator, Component, Sprite, SpriteFrame, Node, Vec3, Rect, Graphics } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {
    protected imgs: SpriteFrame[] = [];

    public static readonly TYPE_TOP_NORMAL: number = 0;
    public static readonly TYPE_TOP_HARD: number = 1;
    public static readonly TYPE_BOTTOM_NORMAL: number = 2;
    public static readonly TYPE_BOTTOM_HARD: number = 3;
    public static readonly TYPE_HOVER_NORMAL: number = 4;
    public static readonly TYPE_HOVER_HARD: number = 5;

    public static PIPE_WIDTH: number;
    public static PIPE_HEIGHT: number;
    public static PIPE_HEAD_WIDTH: number;
    public static PIPE_HEAD_HEIGHT: number;

    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    visible: boolean = false;
    type: number = 0;
    speed: number = 0;
    pipeRect: Rect = new Rect();

    // Cocos Creator相关属性
    private pipeBodyNode: Node | null = null; // 水管身体节点
    private pipeHeadNode: Node | null = null; // 水管头节点
    private pipeBodySprite: Sprite | null = null; // 水管身体精灵组件
    private pipeHeadSprite: Sprite | null = null; // 水管头精灵组件

    async initImgs() {
        if (this.imgs.length === 0) {
            const PIPE_IMAGE_COUNT = 3;
            for (let i = 0; i < PIPE_IMAGE_COUNT; i++) {
                const img = await GameUtil.loadBufferedImage(Constant.PIPE_IMG_PATH[i]);
                if (img) {
                    this.imgs.push(img);
                }
            }

            // 设置静态属性
            if (this.imgs[0]) {
                Pipe.PIPE_WIDTH = this.imgs[0].width;
                Pipe.PIPE_HEIGHT = this.imgs[0].height;
                Pipe.PIPE_HEAD_WIDTH = this.imgs[1].width;
                Pipe.PIPE_HEAD_HEIGHT = this.imgs[1].height;
            }
        }
    }

    constructor() {
        super();
        this.speed = Constant.GAME_SPEED;
        this.width = Pipe.PIPE_WIDTH;
        this.pipeRect.width = Pipe.PIPE_WIDTH;
    }

    setAttribute(x: number, y: number, height: number, type: number, visible: boolean) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.type = type;
        this.visible = visible;
        this.setRectangle(this.x, this.y, this.height);
        this.updatePipeNode(); // 更新节点位置和大小
    }

    setRectangle(x: number, y: number, height: number) {
        this.pipeRect.x = x;
        this.pipeRect.y = y;
        this.pipeRect.height = height;
    }

    isVisible(): boolean {
        return this.visible;
    }

    // 在Cocos Creator中，draw方法应替换为节点操作
    draw(g: Graphics, bird: Bird) {
        // 这个方法在Cocos Creator中不再需要，因为使用节点系统
        // 保留此方法是为了兼容现有代码，实际绘制由节点系统处理
        if (bird.isDead()) {
            return;
        }
        this.movement();
    }

    // 更新节点位置和大小
    private updatePipeNode() {
        // 确保节点已创建
        if (!this.pipeBodyNode) {
            this.createPipeNodes();
        }

        // 根据水管类型设置节点位置和大小
        switch (this.type) {
            case Pipe.TYPE_TOP_NORMAL:
                this.setupTopNormalPipe();
                break;
            case Pipe.TYPE_BOTTOM_NORMAL:
                this.setupBottomNormalPipe();
                break;
            case Pipe.TYPE_HOVER_NORMAL:
                this.setupHoverNormalPipe();
                break;
        }

        // 更新碰撞矩形
        this.updateCollisionRect();
    }

    // 创建水管节点
    private createPipeNodes() {
        // 创建水管身体节点
        this.pipeBodyNode = new Node('PipeBody');
        this.pipeBodyNode.parent = this.node;
        this.pipeBodySprite = this.pipeBodyNode.addComponent(Sprite);
        this.pipeBodySprite.spriteFrame = this.imgs[0];

        // 创建水管头节点
        this.pipeHeadNode = new Node('PipeHead');
        this.pipeHeadNode.parent = this.node;
        this.pipeHeadSprite = this.pipeHeadNode.addComponent(Sprite);
    }

    // 设置上部普通水管
    private setupTopNormalPipe() {
        if (
            !this.pipeBodyNode ||
            !this.pipeHeadNode ||
            !this.pipeBodySprite ||
            !this.pipeHeadSprite
        )
            return;

        // 设置水管身体
        const bodyCount = Math.floor((this.height - Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        this.pipeBodyNode.setPosition(new Vec3(this.x, this.y, 0));
        this.pipeBodyNode.setScale(new Vec3(1, bodyCount, 1)); // 垂直拉伸以匹配高度
        this.pipeBodySprite.spriteFrame = this.imgs[0];

        // 设置水管头
        this.pipeHeadNode.setPosition(
            new Vec3(
                this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
                this.height - Constant.TOP_PIPE_LENGTHENING - Pipe.PIPE_HEAD_HEIGHT,
                0
            )
        );
        this.pipeHeadSprite.spriteFrame = this.imgs[1];
    }

    // 设置下部普通水管
    private setupBottomNormalPipe() {
        if (
            !this.pipeBodyNode ||
            !this.pipeHeadNode ||
            !this.pipeBodySprite ||
            !this.pipeHeadSprite
        )
            return;

        // 设置水管身体
        const bodyCount =
            Math.floor(
                (this.height - Pipe.PIPE_HEAD_HEIGHT - Constant.GROUND_HEIGHT) / Pipe.PIPE_HEIGHT
            ) + 1;
        this.pipeBodyNode.setPosition(
            new Vec3(this.x, Constant.FRAME_HEIGHT - Pipe.PIPE_HEIGHT - Constant.GROUND_HEIGHT, 0)
        );
        this.pipeBodyNode.setScale(new Vec3(1, bodyCount, 1));
        this.pipeBodySprite.spriteFrame = this.imgs[0];

        // 设置水管头
        this.pipeHeadNode.setPosition(
            new Vec3(
                this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
                Constant.FRAME_HEIGHT - this.height,
                0
            )
        );
        this.pipeHeadSprite.spriteFrame = this.imgs[2];
    }

    // 设置悬浮普通水管
    private setupHoverNormalPipe() {
        if (
            !this.pipeBodyNode ||
            !this.pipeHeadNode ||
            !this.pipeBodySprite ||
            !this.pipeHeadSprite
        )
            return;

        // 设置水管身体
        const bodyCount =
            Math.floor((this.height - 2 * Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        this.pipeBodyNode.setPosition(new Vec3(this.x, this.y + Pipe.PIPE_HEAD_HEIGHT, 0));
        this.pipeBodyNode.setScale(new Vec3(1, bodyCount, 1));
        this.pipeBodySprite.spriteFrame = this.imgs[0];

        // 设置上部水管头
        let topHeadNode = this.node.getChildByName('TopPipeHead');
        if (!topHeadNode) {
            topHeadNode = new Node('TopPipeHead');
            topHeadNode.parent = this.node;
            const topHeadSprite = topHeadNode.addComponent(Sprite);
            topHeadSprite.spriteFrame = this.imgs[2];
        }

        topHeadNode.setPosition(
            new Vec3(this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2), this.y, 0)
        );

        // 设置下部水管头
        let bottomHeadNode = this.node.getChildByName('BottomPipeHead');
        if (!bottomHeadNode) {
            bottomHeadNode = new Node('BottomPipeHead');
            bottomHeadNode.parent = this.node;
            const bottomHeadSprite = bottomHeadNode.addComponent(Sprite);
            bottomHeadSprite.spriteFrame = this.imgs[1];
        }

        const bottomY = this.y + this.height - Pipe.PIPE_HEAD_HEIGHT;
        bottomHeadNode.setPosition(
            new Vec3(this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2), bottomY, 0)
        );
    }

    // 更新碰撞矩形
    private updateCollisionRect() {
        this.pipeRect.x = this.x;
        this.pipeRect.y = this.y;
        this.pipeRect.width = this.width;
        this.pipeRect.height = this.height;
    }

    protected movement() {
        this.x -= this.speed;
        this.pipeRect.x -= this.speed;
        if (this.x < -1 * Pipe.PIPE_HEAD_WIDTH) {
            this.visible = false;
        }

        // 更新节点位置
        if (this.node) {
            this.node.setPosition(new Vec3(this.x, this.y, 0));
        }
    }

    isInFrame(): boolean {
        return this.x + this.width < Constant.FRAME_WIDTH;
    }

    getX(): number {
        return this.x;
    }

    getPipeRect(): Rect {
        return this.pipeRect;
    }
}

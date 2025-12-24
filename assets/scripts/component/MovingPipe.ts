import { _decorator, Component, SpriteFrame, Graphics, Node, Sprite, Vec3, UITransform } from 'cc';
import { Constant } from '../util/Constant';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('MovingPipe')
export class MovingPipe extends Pipe {
    
    private dealtY: number = 0;
    public static readonly MAX_DELTA: number = 50;
    private direction: number = 0;
    public static readonly DIR_UP: number = 0;
    public static readonly DIR_DOWN: number = 1;

    // 为移动水管添加额外的节点
    private movingPipeBodyNode: Node | null = null;
    private movingPipeHeadNode: Node | null = null;
    private topHeadNode: Node | null = null; // 用于悬浮水管的上部头
    private bottomHeadNode: Node | null = null; // 用于悬浮水管的下部头

    constructor() {
        super();
    }

    setAttribute(x: number, y: number, height: number, type: number, visible: boolean) {
        super.setAttribute(x, y, height, type, visible);
        this.dealtY = 0;
        this.direction = MovingPipe.DIR_DOWN;
        if (type === Pipe.TYPE_TOP_HARD) {
            this.direction = MovingPipe.DIR_UP;
        }
        
        // 初始化移动水管节点
        this.initMovingPipeNodes();
    }

    private initMovingPipeNodes() {
        // 根据水管类型创建对应的节点
        switch (this.type) {
            case Pipe.TYPE_HOVER_HARD:
                this.createHoverHardNodes();
                break;
            case Pipe.TYPE_TOP_HARD:
                this.createTopHardNodes();
                break;
            case Pipe.TYPE_BOTTOM_HARD:
                this.createBottomHardNodes();
                break;
        }
    }

    // 创建悬浮硬水管节点
    private createHoverHardNodes() {
        // 创建水管身体节点
        if (!this.movingPipeBodyNode) {
            this.movingPipeBodyNode = new Node('MovingPipeBody');
            this.movingPipeBodyNode.parent = this.node;
            const sprite = this.movingPipeBodyNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[0];
        }

        // 创建上部水管头节点
        if (!this.topHeadNode) {
            this.topHeadNode = new Node('TopMovingPipeHead');
            this.topHeadNode.parent = this.node;
            const sprite = this.topHeadNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[2];
        }

        // 创建下部水管头节点
        if (!this.bottomHeadNode) {
            this.bottomHeadNode = new Node('BottomMovingPipeHead');
            this.bottomHeadNode.parent = this.node;
            const sprite = this.bottomHeadNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[1];
        }
    }

    // 创建上部硬水管节点
    private createTopHardNodes() {
        // 创建水管身体节点
        if (!this.movingPipeBodyNode) {
            this.movingPipeBodyNode = new Node('MovingPipeBody');
            this.movingPipeBodyNode.parent = this.node;
            const sprite = this.movingPipeBodyNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[0];
        }

        // 创建水管头节点
        if (!this.movingPipeHeadNode) {
            this.movingPipeHeadNode = new Node('MovingPipeHead');
            this.movingPipeHeadNode.parent = this.node;
            const sprite = this.movingPipeHeadNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[1];
        }
    }

    // 创建下部硬水管节点
    private createBottomHardNodes() {
        // 创建水管身体节点
        if (!this.movingPipeBodyNode) {
            this.movingPipeBodyNode = new Node('MovingPipeBody');
            this.movingPipeBodyNode.parent = this.node;
            const sprite = this.movingPipeBodyNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[0];
        }

        // 创建水管头节点
        if (!this.movingPipeHeadNode) {
            this.movingPipeHeadNode = new Node('MovingPipeHead');
            this.movingPipeHeadNode.parent = this.node;
            const sprite = this.movingPipeHeadNode.addComponent(Sprite);
            sprite.spriteFrame = this.imgs[2];
        }
    }

    draw(g: Graphics, bird: Bird) {
        // 更新移动水管的位置
        this.updateMovingPipePosition();

        if (bird.isDead()) {
            return;
        }
        this.movement();
    }

    private updateMovingPipePosition() {
        switch (this.type) {
            case Pipe.TYPE_HOVER_HARD:
                this.updateHoverHardPosition();
                break;
            case Pipe.TYPE_TOP_HARD:
                this.updateTopHardPosition();
                break;
            case Pipe.TYPE_BOTTOM_HARD:
                this.updateBottomHardPosition();
                break;
        }
    }

    private updateHoverHardPosition() {
        if (!this.movingPipeBodyNode || !this.topHeadNode || !this.bottomHeadNode) return;

        // 计算水管身体的数量
        const count = Math.floor((this.height - 2 * Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        
        // 设置水管身体
        this.movingPipeBodyNode.setPosition(new Vec3(
            this.x,
            this.y + this.dealtY + Pipe.PIPE_HEAD_HEIGHT,
            0
        ));
        
        // 垂直拉伸身体部分
        const uiTransform = this.movingPipeBodyNode.getComponent(UITransform)!;
        uiTransform.height = count * Pipe.PIPE_HEIGHT;

        // 设置上部水管头
        this.topHeadNode.setPosition(new Vec3(
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            this.y + this.dealtY,
            0
        ));

        // 设置下部水管头
        const y = this.y + this.height - Pipe.PIPE_HEAD_HEIGHT;
        this.bottomHeadNode.setPosition(new Vec3(
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            y + this.dealtY,
            0
        ));
    }

    private updateTopHardPosition() {
        if (!this.movingPipeBodyNode || !this.movingPipeHeadNode) return;

        // 计算水管身体的数量
        const count = Math.floor((this.height - Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        
        // 设置水管身体
        this.movingPipeBodyNode.setPosition(new Vec3(
            this.x,
            this.y + this.dealtY,
            0
        ));
        
        // 垂直拉伸身体部分
        const uiTransform = this.movingPipeBodyNode.getComponent(UITransform)!;
        uiTransform.height = count * Pipe.PIPE_HEIGHT;

        // 设置水管头
        this.movingPipeHeadNode.setPosition(new Vec3(
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            this.height - Constant.TOP_PIPE_LENGTHENING - Pipe.PIPE_HEAD_HEIGHT + this.dealtY,
            0
        ));
    }

    private updateBottomHardPosition() {
        if (!this.movingPipeBodyNode || !this.movingPipeHeadNode) return;

        // 计算水管身体的数量
        const count = Math.floor((this.height - Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        
        // 设置水管身体
        this.movingPipeBodyNode.setPosition(new Vec3(
            this.x,
            Constant.FRAME_HEIGHT - Pipe.PIPE_HEIGHT - (count - 1) * Pipe.PIPE_HEIGHT + this.dealtY,
            0
        ));
        
        // 垂直拉伸身体部分
        const uiTransform = this.movingPipeBodyNode.getComponent(UITransform)!;
        uiTransform.height = count * Pipe.PIPE_HEIGHT;

        // 设置水管头
        this.movingPipeHeadNode.setPosition(new Vec3(
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            Constant.FRAME_HEIGHT - this.height + this.dealtY,
            0
        ));
    }

    movement() {
        this.x -= this.speed;
        this.pipeRect.x -= this.speed;
        if (this.x < -1 * Pipe.PIPE_HEAD_WIDTH) {
            this.visible = false;
        }

        if (this.direction === MovingPipe.DIR_DOWN) {
            this.dealtY++;
            if (this.dealtY > MovingPipe.MAX_DELTA) {
                this.direction = MovingPipe.DIR_UP;
            }
        } else {
            this.dealtY--;
            if (this.dealtY <= 0) {
                this.direction = MovingPipe.DIR_DOWN;
            }
        }
        this.pipeRect.y = this.y + this.dealtY;
    }
}
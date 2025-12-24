import {
    _decorator,
    Component,
    Node,
    Sprite,
    Vec3,
    RigidBody,
    PhysicsSystem,
    director,
    SpriteFrame,
    Rect,
} from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
import { MusicUtil } from '../util/MusicUtil';
import { ScoreCounter } from './ScoreCounter';
import { GameOverAnimation } from './GameOverAnimation';
import { GameBackground } from './GameBackground';
import { MyGame } from '../app/MyGame';

const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    // 静态常量
    static readonly IMG_COUNT = 8;
    static readonly STATE_COUNT = 4;
    static BIRD_WIDTH: number;
    static BIRD_HEIGHT: number;

    static readonly BIRD_NORMAL = 0;
    static readonly BIRD_UP = 1;
    static readonly BIRD_FALL = 2;
    static readonly BIRD_DEAD_FALL = 3;
    static readonly BIRD_DEAD = 4;

    static readonly ACC_FLAP = 14;
    static readonly ACC_Y = 2;
    static readonly MAX_VEL_Y = 15;
    static readonly RECT_DESCALE = 2;

    // 成员变量
    private birdImages: SpriteFrame[][];
    private wingState: number = 0;
    private state: number = Bird.BIRD_NORMAL;
    private velocity: number = 0;
    private keyFlag: boolean = true;
    private counter: ScoreCounter;
    private gameOverAnimation: GameOverAnimation;
    private sprite: Sprite;
    private rigidBody: RigidBody;

    private x: number;
    private y: number;
    private BOTTOM_BOUNDARY: number;

    onLoad() {
        this.counter = ScoreCounter.getInstance();
        this.gameOverAnimation = new GameOverAnimation();

        // 初始化位置
        this.x = Constant.FRAME_WIDTH / 4;
        this.y = Constant.FRAME_HEIGHT / 2;
        this.node.setPosition(new Vec3(this.x, this.y, 0));

        this.BOTTOM_BOUNDARY =
            Constant.FRAME_HEIGHT - GameBackground.GROUND_HEIGHT - Bird.BIRD_HEIGHT / 2;

        // 加载图片资源
        this.birdImages = [];
        for (let j = 0; j < Bird.STATE_COUNT; j++) {
            this.birdImages[j] = [];
            for (let i = 0; i < Bird.IMG_COUNT; i++) {
                // 加载精灵帧
                // this.birdImages[j][i] = // 从资源管理器加载
            }
        }

        // 获取组件
        this.sprite = this.node.getComponent(Sprite);
    }

    start() {
        // 初始化小鸟的宽高
        if (this.sprite && this.sprite.spriteFrame) {
            Bird.BIRD_WIDTH = this.sprite.spriteFrame.getRect().width;
            Bird.BIRD_HEIGHT = this.sprite.spriteFrame.getRect().height;
        }
    }

    update(deltaTime: number) {
        this.movement();

        // 更新节点位置
        this.node.setPosition(new Vec3(this.x, this.y, 0));

        // 根据状态更新精灵
        const state_index = Math.min(this.state, Bird.BIRD_DEAD_FALL);
        const currentImageIndex = Math.floor(this.wingState / 10) % Bird.IMG_COUNT;
        if (this.birdImages[state_index] && this.birdImages[state_index][currentImageIndex]) {
            // this.sprite.spriteFrame = this.birdImages[state_index][currentImageIndex];
        }

        // 处理游戏结束动画
        if (this.state === Bird.BIRD_DEAD) {
            // this.gameOverAnimation.update(deltaTime, this);
        }
    }

    private movement() {
        this.wingState++;

        if (this.state === Bird.BIRD_FALL || this.state === Bird.BIRD_DEAD_FALL) {
            this.freeFall();

            // 检查是否触底
            if (this.y > this.BOTTOM_BOUNDARY) {
                if (this.state === Bird.BIRD_FALL) {
                    MusicUtil.playCrash();
                }
                this.die();
            }
        }
    }

    private freeFall() {
        if (this.velocity < Bird.MAX_VEL_Y) {
            this.velocity -= Bird.ACC_Y;
        }
        this.y = Math.min(this.y - this.velocity, this.BOTTOM_BOUNDARY);
    }

    private die() {
        this.counter.saveScore();
        this.state = Bird.BIRD_DEAD;
        GameUtil.setGameState(GameUtil.STATE_OVER);
    }

    birdFlap() {
        if (this.keyIsReleased()) {
            if (this.isDead()) return;

            MusicUtil.playFly();
            this.state = Bird.BIRD_UP;

            if (this.y > Constant.TOP_BAR_HEIGHT) {
                this.velocity = Bird.ACC_FLAP;
                this.wingState = 0;
            }

            this.keyPressed();
        }
    }

    birdFall() {
        if (this.isDead()) return;
        this.state = Bird.BIRD_FALL;
    }

    deadBirdFall() {
        this.state = Bird.BIRD_DEAD_FALL;
        MusicUtil.playCrash();
        this.velocity = 0;
    }

    isDead(): boolean {
        return this.state === Bird.BIRD_DEAD_FALL || this.state === Bird.BIRD_DEAD;
    }

    reset() {
        this.state = Bird.BIRD_NORMAL;
        this.y = Constant.FRAME_HEIGHT / 2;
        this.velocity = 0;
        this.wingState = 0;

        // 重置位置
        this.node.setPosition(new Vec3(this.x, this.y, 0));

        this.counter.reset();
    }

    keyPressed() {
        this.keyFlag = false;
    }

    keyReleased() {
        this.keyFlag = true;
    }

    keyIsReleased(): boolean {
        return this.keyFlag;
    }

    getCurrentScore(): number {
        return this.counter.getCurrentScore();
    }

    getBestScore(): number {
        return this.counter.getBestScore();
    }

    getBirdPosition(): Vec3 {
        return this.node.position;
    }

    getBirdX(): number {
        return this.x;
    }

    getBirdCollisionRect(): Rect {
        // 创建一个矩形对象来表示小鸟的碰撞区域
        // 基于小鸟的位置和尺寸创建碰撞矩形
        const rectX = this.x - Bird.BIRD_WIDTH / 2;
        const rectY = this.y - Bird.BIRD_HEIGHT / 2;
        const rectWidth = Bird.BIRD_WIDTH - Bird.RECT_DESCALE * 3;
        const rectHeight = Bird.BIRD_WIDTH - Bird.RECT_DESCALE * 4;

        // 返回 Cocos Creator 的 Rect 对象
        return new Rect(
            rectX + Bird.RECT_DESCALE,
            rectY + Bird.RECT_DESCALE * 2,
            rectWidth,
            rectHeight
        );
    }
}

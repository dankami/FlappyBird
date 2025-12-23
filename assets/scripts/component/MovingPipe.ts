import { _decorator, Component, SpriteFrame, Graphics } from 'cc';
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
    }

    draw(g: Graphics, bird: Bird) {
        switch (this.type) {
            case Pipe.TYPE_HOVER_HARD:
                this.drawHoverHard(g);
                break;
            case Pipe.TYPE_TOP_HARD:
                this.drawTopHard(g);
                break;
            case Pipe.TYPE_BOTTOM_HARD:
                this.drawBottomHard(g);
                break;
        }

        if (bird.isDead()) {
            return;
        }
        this.movement();
    }

    private drawHoverHard(g: Graphics) {
        const count = Math.floor((this.height - 2 * Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        g.drawImage(
            Pipe.imgs[2],
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            this.y + this.dealtY
        );
        
        for (let i = 0; i < count; i++) {
            g.drawImage(
                Pipe.imgs[0],
                this.x,
                this.y + this.dealtY + i * Pipe.PIPE_HEIGHT + Pipe.PIPE_HEAD_HEIGHT
            );
        }
        
        const y = this.y + this.height - Pipe.PIPE_HEAD_HEIGHT;
        g.drawImage(
            Pipe.imgs[1],
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            y + this.dealtY
        );
    }

    private drawTopHard(g: Graphics) {
        const count = Math.floor((this.height - Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        for (let i = 0; i < count; i++) {
            g.drawImage(Pipe.imgs[0], this.x, this.y + this.dealtY + i * Pipe.PIPE_HEIGHT);
        }
        g.drawImage(
            Pipe.imgs[1],
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            this.height - Constant.TOP_PIPE_LENGTHENING - Pipe.PIPE_HEAD_HEIGHT + this.dealtY
        );
    }

    private drawBottomHard(g: Graphics) {
        const count = Math.floor((this.height - Pipe.PIPE_HEAD_HEIGHT) / Pipe.PIPE_HEIGHT) + 1;
        for (let i = 0; i < count; i++) {
            g.drawImage(
                Pipe.imgs[0],
                this.x,
                Constant.FRAME_HEIGHT - Pipe.PIPE_HEIGHT - i * Pipe.PIPE_HEIGHT + this.dealtY
            );
        }
        g.drawImage(
            Pipe.imgs[2],
            this.x - Math.floor((Pipe.PIPE_HEAD_WIDTH - this.width) / 2),
            Constant.FRAME_HEIGHT - this.height + this.dealtY
        );
    }

    private movement() {
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
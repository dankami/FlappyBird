import { _decorator, Component, Graphics, Rect } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { ScoreCounter } from './ScoreCounter';
const { ccclass, property } = _decorator;

@ccclass('GameElementLayer')
export class GameElementLayer extends Component {
    private pipes: Pipe[] = [];

    constructor() {
        super();
    }

    draw(g: Graphics, bird: Bird) {
        for (let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            if (pipe.isVisible()) {
                pipe.draw(g, bird);
            } else {
                const remove = this.pipes.splice(i, 1)[0];
                PipePool.giveBack(remove);
                i--;
            }
        }
        this.isCollideBird(bird);
        this.pipeBornLogic(bird);
    }

    private async pipeBornLogic(bird: Bird) {
        if (bird.isDead()) {
            return;
        }

        if (this.pipes.length === 0) {
            const topHeight = GameUtil.getRandomNumber(
                Constant.MIN_HEIGHT,
                Constant.MAX_HEIGHT + 1
            );

            const top = await PipePool.get('Pipe');
            top.setAttribute(
                Constant.FRAME_WIDTH,
                -Constant.TOP_PIPE_LENGTHENING,
                topHeight + Constant.TOP_PIPE_LENGTHENING,
                Pipe.TYPE_TOP_NORMAL,
                true
            );

            const bottom = await PipePool.get('Pipe');
            bottom.setAttribute(
                Constant.FRAME_WIDTH,
                topHeight + Constant.VERTICAL_INTERVAL,
                Constant.FRAME_HEIGHT - topHeight - Constant.VERTICAL_INTERVAL,
                Pipe.TYPE_BOTTOM_NORMAL,
                true
            );

            this.pipes.push(top);
            this.pipes.push(bottom);
        } else {
            const lastPipe = this.pipes[this.pipes.length - 1];
            const currentDistance = lastPipe.getX() - bird.getBirdX() + Bird.BIRD_WIDTH / 2;
            const SCORE_DISTANCE = Pipe.PIPE_WIDTH * 2 + Constant.HORIZONTAL_INTERVAL;

            if (lastPipe.isInFrame()) {
                if (
                    this.pipes.length >= PipePool.FULL_PIPE - 2 &&
                    currentDistance <= SCORE_DISTANCE + Math.floor((Pipe.PIPE_WIDTH * 3) / 2)
                ) {
                    ScoreCounter.getInstance().score(bird);
                }

                try {
                    const currentScore =
                        Math.floor(ScoreCounter.getInstance().getCurrentScore()) + 1;
                    if (GameUtil.isInProbability(currentScore, 20)) {
                        if (GameUtil.isInProbability(1, 4)) {
                            await this.addMovingHoverPipe(lastPipe);
                        } else {
                            await this.addMovingNormalPipe(lastPipe);
                        }
                    } else {
                        if (GameUtil.isInProbability(1, 2)) {
                            await this.addNormalPipe(lastPipe);
                        } else {
                            await this.addHoverPipe(lastPipe);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }

    private async addNormalPipe(lastPipe: Pipe) {
        const topHeight = GameUtil.getRandomNumber(Constant.MIN_HEIGHT, Constant.MAX_HEIGHT + 1);
        const x = lastPipe.getX() + Constant.HORIZONTAL_INTERVAL;

        const top = await PipePool.get('Pipe');
        top.setAttribute(
            x,
            -Constant.TOP_PIPE_LENGTHENING,
            topHeight + Constant.TOP_PIPE_LENGTHENING,
            Pipe.TYPE_TOP_NORMAL,
            true
        );

        const bottom = await PipePool.get('Pipe');
        bottom.setAttribute(
            x,
            topHeight + Constant.VERTICAL_INTERVAL,
            Constant.FRAME_HEIGHT - topHeight - Constant.VERTICAL_INTERVAL,
            Pipe.TYPE_BOTTOM_NORMAL,
            true
        );

        this.pipes.push(top);
        this.pipes.push(bottom);
    }

    private async addHoverPipe(lastPipe: Pipe) {
        const topHoverHeight = GameUtil.getRandomNumber(
            Math.floor(Constant.FRAME_HEIGHT / 6),
            Math.floor(Constant.FRAME_HEIGHT / 4)
        );
        const x = lastPipe.getX() + Constant.HORIZONTAL_INTERVAL;
        const y = GameUtil.getRandomNumber(
            Math.floor(Constant.FRAME_HEIGHT / 12),
            Math.floor(Constant.FRAME_HEIGHT / 6)
        );

        const type = Pipe.TYPE_HOVER_NORMAL;

        const topHover = await PipePool.get('Pipe');
        topHover.setAttribute(x, y, topHoverHeight, type, true);

        const bottomHoverHeight =
            Constant.FRAME_HEIGHT - 2 * y - topHoverHeight - Constant.VERTICAL_INTERVAL;
        const bottomHover = await PipePool.get('Pipe');
        bottomHover.setAttribute(
            x,
            y + topHoverHeight + Constant.VERTICAL_INTERVAL,
            bottomHoverHeight,
            type,
            true
        );

        this.pipes.push(topHover);
        this.pipes.push(bottomHover);
    }

    private async addMovingHoverPipe(lastPipe: Pipe) {
        const topHoverHeight = GameUtil.getRandomNumber(
            Math.floor(Constant.FRAME_HEIGHT / 6),
            Math.floor(Constant.FRAME_HEIGHT / 4)
        );
        const x = lastPipe.getX() + Constant.HORIZONTAL_INTERVAL;
        const y = GameUtil.getRandomNumber(
            Math.floor(Constant.FRAME_HEIGHT / 12),
            Math.floor(Constant.FRAME_HEIGHT / 6)
        );

        const type = Pipe.TYPE_HOVER_NORMAL;

        const topHover = await PipePool.get('Pipe');
        topHover.setAttribute(x, y, topHoverHeight, type, true);

        const bottomHoverHeight =
            Constant.FRAME_HEIGHT - 2 * y - topHoverHeight - Constant.VERTICAL_INTERVAL;
        const bottomHover = await PipePool.get('Pipe');
        bottomHover.setAttribute(
            x,
            y + topHoverHeight + Constant.VERTICAL_INTERVAL,
            bottomHoverHeight,
            type,
            true
        );

        this.pipes.push(topHover);
        this.pipes.push(bottomHover);
    }
    private async addMovingNormalPipe(lastPipe: Pipe) {
        const topHeight = GameUtil.getRandomNumber(Constant.MIN_HEIGHT, Constant.MAX_HEIGHT + 1);
        const x = lastPipe.getX() + Constant.HORIZONTAL_INTERVAL;

        const top = await PipePool.get('Pipe');
        top.setAttribute(
            x,
            -Constant.TOP_PIPE_LENGTHENING,
            topHeight + Constant.TOP_PIPE_LENGTHENING,
            Pipe.TYPE_TOP_NORMAL,
            true
        );

        const bottom = await PipePool.get('Pipe');
        bottom.setAttribute(
            x,
            topHeight + Constant.VERTICAL_INTERVAL,
            Constant.FRAME_HEIGHT - topHeight - Constant.VERTICAL_INTERVAL,
            Pipe.TYPE_BOTTOM_NORMAL,
            true
        );

        this.pipes.push(top);
        this.pipes.push(bottom);
    }

    public isCollideBird(bird: Bird) {
        if (bird.isDead()) {
            return;
        }

        for (const pipe of this.pipes) {
            // 在 Cocos Creator 中，碰撞检测使用 Collider 组件进行处理
            // 这里我们保持原有的矩形碰撞检测逻辑，但可以考虑使用 Cocos 的碰撞系统
            if (pipe.getPipeRect().intersects(bird.getBirdCollisionRect())) {
                bird.deadBirdFall();
                return;
            }
        }
    }

    public reset() {
        for (const pipe of this.pipes) {
            PipePool.giveBack(pipe);
        }
        this.pipes = [];
    }
}

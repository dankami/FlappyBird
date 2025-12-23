import { _decorator, Component } from 'cc';
import { Constant } from '../util/Constant';
import { GameElementLayer } from './GameElementLayer';
import { Pipe } from './Pipe';
import { MovingPipe } from './MovingPipe';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    private static pool: Pipe[] = [];
    private static movingPool: MovingPipe[] = [];
    public static readonly MAX_PIPE_COUNT: number = 30;
    public static readonly FULL_PIPE: number = (Math.floor(Constant.FRAME_WIDTH / (Pipe.PIPE_HEAD_WIDTH + GameElementLayer.HORIZONTAL_INTERVAL)) + 2) * 2;

    static async init() {
        for (let i = 0; i < PipePool.FULL_PIPE; i++) {
            const pipe = new Pipe();
            await Pipe.initImgs();
            PipePool.pool.push(pipe);
        }
        for (let i = 0; i < PipePool.FULL_PIPE; i++) {
            const movingPipe = new MovingPipe();
            await Pipe.initImgs();
            PipePool.movingPool.push(movingPipe);
        }
    }

    public static async get(className: string): Promise<Pipe> {
        if (className === "Pipe") {
            const size = PipePool.pool.length;
            if (size > 0) {
                return PipePool.pool.pop()!;
            } else {
                const pipe = new Pipe();
                await Pipe.initImgs();
                return pipe;
            }
        } else {
            const size = PipePool.movingPool.length;
            if (size > 0) {
                return PipePool.movingPool.pop()!;
            } else {
                const movingPipe = new MovingPipe();
                await Pipe.initImgs();
                return movingPipe;
            }
        }
    }

    public static giveBack(pipe: Pipe) {
        if (pipe instanceof MovingPipe) {
            if (PipePool.movingPool.length < PipePool.MAX_PIPE_COUNT) {
                PipePool.movingPool.push(pipe);
            }
        } else {
            if (PipePool.pool.length < PipePool.MAX_PIPE_COUNT) {
                PipePool.pool.push(pipe);
            }
        }
    }
}
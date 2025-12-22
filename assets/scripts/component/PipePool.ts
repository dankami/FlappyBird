// PipePool.ts
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({ type: Prefab })
    public pipePrefab: Prefab = null!;

    private pool: Node[] = [];
    private maxPoolSize: number = 10;

    start() {
        this.initializePool();
    }

    initializePool() {
        for (let i = 0; i < this.maxPoolSize; i++) {
            const pipe = instantiate(this.pipePrefab);
            pipe.active = false;
            this.pool.push(pipe);
            this.node.addChild(pipe);
        }
    }

    getPipe(): Node | null {
        for (let i = 0; i < this.pool.length; i++) {
            if (!this.pool[i].active) {
                this.pool[i].active = true;
                return this.pool[i];
            }
        }

        // 如果池中没有可用的管道，创建新的
        const newPipe = instantiate(this.pipePrefab);
        this.pool.push(newPipe);
        this.node.addChild(newPipe);
        return newPipe;
    }

    returnPipe(pipe: Node) {
        pipe.active = false;
    }

    clearPool() {
        this.pool.forEach((pipe) => {
            pipe.destroy();
        });
        this.pool = [];
    }
}

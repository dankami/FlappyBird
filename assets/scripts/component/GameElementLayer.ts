// GameElementLayer.ts
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameElementLayer')
export class GameElementLayer extends Component {
    @property({ type: Prefab })
    public cloudPrefab: Prefab = null!;

    @property({ type: Prefab })
    public pipePrefab: Prefab = null!;

    @property({ type: Prefab })
    public birdPrefab: Prefab = null!;

    private clouds: Node[] = [];
    private pipes: Node[] = [];

    start() {
        this.initElements();
    }

    initElements() {
        // 初始化云朵
        for (let i = 0; i < 3; i++) {
            const cloud = instantiate(this.cloudPrefab);
            cloud.setPosition(new Vec3(400 + i * 300, Math.random() * 100 - 50, 0));
            this.node.addChild(cloud);
            this.clouds.push(cloud);
        }

        // 初始化管道
        // 管道会在游戏运行时动态生成
    }

    addPipe(pipe: Node) {
        this.pipes.push(pipe);
        this.node.addChild(pipe);
    }

    removePipe(pipe: Node) {
        const index = this.pipes.indexOf(pipe);
        if (index !== -1) {
            this.pipes.splice(index, 1);
            pipe.destroy();
        }
    }

    clearAll() {
        this.clouds.forEach((cloud) => cloud.destroy());
        this.pipes.forEach((pipe) => pipe.destroy());
        this.clouds = [];
        this.pipes = [];
    }
}

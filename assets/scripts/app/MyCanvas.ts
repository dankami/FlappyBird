// MyCanvas.ts
import { _decorator, Component, Node, instantiate, Prefab, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyCanvas')
export class MyCanvas extends Component {
    @property({ type: Prefab })
    public birdPrefab: Prefab = null!;

    @property({ type: Prefab })
    public pipePrefab: Prefab = null!;

    @property({ type: Node })
    public groundNode: Node = null!;

    @property({ type: Label })
    public scoreLabel: Label = null!;

    @property
    public pipeMoveSpeed: number = 2;

    @property
    public pipeSpawnInterval: number = 2;

    private bird: Node = null!;
    private pipes: Node[] = [];
    private isGameRunning: boolean = false;
    private score: number = 0;
    private pipeSpawnTimer: number = 0;

    start() {
        this.initGame();
    }

    update(deltaTime: number) {
        if (!this.isGameRunning) return;

        // 更新管道位置
        this.updatePipes(deltaTime);

        // 生成新管道
        this.spawnPipe(deltaTime);

        // 检查碰撞
        this.checkCollisions();
    }

    initGame() {
        // 初始化小鸟
        this.bird = instantiate(this.birdPrefab);
        this.bird.setPosition(new Vec3(-200, 0, 0));
        this.node.addChild(this.bird);

        // 初始化游戏状态
        this.isGameRunning = true;
        this.score = 0;
        this.updateScore();
    }

    updatePipes(deltaTime: number) {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            const currentPosition = pipe.position;
            pipe.setPosition(new Vec3(currentPosition.x - this.pipeMoveSpeed, currentPosition.y, currentPosition.z));

            // 移除超出屏幕的管道
            if (pipe.position.x < -350) {
                pipe.destroy();
                this.pipes.splice(i, 1);
                this.addScore();
            }
        }
    }

    spawnPipe(deltaTime: number) {
        this.pipeSpawnTimer += deltaTime;
        if (this.pipeSpawnTimer >= this.pipeSpawnInterval) {
            this.pipeSpawnTimer = 0;

            const newPipe = instantiate(this.pipePrefab);
            newPipe.setPosition(new Vec3(300, Math.random() * 200 - 100, 0));
            this.node.addChild(newPipe);
            this.pipes.push(newPipe);
        }
    }

    checkCollisions() {
        // 简化的碰撞检测逻辑
        // 实际实现需要根据具体的游戏对象尺寸和位置进行精确计算
        for (const pipe of this.pipes) {
            // 这里应该添加实际的小鸟与管道碰撞检测逻辑
            // 如果发生碰撞，则调用 gameOver()
        }

        // 检查小鸟是否触地或飞出顶部边界
        if (this.bird && (this.bird.position.y < -200 || this.bird.position.y > 300)) {
            this.gameOver();
        }
    }

    addScore() {
        this.score++;
        this.updateScore();
    }

    updateScore() {
        if (this.scoreLabel) {
            this.scoreLabel.string = this.score.toString();
        }
    }

    gameOver() {
        this.isGameRunning = false;
        console.log('Game Over! Final Score:', this.score);
        // 可以在这里添加游戏结束界面逻辑
    }

    // 公共方法供其他组件调用，例如点击屏幕时让小鸟跳跃
    onScreenTap() {
        if (this.bird && this.bird.getComponent('Bird')) {
            this.bird.getComponent('Bird').jump();
        }
    }
}

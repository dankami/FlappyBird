// Game.ts
import { _decorator, Component, Node, instantiate, Prefab, Vec3, Label, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({ type: Prefab })
    public birdPrefab: Prefab = null!;

    @property({ type: Prefab })
    public pipePrefab: Prefab = null!;

    @property({ type: Prefab })
    public cloudPrefab: Prefab = null!;

    @property({ type: Prefab })
    public gameOverAnimationPrefab: Prefab = null!;

    @property({ type: Prefab })
    public welcomeAnimationPrefab: Prefab = null!;

    @property({ type: Node })
    public gameBackgroundNode: Node = null!;

    @property({ type: Node })
    public gameForegroundNode: Node = null!;

    @property({ type: Label })
    public scoreLabel: Label = null!;

    @property({ type: Node })
    public gameOverPanel: Node = null!;

    @property({ type: Node })
    public welcomePanel: Node = null!;

    private bird: Node = null!;
    private pipes: Node[] = [];
    private clouds: Node[] = [];
    private isGameRunning: boolean = false;
    private score: number = 0;
    private pipeSpawnTimer: number = 0;
    private pipeSpawnInterval: number = 2;
    private pipeMoveSpeed: number = 2;
    private gravity: number = 1000;
    private jumpForce: number = 300;

    start() {
        this.initGame();
        this.node.on(Node.EventType.TOUCH_START, this.onScreenTap, this);
    }

    update(deltaTime: number) {
        if (!this.isGameRunning) return;

        this.updatePipes(deltaTime);
        this.spawnPipe(deltaTime);
        this.updateClouds(deltaTime);
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

        // 隐藏欢迎界面
        if (this.welcomePanel) {
            this.welcomePanel.active = false;
        }

        // 显示游戏界面
        if (this.gameBackgroundNode) {
            this.gameBackgroundNode.active = true;
        }

        if (this.gameForegroundNode) {
            this.gameForegroundNode.active = true;
        }
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
            const randomHeight = Math.random() * 200 - 100;
            newPipe.setPosition(new Vec3(300, randomHeight, 0));
            this.node.addChild(newPipe);
            this.pipes.push(newPipe);
        }
    }

    updateClouds(deltaTime: number) {
        for (let i = this.clouds.length - 1; i >= 0; i--) {
            const cloud = this.clouds[i];
            const currentPosition = cloud.position;
            cloud.setPosition(new Vec3(currentPosition.x - 1, currentPosition.y, currentPosition.z));

            // 重新生成云朵
            if (cloud.position.x < -400) {
                cloud.setPosition(new Vec3(400, Math.random() * 100 - 50, 0));
            }
        }
    }

    checkCollisions() {
        // 检查小鸟与管道碰撞
        for (const pipe of this.pipes) {
            const pipeBounds = pipe.getComponent('Pipe')?.getBounds();
            const birdBounds = this.bird.getComponent('Bird')?.getBounds();

            if (pipeBounds && birdBounds && this.isCollision(pipeBounds, birdBounds)) {
                this.gameOver();
                return;
            }
        }

        // 检查小鸟是否触地或飞出顶部边界
        if (this.bird && (this.bird.position.y < -200 || this.bird.position.y > 300)) {
            this.gameOver();
        }
    }

    isCollision(bounds1: { x: number; y: number; width: number; height: number }, bounds2: { x: number; y: number; width: number; height: number }): boolean {
        return !(
            bounds1.x > bounds2.x + bounds2.width ||
            bounds1.x + bounds1.width < bounds2.x ||
            bounds1.y > bounds2.y + bounds2.height ||
            bounds1.y + bounds1.height < bounds2.y
        );
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

        // 显示游戏结束界面
        if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
        }

        // 可以在这里添加游戏结束动画
        if (this.gameOverAnimationPrefab) {
            const animation = instantiate(this.gameOverAnimationPrefab);
            this.node.addChild(animation);
        }
    }

    onScreenTap(event: EventTouch) {
        if (this.isGameRunning) {
            if (this.bird && this.bird.getComponent('Bird')) {
                this.bird.getComponent('Bird').jump();
            }
        } else {
            // 如果游戏没有运行，开始新游戏
            this.startNewGame();
        }
    }

    startNewGame() {
        // 清理当前游戏对象
        this.pipes.forEach((pipe) => pipe.destroy());
        this.pipes = [];

        this.clouds.forEach((cloud) => cloud.destroy());
        this.clouds = [];

        // 重置小鸟位置
        if (this.bird) {
            this.bird.setPosition(new Vec3(-200, 0, 0));
        }

        // 重置游戏状态
        this.isGameRunning = true;
        this.score = 0;
        this.updateScore();

        // 隐藏游戏结束界面
        if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
        }

        // 重新开始游戏逻辑
        this.pipeSpawnTimer = 0;
    }
}

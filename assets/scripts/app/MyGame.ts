import { _decorator, Component, Node, EventKeyboard, Input, input, KeyCode } from 'cc';
import { GameUtil } from '../util/GameUtil';
import { GameBackground } from '../component/GameBackground';
import { GameForeground } from '../component/GameForeground';
import { Bird } from '../component/Bird';
import { GameElementLayer } from '../component/GameElementLayer';
import { WelcomeAnimation } from '../component/WelcomeAnimation';
import { PipePool } from '../component/PipePool'; // 添加静态导入

const { ccclass, property } = _decorator;

@ccclass('MyGame')
export class MyGame extends Component {
    // 游戏组件
    private background: GameBackground | null = null; // 对应 GameBackground
    private foreground: GameForeground | null = null; // 对应 GameForeground
    private bird: Bird | null = null; // 对应 Bird
    private gameElement: GameElementLayer | null = null; // 对应 GameElementLayer
    private welcomeAnimation: WelcomeAnimation | null = null; // 对应 WelcomeAnimation

    // 在组件初始化时调用
    async onLoad() {
        await this.initGame(); // 初始化游戏对象
        this.initFrame(); // 初始化游戏窗口
    }

    // 初始化游戏窗口
    private initFrame() {
        // 在 Cocos Creator 中，窗口设置通常在编辑器中配置
        // 这里主要添加按键监听
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    // 按键按下事件处理
    private onKeyDown(event: EventKeyboard) {
        const keycode = event.keyCode;
        switch (GameUtil.gameState) {
            case GameUtil.GAME_READY:
                if (keycode === KeyCode.SPACE) {
                    // 游戏启动界面时按下空格，小鸟振翅一次并开始受重力影响
                    if (this.bird) {
                        this.bird.birdFlap();
                        this.bird.birdFall();
                    }
                    GameUtil.setGameState(GameUtil.GAME_START); // 游戏状态改变
                }
                break;
            case GameUtil.GAME_START:
                if (keycode === KeyCode.SPACE) {
                    // 游戏过程中按下空格则振翅一次，并持续受重力影响
                    if (this.bird) {
                        this.bird.birdFlap();
                        this.bird.birdFall();
                    }
                }
                break;
            case GameUtil.STATE_OVER:
                if (keycode === KeyCode.SPACE) {
                    // 游戏结束时按下空格，重新开始游戏
                    this.resetGame();
                }
                break;
        }
    }

    // 按键松开事件处理
    private onKeyUp(event: EventKeyboard) {
        const keycode = event.keyCode;
        if (keycode === KeyCode.SPACE) {
            if (this.bird) {
                this.bird.keyReleased();
            }
        }
    }

    // 重新开始游戏
    private resetGame() {
        GameUtil.setGameState(GameUtil.GAME_READY);
        if (this.gameElement) {
            this.gameElement.reset();
        }
        if (this.bird) {
            this.bird.reset();
        }
    }

    // 初始化游戏中的各个对象
    private async initGame() {
        // 初始化游戏组件
        // 在 Cocos Creator 中，我们需要创建节点并添加组件

        // 创建背景节点
        const backgroundNode = new Node('Background');
        this.background = backgroundNode.addComponent(GameBackground);
        this.node.addChild(backgroundNode);

        // 创建游戏元素层节点
        const gameElementNode = new Node('GameElementLayer');
        this.gameElement = gameElementNode.addComponent(GameElementLayer);
        this.node.addChild(gameElementNode);

        // 创建前景节点
        const foregroundNode = new Node('Foreground');
        this.foreground = foregroundNode.addComponent(GameForeground);
        this.node.addChild(foregroundNode);

        // 创建欢迎动画节点
        const welcomeNode = new Node('WelcomeAnimation');
        this.welcomeAnimation = welcomeNode.addComponent(WelcomeAnimation);
        this.node.addChild(welcomeNode);

        // 创建小鸟节点
        const birdNode = new Node('Bird');
        this.bird = birdNode.addComponent(Bird);
        this.node.addChild(birdNode);

        // 确保 Pipe 静态属性被初始化
        if (Bird.BIRD_WIDTH === undefined) {
            await this.bird.initImgs();
        }

        // 初始化 PipePool
        await PipePool.init();

        GameUtil.setGameState(GameUtil.GAME_READY);
    }

    // 在 Cocos Creator 中，使用 update 方法替代线程循环
    update(deltaTime: number) {
        // 根据游戏状态更新游戏逻辑
        this.updateGameLogic(deltaTime);
    }

    private updateGameLogic(deltaTime: number) {
        // 根据游戏状态更新游戏逻辑
        // 在 Cocos Creator 中，绘制通常由引擎自动处理
        // 这里可以处理游戏逻辑的更新
        if (this.background) {
            this.background.update(deltaTime);
        }
        if (this.foreground) {
            this.foreground.update(deltaTime);
        }
        if (GameUtil.gameState === GameUtil.GAME_READY) {
            if (this.welcomeAnimation) {
                this.welcomeAnimation.update(deltaTime);
            }
        }
        if (this.bird) {
            this.bird.update(deltaTime);
        }
    }
}

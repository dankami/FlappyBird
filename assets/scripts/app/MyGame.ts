import {
    _decorator,
    Component,
    Node,
    instantiate,
    Prefab,
    Vec3,
    Label,
    EventKeyboard,
    Input,
    input,
    KeyCode,
} from 'cc';
import { GameUtil } from '../util/GameUtil';

const { ccclass, property } = _decorator;

@ccclass('MyGame')
export class MyGame extends Component {

    private static gameState: number = GameUtil.GAME_READY; // 游戏状态

    // 游戏组件
    private background: any; // 对应 GameBackground
    private foreground: any; // 对应 GameForeground
    private bird: any; // 对应 Bird
    private gameElement: any; // 对应 GameElementLayer
    private welcomeAnimation: any; // 对应 WelcomeAnimation

    // 在组件初始化时调用
    onLoad() {
        this.initFrame(); // 初始化游戏窗口
        this.initGame(); // 初始化游戏对象
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
        switch (MyGame.gameState) {
            case GameUtil.GAME_READY:
                if (keycode === KeyCode.SPACE) {
                    // 游戏启动界面时按下空格，小鸟振翅一次并开始受重力影响
                    if (this.bird && typeof this.bird.birdFlap === 'function') {
                        this.bird.birdFlap();
                        this.bird.birdFall();
                    }
                    GameUtil.setGameState(GameUtil.GAME_START); // 游戏状态改变
                }
                break;
            case GameUtil.GAME_START:
                if (keycode === KeyCode.SPACE) {
                    // 游戏过程中按下空格则振翅一次，并持续受重力影响
                    if (this.bird && typeof this.bird.birdFlap === 'function') {
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
            if (this.bird && typeof this.bird.keyReleased === 'function') {
                this.bird.keyReleased();
            }
        }
    }

    // 重新开始游戏
    private resetGame() {
        GameUtil.setGameState(GameUtil.GAME_READY);
        if (this.gameElement && typeof this.gameElement.reset === 'function') {
            this.gameElement.reset();
        }
        if (this.bird && typeof this.bird.reset === 'function') {
            this.bird.reset();
        }
    }

    // 初始化游戏中的各个对象
    private initGame() {
        // 初始化游戏组件（需要根据实际的组件类进行实例化）
        // 这里假设这些类已经转换为相应的 TypeScript 组件
        this.background = null; // new GameBackground();
        this.gameElement = null; // new GameElementLayer();
        this.foreground = null; // new GameForeground();
        this.welcomeAnimation = null; // new WelcomeAnimation();
        this.bird = null; // new Bird();

        GameUtil.setGameState(GameUtil.GAME_READY);

        // 启动用于刷新窗口的循环（在 Cocos Creator 中使用 update 方法）
    }

    // 在 Cocos Creator 中，使用 update 方法替代线程循环
    update(deltaTime: number) {
        // 在 Cocos Creator 中，绘制通常由引擎自动处理
        // 这里可以处理游戏逻辑的更新
        this.updateGameLogic();
    }

    private updateGameLogic() {
        // 根据游戏状态更新游戏逻辑
        // 这里可以调用各组件的更新方法
        if (this.background && typeof this.background.update === 'function') {
            this.background.update(this.bird);
        }
        if (this.foreground && typeof this.foreground.update === 'function') {
            this.foreground.update(this.bird);
        }
        if (GameUtil.gameState === GameUtil.GAME_READY) {
            if (this.welcomeAnimation && typeof this.welcomeAnimation.update === 'function') {
                this.welcomeAnimation.update();
            }
        } else {
            if (this.gameElement && typeof this.gameElement.update === 'function') {
                this.gameElement.update(this.bird);
            }
        }
        if (this.bird && typeof this.bird.update === 'function') {
            this.bird.update();
        }
    }

    
}

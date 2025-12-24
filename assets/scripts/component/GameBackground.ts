import { _decorator, Component, Sprite, SpriteFrame, Node, Graphics, Color, Vec2, resources } from 'cc';
import { Constant } from '../util/Constant';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameBackground')
export class GameBackground extends Component {
    @property({ type: SpriteFrame })
    backgroundSpriteFrame: SpriteFrame | null = null;
    private speed: number = 0;
    private layerX: number = 0;
    private groundHeight: number = 0;
    private backgroundSprites: Node[] = [];
    private birdRef: Bird | null = null;

    // 添加静态属性用于存储地面高度
    private static staticGroundHeight: number = 0;
    
    // 提供静态方法获取地面高度
    public static get GROUND_HEIGHT(): number {
        return GameBackground.staticGroundHeight;
    }

    start() {
        this.speed = Constant.GAME_SPEED;
        this.layerX = 0;
        this.loadBackgroundSprite();
    }

    private loadBackgroundSprite() {
        if (this.backgroundSpriteFrame) {
            // 如果已经通过属性检查器设置了 SpriteFrame，直接使用
            this.groundHeight = this.backgroundSpriteFrame.height / 2;
            GameBackground.staticGroundHeight = this.groundHeight; // 设置静态地面高度
            this.createBackgroundSprites();
        } else {
            // 从 resources 加载图片
            resources.load(Constant.BG_IMG_PATH, SpriteFrame, (err, spriteFrame: SpriteFrame) => {
                if (err) {
                    console.error(`Failed to load background image: ${err}`);
                    return;
                }
                
                this.backgroundSpriteFrame = spriteFrame;
                this.groundHeight = spriteFrame.height / 2;
                GameBackground.staticGroundHeight = this.groundHeight; // 设置静态地面高度
                this.createBackgroundSprites();
            });
        }
    }
    setBird(bird: Bird) {
        this.birdRef = bird;
    }

    private createBackgroundSprites() {
        if (!this.backgroundSpriteFrame) return;

        const imgWidth = this.backgroundSpriteFrame.width;
        const imgHeight = this.backgroundSpriteFrame.height;
        
        // 计算需要多少个背景精灵来填满屏幕并实现无缝滚动
        const count = Math.floor(Constant.FRAME_WIDTH / imgWidth) + 2;
        
        for (let i = 0; i < count; i++) {
            const bgNode = new Node(`Background_${i}`);
            bgNode.parent = this.node;
            bgNode.setPosition(imgWidth * i, Constant.FRAME_HEIGHT - imgHeight / 2);
            
            const sprite = bgNode.addComponent(Sprite);
            sprite.spriteFrame = this.backgroundSpriteFrame;
            
            this.backgroundSprites.push(bgNode);
        }
    }

    update(deltaTime: number) {
        if (!this.birdRef) return;
        
        if (this.birdRef.isDead()) {
            return; // 小鸟死亡则不再移动
        }
        
        this.movement();
    }

    private movement() {
        if (!this.backgroundSpriteFrame) return;

        const imgWidth = this.backgroundSpriteFrame.width;
        this.layerX += this.speed;
        
        if (this.layerX > imgWidth) {
            this.layerX = 0;
        }

        // 更新所有背景精灵的位置以实现滚动效果
        for (let i = 0; i < this.backgroundSprites.length; i++) {
            const bgSprite = this.backgroundSprites[i];
            const targetX = imgWidth * i - this.layerX;
            bgSprite.setPosition(targetX, bgSprite.position.y);
        }
    }
    
    // 实例方法仍然保留，以保持向后兼容性
    public get GROUND_HEIGHT_INSTANCE(): number {
        return this.groundHeight;
    }
}
import { _decorator, Component, SpriteFrame, Graphics, Color, Node, Sprite, UITransform, Label } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('GameOverAnimation')
export class GameOverAnimation extends Component {
    private scoreImg: SpriteFrame | null = null;
    private overImg: SpriteFrame | null = null;
    private againImg: SpriteFrame | null = null;
    private static readonly SCORE_LOCATE: number = 5;
    private flash: number = 0;
    
    // 用于显示游戏结束图像的节点
    private overNode: Node | null = null;
    private scoreNode: Node | null = null;
    private againNode: Node | null = null;
    private scoreLabel: Node | null = null;
    private bestLabel: Node | null = null;

    constructor() {
        super();
    }

    async init() {
        this.overImg = await GameUtil.loadBufferedImage(Constant.OVER_IMG_PATH);
        this.scoreImg = await GameUtil.loadBufferedImage(Constant.SCORE_IMG_PATH);
        this.againImg = await GameUtil.loadBufferedImage(Constant.AGAIN_IMG_PATH);
    }

    async draw(g: Graphics, bird: Bird) {
        if (!this.overImg || !this.scoreImg || !this.againImg) {
            await this.init();
        }

        if (!this.overImg || !this.scoreImg || !this.againImg) return;

        // 创建或更新游戏结束相关节点
        this.createOrUpdateImageNodes(bird);
    }
    
    private createOrUpdateImageNodes(bird: Bird) {
        // 创建或更新游戏结束提示图片
        if (!this.overNode) {
            this.overNode = new Node('OverNode');
            this.overNode.parent = this.node;
            const sprite = this.overNode.addComponent(Sprite);
            sprite.spriteFrame = this.overImg;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            
            const uiTransform = this.overNode.getComponent(UITransform)!;
            uiTransform.width = this.overImg.width;
            uiTransform.height = this.overImg.height;
        }
        
        const x = Math.floor((Constant.FRAME_WIDTH - this.overImg.width) / 2);
        const y = Math.floor(Constant.FRAME_HEIGHT / 4);
        this.overNode.setPosition(x, Constant.FRAME_HEIGHT - y); // 注意 Cocos 的坐标系是左下角为原点

        // 创建或更新分数背景图片
        if (!this.scoreNode) {
            this.scoreNode = new Node('ScoreNode');
            this.scoreNode.parent = this.node;
            const sprite = this.scoreNode.addComponent(Sprite);
            sprite.spriteFrame = this.scoreImg;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            
            const uiTransform = this.scoreNode.getComponent(UITransform)!;
            uiTransform.width = this.scoreImg.width;
            uiTransform.height = this.scoreImg.height;
        }
        
        const scoreX = Math.floor((Constant.FRAME_WIDTH - this.scoreImg.width) / 2);
        const scoreY = Math.floor(Constant.FRAME_HEIGHT / 3);
        this.scoreNode.setPosition(scoreX, Constant.FRAME_HEIGHT - scoreY);

        // 创建或更新当前分数标签
        if (!this.scoreLabel) {
            this.scoreLabel = new Node('ScoreLabel');
            this.scoreLabel.parent = this.node;
            
            const label = this.scoreLabel.addComponent(Label);
            label.string = bird.getCurrentScore().toString();
            label.fontSize = Constant.SCORE_FONT.size;
            label.color = Color.WHITE;
        } else {
            const label = this.scoreLabel.getComponent(Label)!;
            label.string = bird.getCurrentScore().toString();
        }
        
        const str = bird.getCurrentScore().toString();
        const strWidth = GameUtil.getStringWidth(Constant.SCORE_FONT, str);
        const labelX = Math.floor((Math.floor((Constant.FRAME_WIDTH - this.scoreImg.width / 2) / 2) + GameOverAnimation.SCORE_LOCATE)) - Math.floor(strWidth / 2);
        const labelY = scoreY + Math.floor(this.scoreImg.height / 2) + GameUtil.getStringHeight(Constant.SCORE_FONT, str);
        this.scoreLabel.setPosition(labelX, Constant.FRAME_HEIGHT - labelY);

        // 更新最佳分数标签
        if (bird.getBestScore() > 0) {
            if (!this.bestLabel) {
                this.bestLabel = new Node('BestLabel');
                this.bestLabel.parent = this.node;
                
                const bestLabelComp = this.bestLabel.addComponent(Label);
                bestLabelComp.string = bird.getBestScore().toString();
                bestLabelComp.fontSize = Constant.SCORE_FONT.size;
                bestLabelComp.color = Color.WHITE;
            } else {
                const bestLabelComp = this.bestLabel.getComponent(Label)!;
                bestLabelComp.string = bird.getBestScore().toString();
            }
            
            const bestStr = bird.getBestScore().toString();
            const bestStrWidth = GameUtil.getStringWidth(Constant.SCORE_FONT, bestStr);
            const bestLabelX = Math.floor((Math.floor((Constant.FRAME_WIDTH + this.scoreImg.width / 2) / 2) - GameOverAnimation.SCORE_LOCATE)) - Math.floor(bestStrWidth / 2);
            const bestLabelY = scoreY + Math.floor(this.scoreImg.height / 2) + GameUtil.getStringHeight(Constant.SCORE_FONT, str);
            this.bestLabel.setPosition(bestLabelX, Constant.FRAME_HEIGHT - bestLabelY);
        }

        // 闪烁的再次游戏按钮
        const COUNT = 30;
        this.flash++;
        if (this.flash > COUNT) {
            if (!this.againNode) {
                this.againNode = new Node('AgainNode');
                this.againNode.parent = this.node;
                const sprite = this.againNode.addComponent(Sprite);
                sprite.spriteFrame = this.againImg;
                sprite.sizeMode = Sprite.SizeMode.CUSTOM;
                
                const uiTransform = this.againNode.getComponent(UITransform)!;
                uiTransform.width = this.againImg.width;
                uiTransform.height = this.againImg.height;
            }
            
            const againX = Math.floor((Constant.FRAME_WIDTH - this.againImg.width) / 2);
            const againY = Math.floor((Constant.FRAME_HEIGHT / 5) * 3);
            this.againNode.setPosition(againX, Constant.FRAME_HEIGHT - againY);
            this.againNode.active = true;
        } else {
            if (this.againNode) {
                this.againNode.active = false;
            }
        }
        
        if (this.flash === COUNT * 2) {
            this.flash = 0;
        }
    }
    
    // 清理所有节点
    clear() {
        if (this.overNode) {
            this.overNode.destroy();
            this.overNode = null;
        }
        if (this.scoreNode) {
            this.scoreNode.destroy();
            this.scoreNode = null;
        }
        if (this.againNode) {
            this.againNode.destroy();
            this.againNode = null;
        }
        if (this.scoreLabel) {
            this.scoreLabel.destroy();
            this.scoreLabel = null;
        }
        if (this.bestLabel) {
            this.bestLabel.destroy();
            this.bestLabel = null;
        }
    }
}
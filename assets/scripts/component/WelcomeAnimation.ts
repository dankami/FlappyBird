import { _decorator, Component, SpriteFrame, Sprite, Node, UITransform, Vec3 } from 'cc';
import { Constant } from '../util/Constant';
import { GameUtil } from '../util/GameUtil';
const { ccclass, property } = _decorator;

@ccclass('WelcomeAnimation')
export class WelcomeAnimation extends Component {
    private titleImg: SpriteFrame | null = null;
    private noticeImg: SpriteFrame | null = null;
    private flashCount: number = 0;
    
    // 创建用于显示图像的节点
    private titleNode: Node | null = null;
    private noticeNode: Node | null = null;
    private isNoticeVisible: boolean = true;

    constructor() {
        super();
    }

    async init() {
        this.titleImg = await GameUtil.loadBufferedImage(Constant.TITLE_IMG_PATH);
        this.noticeImg = await GameUtil.loadBufferedImage(Constant.NOTICE_IMG_PATH);
        
        // 创建标题节点
        if (this.titleImg) {
            this.titleNode = new Node('Title');
            this.titleNode.parent = this.node;
            const sprite = this.titleNode.addComponent(Sprite);
            sprite.spriteFrame = this.titleImg;
            
            // 设置标题位置
            const x = Math.floor((Constant.FRAME_WIDTH - this.titleImg.width) / 2);
            const y = Math.floor(Constant.FRAME_HEIGHT / 3);
            this.titleNode.setPosition(new Vec3(x, y, 0));
            
            // 设置节点大小
            const uiTransform = this.titleNode.getComponent(UITransform)!;
            uiTransform.width = this.titleImg.width;
            uiTransform.height = this.titleImg.height;
        }
        
        // 创建提示节点
        if (this.noticeImg) {
            this.noticeNode = new Node('Notice');
            this.noticeNode.parent = this.node;
            const sprite = this.noticeNode.addComponent(Sprite);
            sprite.spriteFrame = this.noticeImg;
            
            // 设置提示位置
            const noticeX = Math.floor((Constant.FRAME_WIDTH - this.noticeImg.width) / 2);
            const noticeY = Math.floor((Constant.FRAME_HEIGHT / 5) * 3);
            this.noticeNode.setPosition(new Vec3(noticeX, noticeY, 0));
            
            // 设置节点大小
            const uiTransform = this.noticeNode.getComponent(UITransform)!;
            uiTransform.width = this.noticeImg.width;
            uiTransform.height = this.noticeImg.height;
            
            // 默认隐藏提示
            this.noticeNode.active = false;
        }
    }

    async draw() {
        if (!this.titleImg || !this.noticeImg) {
            await this.init();
        }

        if (!this.titleImg || !this.noticeImg) return;

        // 更新闪烁效果
        const CYCLE = 30;
        this.flashCount++;
        
        if (this.flashCount > CYCLE) {
            // 显示提示
            if (this.noticeNode) {
                this.noticeNode.active = this.isNoticeVisible;
            }
            this.isNoticeVisible = !this.isNoticeVisible;
        }
        
        if (this.flashCount === CYCLE * 2) {
            this.flashCount = 0;
            this.isNoticeVisible = true; // 重置状态
        }
    }
}
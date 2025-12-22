// MusicUtil.ts
// 音乐播放工具
export class MusicUtil {
    private static instance: MusicUtil;
    private audioContext: AudioContext | null = null;

    private constructor() {
        // 单例模式
    }

    public static getInstance(): MusicUtil {
        if (!MusicUtil.instance) {
            MusicUtil.instance = new MusicUtil();
        }
        return MusicUtil.instance;
    }

    // 初始化音频上下文
    public initAudioContext(): void {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    // 播放音效
    public playSound(soundUrl: string): void {
        // 在实际项目中，这里应该使用 Cocos Creator 的音频系统
        console.log('Playing sound:', soundUrl);

        // 示例：使用 HTML5 Audio API
        const audio = new Audio(soundUrl);
        audio.play().catch((error) => {
            console.error('Error playing sound:', error);
        });
    }

    // 播放背景音乐
    public playBackgroundMusic(musicUrl: string): void {
        // 在实际项目中，这里应该使用 Cocos Creator 的音频系统
        console.log('Playing background music:', musicUrl);

        // 示例：使用 HTML5 Audio API
        const audio = new Audio(musicUrl);
        audio.loop = true;
        audio.play().catch((error) => {
            console.error('Error playing background music:', error);
        });
    }

    // 停止所有音频
    public stopAllSounds(): void {
        // 在实际项目中，这里应该停止所有正在播放的音频
        console.log('Stopping all sounds');
    }
}

// MusicUtil.ts
export class MusicUtil {
    private static flyAudio: HTMLAudioElement | null = null;
    private static crashAudio: HTMLAudioElement | null = null;
    private static scoreAudio: HTMLAudioElement | null = null;

    // 播放飞行动作音效
    public static playFly(): void {
        if (!this.flyAudio) {
            this.flyAudio = new Audio('resources/wav/fly.wav');
        }
        this.flyAudio.currentTime = 0;
        this.flyAudio.play().catch((err) => console.error('播放飞行动作音效失败:', err));
    }

    // 播放碰撞音效
    public static playCrash(): void {
        if (!this.crashAudio) {
            this.crashAudio = new Audio('resources/wav/crash.wav');
        }
        this.crashAudio.currentTime = 0;
        this.crashAudio.play().catch((err) => console.error('播放碰撞音效失败:', err));
    }

    // 播放得分音效
    public static playScore(): void {
        if (!this.scoreAudio) {
            this.scoreAudio = new Audio('resources/wav/score.wav');
        }
        this.scoreAudio.currentTime = 0;
        this.scoreAudio.play().catch((err) => console.error('播放得分音效失败:', err));
    }
}

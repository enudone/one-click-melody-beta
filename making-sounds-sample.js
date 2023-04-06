// メロディの定義・再生・ピアノロール表示のサンプル
// 参考資料: https://hello-magenta.glitch.me/

const TWINKLE_TWINKLE = {
  notes: [
    { pitch: 60, startTime: 0.0, endTime: 0.5 },
    { pitch: 60, startTime: 0.5, endTime: 1.0 },
    { pitch: 67, startTime: 1.0, endTime: 1.5 },
    { pitch: 67, startTime: 1.5, endTime: 2.0 },
    { pitch: 69, startTime: 2.0, endTime: 2.5 },
    { pitch: 69, startTime: 2.5, endTime: 3.0 },
    { pitch: 67, startTime: 3.0, endTime: 4.0 },
    { pitch: 65, startTime: 4.0, endTime: 4.5 },
    { pitch: 65, startTime: 4.5, endTime: 5.0 },
    { pitch: 64, startTime: 5.0, endTime: 5.5 },
    { pitch: 64, startTime: 5.5, endTime: 6.0 },
    { pitch: 62, startTime: 6.0, endTime: 6.5 },
    { pitch: 62, startTime: 6.5, endTime: 7.0 },
    { pitch: 60, startTime: 7.0, endTime: 8.0 },
  ],
  totalTime: 8
};

// ピアノロールの作成
viz = new mm.PianoRollSVGVisualizer(TWINKLE_TWINKLE, document.getElementById('piano-roll'), {
  noteHeight: 20, // 音符の高さ
  pixelsPerTimeStep: 70 // ステップごとのピクセル（幅）
})

const vizPlayer = new mm.Player(false, {
  run: (note) => viz.redraw(note),
  stop: () => { }
});

// 再生開始
const start = () => {
  vizPlayer.start(TWINKLE_TWINKLE);
}

// 再生停止
const stop = () => {
  vizPlayer.stop();
}

const buttonStart = document.getElementById("start-button");
buttonStart.addEventListener("click", start);
const buttonStop = document.getElementById("stop-button");
buttonStop.addEventListener("click", stop);

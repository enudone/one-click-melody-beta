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

// MusicRNN のモデルの初期化
music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize();

const vizPlayer = new mm.Player(false, {
  run: (note) => viz.redraw(note),
  stop: () => { }
});

// モデルが生成したメロディ用のプレイヤー
rnnPlayer = new mm.Player(false, {
  run: (note) => viz.redraw(note),
  stop: () => { }
});

rnn_steps = 20; // 生成するステップ数
rnn_temperature = 1.5; // ランダム性の強さ 大きいほど入力と異なる出力となる

function play() {
  if (rnnPlayer.isPlaying()) {
    rnnPlayer.stop();
    return;
  }

  // モデルはクオンタイズされたシーケンスを受け取るため、クオンタイズを実行
  const qns = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);

  music_rnn
    .continueSequence(qns, rnn_steps, rnn_temperature)
    .then((output) => {
      console.log(output)
      console.log(output.notes)

      // ピアノロールの作成
      viz = new mm.PianoRollSVGVisualizer(output, document.getElementById('piano-roll-output'), {
        noteHeight: 20, // 音符の高さ
        pixelsPerTimeStep: 70 // ステップごとのピクセル（幅）
      })

      // ドキュメントに表示
      viz.draw()

      // 再生
      rnnPlayer.start(output)
    });
}

const buttonPlay = document.getElementById("play-button");
buttonPlay.addEventListener("click", play);
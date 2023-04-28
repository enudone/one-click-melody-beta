const ONE_NOTE = {
  notes: [
    { pitch: 60, startTime: 0.0, endTime: 1.0 },
  ],
  totalTime: 1.0
};

// MusicRNN のモデルの初期化
music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize();

const vizPlayer = new mm.Player(false, {
  run: (note) => viz.redraw(note),
  stop: () => { }
});

// モデルが生成したメロディ用のプレイヤー
const rnnPlayer = new mm.Player(false, {
  run: (note) => viz.redraw(note),
  stop: () => { }
});

const rnn_steps = 32; // 生成するステップ数 32 steps で2小説
const rnn_temperature = 1.5; // ランダム性の強さ 大きいほど入力と異なる出力となる
let latestOutput = {} // 生成したメロディの格納先


function generate() {
  if (rnnPlayer.isPlaying()) {
    rnnPlayer.stop();
    return;
  }

  // モデルはクオンタイズされたシーケンスを受け取るため、クオンタイズを実行
  const qns = mm.sequences.quantizeNoteSequence(ONE_NOTE, 4);

  music_rnn
    .continueSequence(qns, rnn_steps, rnn_temperature)
    .then((output) => {
      console.log(output)
      console.log(output.notes)

      // ピアノロールの作成
      viz = new mm.PianoRollSVGVisualizer(output, document.getElementById('piano-roll-output'), {
        noteHeight: 15, // 音符の高さ
        pixelsPerTimeStep: 120 // ステップごとのピクセル（幅）
      })

      // ドキュメントに表示
      viz.draw()
      // 変数に格納
      latestOutput = output
    });
}

function play() {
  // console.log(latestOutput)
  // 再生
  rnnPlayer.start(latestOutput)
}

const buttonGenerate = document.getElementById("generate-button");
buttonGenerate.addEventListener("click", generate);
const buttonPlay = document.getElementById("play-button");
buttonPlay.addEventListener("click", play);
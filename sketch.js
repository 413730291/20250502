let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#e7c6ff'); // 設定背景顏色

  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與視訊畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
  drawGraphics(); // 繪製 graphics 的內容
}

function draw() {
  background('#e7c6ff'); // 每次繪製時重設背景顏色

  // 計算影像顯示位置，讓影像置中
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 翻轉畫布以水平翻轉影像
  push();
  translate(width, 0); // 將原點移到畫布右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height); // 繪製攝影機影像
  pop();

  // 在視訊畫面上方繪製緩衝區內容
  image(graphics, x, y, capture.width, capture.height);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  graphics = createGraphics(capture.width, capture.height); // 重新建立緩衝區
  drawGraphics(); // 重新繪製 graphics 的內容
}

function drawGraphics() {
  graphics.background(0); // 設定緩衝區背景為黑色

  // 在寬與高每隔 20 繪製圓
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      // 從攝影機影像中取得相對應位置的顏色
      let col = capture.get(x, y);

      // 設定圓的顏色並繪製
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(x + 10, y + 10, 15, 15); // 圓心偏移 10，大小為 15
    }
  }
}
  

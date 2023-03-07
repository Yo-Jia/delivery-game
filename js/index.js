let beltSpeed = 2; // Set the speed of the conveyor belt
let beltX = 0;

function setup() {
    createCanvas(windowWidth-5, windowHeight-5);
    setInterval(moveBelt, 10);

  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function draw() {
    background(200);


    let transporterW = 625;
    let transporterX = (width / 2) - (transporterW / 2);
    //reels
    fill(50);
    ellipse(1150 - transporterW, 425, 150, 150);
    ellipse(1150, 425, 150, 150);
    //transporter
    fill(150);
    rect(transporterX, 30, transporterW, 425);

    let insideW = 600;
    let insideX = (width / 2) - (insideW / 2);

    fill(125);
    rect(insideX, 42.5, insideW, 400);

    fill(150);
    quad(windowWidth - transporterW + 100, 0,transporterX, 30, transporterX + transporterW, 30, windowWidth , 0);

    fill(350);
    quad(windowWidth, 400,transporterX + transporterW, 455, transporterX + transporterW, 30, windowWidth , 0);


    //belt
    stroke(0)
    fill(30);
    rect(0, height - 140, width, 125);

      
    fill(150);
    rect(0, height-150, width, 125);

    let beltWidth = 100; 
    let beltHeight = 125; 
    let numBelts = Math.round(width / beltWidth); 
    for (let i = 0; i < numBelts; i++) {
      rect(beltX + (i * beltWidth), height - 150, beltWidth, beltHeight);
      fill(150);
    }



    //packages
    //small square
    // fill(500);
    // rect(x, y, 50 ,50);

    //big square
    // fill(500);
    // rect(x, y, 200 ,200);

    // long rec horizontal
    // fill(500);
    // rect(x ,y, 200, 50)

    //long rec vertical
    // fill(500);
    // rect(x, y, 50, 200)

    //short rect horizontal
    // fill(500);
    // rect(x ,y, 100, 50)

    //short rec vertical
    // fill(500);
    // rect(x, y, 50, 100)

    // L shape
    // fill(500);
    // rect(x, y, 50, 100);
    // rect(x + 50, y + 50, 50, 50);

    // L shape flip
    // fill(500);
    // rect(x + 50, 0, 50, 100);
    // rect(0, y + 50, 50, 50);


  
  }

  function moveBelt() {
    beltX += beltSpeed; 
    if (beltX >= 100) {
      beltX = 0;
    }
  }


//capacity 2400

function drawTape(x,y,w,h){
  //L shap no 
  if(w >= h){line(x, y + h/2, x + w, y + h/2)}
  else{line(x + w / 2, y, x + w / 2, y + h)}
}

function drawSticker(x,y,w,h){
  return rect(x + random(0, w - 15),y + random(0, h - 15), 10, 10)
}

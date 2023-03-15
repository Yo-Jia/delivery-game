let beltSpeed = 2.5; 
let beltX = 0;
let randomARR = [];
let x
let y
let w
let h
let randomArrW = 0 
let loadedPackage = []
let typedText =""
let insideW
let insideX
let leftW
let leftH
let messageVisible = false;
let gameState = 0;
let button;
let restartButton;
let score = 0
let messageLevelUp = false;
let level = 2500
let song;
// let stringArr = []
// let randomText = ""


setInterval(() => {if(gameState === 1){
  randomPackage(packages);
  organizePackage()}
}, level); 


function preload() {
  // bgImg = loadImage('https://t3.ftcdn.net/jpg/00/88/98/18/360_F_88981880_YjJManMJ6hJmKr5CZteFJAkEzXIh8mxW.jpg');
  bgImg = loadImage("img/background.png")
  song = createAudio("music.mp3")

}

function setup() {
    createCanvas(windowWidth-5, windowHeight-5);
    button = createButton('Start Game');
    button.position(width / 2 - button.width / 2 - 60 , height / 2 + 70);
    button.mousePressed(startGame);
    button.mouseOver(hover);
    button.mouseOut(endHover);
    button.style('font-size', '30px');
    button.style('font-weight', 'bold')
    button.style('color', color(213,0,41));
    button.style('background-color', color(254,204,0));
    button.style('border', 0);
    button.style('padding', "10px");
    button.style('box-shadow', "3px 4px #888888");


    restartButton = createButton('Restart Game');
    restartButton.position(width / 2 - restartButton.width / 2 , height / 2 + 40);
    restartButton.mousePressed(restartGame);
    restartButton.mouseOver(hover);
    restartButton.mouseOut(endHover);
    restartButton.style('font-size', '30px');
    restartButton.style('font-weight', 'bold')
    restartButton.style('color', color(213,0,41));
    restartButton.style('background-color', color(254,204,0));
    restartButton.style('border', 0);
    restartButton.style('padding', "10px");
    restartButton.style('box-shadow', "3px 4px #888888");
    setInterval(moveBelt, 10);
    
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }



  function draw() {
    if (gameState === 0){
      image(bgImg,0,-50, width, height, 0, 0, bgImg.width, bgImg.height, COVER , LEFT)

      noStroke()
      fill(255,255,255,225)
      rect(width / 2 - 325, height / 2 - 250, 650 , 400)

    fill(213,0,41);
    textAlign(CENTER);
    textSize(32);
    textStyle(BOLD)
    text('Welcome to Delivery Man', width / 2, height / 2 - 190);

    let line1 = "Type in the characters on packages to load them onto a truck.";
    fill(50);
    textAlign(CENTER);
    textSize(20);
    text(line1,  width / 2 - 300, height / 2 - 150 , 600, 400); 

    let line2 = "Don't let the conveyor belt get too full, or it's game over!";

    fill(50);
    textAlign(CENTER);
    textSize(20);
    text(line2,  width / 2 - 300, height / 2 - 110 , 600, 400); 

    let line3 = "Use UPPERCASE letters only";

    fill(50);
    textAlign(CENTER);
    textSize(20);
    text(line3,  width / 2 - 300, height / 2 - 70 ,600, 400); 

    let line4 = "Are you ready to become the ultimate delivery man?";
    fill(50);
    textAlign(CENTER);
    textSize(22);
    text(line4,  width / 2 - 300, height / 2  , 600, 400); 


    button.show();
    restartButton.hide()
    }else if(gameState === 1){

    image(bgImg,0,-50, width, height, 0, 0, bgImg.width, bgImg.height, COVER , LEFT);
    let transporterW = 625;
    let transporterX = (width / 2) - (transporterW / 2);
    
    //score
    fill(50);
    textSize(30);
    text(`score: ${score}`, 100,50); 

    //reels
    fill(50);
    noStroke()
    ellipse(transporterX + 200, height - 600 + 325, 150, 150);
    ellipse(transporterX + transporterW +100, height - 600 + 325, 150, 150);
    //transporter
   
    fill(254,204,0);
    strokeWeight(3)
    stroke(211,181,9)
    rect(transporterX, height - 600 + 30 , transporterW, 325);

    insideW = 600;
    insideX = (width / 2) - (insideW / 2);

    fill(250);
    strokeWeight(3)
    stroke(211,181,9)
    rect(insideX, height - 600 + 42.5, insideW, 300);

    fill(254,204,0);
    strokeWeight(3)
    stroke(211,181,9)
    quad(windowWidth - transporterW + 300, height - 600,transporterX, height - 600 + 30, transporterX + transporterW, height - 600 + 30, windowWidth , height - 600);

    fill(254,204,0);
    strokeWeight(3)
    stroke(211,181,9)
    quad(windowWidth, 300 + height - 600,transporterX + transporterW,height - 600 + 355, transporterX + transporterW, height - 600 + 30 , windowWidth , height - 600);


    //belt
    stroke(0)
    fill(30);
    rect(0, height - 140, width, 125);

      
    fill(150);
    strokeWeight(1)
    rect(0, height-150, width, 125);

    let beltWidth = 100; 
    let beltHeight = 125; 
    let numBelts = Math.round(width / beltWidth); 
    for (let i = 0; i < numBelts; i++) {
      strokeWeight(1)
      rect(beltX + (i * beltWidth), height - 150, beltWidth, beltHeight);
      fill(150);
    }



    //draw packages
    randomARR.forEach((package,i)=>{
      package.y = height - package.h - 75
      // package.secY = height - package.secH - 75
      // if(package.secH == undefined){
      //box      
      // stroke(184,136,91);
      // strokeWeight(10);
      noStroke()
      fill(184,136,91)
      rect(package.x, package.y, package.w, package.h) 
      //tape
      stroke(161,115,76);
      strokeWeight(10);
      drawTape(package.x + 5,package.y+5,package.w - 10,package.h-10)
     
      //sticker 
      stroke(229,226,228)
      fill(229,226,228)
      rect(package.x + 15,package.y + 20, 30, 15)

      //text in sticker
      strokeWeight(0)
      fill(0);
      textSize(12);
      text(package.text, package.x + 30, package.y + 30);


      // fill(0)
      // textAlign(LEFT, TOP)
      // text(text, package.x + 20, package.y + 22)


      // }else{
      // //L shape box
      // stroke(100);
      // fill(100)
      // rect(package.x, package.y, package.w, package.h) 

      // fill(100)
      // rect(package.secX, package.secY, package.secW, package.secH)

      // //sticker
      // fill(100)
      // rect(package.x + package.w - 15,package.y + package.h -15, 10, 10)

      // }
      package.x += package.speed
      package.secX += package.speed
      
      //make package stop

      if (package.x + package.w > width - 20) {
      package.speed = 0;
      }

    for (let i = 0; i < randomARR.length; i++) {
      for (let j = i + 1; j < randomARR.length; j++) {
        const packageA = randomARR[i];
        const packageB = randomARR[j];
        if(packageA.speed === 0){  
          if (packagesOverlap(packageA, packageB)) {
          packageA.speed = 0;
          packageB.speed = 0;
        }}
      
      }
    }

    //set game over condition
   if(package.speed === 0 && package.x <= 20 ){
    gameOver();
    console.log("game over")
   }
      
          // check if player typed the correct character
    // if (typedChar === packages[i].stickerText) {
    //   packages.splice(i, 1);
    //   spawnPackage();
    //   score++;
    //   typedChar = '';
    // }
  
    

    
      

      // if (package.x -  package.w > windowWidth) {
      //   package.x = 0;
      // }
    })
    //draw loaded packages
    loadedPackage.forEach((package)=>{
      // package.y = height - package.h - 75
      // package.secY = height - package.secH - 75
      // if(package.secH == undefined){
      //box
      
      stroke(161,115,76);
      strokeWeight(1);
      fill(184,136,91)
      rect(package[0].x, package[0].y, package[0].w, package[0].h) 
      //tape
      stroke(161,115,76);
      strokeWeight(10);
      drawTape(package[0].x + 5,package[0].y + 5 ,package[0].w - 10,package[0].h - 10)
     
      //sticker 
      stroke(229,226,228)
      fill(229,226,228)
      rect(package[0].x + 15,package[0].y + 20, 30, 15)

      //text in sticker
      strokeWeight(0)
      fill(0);
      textSize(12);
      text(package[0].text, package[0].x + 30, package[0].y + 30);})

      //typedText
        strokeWeight(0)
        fill(0);
        textSize(100);
        text(typedText, 150, 300)

      //Warntext
      if(messageVisible === true){
        strokeWeight(0)
        fill(0);
        textSize(50);
        text("This package is too big", (width / 2) - (insideW / 2)+300, 200);
        setInterval(() => {
          messageVisible = false
        }, 1500);}
      //level up message  
        if(messageLevelUp === true){
          level = level * 0.8
          console.log(level)
          strokeWeight(0)
          fill(0);
          textSize(50);
          text("You rock it! Let's work faster!", (width / 2) - (insideW / 2)+300, 200);
          setInterval(() => {
            messageLevelUp = false
          }, 1500);}

        restartButton.hide()

        if(leftH === 250 && leftW === 0){
          leftW = insideW
          leftH = 0
          loadedPackage = []
          messageLevelUp = true;
       }
      
    }else if(gameState === 2){
      noStroke()
      fill(255,255,255,100)
      rect(width / 2 - 325, height / 2 - 250, 650 , 400)

    fill(10);
    textAlign(CENTER);
    textSize(32);
    text('Game Over',  width / 2 - 280, height / 2 - 70 ,600, 400);

    

    restartButton.show()

    }

    
  
  }

  function startGame() {
    gameState = 1;
    button.hide();
    song.play()
    song.loop()
  }

  function restartGame() {
    gameState = 1;
    restartButton.hide();
    button.hide()
    randomARR = []
    loadedPackage = []
    typedText =""
    score = 0
    song.play()
    song.loop()
    level = 2500;
  }
  
  function gameOver() {
    gameState = 2;
    song.stop()
  }
  // randomARR.forEach((package)=>{
  //   console.log("package",package.w)
  //   console.log("Arr",randomArrW)
  //   if(package.speed == 0){
  //     randomArrW += package.w
  //   }
  //   })


  function keyPressed() {
    if (keyCode === BACKSPACE) {
      typedText = typedText.slice(0, -1);
    }
    if (keyCode >= 65 && keyCode <= 90) {if(typedText.length >=3){typedText = ""}
    else{typedText += key
      console.log(typedText)}
    if (typedText.length === 3){
      loadPackage(typedText,randomARR)
      typedText = ""
    } }


  }

  function moveBelt() {
    beltX += beltSpeed; 
    if (beltX >= 100) {
      beltX = 0;
    }
  }



function drawTape(x,y,w,h){
  //L shap no 
  if(w >= h){line(x, y + h/2, x + w, y + h/2)}
  else{line(x + w / 2, y, x + w / 2, y + h)}
}
function drawSticker(x,y,w,h){
  return rect(x + random(0, w - 20),y + random(0, h - 20), 15, 15)

}



function randomPackage(packagesArr){
  let i = Math.floor(Math.random() * 3)
  let x = packagesArr[i].x
  let y = packagesArr[i].y
  let w = packagesArr[i].w
  let h = packagesArr[i].h
  
  // let secX = packagesArr[i].secX
  // let secY = packagesArr[i].secY
  // let secW = packagesArr[i].secW
  // let secH = packagesArr[i].secH
  let speed = 4

  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
  let text = "";
  for (let i = 0; i < 3; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }
  // packagesArr.forEach(()=>{ generateRandomString(w)})
  if(i < 6){randomARR.push({x, y , w, h,speed,text})}
  else{randomARR.push({x, y , w, h, /*secX, secY, secW, secH,*/ speed});console.log(packagesArr[i].name)}

}

function packagesOverlap(packageA, packageB) {
  return (
    packageA.x < packageB.x + packageB.w + 50 &&
    packageA.x + packageA.w > packageB.x + 50
  );
}

// function generateRandomString(packageLength) {
//   console.log(packageLength)
//   let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
//   let result = "";
//   for (let i = 0; i < 3; i++) {
//         result += chars.charAt(Math.floor(Math.random() * chars.length));}

//   //generate different length
//   // if(packageLength <= 50){
//   //   for (let i = 0; i < 3; i++) {
//   //     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   //     console.log("the 1",packageLength)
//   //   }
//   // }else if(packageLength <= 100){
//   //   for (let i = 0; i < 6; i++) {
//   //     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   //     console.log("the 2",packageLength)
//   //   }
//   // }else if(packageLength <= 200){
//   //   for (let i = 0; i < 9; i++) {
//   //     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   //     console.log("the 3",packageLength)
//   //   }
//   // }
  
//   stringArr.push(result);
// }

function loadPackage(input, packagesOnBelt){
  
  for (let i = 0; i < packagesOnBelt.length; i++){
    if(packagesOnBelt[i].text == input){      
      if(packagesOnBelt[i].w > leftW && leftW !== 0){
          messageVisible = true;
      }else{   
        score += 1
        loadedPackage.push(packagesOnBelt.splice(i, 1))
        for(let j = 0; j < packagesOnBelt.length;j++){
          if( j >= i){
            packagesOnBelt[j].speed = 3.15;
          }
        }}
        organizePackage(loadedPackage)
     
  }
  console.log(packagesOnBelt[i].text, input)
  
  }
}

function organizePackage(){
  leftW = insideW
  leftH = 0
     for(let i = 0; i < loadedPackage.length; i++){
      if(leftW === 0){
        leftW = insideW
        leftH += 50
      }
      if (loadedPackage[i][0].w <= leftW){
        loadedPackage[i][0].x = insideX + insideW - leftW
        leftW -= loadedPackage[i][0].w
        loadedPackage[i][0].y = height - 600 + 42.5 + 300 - 50 - leftH
      }

    }

    //   loadedPackage[i][0].x = insideX + insideW - leftW
    // leftW -= loadedPackage[i][0].w
    // loadedPackage[i][0].y = 42.5 + 400 - leftH
    // leftH += loadedPackage[i][0].h
    console.log()
  }
 


// rect(insideX, 42.5, insideW, 400);
function hover(){
  button.position(width / 2 - button.width / 2 - 60 +3, height / 2 + 70+4);
  button.style('box-shadow', "0px 0px #888888");
  restartButton.position(width / 2 - button.width / 2 - 60 +3, height / 2 + 70+4);
  restartButton.style('box-shadow', "0px 0px #888888");
}
function endHover(){
  button.position(width / 2 - button.width / 2 - 60, height / 2 + 70)
  button.style('box-shadow', "3px 4px #888888");
  restartButton.position(width / 2 - button.width / 2 - 60 , height / 2 + 70);
  restartButton.style('box-shadow', "3px 4px #888888");
;}

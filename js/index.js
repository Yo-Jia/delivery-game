let beltSpeed = 2; 
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
// let stringArr = []
// let randomText = ""


setInterval(() => {
  randomPackage(packages);
  organizePackage()
}, 5000); 



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
    strokeWeight(1);
    ellipse(1150 - transporterW, 325, 150, 150);
    ellipse(1150, 325, 150, 150);
    //transporter
   
    fill(150);
    strokeWeight(1)
    rect(transporterX, 30, transporterW, 325);

    insideW = 600;
    insideX = (width / 2) - (insideW / 2);

    fill(125);
    strokeWeight(1)
    rect(insideX, 42.5, insideW, 300);

    fill(150);
    strokeWeight(1)
    quad(windowWidth - transporterW + 100, 0,transporterX, 30, transporterX + transporterW, 30, windowWidth , 0);

    fill(350);
    strokeWeight(1)
    quad(windowWidth, 300,transporterX + transporterW, 355, transporterX + transporterW, 30, windowWidth , 0);


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
      stroke(100);
      strokeWeight(10);
      fill(100)
      rect(package.x, package.y, package.w, package.h) 
      //tape
      stroke(250);
      strokeWeight(10);
      drawTape(package.x,package.y,package.w,package.h)
     
      //sticker 
      stroke(300)
      fill(300)
      rect(package.x + 15,package.y + 20, 30, 15)

      //text in sticker
      strokeWeight(0)
      fill(0);
      textSize(12);
      text(package.text, package.x + 20, package.y + 30);


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
        if (packagesOverlap(packageA, packageB)) {
          packageA.speed = 0;
          packageB.speed = 0;
        }
      }
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
      stroke(100);
      strokeWeight(10);
      fill(100)
      rect(package[0].x, package[0].y, package[0].w, package[0].h) 
      //tape
      stroke(250);
      strokeWeight(10);
      drawTape(package[0].x,package[0].y,package[0].w,package[0].h)
     
      //sticker 
      stroke(300)
      fill(300)
      rect(package[0].x + 15,package[0].y + 20, 30, 15)

      //text in sticker
      strokeWeight(0)
      fill(0);
      textSize(12);
      text(package[0].text, package[0].x + 20, package[0].y + 30);})

      //typedText
      strokeWeight(0)
        fill(0);
        textSize(100);
        text(typedText, 200, 200)

      //Warntext
      if(messageVisible === true){
        strokeWeight(0)
        fill(0);
        textSize(100);
        text("This package is too big", (width / 2) - (insideW / 2), 200);
        setInterval(() => {
          messageVisible = false
        }, 1500);
      }
      
  
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
  let speed = 13

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
    packageA.x + packageA.w > packageB.x + 50 &&
    packageA.y < packageB.y + packageB.h &&
    packageA.y + packageA.h > packageB.y
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
      }else{ loadedPackage.push(packagesOnBelt.splice(i, 1))
        for(let j = 0; j < packagesOnBelt.length;j++){
          if( j >= i){
            packagesOnBelt[j].speed = 13;
            console.log("remove",i)
            console.log("these should move:", j)
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
        loadedPackage[i][0].y = 42.5 + 300 - 50 - leftH
      }
      if(leftH === 300){
    loadPackage = []
    }
    }

    //   loadedPackage[i][0].x = insideX + insideW - leftW
    // leftW -= loadedPackage[i][0].w
    // loadedPackage[i][0].y = 42.5 + 400 - leftH
    // leftH += loadedPackage[i][0].h
    console.log()
  }
 


// rect(insideX, 42.5, insideW, 400);

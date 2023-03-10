let beltSpeed = 2; 
let beltX = 0;
let randomARR = [];
let x
let y
let w
let h
let randomArrW = 0 
let randomText = ""
let stringArr = []

const packages = [
  {
    name: "small square",
    x: 0,
    y: 0,
    w:50,
    h:50
  },
  {
    name: "big square",
    x: 0,
    y: 0,
    w:200,
    h:200
  },
  {
    name: "long rec horizontal",
    x: 0,
    y: 0,
    w:200,
    h:50
  },
  {
    name: "long rec vertical",
    x: 0,
    y: 0,
    w:50,
    h:200
  },
  {
    name: "short rect horizontal",
    x: 0,
    y: 0,
    w:100,
    h:50
  },
  {
    name: "short rec vertical",
    x: 0,
    y: 0,
    w: 50,
    h: 100
  },
  // {
  //   name: "L shape",
  //   x: 0,
  //   y: 0,
  //   w: 50,
  //   h: 100,
  //   secX:  + 50,
  //   secY:  + 50,
  //   secW: 50,
  //   secH: 50
  // },
  // {
  //   name: "L shape reverse",
  //   x: 0,
  //   y: 0,
  //   w: 50,
  //   h: 100,
  //   secX:  - 50,
  //   secY:  + 50,
  //   secW: 50,
  //   secH: 50
  // },
  
  
]

setInterval(() => {
  randomPackage(packages);

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
    ellipse(1150 - transporterW, 425, 150, 150);
    ellipse(1150, 425, 150, 150);
    //transporter
   
    fill(150);
    strokeWeight(1)
    rect(transporterX, 30, transporterW, 425);

    let insideW = 600;
    let insideX = (width / 2) - (insideW / 2);

    fill(125);
    strokeWeight(1)
    rect(insideX, 42.5, insideW, 400);

    fill(150);
    strokeWeight(1)
    quad(windowWidth - transporterW + 100, 0,transporterX, 30, transporterX + transporterW, 30, windowWidth , 0);

    fill(350);
    strokeWeight(1)
    quad(windowWidth, 400,transporterX + transporterW, 455, transporterX + transporterW, 30, windowWidth , 0);


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

    //make package stop
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
      rect(package.x + 15,package.y + 20, package.w - 20, 15)

      //text in sticker
      fill(0);
      textSize(12);
      text(stringArr[i], package.x + 20, package.y + 30);


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
      
      if (package.x + package.w >width - 20) {
      package.speed = 0;
      }

      
    

    
      

      // if (package.x -  package.w > windowWidth) {
      //   package.x = 0;
      // }
    })

  }

  // randomARR.forEach((package)=>{
  //   console.log("package",package.w)
  //   console.log("Arr",randomArrW)
  //   if(package.speed == 0){
  //     randomArrW += package.w
  //   }
  //   })


   
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
    // rect(x, 0, 50, 100);
    // rect(x - 50, y + 50, 50, 50);


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
  return rect(x + random(0, w - 20),y + random(0, h - 20), 15, 15)

}
function randomSticker(){
  return rotate(PI / random(30,50));
}




function randomPackage(packagesArr){
  let i = Math.floor(Math.random() * 6)
  let x = packagesArr[i].x
  let y = packagesArr[i].y
  let w = packagesArr[i].w
  let h = packagesArr[i].h
  
  // let secX = packagesArr[i].secX
  // let secY = packagesArr[i].secY
  // let secW = packagesArr[i].secW
  // let secH = packagesArr[i].secH
  let speed = 13
  packagesArr.forEach(()=>{ generateRandomString(w - 40)})
 
  if(i < 6){randomARR.push({x, y , w, h,speed})}
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

function generateRandomString() {
  // let length = maxLength/12; 
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
  let result = "";
  for (let i = 0; i < 3; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  stringArr.push(result);
}


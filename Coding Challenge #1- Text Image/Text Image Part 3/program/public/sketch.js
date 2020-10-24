let button;
let img;
let txtFile;
let values;
let textFile;
let buttonHappened = false;

function preload(){
  img = loadImage("Programming Background.png");
  img.resize(resWidth(), resHeight());
  values = loadStrings("image (61).txt");
}

function setup(){
  // img.resize(resWidth(), resHeight());
  // createCanvas(img.width, img.height);
  createCanvas(400, 400);
  button = createButton('upload');
  button.position(0, height + 10);
  button.mousePressed(buttonPressed);
  pixelDensity(1);
  storeImage();
  console.log(img);
}

function draw(){
  background(220);
  image(img, 0, 0);
  // img.resize(resWidth(), resHeight());
  noLoop();
  // loadPixels();
  if(buttonHappened){
    updatePixels();
  }
}

function buttonPressed(){
  let wSearch = /^([0-9]+)x/
  let hSearch = /x([0-9]+)$/
  let imgWidth = wSearch.exec(values[0]);
  let imgHeight = hSearch.exec(values[0]);
  let total = 0;
  // resizeCanvas(imgWidth[1], imgHeight[1]);
  resizeCanvas(wSearch[1], hSearch[1]);
  loadPixels();
  for(let y = 0; y < imgHeight[1]; y++){
    for(let x = 0; x < imgWidth[1]; x++){
      total++;
      pixel = (x + y * width) * 4;
      pixels[pixel] = getValue(total, 1)
      pixels[pixel + 1] = getValue(total, 2)
      pixels[pixel + 2] = getValue(total, 3)
    }
  }
  // console.log(total);
  buttonHappened = true;
}

function getValue(line, color){
  let thePixel = values[line];
  if(color == 1){
    exp = /^([0-9]+),/;
    colorVal = exp.exec(thePixel);
  } else if(color == 2){
    exp = /,([0-9]+),/;
    colorVal = exp.exec(thePixel);

  } else if(color == 3){
    exp = /,([0-9]+)$/;
    colorVal = exp.exec(thePixel);
  }
  return colorVal[1];
}

function storeImage(){
  resizeCanvas(resWidth(), resWidth());
  txtFile = createWriter('image.txt');
  txtFile.write(img.width+"x"+img.height+"\n");
  for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
      pixel = (x + y * width) * 4;
      pixelValue = img.get(x, y);
      txtFile.write(pixelValue[0]+","+
      pixelValue[1]+","+pixelValue[2]+"\n");
    }
  }
    txtFile.close();
}

function loadText(data){
  console.log(data.length);
}

function resWidth(){
  let pixels = 125000;
  let fraction = floor(pixels / (getAspectWidth() * getAspectHeight()));
  let ratio = floor(sqrt(fraction));
  return ratio * getAspectWidth();
}

function resHeight(){
  let pixels = 125000;
  let fraction = floor(pixels / (getAspectWidth() * getAspectHeight()));
  let ratio = floor(sqrt(fraction));
  return ratio * getAspectHeight();
}

function getAspectWidth(){
  divisor = gcd(img.width, img.height);
  return img.width / divisor;
}

function getAspectHeight(){
  divisor = gcd(img.width, img.height);
  return img.height / divisor;
}

function gcd(n1, n2){
  while(n2 != 0){
    temp = n2;
    n2 = n1 % n2;
    n1 = temp;
  }
  return n1;
}

// let button;
let fileInput;
let img;
let txtFile;
let data;
let textFile;
let displayImage = false;
// let buttonHappened = false;

function preload(){
  // img = loadImage("Snow_Original.jpg");
  // data = loadStrings("image (1).txt");
}

function setup(){
  // img.resize(resWidth(), resHeight());
  // createCanvas(img.width, img.height);
  createCanvas(400, 400);
  fileInput = createFileInput(handleFile);
  // button = createButton('upload');
  // button.position(0, height + 10);
  // button.mousePressed(buttonPressed);
  pixelDensity(1);
  // storeImage();
  // console.log(img);
}

function draw(){
  background(220);
  // image(img, 0, 0);
  // loadPixels();
  // if(buttonPressed){
  updatePixels();
  // }
  if(displayImage){
    resizeCanvas(resWidth(), resHeight());
    image(img, 0, 0);
  }
}

function handleFile(file){
  // console.log(file);
  if(file.type == "image"){
    img = loadImage(file.data, storeImage);
  }
  if(file.type == "text"){
    // console.log(file.data);
    displayImage = false;
    data = split(file.data, "\n");
    textImage(data);
  }
}

function textImage(data){
  // buttonHappened = false;
  let wSearch = /^([0-9]+)x/;
  let hSearch = /x([0-9]+)$/;
  let imgWidth = wSearch.exec(data[0]);
  let imgHeight = hSearch.exec(data[0]);
  let total = 0;
  resizeCanvas(imgWidth[1], imgHeight[1]);
  loadPixels();
  for(let y = 0; y < imgHeight[1]; y++){
    for(let x = 0; x < imgWidth[1]; x++){
      total++;
      let pixel = (x + y * width) * 4;
      pixels[pixel] = getValue(total, 1)
      pixels[pixel + 1] = getValue(total, 2)
      pixels[pixel + 2] = getValue(total, 3)
    }
  }
  // console.log(data);
  // console.log(total);
  // buttonHappened = true;
}

function getValue(line, color){
  let thePixel = data[line];
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
  txtFile = createWriter('image.txt');
  txtFile.write(img.width+"x"+img.height+"\n");
  // console.log(img.width);
  for(let y = 0; y < img.height; y++){
    for(let x = 0; x < img.width; x++){
      pixel = (x + y * img.width) * 4;
      pixelValue = img.get(x, y);
      txtFile.write(pixelValue[0]+","+
      pixelValue[1]+","+pixelValue[2]+"\n");
    }
  }
  displayImage = true;
  // txtFile.close();
}

function loadText(data){
  // console.log(data.length);
}

function getWidth(){
  // let pixels = img.width * img.height;
  aspectRatio = getAspectRatio(img.width, img.height);
  return img.width / aspectRatio;
}

function resWidth(){
  let pixels = 25000;
  let fraction = floor(pixels / (getWidth() * getHeight()));
  let ratio = floor(sqrt(fraction));
  return ratio * getWidth();
}

function resHeight(){
  let pixels = 25000;
  let fraction = floor(pixels / (getWidth() * getHeight()));
  let ratio = floor(sqrt(fraction));
  return ratio * getHeight();
}

function getHeight(){
  // let pixels = img.width * img.height;
  aspectRatio = getAspectRatio(img.width, img.height);
  return img.height / aspectRatio;
}

function getAspectRatio(w, h){
  if (!h) return w;

  return gcd(h, w % h);
}

function gcd(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number'))
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

Status="";
objects="";


function preload(){
alarm= loadSound('alarm_r.mp3');
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML= 'status: detecting objects';
  
}
function modelLoaded(){
    console.log('Model Loaded!');
    Status= true;
    objectDetector.detect(video,gotresult);
}
function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(Status != ""){
        objectDetector.detect(video,gotresult);
        r= random(255);
        g= random(255);
        b= random(255);
        for(i=0; i<objects.length; i++){
            document.getElementById('status').innerHTML= 'status: objects detected';
            percent= floor(objects[i].confidence*100);
            fill(r, g, b);
            text(objects[i].label +" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects.label =='baby'){
                document.getElementById('object_number').innerHTML= 'Baby found';
                alarm.stop();
            }
            if(objects.label !='baby'){
                document.getElementById('object_number').innerHTML= 'Baby not found';
                alarm.play();
            }
        }
        
    }
    
}

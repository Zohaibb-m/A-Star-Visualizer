//A* Pathfinding taken from Coding Train

//Global Variables
let cols=66;
let rows=22;
let grid=new Array(cols);
let openSet=[];
let closedSet=[];
let start,end;
let w,h;
let path=[];
let noSolution=false;
let found=false;
let running=false;
let startDragging=false;
let endDragging = false;
function setup() {
    // frameRate(10);
    createCanvas(1500 , 450);
    for(let i=0;i<cols;i++){
      grid[i]=new Array(rows);
    }
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        grid[i][j]=new Spot(i,j);
      }
    }
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        grid[i][j].addNeighbours(grid);
      }
    }
    generateMaze();
    w=width/cols;
    h=height/rows;
    // start=grid[floor(random(0,10))][floor(random(0,24))];
    // end=grid[floor(random(40,49))][floor(random(0,24))];
    start=grid[1][1];
    end=grid[cols-2][rows-2];
    start.wall=false;
    end.wall=false;
  }

  function removeFromArray(arr,elt){
    for(let i=arr.length-1;i>=0;i--){
      if(arr[i]==elt)arr.splice(i,1);
    }
  }

  function heuristic(a,b){
    // console.log("Hello",a)
    // let d=dist(a.x,a.y,b.x,b.y);
    let d =abs(a.x-b.x) + abs(a.y-b.y);
    return d;
  }

function draw() {
    background(255); 
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        grid[i][j].show(color(255));
      }
    } 
  start.showStart();
  end.showEnd();
    if(running){
    if(openSet.length>0){
      //keep going
      let winner=0;
      for(let i=0;i<openSet.length;i++){
        if(openSet[i].f<openSet[winner].f){
          winner=i;
        }
      }
      var current=openSet[winner];
      if(current===end){
        // noLoop()
        running=false;
        console.log("DONE!");
        found=true;
      }
      if(!found){
      closedSet.push(current);
      removeFromArray(openSet,current);
      var neigbours=current.neigbours;
      for (let i=0;i<neigbours.length;i++){
        let neighbour=neigbours[i];
        if(!closedSet.includes(neighbour) && !neighbour.wall && current.isReachable(neighbour)){
          let tempG=current.g+1;
          let newPath=false;
          if(openSet.includes(neighbour)){
            if(tempG<neighbour.g){
              neighbour.g=tempG;
              newPath=true;
            }
          }
            else{
              newPath=true;
              neighbour.g=tempG;
              openSet.push(neighbour);
            }
            if(newPath){
              neighbour.h=heuristic(neighbour,end);
              neighbour.f=neighbour.g+neighbour.h;
              neighbour.previous=current;
            }
          }
        }
      }
    }
    else{
      //No solution
      noSolution=true;
      // noLoop();
      running=false;
    }
    for(let i=0;i<closedSet.length;i++){
      closedSet[i].show(color(37, 109, 133))
    }
    for(let i=0;i<openSet.length;i++){
      openSet[i].show(color(223, 246, 255));
    }
    if(!noSolution){
    path=[];
    let temp=current;
    path.push(temp);
    while(temp.previous){
      path.push(temp.previous);
      temp=temp.previous;
    }
    }
  }
    noFill();
    stroke(71, 181, 255)
    strokeWeight(3);
    beginShape();
    for(let i=0;i<path.length;i++){
      vertex(path[i].x*w+w/2,path[i].y*h+h/2);
    }
    endShape();
    // run();
  }

 function mouseDragged(){
   let i=int(map(mouseX,0,1500,0,66));
   let j=int(map(mouseY,0,450,0,22));
  //  console.log(i,j);
  if(startDragging){
    start=grid[i][j];
  }
  else if(endDragging){
    end=grid[i][j];
  }
  else grid[i][j].wall=true;
 }
 
 function mousePressed(){
  let i=int(map(mouseX,0,1500,0,66));
  let j=int(map(mouseY,0,450,0,22));
   if(i>=0 && j>=0 && i<66 && j<22)
    if(i===start.x && j===start.y){
      startDragging=true;
    } 
    else if(i===end.x && j===end.y){
      endDragging=true;
    } 
   if(!startDragging && !endDragging)grid[i][j].wall=true;
 }

function mouseReleased(){
  let i=int(map(mouseX,0,1500,0,66));
  let j=int(map(mouseY,0,450,0,22));
   if(i>=0 && j>=0 && i<66 && j<22)
    if(i===start.x && j===start.y){
      startDragging=false;
      start=grid[i][j];
    } 
    if(i===end.x && j===end.y){
      endDragging=false;
      end=grid[i][j];
    } 
}

 function run(){
  running=true;
  openSet.push(start);
 }

 function resetAll(){
  for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      grid[i][j].reset();
    }
  }
  for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
      grid[i][j].addNeighbours(grid);
    }
  }
  path=[]
  openSet=[];
  closedSet=[];
  noSolution=false;
  found=false;
  running=false;
  // openSet.push(start);
  generateMaze();
  start=grid[1][1];
  end=grid[cols-2][rows-2];
  start.wall=false;
  end.wall=false;
  start.showStart();
 }

 function generateMaze(){
  const maze=mazes[0];
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      // console.log(maze[i].charAt(j),i,j)
      if(maze[i].charAt(j)==='1'){
        grid[j][i].wall=true;
      }
      else grid[j][i].wall=false;
    }
  }
 }
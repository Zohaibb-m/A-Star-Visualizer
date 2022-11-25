function Spot(i,j){
    this.x=i;
    this.y=j;
    this.f=0;
    this.g=0;
    this.h=0;
    this.neigbours=[];
    this.previous=undefined;
    this.wall=false;
    // if(random(1)<0.2){
    //   this.wall=true;
    // }
  
    this.reset=function(){
    this.f=0;
    this.g=0;
    this.h=0;
    this.neigbours=[];
    this.previous=undefined;
    this.wall=false;
    }
  
    this.show=function(col){
    //   noFill();
      fill(col)
      stroke(1);
      strokeWeight(0.2);
      rect(this.x*w,this.y*h,w-1,h-1);
      if(this.wall){
        fill(6, 40, 61);
        noStroke();
        rect(this.x*w,this.y*h,w-1,h-1);
      }
    }
  
    this.addNeighbours=function(grid){
      let i=this.x;
      let j=this.y;
      if(i<cols-1){
        this.neigbours.push(grid[i+1][j])
      }
      if(i>0){
        this.neigbours.push(grid[i-1][j])
      }
      if(j<rows-1){
        this.neigbours.push(grid[i][j+1])
      }
      if(j>0){
        this.neigbours.push(grid[i][j-1])
      }
      if(i>0 && j>0){
        this.neigbours.push(grid[i-1][j-1])
      }
      if(i<cols-1 && j>0){
        this.neigbours.push(grid[i+1][j-1])
      }
      if(i>0 && j<rows-1){
        this.neigbours.push(grid[i-1][j+1])
      }
      if(i<cols-1 && j<rows-1){
        this.neigbours.push(grid[i+1][j+1])
      }
    }
  
    this.isReachable=function (neighbour){
      console.log(this.x,this.y,neighbour.x,neighbour.y)
      if(this.x>neighbour.x ){
        if(this.y>neighbour.y && this.x<cols-1){
          return !grid[this.x-1][this.y].wall || !grid[this.x][this.y-1].wall;
        }else{
          return !grid[this.x-1][this.y].wall || !grid[this.x][this.y+1].wall;
        }
      }
      else {
        if(this.y>neighbour.y && this.x<cols-1){
          return !grid[this.x+1][this.y].wall || !grid[this.x][this.y-1].wall;
        }else{
          if(this.x<cols-1)
            return !grid[this.x+1][this.y].wall || !grid[this.x][this.y+1].wall;
        }
      }
      return true;
    }
    this.showStart=function(){
        fill(1, 146, 103);
        textSize(17);
        textStyle(BOLD);
        text('>',this.x*w+w/4,this.y*h+h/4,w-5,h-5)
    }
    this.showEnd=function(){
        noFill()
        stroke(1, 146, 103);
        strokeWeight(3)
        ellipse(this.x*w+w/2,this.y*h+h/2,w-7,h-7)
        fill(1, 146, 103);
        ellipse(this.x*w+w/2,this.y*h+h/2,w-16,h-16)
    }
  }
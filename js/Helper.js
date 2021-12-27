function distance(x1,y1,x2,y2){
    let x=x1-x2;
    let y=y1-y2;
    let distSq=x*x+y*y;
    return Math.sqrt(distSq);

}
function random(min,max){
    return min+Math.random()*(max-min);
}
function generateElement(){
    const PADDING=5;
    const VELOCITY_LIMIT=1;
    const radius=25;
    const x=random(radius+PADDING,width-radius-PADDING);
    const y=random(radius+PADDING,height-radius-PADDING);
    const xVel=random(-VELOCITY_LIMIT,VELOCITY_LIMIT);
    const yVel=random(-VELOCITY_LIMIT,VELOCITY_LIMIT);
    return{radius,x,y,xVel,yVel};
}
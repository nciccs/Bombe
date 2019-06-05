var bombe;

function setup()
{
    WidgetHandler.init();
    // put setup code here
    createCanvas(1024, 720*1.4);

    bombe = new Bombe();
}

function draw()
{
    // put drawing code here

    //need this here to clear out the previous old frame
    background(200);

    bombe.draw();

    WidgetHandler.draw();

    drawSprites();
}

function mouseMoved()
{
    WidgetHandler.mouseMoved();
}

function mousePressed()
{
    bombe.mousePressed();
    WidgetHandler.mousePressed();
}

function mouseReleased()
{
    bombe.mouseReleased();
    WidgetHandler.mouseReleased();
}

function mouseDragged()
{
    bombe.mouseDragged();
    WidgetHandler.mouseDragged();
}
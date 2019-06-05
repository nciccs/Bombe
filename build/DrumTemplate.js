class DrumTemplate
{
    constructor(bombe=null, drumType=1)
    {
        this.bombe = bombe;
        this.drumType = drumType;
        this.x = 0;
        this.y = 0;
        this.diameter = Drum.DEFAULT_DIAMETER*Bombe.scale;
    }

    draw()
    {
        push();
        stroke(Drum.colors[this.drumType]);
        fill(Drum.colors[this.drumType]);
        ellipse(this.x, this.y, this.diameter);

        stroke(255);
        fill(255);
        textFont('Courier New');
        textSize(Bombe.scale * 7);
        textAlign(CENTER, CENTER);
        text(Drum.romanize(this.drumType), this.x, this.y);

        pop();

    }

    mousePressed()
    {
        if(dist(this.x, this.y, mouseX, mouseY) <= (this.diameter/2))
        {
            if(WidgetHandler.holding == null && !WidgetHandler.findByMouse(mouseX, mouseY))
            {
                let drum = new Drum(this.bombe, this.drumType, 25);
                drum.x = mouseX;
                drum.y = mouseY;
            }
        }
    }
}
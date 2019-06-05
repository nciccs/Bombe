class DrumSlot
{
    constructor(x=width/2, y=height*.25)
    {
        this.x = x;
        this.y = y;
        this.drum = null;
        this.diameter = Drum.DEFAULT_DIAMETER * Bombe.scale;
    }

    draw()
    {
        push();
        if(this.drum)
        {
            fill(0);
        }
        else
        {
            fill(200);
        }
        ellipse(this.x, this.y, this.diameter);
        pop();
    }

    contains(inX, inY)
    {
        return (dist(this.x, this.y, inX, inY) <= (this.diameter/2));
    }
}
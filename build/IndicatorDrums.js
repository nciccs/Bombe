class IndicatorDrums
{
    constructor(bombe=null, length=3)
    {
        this.bombe = bombe;
        this.drums = [];
        this.length = length;
        for(let i = 0; i < this.length; i++)
        {
            this.drums[i] = new Drum(bombe, 0, 25);
        }
    }

    draw()
    {
        for(let i = 0; i < this.length; i++)
        {
            let x = bombe.drumSlots.slots[3+i][11].x+Drum.DEFAULT_DIAMETER * Bombe.scale * 1.1;
            let y = bombe.drumSlots.slots[3+i][11].y;
            DrumSlot.draw(x, y, bombe.drumSlots.slots[3+i][11].diameter);
            this.drums[i].x = x;
            this.drums[i].y = y;
        }
    }
}
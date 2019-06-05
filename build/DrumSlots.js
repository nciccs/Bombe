class DrumSlots
{
    constructor()
    {
        this.slots = new Array(9);

        let spacingX = (Bombe.length - 14 * Drum.DEFAULT_DIAMETER * Bombe.scale * 1.1) / 2;

        let spacingY = (Bombe.height - 9 * Drum.DEFAULT_DIAMETER * Bombe.scale * 1.1) / 4;

        let y = Bombe.frontTopLeftY + spacingY + Drum.DEFAULT_DIAMETER * Bombe.scale / 2;

        for(let i = 0; i < this.slots.length; i++)
        {
            this.slots[i] = new Array(12);

            let x = Bombe.frontTopLeftX + spacingX + Drum.DEFAULT_DIAMETER * Bombe.scale / 2;

            for(let j = 0; j < this.slots[i].length; j++)
            {
                this.slots[i][j] = new DrumSlot(x, y);

                x += Drum.DEFAULT_DIAMETER * Bombe.scale * 1.1;
            }

            if((i+1)%3 == 0)
            {
                y += spacingY;
            }

            y += Drum.DEFAULT_DIAMETER * Bombe.scale * 1.1;
        }
    }

    draw()
    {
        for(let i = 0; i < this.slots.length; i++)
        {
            for(let j = 0; j < this.slots[i].length; j++)
            {
                this.slots[i][j].draw();
            }
        }
    }

    findSlot(inX, inY)
    {
        let slot = null;
        for(let i = 0; i < this.slots.length; i++)
        {
            for(let j = 0; j < this.slots[i].length; j++)
            {
                if(this.slots[i][j] && this.slots[i][j].contains(inX, inY))
                {
                    slot = this.slots[i][j];
                }
            }
        }
        return slot;
    }
}
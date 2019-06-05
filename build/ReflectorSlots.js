class ReflectorSlots
{
    static get margin()
    {
        return 6.5 * Bombe.scale;
    }

    static get topY()
    {
        return Bombe.frontTopLeftY + Bombe.height - ReflectorSlots.height/1.3;
    }

    static get width()
    {
        return Bombe.breadth - ReflectorSlots.margin * 2;
    }

    static get height()
    {
        return Reflector.height;
    }

    constructor()
    {
        this.reflectors = [];
        this.count = 3;
    }

    draw()
    {
        push();
        let margin = (Bombe.breadth - this.count * Reflector.width) / (this.count+1);
        let xAt = Bombe.frontTopLeftX - Bombe.breadth + Reflector.width/2 + margin;
        rectMode(CENTER);
        fill(128);
        for(let i = 0; i < this.count; i++)
        {
            rect(xAt, ReflectorSlots.topY, Reflector.width, Reflector.height);               

            if(this.reflectors[i] != null)
            {
                this.reflectors[i].x = xAt;
                this.reflectors[i].y = ReflectorSlots.topY;
            }

            xAt += Reflector.width + margin;
        }
        pop();
    }
}
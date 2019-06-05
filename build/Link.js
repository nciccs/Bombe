class Link
{
    constructor()
    {
        this.jacks = [];
    }

    //by default, pass data to every other jacks
    pass(jack, data)
    {
        if(jack != null)
        {
            for(let i = 0; i < this.jacks.length; i++)
            {
                if(this.jacks[i] != jack)
                {
                    this.jacks[i].pass(this, data);
                }
            }
        }
    }

    //intended for wires like Cable and Bridge
    connect(jackIndex, jack)
    {
        if(jack != null)
        {
            this.disconnect(jackIndex);

            this.jacks[jackIndex] = jack;
            this.jacks[jackIndex].links[Jack.WIRE_INDEX] = this;
        }
    }

    //intended for wires like Cable and Bridge
    disconnect(jackIndex)
    {
        if(this.jacks[jackIndex] != null)
        {
            this.jacks[jackIndex].links[Jack.WIRE_INDEX] = null;
            this.jacks[jackIndex] = null;
        }
    }

    //intended for wires like Cable and Bridge
    disconnectEnds()
    {
        disconnect(0);
        disconnect(jacks.length-1);
    }
}
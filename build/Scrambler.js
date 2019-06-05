class Scrambler extends Link
{
    constructor(name="", reflector=null, drumSlots=null, jacks=null)
    {
        super();

        if(jacks == null)
        {
            this.jacks[0] = new Jack("IN" + name);
            this.jacks[0].links[Jack.DEVICE_INDEX] = this;

            this.jacks[1] = new Jack("OUT" + name);
            this.jacks[1].links[Jack.DEVICE_INDEX] = this;
            }
        else
        {
            this.jacks = jacks;
        }

        this.name = name;

        this.drumSlots = drumSlots;

        this.reflector = reflector;
    }

    pass(jack, data)
    {
        super.pass(jack, this.cipher(data));
    }

    cipher(index)
    {
        let result = index;

        if(this.drumSlots != null)
        {
            let successCount = 0;
            for(let i = this.drumSlots.length-1; i >= 0; i--)
            {
                if(this.drumSlots[i].drum != null)
                {
                    result = this.drumSlots[i].drum.cipherIn(result);
                    successCount++;
                }
            }
        
            if(successCount == this.drumSlots.length && result != null)
            {
                result = this.reflector.cipher(result);

                for(let i = 0; i < this.drumSlots.length; i++)
                {
                    if(this.drumSlots[i].drum != null)
                        result = this.drumSlots[i].drum.cipherOut(result);
                }
            }
        }

        return result;
    }
}
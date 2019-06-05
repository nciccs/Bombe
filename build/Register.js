class Register extends Link
{
    constructor(jacks=null)
    {
        super();

        //26 relays
        this.relays = new Array(26);

        if(jacks == null)
        {
            for(let i = 0; i < 26; i++)
            {
                this.jacks[i] = new Jack(String.fromCharCode('Z'.charCodeAt(0)-i));
                this.jacks[i].links[Jack.DEVICE_INDEX] = this;

                this.relays[i] = new Array(26);
                for(let j = 0; j < 26; j++)
                {
                    this.relays[i][j] = false;
                }
            }
        }
        else
        {
            this.jacks = jacks;
        }
    }

    pass(jack, data)
    {
        if(jack != null)
        {
            for(let i = 0; i < jacks.length; i++)
            {
                if(jacks[i] == jack)
                {
                    if(!this.relays[i][data])
                    {
                        //diagonal board
                        pass(jack[data], i);

                        this.relays[i][data] = true;
                    }
                }
            }
        }
    }
}
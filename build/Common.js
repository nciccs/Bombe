class Common extends Link
{
    constructor(name="", numJacks = 4, jacks=null)
    {
        super();

        this.name = name;

        if(jacks == null)
        {
            for(let i = 0; i < numJacks; i++)
            {
                this.jacks[i] = new Jack("CO"+name);
                this.jacks[i].links[Jack.DEVICE_INDEX] = this;
            }
        }
        else
        {
            this.jacks = jacks;
        }
    }
}
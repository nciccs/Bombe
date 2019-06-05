class Jack
{
    static get width()
    {
        return Bombe.length / 9;
    }

    static get height()
    {
        return Bombe.height / 26;
    }

    //Scrambler, Common, Register
    static get DEVICE_INDEX()
    {
        return 0;
    }

    //Bridge, Cable
    static get WIRE_INDEX()
    {
        return 1;
    }

    //Constructor
    //A jack should have a label
    constructor(name = "")
    {
        this.name = name.toUpperCase();
        this.links = [];
        this.bombe = null;

        this.x = width * .1;
        this.y = height * .7;
        //this.width = Bombe.length/9;
        //this.height = Bombe.height/26;
     }

    //pass a data via link
    pass(link, data)
    {
        for(let i = 0; i < this.links.length; i++)
        {
            if(this.links[i] != null && this.links[i] != link)
            {
                this.links[i].pass(this, data);
            }
        }
    }

    draw()
    {
        push();
        //smooth();
        //noSmooth();
        rectMode(CENTER);
        fill(128); 
        rect(this.x, this.y, Jack.width, Jack.height);
        //stroke(0);
        fill(0);
        //textFont('Courier New');
        textAlign(CENTER, CENTER);
        textSize(Jack.height);
        text(this.name, this.x, this.y + Jack.height * 0.1);
        pop();
    }
}
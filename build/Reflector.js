class Reflector
{
    static get width()
    {
        return 15 * Bombe.scale;
    }

    static get height()
    {
        return 30 * Bombe.scale;
    }

    
    constructor(name = "B")
    {
        this.name = "";
        this.B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
        this.C = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

        this.map = [];

        if(name === "B")
        {
            this.name = "B";
            this.setCipher(this.B);
        }
        else if(name === "C")
        {
            this.name = "C";
            this.setCipher(this.C);
        }

        this.x = width * .1;
        this.y = height * .7;

        this.width = Reflector.width;
        this.height = Reflector.height;

        this.topLeftX = this.x - Reflector.width / 2;
        this.topLeftY = this.y - Reflector.height / 2;
    }

    cipher(index)
    {
        return this.map[index];
    }

    setToB()
    {
        this.name = "B";
        this.setCipher(this.B);
    }

    setToC()
    {
        this.name = "C";
        this.setCipher(this.C);
    }

    setCipher(cipherString)
    {
        cipherString = cipherString.toUpperCase();

        this.map = [];
        for (let i = 0; i < cipherString.length; i++)
        {
            this.map.push(cipherString.charCodeAt(i) - 'A'.charCodeAt(0));
        }
    }

    draw()
    {
        this.topLeftX = this.x - Reflector.width / 2;
        this.topLeftY = this.y - Reflector.height / 2;

        push();
        rectMode(CENTER);
        fill(0);
        rect(this.x, this.y, Reflector.width, Reflector.height);
        fill(255);
        stroke(255);
        textSize(Bombe.scale * 11);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
        pop();
    }

    mouseReleased()
    {
        if(!WidgetHandler.findByMouse(mouseX, mouseY) && WidgetHandler.contains(this, mouseX, mouseY))
        {
            if(this.name == 'B')
            {
                this.setToC();
            }
            else if(this.name == 'C')
            {
                this.setToB();
            }
        }
    }
}
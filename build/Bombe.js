class Bombe
{
    static get ORIGINAL_LENGTH()
    {
        return 220;
    }

    static get ORIGINAL_HEIGHT()
    {
        return 180;
    }

    static get ORIGINAL_BREADTH()
    {
        return 80;
    }

    static get scale()
    {
        return width / (Bombe.ORIGINAL_BREADTH*2+Bombe.ORIGINAL_LENGTH) * .99;
    }

    static get length()
    {
        return Bombe.ORIGINAL_LENGTH * Bombe.scale;
    }

    static get width()
    {
        return Bombe.length;
    }

    static get height()
    {
        return Bombe.ORIGINAL_HEIGHT * Bombe.scale;
    }

    static get breadth()
    {
        return Bombe.ORIGINAL_BREADTH * Bombe.scale;
    }

    static get frontTopLeftX()
    {
        return width/2-Bombe.length/2;
    }

    static get frontTopLeftY()
    {
        return 5;
        //return Drum.DEFAULT_DIAMETER * Bombe.scale * 1.2;
    }

    constructor()
    {
        this.reflectorSlots = new ReflectorSlots();
        this.registers = [];
        this.commons = [];
        this.jackCH1 = new Jack("CH1");
        this.jackCH2 = new Jack("CH2");
        this.jackCH3 = new Jack("CH3");
        this.jackAUX = new Jack("AUX");

        this.inputJacks = [this.jackCH1, this.jackCH2, this.jackCH3, this.jackAUX];

        this.scramblers = [];

        this.reflectors = [];

        this.reflectors[0] = new Reflector("B");
        this.reflectors[1] = new Reflector("B");
        this.reflectors[2] = new Reflector("B");

        this.reflectorSlots.reflectors[0] = this.reflectors[0];
        this.reflectorSlots.reflectors[1] = this.reflectors[1];
        this.reflectorSlots.reflectors[2] = this.reflectors[2];

        this.registers[0] = new Register();
        this.registers[1] = new Register();
        this.registers[2] = new Register();

        this.createCommons(0, 6);
        this.createCommons(6, 12);
        this.createCommons(12, 17);

        this.drumSlots = new DrumSlots();

        let drumIIINums = this.createDrumNums("KEFNMGPBJILO");
        let scramblerNum = 1;
        let reflectorAt = 0;
        for(let i = 0; i < 3; i++)
        {
            this.scramblers[i] = [];
            for(let j = 0; j < 12; j++)
            {
                //let drums = [new Drum(1, 25), new Drum(2, 25), new Drum(3, drumIIINums[j])];
               // this.scramblers[i][j] = new Scrambler(scramblerNum, this.reflectorSlots.reflectors[reflectorAt], drums);
                //this.scramblers[i][j] = new Scrambler(scramblerNum, this.reflectorSlots.reflectors[reflectorAt], drums);
                this.scramblers[i][j] = new Scrambler(scramblerNum, this.reflectorSlots.reflectors[i]);
                scramblerNum++;
            }
            reflectorAt++;
        }

        this.jackSlots = new JackSlots(this, this.registers, this.commons, this.scramblers, this.inputJacks);

        this.drumTemplates = [];
        for(let i = 0; i < 5; i++)
        {
            //this.DrumTemplates[i] = new DrumTemplate(this, i+1);
            //this.DrumTemplates[i].x = Bombe.frontTopLeftX + Drum.DEFAULT_DIAMETER*Bombe.scale/2 + Drum.DEFAULT_DIAMETER * Bombe.scale * i * 1.5;
            //this.DrumTemplates[i].y = Bombe.frontTopLeftY / 2;
            this.drumTemplates[i] = new DrumTemplate(this, i+1);
            this.drumTemplates[i].x = Bombe.frontTopLeftX - Bombe.breadth / 2 ;
            this.drumTemplates[i].y = Bombe.frontTopLeftY + Bombe.height + Drum.DEFAULT_DIAMETER * Bombe.scale + Drum.DEFAULT_DIAMETER * Bombe.scale * i * 1.5;
        }

        this.indicatorDrums = new IndicatorDrums(this);
    }

    createDrumNums(letters)
    {
        let drumNums = [];
        for(let i = 0; i < 12; i++)
        {
            drumNums[i] = letters.charCodeAt(i)-'A'.charCodeAt(0);
        }
        return drumNums;
    }

    createCommons(commonStart, commonEnd)
    {
        let numMidCommons = 4;
        this.commons[commonStart] = new Common(commonStart+1, 5);
        for(let i = commonStart+1; i <= commonStart+numMidCommons; i++)
        {
            this.commons[i] = new Common(i+1);
        }
        this.commons[commonEnd-1] = new Common(commonEnd, 5);
    }

    draw()
    {
        push();
        fill(50);
        //front
        rect(Bombe.frontTopLeftX, Bombe.frontTopLeftY, Bombe.length, Bombe.height);
        this.drumSlots.draw();
        //left
        rect(Bombe.frontTopLeftX-Bombe.breadth, Bombe.frontTopLeftY, Bombe.breadth, Bombe.height);
        this.reflectorSlots.draw();
        //right
        rect(Bombe.frontTopLeftX+Bombe.length, Bombe.frontTopLeftY, Bombe.breadth, Bombe.height);
        //back
        rect(Bombe.frontTopLeftX, Bombe.frontTopLeftY+Bombe.height, Bombe.length, Bombe.height);

        this.jackSlots.draw();

        for(let i = 0; i < this.reflectors.length; i++)
        {
            this.reflectors[i].draw();
        }

        for(let i = 0; i < 5; i++)
        {
            this.drumTemplates[i].draw();
        }

        this.indicatorDrums.draw();

        pop();
    }

    mousePressed()
    {
        for(let i = 0; i < 5; i++)
        {
            this.drumTemplates[i].mousePressed();
        }
    }

    mouseDragged()
    {

    }

    mouseReleased()
    {
        for(let i = 0; i < this.reflectors.length; i++)
        {
            this.reflectors[i].mouseReleased();
        }
    }
}
class Drum
{
    static get DEFAULT_DIAMETER()
    {
        return 12.7;
    }

    static get colors()
    {
        //old red color('#e6194b')
        return [color('#9A6324'), color(255,  0, 0), color('#800000'), color('#3cb44b'), color('#ffe119'), color('#f58231')];
    }

    constructor(bombe=null, drumType=1, translate=25, numLetters=26)
    {
        this.bombe = bombe;

        this.zoom = 3.7;
        this.scale = Bombe.scale * 1;

        this.diameter = Drum.DEFAULT_DIAMETER * this.scale;

        this.x = width*.1;
        this.y = height/2+60;

        this.width = this.diameter;
        this.height = this.diameter;

        this.numLetters = numLetters;

        this.translate = translate % numLetters;

        if(this.translate < 0)
        {
            this.translate = numLetters + this.translate;
        }

        this.I  = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
        this.II = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
        this.III = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
        this.IV = "ESOVPZJAYQUIRHXLNFTGKDCMWB";
        this.V = "VZBRGITYUPSDNHLXAWMJQOFECK";

        this.map = [];
        this.reverseMap = [];
        
        this.color = Drum.colors[drumType];

        switch(drumType)
        {
            case 1:
                this.setToI();
            break;
            case 2:
                this.setToII();
            break;
            case 3:
                this.setToIII();
            break;
            case 4:
                this.setToIV();
            break;
            case 5:
                this.setToII();
            break;
            default:
                this.setToIndicator();
        }

        this.drumSlot = null;

        WidgetHandler.add(this);
    }

    setToI()
    {
        this.name = "I";
        this.setCipher(this.I);
    }
    
    setToII()
    {
        this.name = "II";
        this.setCipher(this.II);
    }

    setToIII()
    {
        this.name = "III";
        this.setCipher(this.III);
    }

    setToIV()
    {
        this.name = "IV";
        this.setCipher(this.IV);
    }

    setToV()
    {
        this.name = "V";
        this.setCipher(this.V);
    }

    setToIndicator()
    {
        this.name = "Indicator";
        this.setCipher("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    setCipher(cipherString)
    {
        cipherString = cipherString.toUpperCase();

        for(let i = 0; i < cipherString.length; i++)
        {
            this.map.push(cipherString.charCodeAt(i) - 'A'.charCodeAt(0));
        }

        for(let i = 0; i < this.map.length; i++)
        {
            this.reverseMap[this.map[i]] = i;
        }
    }

    cipherIn(index)
    {
        return this.getPosition(this.map[this.getPosition(index+this.translate)]-this.translate);
    }

    cipherOut(index)
    {
        return this.getPosition(this.reverseMap[this.getPosition(index+this.translate)]-this.translate);
    }

    cipher(index, rightToLeft=true)
    {
        let result;

        //default direction
        if(rightToLeft)
        {
            result = this.getPosition(this.map[this.getPosition(index+this.translate)]-this.translate);
        }
        else
        {
            result = this.getPosition(this.reverseMap[this.getPosition(index+this.translate)]-this.translate);
        }

        return result;
    }

    rotateUp()
    {
        this.translate = this.translate % this.numLetters;
        this.translate--;
        if(this.translate < 0)
        {
            this.translate = 25;
        }
    }

    rotateDown()
    {
        this.translate = this.translate % this.numLetters;
        this.translate++;
        if(this.translate > 25)
        {
            this.translate = 0;
        }
    }

    getPosition(offset)
    {
        let position = offset % this.map.length;

        if(position < 0)
        {
            position = this.map.length + position;
        }
        
        return position;
    }

    draw()
    {
        if(dist(this.x, this.y, mouseX, mouseY) > (Drum.DEFAULT_DIAMETER*Bombe.scale/2))
        {
             this.scale = Bombe.scale;
        }

        this.diameter = Drum.DEFAULT_DIAMETER * this.scale;

        push();
        //strokeWeight(this.scale*0.5);
        //stroke(this.color);
        stroke(this.color);
        fill(this.color)
        ellipse(this.x, this.y, this.diameter);
        pop();

        let textScale = Math.floor(this.scale * 1.2);

        //draw black part of drum
        push();
        fill(0);
        ellipse(this.x, this.y, this.diameter-textScale);
        pop();

        //if drum is big
        if(this.diameter > Drum.DEFAULT_DIAMETER*Bombe.scale)
        {
            push();
            stroke(this.color);
            fill(0);
            //fill(this.color);
            ellipse(this.x, this.y, Drum.DEFAULT_DIAMETER*Bombe.scale);

            //fill(0);
            //ellipse(this.x, this.y, Drum.DEFAULT_DIAMETER*Bombe.scale-Bombe.scale*1.2);
            pop();
        }

        push();
        strokeWeight(0);
        stroke(255);
        fill(255);
        //fill(255, 255, 255, 128);

        textSize(textScale);
        textAlign(CENTER, CENTER);

        angleMode(DEGREES);

        let degreeGap = 360/this.numLetters;
        let degrees = 45 - degreeGap * this.translate;

        for(let i = 0; i < this.numLetters; i++)
        {
            push();

            translate(this.x, this.y);
            rotate(degrees);
            text(String.fromCharCode('A'.charCodeAt(0) + i), 0, -this.diameter/2+textScale*1.2);

            degrees += degreeGap;
            pop();

        }

        textFont('Courier New');
        textSize(this.scale * 10);
        textAlign(CENTER, CENTER);
        text(String.fromCharCode('A'.charCodeAt(0) + this.translate), this.x, this.y);

        pop();

        //if drum is big
        if(this.diameter > Drum.DEFAULT_DIAMETER*Bombe.scale)
        {
            this.drawArrow();
        }
//this.rotateDown();
    }

    drawArrow()
    {
        push();
        let alpha = 200;
        stroke(red(this.color), green(this.color), blue(this.color), alpha);
        fill(red(this.color), green(this.color), blue(this.color), alpha);

        let originalRadius = Drum.DEFAULT_DIAMETER*Bombe.scale/2;

        let sign = -1;
        if(mouseY <= this.y)
        {
            sign = 1;
        }

        let midX = this.x;
        let midY = this.y - sign * originalRadius;

        let leftX = this.x + originalRadius * Math.cos((90+360/3)* Math.PI / 180);
        let leftY = this.y - sign * originalRadius * Math.sin((90+360/3)* Math.PI / 180);

        let rightX = this.x + originalRadius * Math.cos((90-360/3)* Math.PI / 180);
        let rightY = this.y - sign * originalRadius * Math.sin((90-360/3)* Math.PI / 180);

        triangle(leftX, leftY, midX, midY, rightX, rightY);

        pop();
        //console.log(Drum.getAngle(this.x, this.y, mouseX, mouseY));
    }

    static getAngle(x, y, x2, y2)
    {
        let angle = Math.atan2(y - y2, x2 - x) * 180 / Math.PI;

        if(angle < 0)
        {
            angle += 360;
        }

        return angle;
    }

    mouseMoved()
    {
        if(WidgetHandler.holding != this)
        {
            this.scale = this.zoom * Bombe.scale;
            WidgetHandler.holding = this;
            WidgetHandler.moveWidgetToTop();
            WidgetHandler.holding = null;
        }
    }

    mouseDragged()
    {
        this.scale = Bombe.scale;
        if(WidgetHandler.holding == this)
        {
            //alert("here");
            if(this.drumSlot != null)
            {
                this.drumSlot.drum = null;
                this.drumSlot = null;
            }
        }
    }

    mouseReleased()
    {
        //not dragging means changing drum setting
        if(WidgetHandler.isDragging == false)
        {
            if(mouseY <= this.y)
            {
                this.rotateUp();
            }
            else
            {
                this.rotateDown();
            }
        }

        let slot = this.bombe.drumSlots.findSlot(mouseX, mouseY);
        if(slot)
        {
            if(slot.drum == null)
            {
                this.x = slot.x;
                this.y = slot.y;

                this.drumSlot = slot;
                slot.drum = this;

                WidgetHandler.moveWidgetToBottom();
            }
            else
            {
                //teleport outside of slot area, so that this doesn't cover up slot
                //this.x = this.x <= slot.x ? slot.x-this.plugboard.spaceX/2 : slot.x+this.plugboard.spaceX/2;
            }
        }
    }

    contains(inMouseX, inMouseY)
    {
        return (dist(this.x, this.y, inMouseX, inMouseY) <= (this.diameter/2));
    }

    static romanize(num)
    {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                   "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
}
class JackSlots
{
    constructor(bombe=null, registers=[], commons=[], scramblers=[], inputJacks=[])
    {
        this.jacks = [];
        for(let i = 0; i < 26; i++)
        {
            this.jacks[i] = [];
        }

        this.placeRegistersJacks(bombe, registers);
        this.placeCommonsJacks(bombe, commons);
        this.placeScramblerJacks(bombe, scramblers);

        for(let i = 0; i < 4; i++)
        {
            this.jacks[i][7] = inputJacks[i];
            this.jacks[i][7].bombe = bombe;
        }

        this.placeJacksXY();
    }

    placeRegistersJacks(bombe, registers)
    {
        let registerAt = 0;
        for(let column = 0; column < 9; column += 3)
        {
            for(let row = 0; row < registers[registerAt].jacks.length; row++)
            {
                this.jacks[row][column] = registers[registerAt].jacks[row];
                this.jacks[row][column].bombe = bombe;
            }
            registerAt++;
        }
    }

    placeCommonsJacks(bombe, commons)
    {
        let row = 0;
        let column = 1;
        for(let i = 0; i < commons.length; i++)
        {
            if(i == 6)
            {
                row = 0;
                column += 3;
            }
            else if(i == 12)
            {
                row = 4;
                column += 3;
            }
            
            for(let j = 0; j < commons[i].jacks.length; j++)
            {
                this.jacks[row][column] = commons[i].jacks[j];
                this.jacks[row][column].bombe = bombe;
                row++;
            }
        }
    }

    placeScramblerJacks(bombe, scramblers)
    {
        let column = 2;
        for(let i = 0; i < scramblers.length; i++)
        {
            let row = 0;
            for(let j = 0; j < scramblers[i].length; j++)
            {
                this.jacks[row][column] = scramblers[i][j].jacks[0];
                this.jacks[row][column].bombe = bombe;
                row ++;
                this.jacks[row][column] = scramblers[i][j].jacks[1];
                this.jacks[row][column].bombe = bombe;
                row++;
            }
            column += 3;
        }
    }

    placeJacksXY()
    {
        for(let i = 0; i < this.jacks.length; i++)
        {
            let startY =  Bombe.frontTopLeftY + Bombe.height + Jack.height/2;
            for(let j = 0; j < 26; j++)
            {
                if(this.jacks[i][j])
                {
                    this.jacks[i][j].x = Bombe.frontTopLeftX + Jack.width/2 + j * Jack.width;
                    this.jacks[i][j].y = startY + i * Jack.height;
                }
            }
        }
    }

    draw()
    {
        for(let i = 0; i < this.jacks.length; i++)
        {
            for(let j = 0; j < this.jacks[i].length; j++)
            {
                if(this.jacks[i][j])
                    this.jacks[i][j].draw();
            }
        }
    }
}
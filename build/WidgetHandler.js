class WidgetHandler
{
    static init()
    {
        WidgetHandler.widgets = [];

        //object being dragged
        WidgetHandler.holding = null;
        WidgetHandler.holdingDistX;
        WidgetHandler.holdingDistY;

        WidgetHandler.holdingStartX;
        WidgetHandler.holdingStartY;
        //if drag happened
        WidgetHandler.isDragging = false;
    }

    static add(inObject)
    {
        //create static storage if doesn't exist
        if(!WidgetHandler.widgets)
        {
            WidgetHandler.init();
        }
        
        if(inObject instanceof Array)
        {
            WidgetHandler.widgets.push.apply(WidgetHandler.widgets, inObject);
        }
        else
        {
            WidgetHandler.widgets.push(inObject);
        }
    }

    static remove(inObject)
    {

    }

    static toString()
    {
        let string = 'length: '+WidgetHandler.widgets.length+'\n';

        for(let i = WidgetHandler.widgets.length-1; i > -1; i--)
        {
            for (var field in WidgetHandler.widgets[i])
            {
                string += field + '=' + WidgetHandler.widgets[i][field] + ', ';
            }
            
            string += '\n\n';
        }
        
        return string;
    }

    //find widget with mouse coordinate
    static findByMouse(inMouseX, inMouseY)
    {

        let found = null;
        for(let i = WidgetHandler.widgets.length-1; i > -1; i--)
        {
            let obj = WidgetHandler.widgets[i];

            if(typeof obj.contains === "function")
            {
                if(obj.contains(inMouseX, inMouseY))
                {
                    found = obj;
                    i = -1;
                }
            }
            else
            {
                //check default bound
                if(WidgetHandler.contains(obj))
                {
                    found = obj;
                    i = -1;
                }
            }
        }

        return found;
    }

    static contains(obj, inMouseX, inMouseY)
    {
        return (obj.topLeftX <= inMouseX && inMouseX <= obj.topLeftX + obj.width &&
            obj.topLeftY <= inMouseY && inMouseY <= obj.topLeftY + obj.height
            );
    }

    static mouseMoved()
    {
        /*
        for(let i = WidgetHandler.widgets.length-1; i > -1; i--)
        {
            if(typeof WidgetHandler.widgets[i].mouseMoved === "function")
            {
                WidgetHandler.widgets[i].mouseMoved();
            }
        }*/
        let foundObject = WidgetHandler.findByMouse(mouseX, mouseY);
        if(foundObject)
        {
            if(typeof foundObject.mouseMoved === "function")
            {
                foundObject.mouseMoved();
            }
        }
    }

    static mousePressed()
    {
        let foundObject = WidgetHandler.findByMouse(mouseX, mouseY);
        if(foundObject)
        {
            //disable scrolling
            document.ontouchmove = function(e){e.preventDefault();}

            if(typeof foundObject.mousePressed === "function")
            {
                foundObject.mousePressed();
            }

            //hold the found object
            WidgetHandler.holding = foundObject;

            //set the distance between object and mouse
            WidgetHandler.holdingDistX = WidgetHandler.holding.x - mouseX;
            WidgetHandler.holdingDistY = WidgetHandler.holding.y - mouseY;

            WidgetHandler.holdingStartX = mouseX;
            WidgetHandler.holdingStartY = mouseY;

            WidgetHandler.isDragging = false;

            WidgetHandler.moveWidgetToTop();
        }
    }

    static mouseDragged()
    {
        if(WidgetHandler.holding)
        {
            if(typeof WidgetHandler.holding.mouseDragged === "function")
            {
                WidgetHandler.holding.mouseDragged();
            }

            WidgetHandler.limitHoldingInCanvas();

            //if has moved then is dragging
            if(!(WidgetHandler.holdingStartX == mouseX && WidgetHandler.holdingStartY == mouseY))
            {
                WidgetHandler.isDragging = true;
                //WidgetHandler.moveWidgetToTop();
            }
        }
    }

    static limitHoldingInCanvas()
    {
        //Code to prevent objects from leaving the canvas boundary
        WidgetHandler.holding.x = mouseX + WidgetHandler.holdingDistX;
        WidgetHandler.holding.y = mouseY + WidgetHandler.holdingDistY;

        let halfWidth = WidgetHandler.holding.width/2;
        let halfHeight = WidgetHandler.holding.height/2;

        WidgetHandler.holding.x = constrain(WidgetHandler.holding.x, halfWidth, width - halfWidth);
        WidgetHandler.holding.y = constrain(WidgetHandler.holding.y, halfHeight, height - halfHeight);
    }

    static mouseReleased()
    {
        if(WidgetHandler.holding)
        {
            //enable scrolling
            document.ontouchmove = function(e){return true;}

            if(typeof WidgetHandler.holding.mouseReleased === "function")
            {
                WidgetHandler.holding.mouseReleased();
            }

            //drop the holding object
            WidgetHandler.holding = null;
        }
    } 

    static moveWidgetToTop()
    {
        let widgets = WidgetHandler.widgets;

        if(WidgetHandler.holding != null)
        {
            //if object is not on top of stack ...which is last element of data structure
            if(WidgetHandler.holding !== widgets[widgets.length-1])
            {
                //move object to top of stack by:

                //find the object in stack
                let foundIndex = WidgetHandler.findByWidget(WidgetHandler.holding);

                //remove from widgets the current position into a variable then
                //add to last position of widgets
                widgets.push(widgets.splice(foundIndex, 1)[0]);
            }
        }
    }

    static moveWidgetToBottom()
    {
        let widgets = WidgetHandler.widgets;

        if(WidgetHandler.holding != null)
        {
            //if object is not on bottom of stack
            if(WidgetHandler.holding !== widgets[0])
            {
                //move object to bottom of stack by:

                //find the object in stack
                let foundIndex = WidgetHandler.findByWidget(WidgetHandler.holding);

                //remove widget
                let widget = widgets.splice(foundIndex, 1)[0];

                //plant it into bottom of stack which is 1st element, index 0
                widgets.splice(0, 0, widget);
            }
        }
    }

    static findByWidget(inWidget)
    {
        let found;

        let widgets = WidgetHandler.widgets;
        for(let i = 0; i < widgets.length; i++)
        {
            if(widgets[i] === inWidget)
            {
                found = i;
                i = widgets.length;
            }
        }

        return found;
    }


    //deal with draw stack
    //so the way Scratch works is which ever sprite being dragged is rendered on top
    //must actually be dragged, clicking without any dragging will not move it to the top
    static draw()
    {
        let widgets = WidgetHandler.widgets;
        for(let i = 0; i < widgets.length; i++)
        {
            if(typeof widgets[i].draw === "function")
            {
                widgets[i].draw();
            }
        }
    }
}
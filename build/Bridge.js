//AKA: Cross And Connect Unit
class Bridge extends Link
{
    constructor()
    {
        super();
        this.jacks[1] = new Jack("Middle Jack");
    }
}
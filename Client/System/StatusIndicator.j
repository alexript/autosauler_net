@implementation StatusIndicator : CPObject
{
    CPString iconnum;
    CPMutableArray initobservers;
    CPMutableArray removeobservers;
    CPMutableArray bageobservers;
    CPMutableArray clickobservers;
}

-(id)initWithIco:(CPString) iconum
{
    self = [super init];
    iconnum = iconum;
    initobservers = [[CPMutableArray alloc] init];
    removeobservers = [[CPMutableArray alloc] init];
    bageobservers = [[CPMutableArray alloc] init];
    clickobservers = [[CPMutableArray alloc] init];
    return self;
}

-(CPString)icon
{
    return iconnum;
}

-(void)removeObservers
{
    [initobservers removeAllObjects];
    [removeobservers removeAllObjects];
    [bageobservers removeAllObjects];
    [clickobservers removeAllObjects];
}

-(void)addInitObserver:(id)obs
{
    [initobservers addObject:obs];
}

-(void)addRemoveObserver:(id)obs
{
    [removeobservers addObject:obs];
}

-(void)addBageObserver:(id)obs
{
    [bageobservers addObject:obs];
}

-(void)addClickObserver:(id)obs
{
    [clickobservers addObject:obs];
}

-(void)callInitObservers:(CPString)iname
{
    var count = initobservers.length;
    while(count--) {
        [initobservers[count] initInformer:iname];
    }
}

-(void)callRemoveObservers:(CPString)iname
{
    var count = removeobservers.length;
    while(count--) {
        [removeobservers[count] removeInformer:iname];
    }

}

-(void)callBageObservers:(CPString)iname
{
    var count = bageobservers.length;
    while(count--) {
        [bageobservers[count] bageInformer:iname];
    }
}

-(void)callClickObservers:(CPString)iname
{
    var count = clickobservers.length;
    while(count--) {
        [clickobservers[count] clickInformer:iname];
    }
}

@end

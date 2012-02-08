@implementation IndicatorIco : CPImageView
{
    StatusIndicator indicator;
    CPString iname;
}

-(id)initWithFrame:(CGRect)rect forName:(CPString)name
{
    self = [super initWithFrame:rect];
    iname = name;
    CPLog.trace("create ico for " + iname);
    return self;
}

-(void)attachIndicator:(StatusIndicator)ind
{
    indicator = ind;
}

- (void)mouseDown:(CPEvent)anEvent 
{
    CPLog.trace("Click on " + iname + " " + self);
    [indicator callClickObservers:iname];
}

@end

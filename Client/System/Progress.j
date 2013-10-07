@class MainWindow
@global MainFrame
@implementation Progress : CPObject
{
    short _statecounter;
    CPWindow _win;
}

- (id) init
{
    [super init];
    _statecounter = 0;
    _win = nil;
    CPLog.debug("progress inited " + _statecounter);
    return self;
}

- (void) show
{
    CPLog.debug("State counter before show: " + _statecounter);
    _statecounter = _statecounter + 1;
    if(_statecounter == 1) {
        // show window
        [self showProgress];
    }
    CPLog.debug("State counter after show: " + _statecounter);
}

- (void) close
{
    _statecounter = _statecounter - 1;
    if(_statecounter <= 0) {
        _statecounter = 0;
        // close window
        [self closeProgress];
    }
}


// private methods
- (void)showProgress
{
    CPLog.trace("request for show progress");
    document.body.style.cursor = "wait";
    if(!_win) {
        CPLog.trace("show progress");
        var msg = [[CPTextField alloc] initWithFrame:CGRectMake(20, 0, 0, 0)];
        var txt = [MainFrame CPLocalizeString:@"Receive data..."];

        [msg setStringValue:txt];
        [msg setFont:[CPFont boldSystemFontOfSize:16]];
        [msg setTextColor:[CPColor whiteColor]];  
        [msg setTextShadowColor:[CPColor grayColor]];
        [msg setTextShadowOffset:CGSizeMake(1, 1)];
        [msg sizeToFit];

        _win = [[CPWindow alloc] initWithContentRect:CGRectMake(0, 0, CGRectGetWidth([msg bounds]) + 40, CGRectGetHeight([msg bounds]) + 20 ) styleMask:CPHUDBackgroundWindowMask];

        var contentView = [_win contentView];
        [contentView addSubview:msg];

        var size = [_win frame].size;
        var containerSize = [CPPlatform isBrowser] ? [[_win platformWindow] contentBounds].size : [[_win screen] visibleFrame].size;
        
        [_win setFrameOrigin:CGPointMake((containerSize.width - size.width - 50), (containerSize.height - size.height - 50))];
        
        [_win orderFront:contentView];
        [_win setAutoresizingMask:CPViewMinXMargin | CPViewMinYMargin];

    } 
}


-(void)closeProgress
{
    CPLog.trace("request for close progress");
    if(_win) {
        CPLog.trace("close progress");
        [_win orderOut:nil];
        CPLog.trace("close progress2");
        _win = nil;
        
    }
    document.body.style.cursor = "default";    

}

@end

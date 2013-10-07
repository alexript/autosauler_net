@import "StatusIndicator.j"
@import "IndicatorIco.j"

@import <AppKit/CPTextField.j>

@global MainFrame

@implementation StatusLabel : CPTextField
{
    CPMutableArray stack;
    CPString currentstring;
    int copystartyear;
    int rightoffset;
    CPDictionary indicators;
    CPDictionary indicatoricons;
}

+(id)initWithFrame:(CGRect)rect
{
    var w = [[super alloc] initWithFrame:rect];
    [w setup];
    return w;
}

-(void) setup
{
    indicators = [[CPDictionary alloc] init];
    indicatoricons = [[CPDictionary alloc] init];
    currentstring = nil;
    copystartyear = 2012;
    rightoffset = 16;
    [self setBezeled:YES];
    [self setBezelStyle:CPTextFieldRoundedBezel];
    [self setFont:[CPFont boldSystemFontOfSize:12]];
    [self setTextColor:[CPColor blackColor]];  
    [self setTextShadowColor:[CPColor grayColor]];
    [self setBackgroundColor:[CPColor colorWithRed:213.0/255.0 green:221.0/255.0 blue:230.0/255.0 alpha:1.0]];    
    [self setTextShadowOffset:CGSizeMake(0, 1)];
    
    [self setAutoresizingMask:CPViewMinYMargin|CPViewWidthSizable];
    
    [self clean];
}

-(void) setIndicatorBage:(CPString)iname
{
    if([indicators containsKey:iname]) {
        var ico = [indicatoricons objectForKey:iname];
        var bounds = [ico bounds];
        var w = CGRectGetWidth(bounds);
        var h = CGRectGetHeight(bounds);
        var l = [[CPTextField alloc] initWithFrame:CGRectMake(w-8, 0, 8, 8)];
        [l setBackgroundColor:[CPColor colorWithRed:213.0/255.0 green:0.0/255.0 blue:0.0/255.0 alpha:1.0]];        
        [ico addSubview:l];
        var indicator = [indicators objectForKey:iname];
        [indicator callBageObservers:iname];
    }
}

-(void) dropIndicatorBage:(CPString)iname
{
    if([indicators containsKey:iname]) {
        var ico = [indicatoricons objectForKey:iname];
        var view = [ico subviews];
        var count = view ? view.length : 0;
        while(count--) {
            var v = view[count];
            [v removeFromSuperview];
        }
    }
}

-(void) addIndicator:(StatusIndicator)indicator forName:(CPString)iname
{
    var ico = [self addIcon:[indicator icon] forName:iname];
    [ico attachIndicator:indicator];
    [indicators setValue:indicator forKey:iname];
    [indicatoricons setValue:ico forKey:iname];
    [indicator callInitObservers:iname];
} 

-(void) removeIndicator:(CPString)iname
{
    if([indicators containsKey:iname]) {
        var views = [indicatoricons allValues];
        var count = views ? views.length : 0;
        while(count--) {
            var view = views[count];
            [view removeFromSuperview];
        }
        [indicatoricons removeAllObjects];
        rightoffset = 16;
        var indicator = [indicators objectForKey:iname];
        [indicators removeObjectForKey:iname];
        
        var inds = [indicators allKeys];
        count = inds ? inds.length : 0;
        while(count--) {
            var ico = [self addIcon:[[indicators objectForKey:inds[count]] icon] forName:inds[count]];
            [ico attachIndicator:[indicators objectForKey:inds[count]]];
            [indicatoricons setValue:ico forKey:inds[count]];
        }
        [indicator callRemoveObservers:iname];
        [indicator removeObservers];
    }
}

-(IndicatorIco) addIcon:(CPString)iconum forName:(CPString)iname
{
    var maxheight = 16;
    var bounds = [self bounds];
    var testicon = [MainFrame icon:iconum];
    var icosize = [testicon size];

    var icoheight = icosize.height;
    var icowidth = icosize.width;
    if(icoheight>maxheight) {
        icowidth = maxheight * icowidth/icoheight;
        icoheight = maxheight;
    }

    var testiv = [[IndicatorIco alloc] initWithFrame:CGRectMake(CGRectGetWidth(bounds) -rightoffset -icowidth , (CGRectGetHeight(bounds) -icoheight)/2 +1 , (icowidth-0), (icoheight-0)) forName:iname];
    [testiv setImage:testicon];
    [testiv setAutoresizingMask:CPViewMinYMargin|CPViewMinXMargin];
    [self addSubview:testiv];
    rightoffset = rightoffset + (icowidth-0) + 2;
    return testiv;
}

-(CPString) getCopyYears
{
    var now = new Date().getFullYear();
    if(now>copystartyear) {
        return  @"" + copystartyear + @"-" + now;
    }
    return copystartyear;
}

-(void) set:(CPString)text
{
    if([text length] > 0) {
        [self push:text];
    } else {
        [self clean];
    }
}

-(void) push:(CPString)text
{
    if([text length] > 0) {
        var msg = [MainFrame CPLocalizeString:text];
        if(currentstring) {
            stack.push(currentstring);
        }
        [self setStringValue:msg];
        currentstring = msg
    }
}

-(void) pop
{
    if(stack.length<=0) {
        [self clean];
    } else {
        var msg = stack.pop();
        [self setStringValue:msg];
        currentstring = msg;
    }
}

-(void) clean
{
    currentstring = nil;
    stack = [];
    [self setStringValue:[MainFrame CPLocalizeKey:@"DefaultStatus"] + @" " + [self getCopyYears]];
}

@end

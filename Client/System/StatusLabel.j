@import <AppKit/CPImageView.j>
@implementation StatusLabel : CPTextField
{
    CPMutableArray stack;
    CPString currentstring;
    int copystartyear;
    int rightoffset;
}

+(id)initWithFrame:(CGRect)rect
{
    var w = [[super alloc] initWithFrame:rect];
    [w setup];
    return w;
}

-(void) setup
{
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


    // add ico with badge ----
    // var ico = [self addIcon:@"185"];
    // var bounds = [ico bounds];
    // var w = CGRectGetWidth(bounds);
    // var h = CGRectGetHeight(bounds);
    // var l = [[CPTextField alloc] initWithFrame:CGRectMake(w/2, 0, w/2, h/2)];
    // [l setBackgroundColor:[CPColor colorWithRed:213.0/255.0 green:0.0/255.0 blue:0.0/255.0 alpha:1.0]];        
    // [ico addSubview:l];
    // -----------------------

    //[self addIcon:@"186"];
    //[self addIcon:@"185"];
}
 

-(CPImageView) addIcon:(CPString) iconum
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

    var testiv = [[CPImageView alloc] initWithFrame:CGRectMake(CGRectGetWidth(bounds) -rightoffset -icowidth , (CGRectGetHeight(bounds) -icoheight)/2 +1 , icowidth, icoheight)];
    [testiv setImage:testicon];
    [testiv setAutoresizingMask:CPViewMinYMargin|CPViewMinXMargin];
    [self addSubview:testiv];
    rightoffset = rightoffset + icowidth + 2;
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

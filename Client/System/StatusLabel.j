@implementation StatusLabel : CPTextField
{
    CPMutableArray stack;
    CPString currentstring;
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
    [self setStringValue:[MainFrame CPLocalizeKey:@"DefaultStatus"]];
}

@end
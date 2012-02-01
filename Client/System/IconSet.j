@import "IniFile.j"

@implementation IconSet : IniFile
{
}

-(id) init
{
    self = [super initWithFile:@"Icons" withNotification:@"IconsLoaded"];
    CPLog.debug("icons go");
    return self;
}

-(CPString) ref:(CPString)iconum
{
    var filename = [self get:iconum default:@"icons/97-puzzle"];
    var link = @"Resources/" + filename;
    return link;
}

@end

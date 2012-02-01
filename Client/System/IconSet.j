@import "IniFile.j"
@import <Foundation/CPDictionary.j>

@implementation IconSet : IniFile
{
    CPDictionary cache;
}

-(id) init
{
    self = [super initWithFile:@"Icons" withNotification:@"IconsLoaded"];
    cache = [CPDictionary dictionary];
    CPLog.debug("icons go");
    return self;
}

-(CPString) ref:(CPString)iconum
{
    var filename = [self get:iconum default:@"icons/97-puzzle.png"];
    var link = @"Resources/" + filename;
    return link;
}

-(CPImage) get:(CPString)iconum size:(CPSize)imgsize
{
    var link = [self ref:iconum];
    var image = [[CPImage alloc] initWithContentsOfFile:link size:imgsize];
    return image;
}

-(CPImage) get:(CPString)iconum
{
    var image = nil;
    if([cache containsKey:iconum]) {
        CPLog.trace("Ico from cache: " + iconum);
        image = [cache objectForKey:iconum];
    } else {
        CPLog.trace("Load file for icon " + iconum);
        var link = [self ref:iconum];
        image = [[CPImage alloc] initWithContentsOfFile:link];
        [cache setObject:image forKey:iconum];
    }

    if(!image) {
        CPLog.error("Error for icon " + iconum + ". Use default.");
        image = [[CPImage alloc] initWithContentsOfFile:@"Resources/icons/97-puzzle.png"];
    }

    return image;
}

@end

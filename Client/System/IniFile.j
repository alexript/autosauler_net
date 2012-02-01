@import <Foundation/CPObject.j>
@import <Foundation/CPDictionary.j>

@import <Foundation/CPString.j>
@import <Foundation/CPURLRequest.j>
@import <Foundation/CPURLConnection.j>


@implementation IniFile : CPObject
{
    CPDictionary values;
    CPString notificationname;
}

- (id) init
{
    self = [super init];
    values = [[CPDictionary alloc] init];
    notificationname = @"ConfigLoaded";
    return self;
}

- (id) initWithNotification:(CPString) notifname
{
    self = [super init];
    values = [[CPDictionary alloc] init];
    notificationname = notifname;
    return self;
}


- (id) initWithFile:(CPString)filename
{
    self = [super init];
    notificationname = @"ConfigLoaded";
    [self loadFile:filename];
    return self;
}

- (id) initWithFile:(CPString)filename withNotification:(CPString) notifname
{
    self = [super init];
    notificationname = notifname;
    [self loadFile:filename];
    return self;
}


- (void) loadFile:(CPString)filename
{
    values = [[CPDictionary alloc] init];
    var _filename = "Resources/" + filename + @".ini";
    CPLog.debug(_filename);
    var request = [CPURLRequest requestWithURL:_filename];
    var connection = [CPURLConnection connectionWithRequest:request delegate:self];

}

- (void)connection:(CPURLConnection) aConnection didReceiveData:(CPString)data
{
    //This method is called when a connection receives a response. in a
    //multi-part request, this method will (eventually) be called multiple times,
    //once for each part in the response.

    var strings = [data componentsSeparatedByString:@"\n"];
    var total = [strings count];

    var str = "";
    for(var i=0; i<total; i++) {
        str = [strings objectAtIndex:i];

        var str2 = str.replace("/&nbsp;/g" ," ");
        str = str2.replace("/(^\s+)|(\s+$)/g", "");

        if([str length]>0) {
            var pair = [str componentsSeparatedByString:@"="];
            var key = [pair objectAtIndex:0];
            var value = [pair objectAtIndex:1];
            [values setValue:value forKey:key];
        }
    }
    [self clearConnection:aConnection];
}


- (void)connection:(CPURLConnection)aConnection didFailWithError:(CPString)error
{
    //This method is called if the request fails for any reason.
    //alert(error + @"ERROR!!!!=================");
    alert(error);

    [self clearConnection:aConnection];
}

-(void)connectionDidFinishLoading:(CPURLConnection)aConnection
{
    [self clearConnection:aConnection];
}

- (void)clearConnection:(CPURLConnection)aConnection
{
    //we no longer need to hold on to a reference to this connection

    aConnection = nil;

    var defaultCenter = [CPNotificationCenter defaultCenter];
    [defaultCenter postNotificationName:notificationname object:self];

}

- (CPString) get:(CPString)key default:(CPString) defval
{
    var val = [values valueForKey:key];
    if(val == NULL) {
        val = defval;
    }
    return val;
}

- (CPArray) getArray:(CPString)key
{
    var arr = NULL;
    var str = [self get:key default:NULL];
    if(str != NULL)
    {
        arr = [str componentsSeparatedByString:@":"];
    }
    return arr;
}

@end
//alert('CPIniFile.j');

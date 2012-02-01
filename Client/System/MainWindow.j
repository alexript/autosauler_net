@import "IniFile.j"
@import "LocalizedString.j"
@import "Progress.j"

MainFrame = nil; // Static variable for AppController instance


@implementation MainWindow : CPObject
{
    IniFile	langconfig;
    LocalizedStringsArray LSA;
    CPWindow mainwindow;
    Progress progresswindow; 
}

-(void) init 
{
    [super init];

    MainFrame = self;

    LSA = nil;
    mainwindow = nil;

    progresswindow = [[Progress alloc] init];
    [progresswindow show];



    langconfig = [[IniFile alloc] init];

    [[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterConfigLoad:) name:"ConfigLoaded" object:langconfig];
    [[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterLocaleLoad:) name:"LocaleLoaded" object:nil];
    
    [langconfig loadFile:@"Languages"];


    return self;

}

-(CPString)CPLocalizeString:(CPString)val {
    if(!LSA) {
        return val;
    }
    return [LSA get:val];
}


- (void) afterConfigLoad:(CPNotification)aNotification
{
    CPLog.debug(@"Config loaded");
    var defaultCenter = [CPNotificationCenter defaultCenter];
    [defaultCenter removeObserver:self name:@"ConfigLoaded" object:langconfig];
    var defaultlocale = [langconfig get:@"Default" default:@"English"];
    CPLog.debug(defaultlocale);
    LSA = [[LocalizedStringsArray alloc] initForLocale:defaultlocale];
    [LSA attachConfig:langconfig];
}

- (void) afterLocaleLoad:(CPNotification)aNotification
{
    CPLog.debug(@"Locale loaded");	
    var defaultCenter = [CPNotificationCenter defaultCenter];
    [defaultCenter removeObserver:self name:@"LocaleLoaded" object:nil];

    [self buildMainFrame];


    [self isLoggedIn];
}

- (void) isLoggedIn
{
    // start logic loop
    //    [self makeRequest:@"r=isloggedid"];
}

- (void) buildMainFrame
{
    [progresswindow close]; // system initialisation complete

    if(!mainwindow) {
        mainwindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
        //        contentView = [mainwindow contentView];
        //        bounds = [contentView bounds];
        var appname = [LSA getForKey:@"ApplicationName"];
        document.title = appname;
        CPLog.debug(@"mainwindow created " + appname);
    }
}

-(Progress) progress
{
    return progresswindow;
}

@end

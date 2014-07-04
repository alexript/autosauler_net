@import "IniFile.j"
@import "LocalizedString.j"
@import "Progress.j"
@import "StatusLabel.j"
@import "IconSet.j"
@import "StatusIndicator.j"

MainFrame = nil; // Static variable for AppController instance


@implementation MainWindow : CPObject
{
	IniFile	langconfig;
	LocalizedStringsArray LSA;
	CPWindow mainwindow;
	Progress progresswindow; 
	StatusLabel status;
	IconSet icons;
}

-(id) init 
{
	[super init];

	MainFrame = self;
	LSA = nil;
	mainwindow = nil;
	status = nil;
	progresswindow = [[Progress alloc] init];
	[progresswindow show];

	[[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterIconsLoad:) name:"IconsLoaded" object:nil];
	icons = [[IconSet alloc] init];
	langconfig = [[IniFile alloc] init];

	[[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterConfigLoad:) name:"ConfigLoaded" object:langconfig];
	[[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterLocaleLoad:) name:"LocaleLoaded" object:nil];

	return self;

}

-(CPString)CPLocalizeString:(CPString)val {
	if(!LSA) {
		return val;
	}
	return [LSA get:val];
}

-(CPString)CPLocalizeKey:(CPString)val {
	if(!LSA) {
		return val;
	}
	return [LSA getForKey:val];
}

- (void) afterIconsLoad:(CPNotification)aNotification
{
	CPLog.debug(@"Icons loaded");
	var defaultCenter = [CPNotificationCenter defaultCenter];
	[defaultCenter removeObserver:self name:@"IconsLoaded" object:nil];
	[langconfig loadFile:@"Languages"];
}

-(CPIcon) icon:(CPString)iconum
{
	return [icons get:iconum];
}

-(CPIcon) icon:(CPString)iconum size:(CPSize)imgsize
{
	return [icons get:iconum size:imgsize];
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

// indicator tests
/*
-(void)clickInformer:(CPString)iname
{
if(iname=="eye") {
[status dropIndicatorBage:iname];
[status setIndicatorBage:@"target"];
}
}

-(void)bageInformer:(CPString)iname
{
CPLog.trace("Bage on " + iname);
}

-(void)initInformer:(CPString)iname
{
CPLog.trace("init informer " + iname);
}
*/

- (void) isLoggedIn
{
	// indicator tests
/*	
	var indicator = [[StatusIndicator alloc] initWithIco:@"11"]; // clock indicator
	[indicator addClickObserver:self];
	[indicator addBageObserver:self];
	[indicator addInitObserver:self];
	[status addIndicator:indicator forName:@"clock"];

indicator = [[StatusIndicator alloc] initWithIco:@"12"]; // eye indicator
[indicator addClickObserver:self];
[indicator addBageObserver:self];
[indicator addInitObserver:self];
[status addIndicator:indicator forName:@"eye"];

indicator = [[StatusIndicator alloc] initWithIco:@"13"]; // eye indicator
[indicator addClickObserver:self];
[indicator addBageObserver:self];
[indicator addInitObserver:self];
[status addIndicator:indicator forName:@"target"];

[status setIndicatorBage:@"clock"];
[status setIndicatorBage:@"eye"];
[status dropIndicatorBage:@"clock"];
  */

// start logic loop
//    [self makeRequest:@"r=isloggedid"];

}

- (void) buildMainFrame
{
	[progresswindow close]; // system initialisation complete

	if(!mainwindow) {
		mainwindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
		var contentView = [mainwindow contentView];
		var bounds = [contentView bounds];

		var appname = [LSA getForKey:@"ApplicationName"];
		document.title = appname;
		CPLog.debug(@"mainwindow created " + appname);

		status = [StatusLabel initWithFrame:CGRectMake(0, CGRectGetHeight(bounds) - 29, CGRectGetWidth(bounds), 29)];
		[contentView addSubview:status];

		[mainwindow orderFront:self];
	}
}

-(CPWindow) window
{
	return mainwindow;
}

-(Progress) progress
{
	return progresswindow;
}

-(void) setState:(CPString) text
{
	if(status) {
		[status push:text];
	}
}

-(void) cleanState
{
	if(status) {
		[status pop];
	}
}
@end

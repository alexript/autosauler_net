/*
 * AppController.j
 * NewApplication
 *
 * Created by You on November 16, 2011.
 * Copyright 2011, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>
@import "System/IniFile.j"
@import "System/LocalizedString.j"
@import "System/Progress.j"

MainWindow = nil; // Static variable for AppController instance

@implementation AppController : CPObject
{
    IniFile	langconfig;
    LocalizedStringsArray LSA;
    CPWindow mainwindow;
    Progress progresswindow; 
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    LSA = nil;
    mainwindow = nil;
    MainWindow = self;

    progresswindow = [[Progress alloc] init];
    [progresswindow show];



    langconfig = [[IniFile alloc] init];

    [[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterConfigLoad:) name:"ConfigLoaded" object:langconfig];
    [[CPNotificationCenter defaultCenter] addObserver:self selector:@selector(afterLocaleLoad:) name:"LocaleLoaded" object:nil];
    
    [langconfig loadFile:@"Languages"];

    [self buildMainFrame];

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
}

- (void) afterLocaleLoad:(CPNotification)aNotification
{
    CPLog.debug(@"Locale loaded");	
    var defaultCenter = [CPNotificationCenter defaultCenter];
    [defaultCenter removeObserver:self name:@"LocaleLoaded" object:nil];

    [self isLoggedIn];
}

- (void) isLoggedIn
{
    //    [self makeRequest:@"r=isloggedid"];
}

- (void) buildMainFrame
{
    [progresswindow close]; // system initialisation complete

    if(!mainwindow) {
        mainwindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
        //        contentView = [mainwindow contentView];
        //        bounds = [contentView bounds];

        CPLog.debug(@"mainwindow created");
    }
}

-(Progress) progress
{
    return progresswindow;
}



@end

//
//  CPLocalizedString.j
//  myday.spb.ru interface
//
//  Created by Александр Малышев on 27.01.09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

@import <Foundation/CPObject.j>

@import <Foundation/CPDictionary.j>
@import <Foundation/CPString.j>
@import <Foundation/CPURLRequest.j>
@import <Foundation/CPURLConnection.j>

function TrimString(sInString){
    var str = sInString.replace("/&nbsp;/g" ," ");
    str = str.replace("/(^\s+)|(\s+$)/g", "");
    return str;
}

@implementation LocalizedStringsArray : CPObject
{
    IniFile	configfile;

    CPDictionary _strings;
    CPString _currentlocale;
}

- (id) init
{
	self = [super init];
	_currentlocale = @"C";
	_strings = [[CPDictionary alloc] init];
	configfile = nil;
        return self;
}

- (void) attachConfig: (IniFile) conf
{
    configfile = conf;
}

- (id) initForLocale: (CPString) aLocale
{
	self = [super init];
	[self selectLocale: aLocale];
        configfile = nil;
	return self;
}

- (CPString) locale
{
	return _currentlocale;
}

- (void) selectLocale: (CPString) aLocale
{
	_strings = [[CPDictionary alloc] init];
	if(_currentlocale== null || [_currentlocale compare:aLocale]) {
		_currentlocale = aLocale;

		var _filename = "Resources/" + aLocale + @".strings";
		var request = [CPURLRequest requestWithURL:_filename];
		var connection = [CPURLConnection connectionWithRequest:request delegate:self];
	}
}


- (void)connection:(CPURLConnection) aConnection didReceiveData:(CPString)data
{
	//TODO: implement Apple .strings format support
	//This method is called when a connection receives a response. in a
	//multi-part request, this method will (eventually) be called multiple times,
	//once for each part in the response.

	var strings = [data componentsSeparatedByString:@"\n"];
	var total = [strings count];

	var str = "";

	//TODO: add comments support

	for(var i=0; i<total; i++) {
		str = TrimString([strings objectAtIndex:i]);
		if([str length]>0) {
			var pair = [str componentsSeparatedByString:@"="];

			//TODO: add correct drop for "
			var key = TrimString([pair objectAtIndex:0]);
			var value = TrimString([pair objectAtIndex:1]);
			CPLog.debug("setValue:" + value + " forKey:" + key);
			[_strings setValue:value forKey:key];
		}
	}

	[self clearConnection:aConnection];
}

- (void)connection:(CPURLConnection)aConnection didFailWithError:(CPString)error
{
	//This method is called if the request fails for any reason.
	//alert(error + @"ERROR!!!!=================");

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
	[defaultCenter postNotificationName:@"LocaleLoaded" object:self];
}


- (CPString) get: (CPString)aKeyString
{
	CPLog.debug("Search locale for: " + aKeyString);
	var val = [_strings valueForKey:aKeyString];

	if(val == NULL) {
		CPLog.error("Not found");
		val = aKeyString;
	}
	return val;

}

-(CPString) getForKey:(CPString) keyname
{
    if(!configfile) {
        return [self get:keyname];
    }

    var inivalue = [configfile get:keyname default:keyname];
    return [self get:inivalue];

}

@end
//alert('CPLocalizedString');

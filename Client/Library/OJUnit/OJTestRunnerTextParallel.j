@import "OJTestRunnerText.j"

@implementation OJTestRunnerTextParallel : OJTestRunnerText
{
    CPArray         threadPool;
}

- (id)init
{
    self = [super init];
    if (self)
    {
        threadPool = [
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self],
            [[OJThread alloc] initWithDelegate:self]
        ];
    }
    return self;
}

- (void)startWithArguments:(CPArray)args
{
    while (args.length !== 0)
    {
        while ([self threadsAvailable])
        {
            if (args.length === 0)
                break;

            var testCaseFile = [self nextTest:args];

            if (!testCaseFile || testCaseFile == "")
                break;

            var matches = testCaseFile.match(/([^\/]+)\.j$/);

            if (matches)
            {
                system.stderr.write(matches[1]).flush();
                var testCaseClass = matches[1];

                [self beforeRequire];
                require(testCaseFile);
                var suite = [self getTest:testCaseClass];

                var runTestFunction = function() {
                    [self run:suite];
                };

                var thread = [self firstAvailableThread];
                [thread setStartFunction:runTestFunction];
                [thread start];
            }
            else
                system.stderr.write("Skipping " + testCaseFile + ": not an Objective-J source file.\n").flush();
        }
    }

    [self report];
}

- (BOOL)threadsAvailable
{
    for (var i = 0, n = threadPool.length; i < n; i++)
        if (![threadPool[i] isRunning])
            return YES;

    return NO;
}

- (OJThread)firstAvailableThread
{
    for (var i = 0, n = threadPool.length; i < n; i++)
        if (![threadPool[i] isRunning])
            return threadPool[i];

    return nil;
}

- (void)threadFinished:(OJThread)aThread
{
}

- (BOOL)threadsDone
{
    for (var i = 0, n = threadPool.length; i < n; i++)
        if ([threadPool[i] isRunning])
            return NO;

    return YES;
}

- (void)report
{
    var startTime = new Date();
    while (![self threadsDone])
    {
        if ([self hasWaited:60 since:startTime])
        {
            system.print("Test timed out!");
            break;
        }
    }

    [super report];
}

- (BOOL)hasWaited:(CPNumber)seconds since:(CPDate)startTime
{
    return seconds < [[CPDate date] timeIntervalSinceDate:startTime];
}

@end

@global java;

@implementation OJThread : CPObject
{
    BOOL        isRunning       @accessors(readonly);
    Function    startFunction   @accessors;
    id          delegate;
}

- (id)initWithDelegate:(id)aDelegate
{
    self = [super init];
    if (self)
    {
        isRunning = NO;
        startFunction = function(){};
        delegate = aDelegate;
    }
    return self;
}

- (void)start
{
    isRunning = true;
    var ojThread = self,
        thread = new java.lang.Thread(function()
            {
                startFunction();
                [delegate threadFinished:ojThread];
                isRunning = false;
            });
    thread.start();
}

@end

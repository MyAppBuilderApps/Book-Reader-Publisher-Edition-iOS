//
//  ScreenBrightness.m
//  BrightNessTest
//
//  Created by Nua Trans Media on 03/01/14.
//  Copyright (c) 2014 Nua Trans Media. All rights reserved.
//

#import "ScreenBrightness.h"

@implementation ScreenBrightness

-(void)SetScreenBrightness:(NSMutableArray *)arguments withDict:(NSMutableArray *) options {

    //NSLog(@"the values are:%@",options);
    NSString *value = [options valueForKey:@"number"];
    @try
    {
        [[UIScreen mainScreen] setBrightness:[value floatValue]];
        NSLog(@"Brightness change:%@",value);
    }
    @catch (NSException *exception)
    {
        NSLog(@"Error In Brightness Change");
    }
    @finally
    {
        NSLog(@"Brightness Changed");
    }
    
    
}
@end

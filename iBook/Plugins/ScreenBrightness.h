//
//  ScreenBrightness.h
//  BrightNessTest
//
//  Created by Nua Trans Media on 03/01/14.
//  Copyright (c) 2014 Nua Trans Media. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>

@interface ScreenBrightness : CDVPlugin
{
    
}
-(void)SetScreenBrightness:(NSMutableArray *)arguments withDict:(NSMutableArray *) options;
-(void)getbrigthness:(NSUInteger)value;
@end

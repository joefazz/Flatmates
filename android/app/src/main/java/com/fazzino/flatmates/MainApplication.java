package com.fazzino.flatmates;

import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.dooboolab.RNIap.RNIapPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.auth0.react.A0Auth0Package;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.mapbox.rctmgl.RCTMGLPackage;
import com.wix.interactable.Interactable;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNIapPackage(),
            new ReactNativeOneSignalPackage(),
            new A0Auth0Package(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new PickerPackage(),
            new RCTMGLPackage(),
            new Interactable(),
            new AndroidKeyboardAdjustPackage()
        );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

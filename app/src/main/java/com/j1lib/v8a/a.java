package com.j1lib.v8a;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebChromeClient;

public class a extends Activity {

    private WebView w;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.b);
        w = (WebView) findViewById(R.id.a);
        w.setWebContentsDebuggingEnabled(true);
        w.getSettings().setJavaScriptEnabled(true);
        w.getSettings().setAllowUniversalAccessFromFileURLs(true);
        w.setWebChromeClient(new WebChromeClient());
        w.getSettings().setDomStorageEnabled(true);
        //w.addJavascriptInterface(new a(), "app");
        w.loadUrl("file:///android_asset/_.html");
    }

    @Override
    public void onBackPressed() {
        if(w.canGoBack()) {
            w.goBack();
        }
    }
}

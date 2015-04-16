# Android setup
(https://cordova.apache.org/docs/en/4.0.0/guide_platforms_android_index.md.html)

Install Android SDK
Set Android SDK's platform-tools and tools to path

# Cordova setup
(https://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface)

Install Node.js
Install Cordova
Install ANT

Set Node, Cordova, ANT to Path


Done.. Create new cordova project


#Creating new project is simple:

cordova create ProjectName com.example.hello AppName
cd ProjectName
cordova platform add android
cordova build
or cordova build android
cordova emulate android

# Other commands:
cordova plugin add org.apache.cordova.device


# Add to GIT
git init.
git remote add origin git@github.com:Senthur/Cordova-Demo.git



cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git

should automate using package manager



# Testing in chrome:
--allow-file-access-from-files


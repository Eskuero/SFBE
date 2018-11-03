# Syncall: Keep your Android apps updated
Do you like to get the latest features of the apps first than anyone?
Do you want to manually build everything to confirm the source code matches the binaries distributed by the developer?

You can use this Python script to automatically sync, build and sign all of your open source apps using gradle. It will download the latest copy of the source code from the git repository provided, proceed to build if changes are detected, to later sign the outputs and finally provide a ready to install .apk file.

## Usage
By default executing the command without arguments will result into it synchronizing all the git repositories in the immediate subfolders.
```
syncall.py
```

### Building
If you want to not only the sync the source code but also to compile the app when new changes are detected during the current syncing interation you must use it like this:
```
syncall.py --build /path/to/key.jks
```
The --build argument expects to be passed alongside the absolute or relative path to a Java key store containing a single key. You will be prompted to enter the password.
All the output files will be automatically aligned and signed with the provided key, and then placed a SYNCALL-RELEASES folder on the working dir.
By default the script will attempt the assembleRelease task for all the projects, but you can override this behaviour by placing a .custom-tasks file on the project folder formatted with a single task on each line and they will be executed on the encounter order.
Per example if on some project you want to always clean the gradle cache first, then compile the playstore release and then the debug build your .custom-tasks would look like this:
```
clean
assemblePlaystoreRelease
assembleDebug
```

### Retrying
The script will save a list of the failed projects in the previous interation in the .retry-projects of the working folder. It also will report to you a list of which specific task failed at the end of the run. This is so you can retry building after maybe figuring out any issues.
To do so:
```
syncall.py --build /path/to/key.jks --retry
```
The --retry command does not need any value, but requires the keystore to be set with the --build command because otherwise the .apk would not be signed.

### Forcing
Sometimes you may want to rebuild certain apps even if no upstream changes are received (offline project, no internet connection, just testing local changes...). You can do so by passing a list of comma joined project names (their folder name) alongside the --force argument:
```
syncall.py --build /path/to/key.jks --force Signal-Android,Tusky,SomeOtherProject
```
Requires the keystore to be set with the --build command because otherwise the .apk would not be signed.
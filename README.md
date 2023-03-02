# react-native-mmkv-logger


This is wrapper for save actions between sessions with  [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm i react-native-mmkv react-native-mmkv-logger
cd ios && pod install
```

### Props:
##### loggerStorage:
For directly manipulate with mmkv-storage
```js
import DumpLogger from 'react-native-mmkv-logger';
...
const Component = () => {
    const loggerStorage = DumpLogger.loggerStorage;
}
```

### Methods:
##### log
Adding the record to mmkv-storage
```js
import DumpLogger from 'react-native-mmkv-logger';

const Component = (props) => {
    DumpLogger.log('Render Component');
    const handleCallback = () => {
        DumpLogger.log('Callback Component', { type: 'callback', props });
    }
    return ...
}
```

##### eraseOldLogs:
* `expiredTime` (required): Life period for records. eraseOldLogs will be delete records before expiredTime.
```js
import DumpLogger from 'react-native-mmkv-logger';
...
const App = () => {

    useEffect(() => {
        // Old logs will be erase (example: records older than 90 days)
        DumpLogger.eraseOldLogs({ expiredTime: dayjs().subtract(90, 'days').valueOf() });
    }, []);
    
    return ...
}
```
##### getLogs:
Return all records from storage
```js
import DumpLogger from 'react-native-mmkv-logger';
...
const Component = () => {
    const logs = DumpLogger.getLogs();
}
```
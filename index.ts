import { MMKV } from 'react-native-mmkv';

const SEPARATE_SYMBOL = '=&=';

const loggerStorage = new MMKV({
  id: 'mmkv-logger',
});

const log = (text: string, params = {}): void => {
  loggerStorage.set(new Date().getTime() + SEPARATE_SYMBOL + text, JSON.stringify(params));
};

const getLogs = () => {
  const keys = loggerStorage.getAllKeys();
  const logs = keys.map(key => {
    const splittedKey = key.split(SEPARATE_SYMBOL);
    const time = new Date(Number(splittedKey[0]));
    return {
      time: time.toLocaleDateString() + ' ' + time.toLocaleTimeString(),
      text: splittedKey[1],
      params: JSON.parse(loggerStorage.getString(key) || '{}'),
    };
  });
  return logs;
};

const eraseOldLogs = ({ expiredTime }: { expiredTime: number }) => {
  if (expiredTime) {
    const keys = loggerStorage.getAllKeys();
    keys.forEach(key => {
      if (Number(key.split(SEPARATE_SYMBOL)[0]) <= expiredTime) {
        loggerStorage.delete(key);
      }
    });
  }
};

const DumpLogger = {
  log,
  getLogs,
  eraseOldLogs,
  loggerStorage,
};

export default DumpLogger;

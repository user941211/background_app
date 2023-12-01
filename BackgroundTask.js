import BackgroundTask from 'react-native-background-task';

BackgroundTask.define(async () => {
  // 백그라운드 작업 로직 작성
  BackgroundTask.finish();
});

export const startBackgroundTask = () => {
  BackgroundTask.schedule();
};
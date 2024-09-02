import {SafeAreaView} from 'react-native';

import Navigation from './src/routes/Navigation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation />
    </SafeAreaView>
  );
};

export default App;

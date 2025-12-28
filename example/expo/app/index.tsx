import { useRef, useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { TrueSheet, TrueSheetProvider } from '@lodev09/react-native-true-sheet';

export default function Index() {
  const [transparent, setTransparent] = useState(false);
  const sheetRef = useRef<TrueSheet>(null);

  const openSheet = () => {
    sheetRef.current?.present();
  };

  return (
    <Modal visible animationType="slide" transparent={transparent}>
      <TrueSheetProvider>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: transparent ? 'rgba(255,255,255,0.5)' : 'white',
          }}
        >
          <Text>This is a modal screen</Text>
          <Button title="Open TrueSheet" onPress={openSheet} />
          <Button
            title={transparent ? 'Make Opaque' : 'Make Transparent'}
            onPress={() => setTransparent(!transparent)}
          />
        </View>

        <TrueSheet ref={sheetRef} detents={['auto']}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Hello from TrueSheet!</Text>
            <Button title="Dismiss" onPress={() => sheetRef.current?.dismiss()} />
          </View>
        </TrueSheet>
      </TrueSheetProvider>
    </Modal>
  );
}

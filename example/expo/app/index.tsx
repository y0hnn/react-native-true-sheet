import { useRef, useState } from 'react';
import { Button, Modal, ScrollView, TextInput, useWindowDimensions, View } from 'react-native';
import { type TrueSheet } from '@lodev09/react-native-true-sheet';
import {
  ReanimatedTrueSheet,
  ReanimatedTrueSheetProvider,
  useReanimatedTrueSheet,
} from '@lodev09/react-native-true-sheet/reanimated';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.`;

const SheetContent = ({ onDismiss }: { onDismiss: () => void }) => {
  const { height } = useWindowDimensions();
  const { animatedPosition } = useReanimatedTrueSheet();

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animatedPosition.value, [height, height * 0.5], ['white', 'red']),
  }));

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
      <Animated.Text style={[{ fontSize: 18, marginBottom: 10 }, animatedTextStyle]}>
        Hello from TrueSheet!
      </Animated.Text>
      <Animated.Text style={animatedTextStyle}>{LOREM_IPSUM}</Animated.Text>
      <Animated.Text style={[{ marginTop: 10 }, animatedTextStyle]}>{LOREM_IPSUM}</Animated.Text>
      <Button title="Dismiss" onPress={onDismiss} />
    </ScrollView>
  );
};

export default function Index() {
  const [transparent, setTransparent] = useState(false);
  const sheetRef = useRef<TrueSheet>(null);

  const openSheet = () => {
    sheetRef.current?.present();
  };

  return (
    <Modal visible animationType="slide" transparent={transparent}>
      <ReanimatedTrueSheetProvider>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: transparent ? 'rgba(255,255,255,0.5)' : 'white',
          }}
        >
          <Button title="Open TrueSheet" onPress={openSheet} />
          <Button
            title={transparent ? 'Make Opaque' : 'Make Transparent'}
            onPress={() => setTransparent(!transparent)}
          />
        </View>

        <ReanimatedTrueSheet
          ref={sheetRef}
          detents={['auto']}
          scrollable
          footer={
            <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: 'white',
                }}
                placeholder={'placeholder'}
                defaultValue={'Default value'}
                maxLength={500}
                editable={true}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="center"
                returnKeyType="default"
                blurOnSubmit={false}
                scrollEnabled={true}
              />
            </View>
          }
        >
          <SheetContent onDismiss={() => sheetRef.current?.dismiss()} />
        </ReanimatedTrueSheet>
      </ReanimatedTrueSheetProvider>
    </Modal>
  );
}

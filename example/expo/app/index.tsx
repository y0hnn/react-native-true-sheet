import { useRef, useState } from 'react';
import { Button, Modal, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { TrueSheet, TrueSheetProvider } from '@lodev09/react-native-true-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const isIPad = Platform.OS === 'ios' && Platform.isPad;

const Footer = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = isIPad ? 0 : insets.bottom;

  return (
    <View style={{ paddingBottom: bottomInset, backgroundColor: '#f5f5f5' }}>
      <TextInput
        multiline
        placeholder="Type a message..."
        style={{
          margin: 12,
          padding: 12,
          minHeight: 80,
          backgroundColor: '#fff',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ddd',
          textAlignVertical: 'top',
        }}
      />
    </View>
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

        <TrueSheet ref={sheetRef} detents={['0.95']} footer={<Footer />}>
          <ScrollView nestedScrollEnabled style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Hello from TrueSheet!</Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16 }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16 }}>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
              magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16 }}>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
              molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16 }}>
              Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
              fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
              cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16 }}>
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
              eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum
              rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat.
            </Text>
            <Button title="Dismiss" onPress={() => sheetRef.current?.dismiss()} />
          </ScrollView>
        </TrueSheet>
      </TrueSheetProvider>
    </Modal>
  );
}

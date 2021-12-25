/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, {} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image,
    FlatList,
} from 'react-native';

const Cifar_Data = [
    {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/airplane1.png",
        'label': "ariplane",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/airplane2.png",
        'label': "ariplane",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/airplane3.png",
        'label': "ariplane",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/automobile1.png",
        "label": "automobile",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/automobile2.png",
        "label": "automobile",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/automobile3.png",
        "label": "automobile",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/bird1.png",
        "label": "bird",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/bird2.png",
        "label": "bird",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/bird3.png",
        "label": "bird",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/cat1.png",
        "label": "cat",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/cat2.png",
        "label": "cat",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/cat3.png",
        "label": "cat",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/deer1.png",
        "label": "deer",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/deer2.png",
        "label": "deer",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/deer3.png",
        "label": "deer",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/dog1.png",
        "label": "dog",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/dog2.png",
        "label": "dog",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/dog3.png",
        "label": "dog",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/frog1.png",
        "label": "frog",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/frog2.png",
        "label": "frog",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/frog3.png",
        "label": "frog",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/horse1.png",
        "label": "horse",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/horse2.png",
        "label": "horse",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/horse3.png",
        "label": "horse",
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/ship1.png",
        "label": 'ship',
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/ship2.png",
        "label": 'ship',
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/ship3.png",
        "label": 'ship',
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/truck1.png",
        "label": 'truck',
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/truck2.png",
        "label": 'truck',
    }, {
        "uri": "https://www.cs.toronto.edu/~kriz/cifar-10-sample/truck3.png",
        "label": 'truck',
    },
];


function Cifar({setImage}) {
    function handlePick(item) {
        console.log(item)
    }
    function Item({item, }) {
        return (
            <TouchableOpacity onPress={() => console.log(item)}>
                <Image source={{uri: item}} style={styles.image} />
            </TouchableOpacity>
        );
    }
    // function renderItem({item}) {
    //     return (
    //         <Item item={item} onPress={handlePick(item)} />
    //     );
    // }

    return (
        <Item item={Cifar_Data[15].uri} />
        // <SafeAreaView style={{width: '100%', height: '100%'}}>
        //     <FlatList
        //         data={Cifar_Data}
        //         renderItem={renderItem}
        //         keyExtractor={item => item.uri}
        //         horizontal={false}
        //         numColumns={10}
        //     />
        // </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    image: {height: 32, width: 32},
});

export default Cifar;

import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

const Categories = () => {
    return (
        <>
        <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
        />
        <View style={styles.container}>
            <Text>
            
            </Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0e',
        padding: 16,
        alignItems: 'stretch',
        justifyContent: 'center',
      }
})

export default Categories;
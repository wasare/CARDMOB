import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList} from 'react-native';

import { useShop } from "../../contexts/ShopContext";

const OrderInfoScreen = ({navigation}: any) => {
    const { orderInfo } = useShop();
    const [orderData, setOrderData ] = useState<any[]>([]);

    const loadOrder = () => {
        console.log(orderInfo);
        if (orderInfo.id) {
            const lastOrder = [
                {label: '', value: orderInfo.status, isStatus: true},
                {label: 'Nome', value: orderInfo.customerName},
                {label: 'Endereço de entrega', value: orderInfo.customerAddress},
                {label: 'Total', value: `R$ ${orderInfo.totalPrice.toFixed(2)}`},
                ...orderInfo.orderOffering.map(item => ({
                    label: item.offering.name,
                    value: `x${item.quantity} - subtotal: R$ ${item.subtotal.toFixed(2)}`,
                    image: item.offering.image,
                    isOrderItem: true,
                }))
            ];
            setOrderData(lastOrder);
        }
    }
    useEffect(() => {
        loadOrder();
    }, []);

    const renderItem = ({item}: any) => {
        if (item.isOrderItem) {
            return (
                <View style={styles.itemRow}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>
                            {item.label} ({item.value})
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.infoRow}>
                <Text style={styles.label}>
                    {item.label}
                </Text>
                <Text style={styles.value}>{item.value}</Text>
            </View>
        );
    }

    return ( 
        <View style={styles.container}>
            {orderInfo.id ? (
                <View> 
                    <Text style={styles.title}>
                        Nº {orderInfo.id}
                    </Text>
                    <FlatList 
                        data={orderData}
                        renderItem={renderItem}
                        keyExtractor={(item, index => index.toString())}
                        contentContainerStyle={styles.container}
                    />
                </View>
            ) : (
                <View style={styles.infoRow}>
                    <Text style={styles.title}>
                        Nenhum pedido encontrado.
                    </Text>
                </View>
            )}
        </View>
    );
}
export default OrderInfoScreen;

const styles = StyleSheet.create({
    container: {},
    itemRow: {},
    itemImage: {
        height: 80,
        width: 80,
    },
    itemInfo: {},
    itemName: {},
    infoRow: {},
    label: {},
    value: {},
    title: {},
});
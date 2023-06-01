import {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import { styles } from './styles'
import {Image} from "native-base";
import axios from "axios";

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];

const renderItem = (item) => {
    const date = new Date(item.created_at)
    date.setHours(date.getHours() - 3)
    const formatedDate = date.toLocaleString('pt-BR')

    return (
        <View style={styles.card}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'space-between',
                width: '100%'
            }}>
                <Image alt={item.id} source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 99}}/>
                <Text style={styles.cardDescription}>{formatedDate}</Text>
            </View>
        </View>
    )}
;

const api = axios.create({
    baseURL: "https://projetoiot-linux-function-app.azurewebsites.net/api",
});

export default function RecentAccessScreen({ navigation }) {
    const [logs, setLogs] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        setRefreshing(true)
        api.get('logs')
            .then(({data}) => {
                setLogs(data)
                setRefreshing(false)
            })
    }, [])


    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <Text style={styles.title}>Acessos recentes</Text>
                 <FlatList
                    data={logs}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true)
                                api.get('logs')
                                    .then(({data}) => {
                                        setLogs(data)
                                        setRefreshing(false)
                                    })
                            }}
                        />
                    }
                    style={{ flex: 1 }}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

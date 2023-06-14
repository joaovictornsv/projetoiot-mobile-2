import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginBottom: 24,
        marginLeft: 24,
        marginRight: 24,
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },

    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F9F9F9'
    },

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#0C0F14',
        marginBottom: 48
    },

    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        padding: 18,
        width: 360,
        marginBottom: 14,
        borderRadius: 8
    },

    cartTitle: {
        color: '#0C0F14',
        fontSize: 18,
        fontWeight: 'bold',
    },

    cardDescription: {
        color: '#969696',
        fontSize: 22
    },

    removeButtom: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 46,
        height: 46,
        borderRadius: 6,
    },

    emptyAlert: {
        color: '#0C0F14',
        fontSize: 20,
    }

})

import {View, Text, TouchableOpacity} from 'react-native';
import { Button, Input,  Image, Spinner, Flex, ScrollView, useToast } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ValidadeAndSubmitFormChain } from '../../store/services/validate';


export default function CreateScreen({ navigation }) {
    const { control, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const toast = useToast();

    const toastId = 'validate';

    const createData = new ValidadeAndSubmitFormChain();
    const [showSucessMessage, setShowSuccessMessage] = useState(false)

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 1,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            data.imageFile = image;
            const newData = await createData.start(data);


            setValue('name', '');
            setValue('email', '');
            setValue('imageFile', '');
            setImage(null);
            setShowSuccessMessage(true)
        }catch (err){
            if(err instanceof Error){
                if(!toast.isActive(toastId)){
                    toast.show({title: "Error",
                        description: err.message,
                        variant: "solid"
                    });
                }
            }else{
                console.log(err);
            }
        }finally{
            setIsLoading(false);
        }

    }


    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%', backgroundColor: '#F9F9F9' }}>
            {isLoading ? <Spinner size="lg" color="#D27842" />  :

                <View style={{width: '80%', marginTop: 100, marginBottom: 70}}>
                    <Text style={{fontWeight: 'bold', fontSize: 36, color: '#0C0F14', marginBottom: 30, textAlign: "center" }} >Cadastro</Text>
                    <ScrollView height='100%'>
                        {image && (
                            <Flex marginBottom="10" flexDirection='column' alignItems='center' justifyContent='space-between'>
                                <Image alt='image-selected' source={{ uri: image }} style={{ width: 150, height: 150,  marginTop: 10, marginBottom: 10, borderRadius: 99}}/>
                                <Button onPress={() => setImage(null)} width='30%' style={{backgroundColor: '#7286D3'}} >
                                    <Text style={{color: '#FBFEFF', fontWeight: 'bold'}}>Remover</Text>
                                </Button>
                            </Flex>
                        )}
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Input
                                    placeholder="Nome"
                                    onBlur={field.onBlur}
                                    onChangeText={(data) => field.onChange(data)}
                                    value={field.value}
                                    variant="unstyled"
                                    size="lg"
                                    w="100%"
                                    style={ {
                                        backgroundColor: '#E5E0FF',
                                        color: '#0C0F14',
                                        height: 55,
                                        borderRadius: 4,
                                        marginTop: 5,

                                    }}
                                />
                            )}
                            name="name"
                            defaultValue=""
                        />
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Input
                                    placeholder="Email"
                                    onBlur={field.onBlur}
                                    onChangeText={(data) => field.onChange(data)}
                                    value={field.value}
                                    variant="unstyled"
                                    size="lg"
                                    w="100%"
                                    style={ {
                                        backgroundColor: '#E5E0FF',
                                        color: '#0C0F14',
                                        height: 55,
                                        borderRadius: 4,
                                        marginTop: 8,
                                        marginBottom: 10

                                    }}
                                />
                            )}
                            name="email"
                            defaultValue=""
                        />
                        {!image && (
                            <Button style={{backgroundColor: '#7286D3', marginTop: 15}}>
                                <Text style={{color: '#FBFEFF', fontWeight: 'bold'}} onPress={() => selectImage()}>Adicionar Imagem</Text>
                            </Button>
                        )}
                        <View style={{marginTop: 8 , flexDirection:"column", gap: 16, justifyContent: 'space-between', alignItems: 'center',width: '100%'}}>
                            <Button onPress={handleSubmit(onSubmit)} width='100%' style={{backgroundColor: '#7286D3'}} >
                                <Text style={{color: '#FBFEFF', fontWeight: 'bold'}}>Cadastrar</Text>
                            </Button>

                            {showSucessMessage && <Text style={{ color: 'green', fontSize: 18 }}>Usuário cadastrado!</Text>}
                        </View>
                        <Button onPress={() => navigation.navigate('Access')} width='100%' style={{backgroundColor: '#0C0F14', marginTop: 24}} >
                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>Voltar</Text>
                        </Button>
                    </ScrollView>

                </View>
            }
        </View>

    );
}

import { useEffect, useState, useHistory } from 'react'
import {
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    TextInput,
    View,
    Text,
    Image,
    Alert,
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, COLORS, SIZES, FONTS } from '../constants'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'
import { firebase, auth } from "../firebase/config"
import { signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'


const fbProvider = new FacebookAuthProvider(firebase);





export default function Login({ navigation }) {
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(mail, pwd)
            .then(userCreadentials => {
                const user = userCreadentials.user;
                console.log('đăng kí với mail: ', user.email);
            })
            .catch(error => Alert.alert(error.message))
    }

    const handLoginEmailPassword = () => {
        auth
            .signInWithEmailAndPassword(mail, pwd)
            .then(userCreadentials => {
                const user = userCreadentials.user;
                console.log('đăng nhập với', user.email);
            })
            .catch(error => Alert.alert(error.message))
    }

    const handleFbLogin = () => {
        signInWithPopup(auth, fbProvider);
    }



    useEffect(() => {
        const unsubscibed = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log({ user });
                navigation.navigate('BottomTabNavigation');
            }
        })

        //clean function
        return () => {
            unsubscibed();
        }
    }, []);

    const [mail, setMail] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdVisible, SetPwdVisible] = useState(true)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <PageTitle onPress={() => navigation.navigate('Walkthrough')} />
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                            marginTop: 50,
                        }}
                    >
                        Đăng Nhập
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 22,
                            paddingVertical: 50,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >

                            <TextInput
                                style={{
                                    flex: 1,
                                    marginVertical: 10,
                                    borderColor: '#111',
                                    backgroundColor: COLORS.secondaryWhite,
                                    borderRadius: SIZES.padding,
                                    paddingLeft: SIZES.padding,
                                    height: 48,
                                    fontSize: 12,
                                    color: '#111',
                                }}
                                placeholder="Enter your email"
                                placeholderTextColor="#111"
                                selectionColor="#111"
                                onChangeText={text => setMail(text)}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 40,
                            }}
                        >

                            <TextInput
                                style={{
                                    flex: 1,
                                    marginVertical: 10,
                                    borderColor: '#111',
                                    backgroundColor: COLORS.secondaryWhite,
                                    borderRadius: SIZES.padding,
                                    paddingLeft: SIZES.padding,
                                    height: 48,
                                    fontSize: 12,
                                    color: '#111',
                                }}
                                placeholder="Enter your password"
                                placeholderTextColor="#111"
                                selectionColor="#111"
                                onChangeText={text => setPwd(text)}
                                secureTextEntry
                            />
                        </View>
                        <Button
                            title="Đăng Nhập"
                            onPress={handLoginEmailPassword}
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                marginBottom: 10,
                            }}
                        />
                    </View>
                    <View style={{
                        width: '100%',
                        flex: 1,
                        paddingHorizontal: 100,
                        marginBottom: 10,
                    }}>
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                alignContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    paddingLeft: SIZES.padding,
                                    backgroundColor: COLORS.division,
                                    paddingVertical: 1,
                                    height: 1,
                                    marginRight: SIZES.padding
                                }}
                            />
                            <Text style={{ color: COLORS.division }}>or connect with</Text>
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    paddingLeft: SIZES.padding,
                                    backgroundColor: COLORS.division,
                                    paddingVertical: 1,
                                    marginLeft: SIZES.padding
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 22,
                            paddingHorizontal: 20,
                        }}
                    >
                        <Button
                            title="Google"
                            // onPress={() => handleFbLogin()}
                            style={{
                                paddingVertical: 12,
                                marginBottom: 10,
                                width: '48%',
                                marginRight: '2%',
                                borderRadius: 3,
                                backgroundColor: '#000',
                                color: COLORS.green
                            }}
                        />
                        <Button
                            title="Facebook"
                            onPress={() => handleFbLogin}
                            style={{
                                paddingVertical: 12,
                                marginBottom: 10,
                                width: '48%',
                                marginLeft: '2%',
                                borderRadius: 3,
                                backgroundColor: '#046ee5'
                            }}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

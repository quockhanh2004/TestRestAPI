import {useDispatch, useSelector} from 'react-redux';
import {DangKyTaiKhoan, clearRegisterData} from './redux/register_reducer';

import {View, Text, Button} from 'react-native-ui-lib';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ToastAndroid} from 'react-native';
import InputView from './InputView';

const RegistrationForm = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {registerData, registerStatus} = useSelector(state => state.register);

  const [email, setemail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setname] = React.useState('');
  const [phone, setphone] = React.useState('');

  React.useEffect(() => {
    if (registerStatus === 'succeeded' && registerData) {
      navigation.goBack();
    }

    if (registerStatus === 'succeeded' && registerData) {
      ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);
      dispatch(clearRegisterData());
    }

    if (registerStatus === 'failed') {
      ToastAndroid.show('Đăng ký thất bại\n' + registerData, ToastAndroid.LONG);
      dispatch(clearRegisterData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, registerData, registerStatus]);

  const dangky = () => {
    dispatch(DangKyTaiKhoan({email, password, name, phone}));
  };

  return (
    <View flexS height={'100%'}>
      <Text>Registration Form</Text>
      <View paddingH-12>
        <InputView
          placeholder={'email'}
          onTextChange={setemail}
          numberOfLines={1}
        />
      </View>
      <View paddingH-12>
        <InputView
          placeholder={'password'}
          onTextChange={setPassword}
          numberOfLines={1}
        />
      </View>
      <View paddingH-12>
        <InputView
          placeholder={'name'}
          onTextChange={setname}
          numberOfLines={1}
        />
      </View>
      <View paddingH-12>
        <InputView
          placeholder={'phone'}
          onTextChange={setphone}
          numberOfLines={1}
        />
      </View>
      <Button marginT-20 label="Đăng ký" onPress={dangky} />
    </View>
  );
};

export default RegistrationForm;

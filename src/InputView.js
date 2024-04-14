import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const InputView = ({
  placeholder,
  placeholderTextColor,
  style,
  keyboardType,
  numberOfLines,
  onTextChange,
  value,
  hidePassword,
}) => {
  // const check = () => {
  //   if (text === '' || text === undefined) {
  //     seterror(`Vui lòng nhập ${placeholder}`);
  //     setBackupHide(hide);
  //     setHide(null);
  //     return false;
  //   } else {
  //     seterror('');
  //     setHide(hidePassword);
  //     return true;
  //   }
  // };

  // React.useImperativeHandle(ref, () => ({
  //   check,
  // }));

  const [error, seterror] = useState('');
  const [text, setText] = useState(value);
  const [hide, setHide] = useState(hidePassword);
  const [backupHide, setBackupHide] = useState(hide);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (hidePassword !== undefined && hidePassword !== null) {
      setHide(hidePassword);
      setBackupHide(hide);
    }
  }, [hide, hidePassword]);

  const handleTextChange = inputText => {
    setText(inputText);
    seterror('');
    setHide(backupHide);
    if (onTextChange) {
      onTextChange(inputText);
    }
  };

  const hideShow = () => {
    setHide(!hide);
    setBackupHide(!hide);
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputView,
          isFocused && styles.focus,
          !!error && styles.isError,
        ]}>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType || 'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          numberOfLines={numberOfLines || 1}
          onChangeText={handleTextChange}
          value={text}
          placeholderTextColor={placeholderTextColor || '#8B8B8B'}
          style={styles.input}
          secureTextEntry={hide}
        />
        {/* {hide != null && (
          <View>
            {hide ? (
              <TouchableOpacity onPress={hideShow}>
                <Image
                  source={require('../../assest/icons/hidePassword.png')}
                  style={styles.showPassword}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={hideShow}>
                <Image
                  source={require('../../assest/icons/showPassword.png')}
                  style={styles.showPassword}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {!!error && (
          <Image
            source={require('../../assest/icons/error.png')}
            style={styles.showPassword}
          />
        )} */}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputView;

const styles = StyleSheet.create({
  isError: {
    borderColor: '#f00',
    borderWidth: 2,
  },
  error: {
    color: 'red',
    fontSize: 15,
    fontWeight: '400',
  },
  focus: {
    borderColor: '#009245',
    borderWidth: 2,
  },
  input: {
    width: '100%',
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
  },
  showPassword: {
    width: 20,
    height: 20,
  },
  inputView: {
    borderWidth: 1,
    width: '100%',
    height: 46,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
  },
  container: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

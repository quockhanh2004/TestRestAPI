import {Button, Text, View, Picker, TextField} from 'react-native-ui-lib';
import * as React from 'react';
import InputView from './InputView';
import {ScrollView, TextInput} from 'react-native';
import ParameterInput from './ParameterInput';
import AxiosInstance from './AxiosInstance';

const Screen1 = props => {
  const {navigation} = props;
  const [link, setlink] = React.useState('');
  const [method, setmethod] = React.useState('get'); // Khởi tạo mặc định cho method
  const [listQuery, setListQuery] = React.useState([
    {parameters: '', value: ''},
  ]);
  const [body, setbody] = React.useState('');
  const [output, setoutput] = React.useState('');

  const addQuery = () => {
    setListQuery(prevList => [...prevList, {parameters: '', value: ''}]);
  };

  const removeQuery = indexToRemove => {
    setListQuery(prevList => {
      return prevList.filter((_, index) => index !== indexToRemove);
    });
  };

  const updateQuery = (index, updatedQuery) => {
    setListQuery(prevList => {
      return prevList.map((query, idx) => {
        if (idx === index) {
          return updatedQuery;
        }
        return query;
      });
    });
  };

  const objectToQueryString = obj => {
    const parts = [];

    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key]) {
        parts.push(`${encodeURIComponent(obj[key])}`);
      }
    }

    return parts.join('=');
  };

  const validateAndPrefixLink = linkValue => {
    // Check if link already has a protocol (http:// or https://)
    const hasProtocol = /^https?:\/\//i.test(linkValue);

    // If no protocol, prepend http://
    return hasProtocol ? linkValue : `http://${linkValue}`;
  };

  const getApiUrl = () => {
    const validatedLink = validateAndPrefixLink(link);
    const queryString = listQuery
      .map(query => objectToQueryString(query))
      .join('&');
    return `${validatedLink}?${queryString}`;
  };

  const run = async () => {
    switch (method) {
      case 'get':
        runGet();
        break;
      case 'post':
        runPost();
        break;
      // case 'put':
      //   runPut();
      //   break;
      // case 'delete':
      //   runDelete();
      //   break;
      default:
        break;
    }
  };

  const runGet = async () => {
    try {
      const response = await AxiosInstance().get(getApiUrl());
      const formattedResponse = formatJSON(response);
      setoutput(formattedResponse);
    } catch (error) {
      // console.log(error);
    }
  };

  const runPost = async () => {
    console.log(JSON.parse(body));
    try {
      const response = await AxiosInstance().post(
        getApiUrl(),
        JSON.parse(body),
      );
      const formattedResponse = formatJSON(response);
      setoutput(formattedResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const formatJSON = data => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error formatting JSON:', error);
      return 'Error formatting JSON';
    }
  };

  return (
    <ScrollView>
      <View padding-5>
        <View row center>
          <View padding-5>
            <Picker
              backgroundColor="#D1E3E0"
              borderRadius={10}
              centered
              value={method}
              onChange={itemValue => setmethod(itemValue)}
              label="Select method">
              <Picker.Item label="Get" value="get" />
              <Picker.Item label="Post" value="post" />
              <Picker.Item label="Put" value="put" />
              <Picker.Item label="Delete" value="delete" />
            </Picker>
          </View>
          <View flex>
            <InputView
              placeholder={'Link API'}
              onTextChange={setlink}
              value={link}
              numberOfLines={1}
            />
          </View>
        </View>
        <View row>
          <Button label={'RUN'} onPress={() => run()} />
        </View>
        <View padding-5>
          <View br20 style={{borderWidth: 1}}>
            <Text text60 margin-5>
              Custom
            </Text>
            <View padding-5>
              <View br20 style={{borderWidth: 1}}>
                <Text text60 margin-5>
                  Query Parameters
                </Text>
                {listQuery.map((item, index) => {
                  return (
                    <ParameterInput
                      setData={data => updateQuery(index, data)}
                      last={index == listQuery.length - 1}
                      onPressButton={() => {
                        if (index == listQuery.length - 1) {
                          addQuery();
                        } else {
                          removeQuery(index);
                        }
                      }}
                    />
                  );
                })}
              </View>
              <View marginT-10 br20 style={{borderWidth: 1}}>
                <Text text60 margin-5>
                  Body
                </Text>
                <View
                  br20
                  margin-5
                  padding-5
                  style={{borderWidth: 1}}
                  height={'auto'}>
                  <TextField
                    onChangeText={setbody}
                    keyboardType={'default'}
                    returnKeyType={'join'}
                  />
                </View>
              </View>
            </View>
          </View>
          <View marginT-15>
            <Text text50>OUT PUT</Text>
            <View br20 padding-5 style={{borderWidth: 1}} height={400}>
              <ScrollView>
                <Text green10>{output}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Screen1;

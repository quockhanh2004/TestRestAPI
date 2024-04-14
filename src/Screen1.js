import {useDispatch, useSelector} from 'react-redux';
import {getMethod, clearDataGet} from './redux/getMethod_reducer';
import {postMethod, clearDataPost} from './redux/postMethod_reducer';
import {putMethod, clearDataPut} from './redux/putMethod_reducer';
import {deleteMethod, clearDataDelete} from './redux/deleteMethod_reducer';

import {Button, Text, View, Picker, TextField} from 'react-native-ui-lib';
import * as React from 'react';
import InputView from './InputView';
import {ScrollView, TextInput} from 'react-native';
import ListQuery from './ListQuery';
import {formatJSON, getApiUrl} from './module/linkApiFormat';

const Screen1 = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {getMethodData, getMethodStatus} = useSelector(
    state => state.getMethod,
  );
  const {postMethodData, postMethodStatus} = useSelector(
    state => state.postMethod,
  );
  const {putMethodData, putMethodStatus} = useSelector(
    state => state.putMethod,
  );
  const {deleteMethodData, deleteMethodStatus} = useSelector(
    state => state.deleteMethod,
  );

  const [link, setlink] = React.useState('');
  const [method, setmethod] = React.useState('get'); // Khởi tạo mặc định cho method
  const [listQuery, setListQuery] = React.useState([
    {parameters: '', value: ''},
  ]);
  const [body, setbody] = React.useState('');
  const [output, setoutput] = React.useState('');

  const run = async () => {
    switch (method) {
      case 'get':
        runGet();
        break;
      case 'post':
        runPost();
        break;
      case 'put':
        runPut();
        break;
      case 'delete':
        runDelete();
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (method === 'get') {
      if (getMethodStatus === 'succeeded' && getMethodData) {
        setoutput(formatJSON(getMethodData));
      }

      if (getMethodStatus === 'loading') {
        setoutput('loading ...');
      }

      if (getMethodStatus === 'failed') {
        setoutput(formatJSON(getMethodData));
      }
    }
  }, [getMethodStatus, getMethodData, method]);
  React.useEffect(() => {
    if (method === 'post') {
      if (postMethodStatus === 'succeeded' && postMethodData) {
        setoutput(formatJSON(postMethodData));
        dispatch(clearDataPost());
      }

      if (postMethodStatus === 'loading') {
        setoutput('loading ...');
      }

      if (postMethodStatus === 'failed') {
        setoutput(postMethodData);
      }
    }
  }, [dispatch, method, postMethodData, postMethodStatus]);
  React.useEffect(() => {
    if (method === 'put') {
      if (putMethodStatus === 'succeeded' && putMethodData) {
        setoutput(formatJSON(putMethodData));
      }

      if (putMethodStatus === 'loading') {
        setoutput('loading ...');
      }

      if (putMethodStatus === 'failed') {
        setoutput(formatJSON(putMethodData));
      }
    }
  }, [method, putMethodData, putMethodStatus]);
  React.useEffect(() => {
    if (method === 'delete') {
      if (deleteMethodStatus === 'succeeded' && deleteMethodData) {
        setoutput(formatJSON(deleteMethodData));
      }

      if (deleteMethodStatus === 'loading') {
        setoutput('loading ...');
      }

      if (deleteMethodStatus === 'failed') {
        setoutput(formatJSON(deleteMethodData));
      }
    }
  }, [method, deleteMethodStatus, deleteMethodData]);

  const runGet = async () => {
    dispatch(getMethod(getApiUrl(link, listQuery)));
  };
  const runPost = async () => {
    dispatch(
      postMethod({
        link: getApiUrl(link, listQuery),
        body: JSON.parse(body || '{}'),
      }),
    );
  };
  const runPut = async () => {
    dispatch(
      putMethod({
        link: getApiUrl(link, listQuery),
        body: JSON.parse(body || '{}'),
      }),
    );
  };
  const runDelete = async () => {
    dispatch(
      deleteMethod({
        link: getApiUrl(link, listQuery),
        body: JSON.parse(body || '{}'),
      }),
    );
  };

  const clearOutput = () => {
    setoutput('');
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
                <ListQuery setListQuery={setListQuery} listQuery={listQuery} />
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
            <View marginT-5>
              <Button label={'Clear'} onPress={() => clearOutput()} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Screen1;

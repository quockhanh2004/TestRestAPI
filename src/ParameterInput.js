import {View, Text, Button} from 'react-native-ui-lib';
import React from 'react';
import InputView from './InputView';

const ParameterInput = ({last, data, setData, onPressButton}) => {
  const [parameters, setParameters] = React.useState('');
  const [valueParameters, setValueParameters] = React.useState('');

  React.useEffect(() => {
    setData({
      parameters: parameters.trim(),
      value: valueParameters.trim(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters, valueParameters]);

  return (
    <View>
      <View row padding-5>
        <View flex margin-5>
          <InputView
            value={parameters}
            onTextChange={setParameters}
            placeholder={'Parameters'}
          />
        </View>
        <View flex margin-5>
          <InputView
            value={valueParameters}
            onTextChange={setValueParameters}
            placeholder={'value'}
          />
        </View>
        {last ? (
          <Button label={'+'} center onPress={onPressButton} />
        ) : (
          <Button label={'-'} center onPress={onPressButton} />
        )}
      </View>
    </View>
  );
};

export default ParameterInput;

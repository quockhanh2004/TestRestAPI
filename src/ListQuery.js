import {View, Text} from 'react-native-ui-lib';
import * as React from 'react';

import ParameterInput from './ParameterInput';

const ListQuery = ({listQuery, setListQuery}) => {
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

  return (
    <View>
      {listQuery.map((item, index) => {
        return (
          <ParameterInput
            setData={data => updateQuery(index, data)}
            last={index === listQuery.length - 1}
            onPressButton={() => {
              if (index === listQuery.length - 1) {
                addQuery();
              } else {
                removeQuery(index);
              }
            }}
          />
        );
      })}
    </View>
  );
};

export default ListQuery;

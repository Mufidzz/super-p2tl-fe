import React, { useEffect, useState } from 'react';
import { CustomboardApi, DefaultboardApi } from '../../api';
import Context from './index';
import axios from 'axios';

const KanbanProvider = (props) => {
    const [board, setBoard] = useState({});
    const [customboard, setCustomboard] = useState({});

    const defaultData = async () => {
        await axios.get(`${DefaultboardApi}`).then((res) => {
            setBoard(res.data.defaultboard);
        });
    };
    const customData = async () => {
        await axios.get(CustomboardApi).then((res) => {
            setCustomboard(res.data.customboard);
        });
    };

    useEffect(() => {
        defaultData();
        customData();
    }, [setBoard, setCustomboard]);
    return (
        <Context.Provider key={board} value={{ board, customboard }}>
            {props.children}
        </Context.Provider>
    );
};
export default KanbanProvider;
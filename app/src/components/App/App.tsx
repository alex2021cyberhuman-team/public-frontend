import { useEffect } from 'react';
import {useRoutes} from "react-router-dom";
import GlobalStore from '../../store/globalStore';
import { observer } from 'mobx-react-lite';
import { getRoutes } from './services/getRoutes';

export default observer(({store}: {store: GlobalStore}) => {
    useEffect(() => {store.app.loadAsync()}, [store]);
    const element = useRoutes(getRoutes({store}));
    return element;
});


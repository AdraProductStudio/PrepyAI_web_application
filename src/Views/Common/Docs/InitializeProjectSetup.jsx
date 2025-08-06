import React, { Fragment, useEffect } from "react"
import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { update_error, update_tab_render_app_data } from '../Slices/Common_slice';
import { CustomUseLocationHook, useCommonState, useDispatch } from 'Components/CustomHooks';
import { update_app_data } from 'Views/Common/Slices/Common_slice';
import Cookies from 'js-cookie';
import { decrypt_app_data_logs } from 'ResuableFunctions/logs_handler';
import { OverallCanvas } from '../utils/OverallCanvas';

export const InitializeProjectSetup = () => {
    const dispatch = useDispatch();
    const { commonState } = useCommonState();
    const location = CustomUseLocationHook();

    // Internet event listeners (added outside useEffect, but depends on dispatch)
    useEffect(() => {
        const handleOnline = () => dispatch(update_app_data({ type: 'internet_status', data: true }));
        const handleOffline = () => dispatch(update_app_data({ type: 'internet_status', data: false }));

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [dispatch]);

    // Effect 1: error handling toast
    useEffect(() => {
        if (commonState?.error?.Err) {
            toast(commonState?.error?.Err, {
                position: "top-right",
                type: commonState?.error?.Toast_Type,
                onOpen: () => dispatch(update_error({})),
                autoClose: 1600
            });
        }
    }, [commonState?.error?.Err, commonState?.error?.Toast_Type, dispatch]);

    // Effect 2: update menu name from location
    useEffect(() => {
        const currentLocation = location[location.length - 1];
        if (commonState?.app_data?.currentMenuName !== currentLocation) {
            dispatch(update_app_data({ type: "menu_name", data: currentLocation || '' }));
        }
    }, [location, commonState?.app_data?.currentMenuName, dispatch]);

    // Effect 3: on tab visible, restore logs
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                if (Cookies.get('project_log')) {
                    let log_data = decrypt_app_data_logs();
                    dispatch(update_tab_render_app_data(log_data));
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [dispatch]);

    return commonState?.app_data?.isOnline ?
        <Fragment>
            <Outlet />
            <OverallCanvas />
        </Fragment>
        :
        <p>No internet connection</p>;
};
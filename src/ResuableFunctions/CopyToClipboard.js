const CopyToClipboard = (text, dispatch) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        dispatch({
            type: "common_slice/update_error",
            payload: { Toast_Type: "success", Err: "Copied to clipboard!" },
        });
    }
};

export default CopyToClipboard;
